defmodule SammansWeb.RoomChannel do
  use SammansWeb, :channel
  alias SammansWeb.Presence
  alias Sammans.Embedder

  # def join("room:lobby", _message, socket) do
  #   {:ok, socket}
  # end

  @spec join(<<_::40, _::_*8>>, nil | maybe_improper_list | map, Phoenix.Socket.t()) ::
          {:ok, Phoenix.Socket.t()}
  def join("room:" <> _room_id, params, socket) do
    Process.flag(:trap_exit, true)
    # :timer.send_interval(5000, :ping)

    send(self(), :after_join)

    {:ok, assign(socket, :user_name, params["name"])}
  end

  def handle_in("new_item", %{"body" => body}, socket) do
    broadcast!(socket, "new_item", %{body: body})
    {:noreply, socket}
  end

  def handle_in("room:video_add", %{"url" => url}, socket) do
    # Do something with the url here

    Embedder.incoming_url(url)
    |> IO.inspect()
    |> case do
      {:ok, map} ->
        # Handle play/queue here
        broadcast!(socket, "video_queued", %{
          "time" => time_now(),
          "name" => socket.assigns.user_name,
          "html" => Map.get(map, :html),
          "scripts" => Map.get(map, :scripts),
          "message" => """
          <span class=\"w-auto\">added</span>
          <span class=\"font-bold truncate w-1/3 px-1 flex-shrink\" title=\"#{
            Map.get(map, :title)
          }\">#{Map.get(map, :title)}</span>
          <span class=\"w-auto\">to the queue</span>
          """
        })

      _ ->
        # How to handle this?

        nil
    end

    {:noreply, socket}
  end

  def handle_in("room:video_playing", _, socket) do
    broadcast!(socket, "video_playing", %{
      "time" => time_now(),
      "name" => socket.assigns.user_name,
      "message" => "started playing.."
    })

    {:noreply, socket}
  end

  def handle_in("room:video_paused", _, socket) do
    broadcast!(socket, "video_paused", %{
      "time" => time_now(),
      "name" => socket.assigns.user_name,
      "message" => "paused.."
    })

    {:noreply, socket}
  end

  def handle_info(:after_join, socket) do
    broadcast!(socket, "user_joined", %{
      "time" => time_now(),
      "name" => socket.assigns.user_name,
      "message" => "joined the room",
      "image" => generate_image(socket.assigns.user_name)
    })

    hashed_token =
      :crypto.hash(:sha256, socket.assigns.token)
      |> Base.encode16()

    {:ok, _} =
      Presence.track(socket, hashed_token, %{
        online_at: inspect(System.system_time(:second)),
        name: socket.assigns.user_name
      })

    push(socket, "presence_state", Presence.list(socket))

    {:noreply, socket}
  end

  def terminate(_reason, socket) do
    broadcast!(socket, "user_left", %{
      "time" => time_now(),
      "name" => socket.assigns[:user_name],
      "message" => "left the room",
      "image" => generate_image(socket.assigns[:user_name])
    })

    :ok
  end

  defp generate_image(user_name), do: "https://robohash.org/#{URI.encode(user_name)}?set=set3"
  defp time_now(), do: Time.utc_now() |> Time.truncate(:second)
end

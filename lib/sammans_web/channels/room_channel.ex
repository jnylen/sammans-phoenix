defmodule SammansWeb.RoomChannel do
  use SammansWeb, :channel
  alias SammansWeb.Presence

  # def join("room:lobby", _message, socket) do
  #   {:ok, socket}
  # end

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

  def handle_info(:after_join, socket) do
    IO.inspect(socket)

    broadcast!(socket, "user_joined", %{
      "name" => socket.assigns.user_name,
      "message" => "Joined the room",
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
      "name" => socket.assigns[:user_name],
      "message" => "Left the room",
      "image" => generate_image(socket.assigns[:user_name])
    })

    :ok
  end

  def handle_info(:ping, socket) do
    push(socket, "new:msg", %{user: "SYSTEM", body: "ping"})
    {:noreply, socket}
  end

  defp generate_image(user_name), do: "https://robohash.org/#{URI.encode(user_name)}?set=set3"
end

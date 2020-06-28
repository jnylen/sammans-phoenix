defmodule Sammans.Embedder.YouTube do
  @behaviour Sammans.Embedder.Provider
  alias Sammans.Embedder.Client

  @impl true
  def type, do: "YouTube"

  @doc """
  Checks if the incoming url is an valid youtube link or not..
  """
  @impl true
  def valid?(url), do: Regex.match?(~r"https?://(www\.|)(youtu\.be|youtube\.com)/(?<id>.*)", url)

  @doc """
  Fetches an url and returns the required data
  """
  @impl true
  def fetch(url), do: Client.noembed(url, type())

  def scripts(_),
    do: [
      "https://unpkg.com/video.js@7.8.3/dist/video.min.js",
      "https://unpkg.com/videojs-youtube@2.6.1/dist/Youtube.min.js"
    ]

  @doc """
  Outputs the actual embed code
  """
  @impl true
  def html(payload),
    do: Phoenix.View.render_to_string(SammansWeb.EmbedderView, "youtube.html", payload)
end

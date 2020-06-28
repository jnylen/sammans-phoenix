defmodule Sammans.Embedder.Client do
  use Tesla

  plug Tesla.Middleware.JSON

  def noembed(url, provider) do
    get("https://noembed.com/embed?url=#{URI.encode(url)}")
    |> parse_noembed(provider)
  end

  defp parse_noembed({:ok, %Tesla.Env{body: %{"title" => title, "url" => url}}}, provider) do
    {
      :ok,
      %{
        title: title,
        url: url,
        provider: provider
      }
    }
  end

  defp parse_noembed(_, _), do: {:error, "unable to fetch the url"}
end

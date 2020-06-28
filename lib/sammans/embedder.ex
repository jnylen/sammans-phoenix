defmodule Sammans.Embedder do
  @moduledoc """
    This module handles the way we embed providers..
    Some can be embedded using VideoJS, some needs to be iframed,
    some have custom plugins..
  """

  alias Sammans.Embedder, as: Embed

  @doc """
  Enabled providers
  TODO: REDO
  """
  def providers, do: [Embed.YouTube]

  @spec incoming_url(any) :: {:error, any} | {:ok, atom | %{provider: any}}
  @doc """
  Handles an incoming url to the "playlist".
  """
  def incoming_url(url) do
    Enum.reduce_while(providers(), nil, fn provider, acc ->
      if provider.valid?(url), do: {:halt, provider.fetch(url)}, else: {:cont, acc}
    end)
    |> case do
      {:ok, map} ->
        {
          :ok,
          provider_to_module(map.provider, :html, [map])
          |> case do
            nil ->
              map

            html ->
              map
              |> Map.put(:html, html)
          end
          |> Map.put(:scripts, provider_to_module(map.provider, :scripts, [map]))
        }

      {:error, msg} ->
        {:error, msg}

      _ ->
        {:error, "unable to handle this url"}
    end
  end

  defp provider_to_module(provider, fun, vals),
    do: apply(String.to_existing_atom("Elixir.Sammans.Embedder.#{provider}"), fun, vals)
end

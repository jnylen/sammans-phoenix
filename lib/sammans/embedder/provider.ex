defmodule Sammans.Embedder.Provider do
  @callback valid?(String.t()) :: true | false
  @callback fetch(String.t()) :: {:ok, Map.t()} | {:error, String.t()}
  @callback html(String.t()) :: {:ok, String.t()} | nil
  @callback type() :: String.t()
end

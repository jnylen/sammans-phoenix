defmodule Sammans.Repo do
  use Ecto.Repo,
    otp_app: :sammans,
    adapter: Ecto.Adapters.Postgres
end

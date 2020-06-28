defmodule Sammans.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Sammans.Repo,
      # Start the Telemetry supervisor
      SammansWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Sammans.PubSub},
      # Start the Endpoint (http/https)
      SammansWeb.Endpoint,
      SammansWeb.Presence
      # Start a worker by calling: Sammans.Worker.start_link(arg)
      # {Sammans.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Sammans.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    SammansWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end

defmodule SammansWeb.Presence do
  use Phoenix.Presence,
    otp_app: :sammans,
    pubsub_server: Sammans.PubSub
end

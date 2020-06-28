import Config

if System.get_env("MIX_ENV") == "prod" do
  secret_key_base =
    System.get_env("SECRET_KEY_BASE") ||
      raise """
      environment variable SECRET_KEY_BASE is missing.
      You can generate one by calling: mix phx.gen.secret
      """

  config :sammans, SammansWeb.Endpoint,
    http: [
      ip: {0, 0, 0, 0},
      port: System.get_env("PORT"),
      compress: true
    ],
    server: true,
    secret_key_base: secret_key_base
end

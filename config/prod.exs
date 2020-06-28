use Mix.Config

# Do not print debug messages in production
config :logger, level: :info

config :sammans, SammansWeb.Endpoint,
  check_origin: [
    "https://www.sammans.app",
    "https://sammans.onrender.com"
  ],
  url: [scheme: "https", host: "sammans.onrender.com", port: 443],
  cache_static_manifest: "priv/static/cache_manifest.json"

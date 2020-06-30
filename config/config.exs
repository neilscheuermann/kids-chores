# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :kids_chores,
  ecto_repos: [KidsChores.Repo]

# Configures the endpoint
config :kids_chores, KidsChoresWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "7y1Syxjqi3h0FmW2t9YY1XTaLyAz5ELVWSjI8xUi5k6uHJtElQFkxd+qJvt1rYpC",
  render_errors: [view: KidsChoresWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: KidsChores.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"

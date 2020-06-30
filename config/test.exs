use Mix.Config

# Configure your database
config :kids_chores, KidsChores.Repo,
  username: "postgres",
  password: "postgres",
  database: "kids_chores_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :kids_chores, KidsChoresWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

defmodule KidsChores.Repo do
  use Ecto.Repo,
    otp_app: :kids_chores,
    adapter: Ecto.Adapters.Postgres
end

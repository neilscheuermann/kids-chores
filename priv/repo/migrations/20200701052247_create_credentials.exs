defmodule KidsChores.Repo.Migrations.CreateCredentials do
  use Ecto.Migration

  def change do
    create table(:credentials) do
      add(:email, :string, null: false)
      add(:password_hash, :string, null: false)

      timestamps()
    end

    create(unique_index(:credentials, [:email]))
  end
end

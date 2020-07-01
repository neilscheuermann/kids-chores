defmodule KidsChores.Repo.Migrations.CreateAccountOwners do
  use Ecto.Migration

  def change do
    create table(:account_owners) do
      add(:username, :string, null: false)

      timestamps()
    end
  end
end

defmodule KidsChores.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add(:name, :string, null: false)
      add(:password, :string)

      timestamps()
    end
  end
end

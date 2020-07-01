defmodule KidsChores.Repo.Migrations.CreateChores do
  use Ecto.Migration

  def change do
    create table(:chores) do
      add(:name, :string, null: false)
      add(:goal_days, :integer)
      add(:progress_days, :integer)

      timestamps()
    end
  end
end

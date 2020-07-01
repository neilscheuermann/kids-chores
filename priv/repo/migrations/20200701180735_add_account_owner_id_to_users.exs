defmodule KidsChores.Repo.Migrations.AddAccountOwnerIdToUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add(:account_owner_id, references(:account_owners))
    end
  end
end

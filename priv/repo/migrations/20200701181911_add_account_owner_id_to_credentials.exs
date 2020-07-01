defmodule KidsChores.Repo.Migrations.AddAccountOwnerIdToCredentials do
  use Ecto.Migration

  def change do
    alter table(:credentials) do
      add(:account_owner_id, references(:account_owners, on_delete: :delete_all, null: false))
    end

    create(index(:credentials, [:account_owner_id]))
  end
end

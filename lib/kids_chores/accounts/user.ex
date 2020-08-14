defmodule KidsChores.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias KidsChores.Accounts.AccountOwner

  schema "users" do
    field :name, :string
    field :password, :string
    field :token, :string, virtual: true

    belongs_to :account_owner, AccountOwner

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :password, :account_owner_id])
    |> validate_required([:name])
  end
end

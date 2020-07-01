defmodule KidsChores.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias KidsChores.Accounts.AccountOwner

  schema "users" do
    field :name, :string
    field :password, :string
    belongs_to :account_owner, AccountOwner

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :password])
    |> validate_required([:name, :password])
  end
end

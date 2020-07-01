defmodule KidsChores.Accounts.AccountOwner do
  use Ecto.Schema
  import Ecto.Changeset
  alias KidsChores.Accounts.User

  schema "acount_owners" do
    field :username, :string
    has_many :users, User

    timestamps()
  end

  @doc false
  def changeset(account_owner, attrs) do
    account_owner
    |> cast(attrs, [:username])
    |> validate_required([:username])
  end
end

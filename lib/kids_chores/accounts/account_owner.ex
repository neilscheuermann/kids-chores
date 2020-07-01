defmodule KidsChores.Accounts.AccountOwner do
  use Ecto.Schema
  import Ecto.Changeset

  alias KidsChores.Accounts.{
    Credential,
    User
  }

  schema "account_owners" do
    field :username, :string
    has_many :users, User
    has_one :credential, Credential

    timestamps()
  end

  @doc false
  def changeset(account_owner, attrs) do
    account_owner
    |> cast(attrs, [:username])
    |> validate_required([:username])
  end

  def registration_changeset(account_owner, params) do
    account_owner
    |> changeset(params)
    |> cast_assoc(:credential, with: &Credential.changeset/2, required: true)
  end
end

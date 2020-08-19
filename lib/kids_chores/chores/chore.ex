defmodule KidsChores.Chores.Chore do
  use Ecto.Schema
  import Ecto.Changeset

  alias KidsChores.Accounts.User

  schema "chores" do
    field :goal_days, :integer
    field :name, :string
    field :progress_days, :integer

    belongs_to :user, User

    timestamps()
  end

  @doc false
  def changeset(chore, attrs) do
    chore
    |> cast(attrs, [:name, :goal_days, :progress_days])
    |> validate_required([:name])
  end
end

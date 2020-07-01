defmodule KidsChoresWeb.Schema.ChoreTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: KidChores.Repo

  alias KidsChoresWeb.Resolvers

  @desc "One chore"
  object :chore do
    field :id, :id
    field :name, :string
    field :goal_days, :integer
    field :progress_days, :integer
  end

  object :chore_queries do
    @desc "Get all chores"
    field :list_chores, list_of(:chore) do
      resolve(&Resolvers.ChoreResolver.list_chores/3)
    end
  end

  object :chore_mutations do
    @desc "Create a chore"
    field :create_chore, :chore do
      arg :name, non_null(:string)
      arg :goal_days, non_null(:integer)

      resolve(&Resolvers.ChoreResolver.create_chore/3)
    end
  end

  object :chore_subscriptions do
    field :chore_created, :chore do
      # Hook this up later if needed
    end
  end
end

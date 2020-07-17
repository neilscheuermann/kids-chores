defmodule KidsChoresWeb.Schema.AccountTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: KidChores.Repo

  alias KidsChoresWeb.Resolvers

  @desc "One account_owner"
  object :account_owner do
    field :user_name, :string
  end

  object :account_queries do
  end

  object :account_mutations do
    @desc "Create a chore"
    field :authenticate, :account_owner do
      arg(:email, non_null(:string))
      arg(:password, non_null(:string))

      resolve(&Resolvers.AccountResolver.authenticate/3)
    end
  end

  object :account_subscriptions do
  end
end

defmodule KidsChoresWeb.Schema.AccountTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: KidChores.Repo

  alias KidsChoresWeb.Resolvers

  @desc "One account_owner"
  object :account_owner do
    field :credential, :credential
    field :id, :id
    field :token, :string
    field :username, :string
  end

  object :credential do
    field :email, :string
    field :password_hash, :string
  end

  object :user do
    field :id, :id
    field :name, :string
  end

  object :account_queries do
    @desc "Get current account owner"
    field :current_account_owner, :account_owner do
      resolve(&Resolvers.AccountResolver.current_account_owner/3)
    end

    @desc "Get a list of users belonging to the current_account_owner"
    field :users, list_of(:user) do
      resolve(&Resolvers.AccountResolver.users/3)
    end
  end

  object :account_mutations do
    @desc "Authenticate an account owner"
    field :authenticate, :account_owner do
      arg(:email, non_null(:string))
      arg(:password, non_null(:string))

      resolve(&Resolvers.AccountResolver.authenticate/3)
    end

    @desc "Authenticate a user"
    field :authenticate_user, :user do
      arg(:user_id, non_null(:id))
      arg(:password, non_null(:string))

      resolve(&Resolvers.AccountResolver.authenticate_user/3)
    end

    @desc "Create a user"
    field :create_user, :user do
      arg(:name, non_null(:string))
      arg(:password, non_null(:string))

      resolve(&Resolvers.AccountResolver.create_user/3)
    end
  end

  object :account_subscriptions do
    field :user_created, :user do
      config(fn _args, _context ->
        {:ok, topic: "users"}
      end)

      trigger(:create_user,
        topic: fn _user ->
          "users"
        end
      )
    end
  end
end

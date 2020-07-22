defmodule KidsChoresWeb.Resolvers.AccountResolver do
  alias KidsChores.{
    Accounts,
    Guardian,
    Accounts.AccountOwner
  }

  def authenticate(_parent, %{email: email, password: password}, _resolutions) do
    email
    |> Accounts.authenticate(password)
    |> case do
      {:ok, %AccountOwner{} = account_owner} ->
        {:ok, account_owner_with_token(account_owner)}

      {:error, error} ->
        {:error, error}
    end
  end

  def current_account_owner(_parent, _args, %{
        context: %{current_account_owner: current_account_owner}
      }) do
    {:ok, current_account_owner}
  end

  def current_account_owner(_parent, _args, %{context: context}) do
    {:error, "Unauthenticated"}
  end

  def users(_parent, _args, %{
        context: %{current_account_owner: current_account_owner}
      }) do
    current_account_owner.id
    |> Accounts.users()
    |> case do
      [] ->
        {:ok, []}

      users ->
        {:ok, users}

      {:error, error} ->
        {:error, error}
    end
  end

  ##
  # Private Methods
  #

  defp account_owner_with_token(account_owner) do
    {:ok, token, _claims} = Guardian.encode_and_sign(account_owner)
    Map.put(account_owner, :token, token)
  end
end

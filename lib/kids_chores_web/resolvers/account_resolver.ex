defmodule KidsChoresWeb.Resolvers.AccountResolver do
  alias KidsChores.{
    Accounts,
    Guardian,
    Accounts.AccountOwner,
    Accounts.User
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

  def authenticate_user(_parent, %{user_id: user_id, password: given_password}, _resolutions) do
    user_id
    |> Accounts.authenticate_user(given_password)
    |> case do
      {:ok, %User{} = user} ->
        # TODO>>>: May need to add a token for users to preserve page refreshes?
        # {:ok, account_owner_with_token(account_owner)}
        {:ok, user_with_token(user)}

      {:error, error} ->
        {:error, error}
    end
  end

  def create_user(_parent, args, %{
        context: %{current_account_owner: current_account_owner}
      }) do
    args
    |> Map.put(:account_owner_id, current_account_owner.id)
    |> Accounts.create_user()
    |> case do
      {:ok, user} ->
        {:ok, user}

      {:error, changeset} ->
        {:error, extract_error_msg(changeset)}
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

  defp user_with_token(user) do
    {:ok, token, _claims} = Guardian.encode_and_sign(user)
    Map.put(user, :token, token)
  end

  defp extract_error_msg(changeset) do
    changeset.errors
    |> Enum.map(fn {field, {error, _details}} ->
      [
        field: field,
        message: String.capitalize(error)
      ]
    end)
  end
end

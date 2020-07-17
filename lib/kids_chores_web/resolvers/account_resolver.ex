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

  defp account_owner_with_token(account_owner) do
    {:ok, token, _claims} = Guardian.encode_and_sign(account_owner)
    Map.put(account_owner, :token, token)
  end
end

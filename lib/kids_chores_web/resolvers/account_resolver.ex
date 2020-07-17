defmodule KidsChoresWeb.Resolvers.AccountResolver do
  alias KidsChores.Accounts
  alias KidsChores.Accounts.AccountOwner

  def authenticate(_parent, %{email: email, password: password}, _resolutions) do
    email
    |> Accounts.authenticate(password)
    |> case do
      {:ok, %AccountOwner{username: username}} ->
        {:ok, username}

      {:error, error} ->
        {:error, error}
    end
  end
end

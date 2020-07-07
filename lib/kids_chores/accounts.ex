defmodule KidsChores.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias KidsChores.Repo

  alias KidsChores.Accounts.User

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a user.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{source: %User{}}

  """
  def change_user(%User{} = user) do
    User.changeset(user, %{})
  end

  alias KidsChores.Accounts.Credential

  @doc """
  Returns the list of credentials.

  ## Examples

      iex> list_credentials()
      [%Credential{}, ...]

  """
  def list_credentials do
    Repo.all(Credential)
  end

  @doc """
  Gets a single credential.

  Raises `Ecto.NoResultsError` if the Credential does not exist.

  ## Examples

      iex> get_credential!(123)
      %Credential{}

      iex> get_credential!(456)
      ** (Ecto.NoResultsError)

  """
  def get_credential!(id), do: Repo.get!(Credential, id)

  @doc """
  Creates a credential.

  ## Examples

      iex> create_credential(%{field: value})
      {:ok, %Credential{}}

      iex> create_credential(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_credential(attrs \\ %{}) do
    %Credential{}
    |> Credential.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a credential.

  ## Examples

      iex> update_credential(credential, %{field: new_value})
      {:ok, %Credential{}}

      iex> update_credential(credential, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_credential(%Credential{} = credential, attrs) do
    credential
    |> Credential.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a credential.

  ## Examples

      iex> delete_credential(credential)
      {:ok, %Credential{}}

      iex> delete_credential(credential)
      {:error, %Ecto.Changeset{}}

  """
  def delete_credential(%Credential{} = credential) do
    Repo.delete(credential)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking credential changes.

  ## Examples

      iex> change_credential(credential)
      %Ecto.Changeset{source: %Credential{}}

  """
  def change_credential(%Credential{} = credential) do
    Credential.changeset(credential, %{})
  end

  alias KidsChores.Accounts.AccountOwner

  @doc """
  Returns the list of account_owners.

  ## Examples

      iex> list_account_owners()
      [%AccountOwner{}, ...]

  """
  def list_account_owners do
    Repo.all(AccountOwner)
  end

  @doc """
  Gets a single account_owner.

  Raises `Ecto.NoResultsError` if the Account owner does not exist.

  ## Examples

      iex> get_account_owner!(123)
      %AccountOwner{}

      iex> get_account_owner!(456)
      ** (Ecto.NoResultsError)

  """
  def get_account_owner!(id), do: Repo.get!(AccountOwner, id)

  def get_account_owner_by_email(email) do
    from(ao in AccountOwner, join: c in assoc(ao, :credential), where: c.email == ^email)
    |> Repo.one()
    |> Repo.preload(:credential)
  end

  def find_account_owner(id) do
    Repo.get(AccountOwner, id)
  end

  def authenticate_by_email_and_pass(email, given_pass) do
    account_owner = get_account_owner_by_email(email)

    cond do
      account_owner && Comeonin.Pbkdf2.checkpw(given_pass, account_owner.credential.password_hash) ->
        {:ok, account_owner}

      account_owner ->
        {:error, :unauthorized}

      true ->
        Comeonin.Bcrypt.dummy_checkpw()
        {:error, :not_found}
    end
  end

  @doc """
  Creates an account_owner without login credentials.

  See `register_account_owner` to create an account_owner 
  and add associated email and password credentials.

  ## Examples

      iex> create_account_owner(%{field: value})
      {:ok, %AccountOwner{}}

      iex> create_account_owner(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_account_owner(attrs \\ %{}) do
    %AccountOwner{}
    |> AccountOwner.registration_changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Creates an account_owner AND adds associated email and 
  password credentials.

  ## Examples

      iex> register_account_owner(%{field: value})
      {:ok, %AccountOwner{}}

      iex> register_account_owner(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def register_account_owner(attrs \\ %{}) do
    %AccountOwner{}
    |> AccountOwner.registration_changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a account_owner.

  ## Examples

      iex> update_account_owner(account_owner, %{field: new_value})
      {:ok, %AccountOwner{}}

      iex> update_account_owner(account_owner, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_account_owner(%AccountOwner{} = account_owner, attrs) do
    account_owner
    |> AccountOwner.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a account_owner.

  ## Examples

      iex> delete_account_owner(account_owner)
      {:ok, %AccountOwner{}}

      iex> delete_account_owner(account_owner)
      {:error, %Ecto.Changeset{}}

  """
  def delete_account_owner(%AccountOwner{} = account_owner) do
    Repo.delete(account_owner)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking account_owner changes.

  ## Examples

      iex> change_account_owner(account_owner)
      %Ecto.Changeset{source: %AccountOwner{}}

  """
  def change_account_owner(%AccountOwner{} = account_owner) do
    AccountOwner.changeset(account_owner, %{})
  end
end

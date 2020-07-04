defmodule KidsChoresWeb.Context do
  @behaviour Plug

  import Plug.Conn

  alias KidsChores.{Guardian, AccountOwner}

  def init(opts), do: opts

  def call(conn, _) do
    context = build_context(conn)
    Absinthe.Plug.put_options(conn, context: context)
  end

  @doc """
  Return the current user context based on the authorization header
  """
  def build_context(conn) do
    with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
         {:ok, claim} <- Guardian.decode_and_verify(token),
         account_owner when not is_nil(account_owner) <- AccountOwner.find(claim["sub"]) do
      %{current_account_owner: account_owner}
    else
      _ -> %{}
    end
  end
end

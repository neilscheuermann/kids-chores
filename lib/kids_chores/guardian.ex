defmodule KidsChores.Guardian do
  use Guardian, otp_app: :kids_chores

  alias KidsChores.AccountOwner

  def subject_for_token(resource, _claims) do
    {:ok, to_string(resource.id)}
  end

  def resource_from_claims(claims) do
    {:ok, AccountOwner.find(claims["sub"])}
  end
end

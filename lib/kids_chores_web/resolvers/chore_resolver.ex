defmodule KidsChoresWeb.Resolvers.ChoreResolver do
  alias KidsChores.Chores

  def list_chores(_parent, _args, _resolutions) do
    {:ok, Chores.list_chores()}
  end

  def create_chore(_parent, args, _resolutions) do
    args
    |> Chores.create_chore()
    |> case do
      {:ok, chore} ->
        {:ok, chore}

      {:error, changeset} ->
        {:error, extract_error_msg(changeset)}
    end
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

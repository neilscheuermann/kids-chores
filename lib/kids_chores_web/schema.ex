defmodule KidsChoresWeb.Schema do
  use Absinthe.Schema

  import_types(Absinthe.Type.Custom)
  import_types(KidsChoresWeb.Schema.ChoreTypes)

  query do
    import_fields(:chore_queries)
  end

  mutation do
    import_fields(:chore_mutations)
  end

  subscription do
    import_field(:chore_subscriptions)
  end
end

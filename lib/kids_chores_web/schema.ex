defmodule KidsChoresWeb.Schema do
  use Absinthe.Schema

  import_types(Absinthe.Type.Custom)
  import_types(KidsChoresWeb.Schema.ChoreTypes)
  import_types(KidsChoresWeb.Schema.AccountTypes)

  query do
    import_fields(:chore_queries)
    import_fields(:account_queries)
  end

  mutation do
    import_fields(:chore_mutations)
    import_fields(:account_mutations)
  end

  subscription do
    import_fields(:chore_subscriptions)
  end
end

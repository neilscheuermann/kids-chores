defmodule KidsChoresWeb.Router do
  use KidsChoresWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/" do
    pipe_through :api

    forward "/graphiql", Absinthe.Plug.GraphiQL, schema: KidsChoresWeb.Schema

    forward "/", Absinthe.Plug, schema: KidsChoresWeb.Schema
  end
end

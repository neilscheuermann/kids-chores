defmodule KidsChoresWeb.PageController do
  use KidsChoresWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end

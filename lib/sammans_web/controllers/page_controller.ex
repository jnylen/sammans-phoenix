defmodule SammansWeb.PageController do
  use SammansWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end

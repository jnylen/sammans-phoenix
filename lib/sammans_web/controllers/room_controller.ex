defmodule SammansWeb.RoomController do
  use SammansWeb, :controller

  def create(conn, _params) do
    room_name = Nanoid.generate()

    conn |> redirect(to: "/rooms/#{room_name}") |> halt()
  end

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def show(conn, _params) do
    render(conn, "show.html")
  end
end

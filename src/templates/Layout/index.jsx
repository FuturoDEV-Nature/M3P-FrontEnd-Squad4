import { LogOut } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { Leaf } from "lucide-react";

export function PrivateRouteLayout() {
  const navigate = useNavigate();
  const { usuario, Logout } = useAuth();

  function handleLogout() {
    Logout();
    navigate("/");
  }

  return (
    <div className="drawer drawer-open">
      <input id="my-drawer-2" className="drawer-toggle" />
      <div className="drawer-content justify-center">
        <Outlet />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex flex-col justify-between min-h-screen w-80 bg-lime-300 p-4">
          <div className="flex  justify-center">
            <Leaf size={64} color="lime" />
          </div>
          <h2 className=" text-2xl text-lime font-bold text-center">
            {" "}
            Cite Natureza
          </h2>
          <h3 className="text-bold font-medium">Menu</h3>
          <ul className="menu bg-lime-300 text-base-content flex-grow">
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/cadastrar-local">Cadastrar local</Link>
            </li>
            <li>
              <Link to="/gerenciar-locais">Gerenciar locais</Link>
            </li>
          </ul>
          <div className="bg-lime-300">
            {usuario && <p>{usuario.email}</p>}

            <button onClick={handleLogout}>
              <LogOut />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

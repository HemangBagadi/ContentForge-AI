import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

function Navbar() {

  const navigate = useNavigate();

  const { logout } =
    useContext(AuthContext);

  const handleLogout = () => {

    logout();

    navigate("/");

  };

  return (

    <nav
      className="
        bg-slate-900
        text-white
        px-6
        py-4
        flex
        justify-between
        items-center
        shadow-md
      "
    >

      <h1
        className="
          text-2xl
          font-bold
        "
      >
        ContentForge AI
      </h1>

      <div
        className="
          flex
          gap-4
          items-center
        "
      >

        <Link
          to="/dashboard"
          className="
            hover:text-blue-400
          "
        >
          Dashboard
        </Link>

        <Link
          to="/history"
          className="
            hover:text-blue-400
          "
        >
          History
        </Link>

        <button
          onClick={handleLogout}
          className="
            bg-red-500
            px-3
            py-1
            rounded
            hover:bg-red-600
          "
        >
          Logout
        </button>

      </div>

    </nav>

  );

}

export default Navbar;
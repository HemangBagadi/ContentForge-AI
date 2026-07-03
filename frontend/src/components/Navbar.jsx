import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

function Navbar() {

  const navigate = useNavigate();

  const location = useLocation();

  const { logout } =
    useContext(AuthContext);

  const handleLogout = () => {

    logout();

    navigate("/");

  };

  return (

    <nav
  className="
    sticky
    top-0
    z-50
    bg-white/80
    backdrop-blur-xl
    border-b
    border-slate-200
    px-8
    py-4
    flex
    justify-between
    items-center
  "
>

  {/* Logo */}

  <div
    className="
      flex
      items-center
      gap-3
    "
  >

    <div
      className="
        w-12
        h-12
        rounded-2xl
        bg-gradient-to-r
        from-blue-600
        to-purple-600
        flex
        items-center
        justify-center
        text-white
        font-bold
        text-xl
      "
    >
      C
    </div>

    <div>

      <h1
        className="
          text-xl
          font-bold
          text-slate-800
        "
      >
        ContentForge AI
      </h1>

      <p
        className="
          text-xs
          text-gray-500
        "
      >
        AI Content Platform
      </p>

    </div>

  </div>

  {/* Navigation */}

  <div
    className="
      flex
      items-center
      gap-8
    "
  >

    <Link
      to="/dashboard"
      className={`
        font-medium
        transition
        hover:text-blue-600
        ${
          location.pathname === "/dashboard"
            ? "text-blue-600 border-b-2 border-blue-600 pb-1"
            : "text-gray-700"
        }
      `}
    >
      Dashboard
    </Link>

    <Link
      to="/history"
      className={`
        font-medium
        transition
        hover:text-blue-600
        ${
          location.pathname === "/history"
            ? "text-blue-600 border-b-2 border-blue-600 pb-1"
            : "text-gray-700"
        }
      `}
    >
      History
    </Link>

    <Link
      to="/profile"
      className={`
        font-medium
        transition
        hover:text-blue-600
        ${
          location.pathname === "/profile"
            ? "text-blue-600 border-b-2 border-blue-600 pb-1"
            : "text-gray-700"
        }
      `}
    >
      Profile
    </Link>

    <button
      onClick={handleLogout}
      className="
        bg-gradient-to-r
        from-red-500
        to-rose-600
        text-white
        px-5
        py-2
        rounded-xl
        shadow-lg
        hover:scale-105
        transition-all
      "
    >
      Logout
    </button>

  </div>

</nav>

  );

}

export default Navbar;
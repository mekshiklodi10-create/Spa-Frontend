// src/components/Navbar.js
import { HashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
      <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl md:px-8">
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-green-700 cursor-pointer hover:text-green-800"
        >
          Spa Tirana
        </div>

        {/* MENU */}
        <div className="items-center hidden gap-6 md:flex">
          <HashLink
            smooth
            to="/#home"
            className="font-medium text-gray-700 hover:text-green-600"
          >
            Kreu
          </HashLink>
          <HashLink
            smooth
            to="/#services"
            className="font-medium text-gray-700 hover:text-green-600"
          >
            Shërbimet
          </HashLink>
          <HashLink
            smooth
            to="/#packages"
            className="font-medium text-gray-700 hover:text-green-600"
          >
            Paketat
          </HashLink>
          <HashLink
            smooth
            to="/contact"
            className="font-medium text-gray-700 hover:text-green-600"
          >
            Kontakt
          </HashLink>
        </div>

        {/* PROFILI / LOGIN */}
        <div className="flex items-center gap-3">
          {!user ? (
            <button
              onClick={() => navigate("/login")} // <- KY ËSHTË NDRYSHIMI KRYESOR
              className="flex items-center gap-2 px-4 py-1 font-semibold text-green-700 transition border border-green-600 rounded-lg hover:bg-green-100"
            >
              <FaUserCircle className="text-xl" />
              Hyr
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 px-4 py-1 font-semibold text-green-700 transition border border-green-600 rounded-lg hover:bg-green-100"
              >
                <FaUserCircle className="text-xl" />
                Profili
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-1 font-semibold text-red-600 transition border border-red-500 rounded-lg hover:bg-red-50"
              >
                Dil
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
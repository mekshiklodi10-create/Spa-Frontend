import { HashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
    <nav className="sticky top-0 z-50 flex items-center justify-between p-4 bg-white shadow-md">
      <div
        className="text-2xl font-bold text-green-700 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Spa Tirana
      </div>

      <div className="flex items-center gap-6 font-medium text-black-700">
        <HashLink smooth to="/#home" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-green-600"> Home </HashLink>
        <HashLink smooth to="/#services" className="hover:text-green-600">Shërbimet</HashLink>
        <HashLink smooth to="/#packages" className="hover:text-green-600">Paketat</HashLink>
        <HashLink smooth to="/contact" className="hover:text-green-600">Kontakt</HashLink>

        {user ? (
          <>

            <button
              onClick={handleLogout}
              className="px-3 py-1 border rounded border-black-600 text-black-600 hover:bg-red-100"
            >
              Dil
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-3 py-1 font-semibold text-green-600 border border-green-600 rounded hover:bg-green-100"
          >
            Hyr
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
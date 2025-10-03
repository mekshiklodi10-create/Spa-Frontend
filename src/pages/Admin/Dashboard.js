import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ServicesTable from "./ServicesTable";
import PackagesTable from "./PackagesTable";
import Reservations from "./Reservations";

function Dashboard() {
  const [page, setPage] = useState("services"); 
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.role !== "admin") navigate("/"); 
    } catch {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col w-64 h-screen text-white bg-gray-800">
        <h2 className="p-4 text-2xl font-bold border-b border-gray-700">SPA Admin</h2>
        <button
          className={`p-4 text-left hover:bg-gray-700 ${page === "services" ? "bg-gray-700" : ""}`}
          onClick={() => setPage("services")}
        >
          Shërbimet
        </button>
        <button
         className={`p-4 text-left hover:bg-gray-700 ${page === "packagesdashboard" ? "bg-gray-700" : ""}`}
        onClick={() => setPage("packagesdashboard")}
        >
         Paketat
        </button>
        <button
          className={`p-4 text-left hover:bg-gray-700 ${page === "reservations" ? "bg-gray-700" : ""}`}
          onClick={() => setPage("reservations")}
        >
          Rezervimet
        </button>
        <button
          className="p-4 mt-auto text-left hover:bg-gray-700"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Dil
        </button>
      </div>

      
      <div className="flex-1 p-6 bg-gray-50">
        {page === "services" && <ServicesTable />}
        {page === "packagesdashboard" && <PackagesTable />}
        {page === "reservations" && <Reservations />}
      </div>
    </div>
  );
}

export default Dashboard;
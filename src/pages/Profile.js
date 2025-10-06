import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Vetëm nëse nuk është admin, merr rezervimet
      if (parsedUser.role !== "admin") {
        fetchReservations(parsedUser.email);
      }
    }
  }, []);

  const fetchReservations = async (email) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/reservations/user/${email}`);
      setReservations(res.data);
    } catch (err) {
      console.error("Gabim në marrjen e rezervimeve:", err);
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/reservations/cancel/${id}`);
      fetchReservations(user.email); // Rifresko pas anulimit
    } catch (err) {
      console.error("Gabim në anulimin e rezervimit:", err);
    }
  };

  if (!user) return <p>Duke u ngarkuar...</p>;

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Profili i {user.name}</h1>

      {user.role === "admin" ? (
        <div>
          <p className="mb-4 text-gray-700">Jeni loguar si administrator.</p>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="px-4 py-2 font-semibold text-white bg-green-600 rounded hover:bg-green-700"
          >
            Shko në Dashboard
          </button>
        </div>
      ) : (
        <div>
          <h2 className="mb-4 text-xl font-semibold">Rezervimet e mia</h2>
          {reservations.length === 0 ? (
            <p className="text-gray-600">Nuk ka rezervime të regjistruara.</p>
          ) : (
            <ul className="space-y-4">
              {reservations.map((r) => (
                <li
                  key={r.id}
                  className={`p-4 rounded shadow ${
                    r.status === "canceled" ? "bg-red-100 text-red-600" : "bg-white"
                  }`}
                >
                  <p><strong>Shërbimi/Paketa:</strong> {r.serviceTitle || r.packageTitle || "Pa emër"}</p>
                  <p><strong>Data:</strong> {r.date}</p>
                  <p><strong>Ora:</strong> {r.time}</p>
                  <p><strong>Statusi:</strong> {r.status}</p>

                  {r.status !== "canceled" && (
                    <button
                      onClick={() => handleCancel(r.id)}
                      className="px-3 py-1 mt-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Anulo
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
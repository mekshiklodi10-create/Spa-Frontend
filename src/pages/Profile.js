import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setForm(parsedUser);

      if (parsedUser.role !== "admin") {
        fetchReservations(parsedUser.email);
      }

      fetchUserData(parsedUser.email);
    }
  }, []);

  const fetchReservations = async (email) => {
    try {
      const res = await axios.get(`/api/reservations/user/${email}`);
      setReservations(res.data);
    } catch (err) {
      console.error("Gabim në marrjen e rezervimeve:", err);
    }
  };

  const fetchUserData = async (email) => {
    try {
      const res = await axios.get(`/api/users/${email}`);
      setUser(res.data);
      setForm(res.data);
    } catch (err) {
      console.error("Gabim në marrjen e të dhënave të përdoruesit:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
  try {
    const encodedEmail = encodeURIComponent(user.email); // <--- KODIMI
    await axios.put(
      `/api/users/${encodedEmail}`,
      form
    );

    setUser(form);
    localStorage.setItem("user", JSON.stringify(form));
    setEditing(false);
    alert("Profili u përditësua me sukses!");
  } catch (err) {
    console.error("Gabim gjatë përditësimit:", err);

    if (err.response) {
      console.log("Status kodi:", err.response.status);
      console.log("Përgjigje nga serveri:", err.response.data);
    }

    alert("Ndodhi një gabim gjatë ruajtjes së ndryshimeve.");
  }
};

  const handleCancel = async (id) => {
    try {
      await axios.put(`/api/reservations/cancel/${id}`);
      fetchReservations(user.email);
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
        <>
          <div className="p-4 mb-6 bg-white rounded shadow">
            <h2 className="mb-4 text-xl font-semibold">Të dhënat e mia</h2>

            {editing ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={form.name || ""}
                  onChange={handleChange}
                  placeholder="Emri"
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="text"
                  name="phone"
                  value={form.phone || ""}
                  onChange={handleChange}
                  placeholder="Telefoni"
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="text"
                  name="address"
                  value={form.address || ""}
                  onChange={handleChange}
                  placeholder="Adresa"
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="text"
                  name="photoUrl"
                  value={form.photoUrl || ""}
                  onChange={handleChange}
                  placeholder="Link i fotos"
                  className="w-full p-2 mb-2 border rounded"
                />

                <button
                  onClick={handleSave}
                  className="px-4 py-2 mr-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Ruaj ndryshimet
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
                >
                  Anulo
                </button>
              </>
            ) : (
              <>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Telefon:</strong> {user.phone || "—"}</p>
                <p><strong>Adresë:</strong> {user.address || "—"}</p>
                {user.photoUrl && (
                  <img src={user.photoUrl} alt="Foto profili" className="w-32 h-32 mt-4 rounded-full" />
                )}
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Ndrysho profilin
                </button>
              </>
            )}
          </div>

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
        </>
      )}
    </div>
  );
}

export default Profile;
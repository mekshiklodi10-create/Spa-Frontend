import { useState, useEffect } from "react";

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://spa-backend-5xtx.onrender.com/api/reservations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Gabim në marrjen e rezervimeve");
      const data = await res.json();
      setReservations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Duke u ngarkuar rezervimet...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (reservations.length === 0) return <p>Nuk ka rezervime për të shfaqur</p>;

  return (
    <div className="max-w-6xl p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Të gjitha Rezervimet</h1>
      <table className="w-full border border-collapse border-gray-300 table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Emri</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Data</th>
            <th className="p-2 border">Ora</th>
            <th className="p-2 border">Shërbimi / Paketa</th>
            <th className="p-2 border">Statusi</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr
              key={r.id}
              className={`hover:bg-gray-50 ${
                r.status === "canceled" ? "bg-red-100 text-red-700" : ""
              }`}
            >
              <td className="p-2 border">{r.name}</td>
              <td className="p-2 border">{r.email}</td>
              <td className="p-2 border">{r.date}</td>
              <td className="p-2 border">{r.time}</td>
              <td className="p-2 border">{r.serviceTitle || r.packageTitle || "—"}</td>
              <td className="p-2 capitalize border">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reservations;
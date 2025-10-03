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
      const res = await fetch("http://localhost:5000/api/reservations", {
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
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl mb-6 font-bold">Të gjitha Rezervimet</h1>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Emri</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Data</th>
            <th className="border p-2">Ora</th>
            <th className="border p-2">Shërbimi / Paketa</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50">
              <td className="border p-2">{r.name}</td>
              <td className="border p-2">{r.email}</td>
              <td className="border p-2">{r.date}</td>
              <td className="border p-2">{r.time}</td>
              <td className="border p-2">
                {r.serviceTitle || r.packageTitle || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reservations;
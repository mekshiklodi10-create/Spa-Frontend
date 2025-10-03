import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function ReservationForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { service, package: pkg } = location.state || {};

  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);

  if (!service && !pkg) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600 font-semibold">
          Asnjë shërbim ose paketë e zgjedhur
        </p>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!service?.id && !pkg?.id) {
      alert("Duhet të zgjidhet një shërbim ose paketë.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          serviceId: service?.id || null,
          packageId: pkg?.id || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Gabim gjatë rezervimit");

      
      alert(`Rezervimi u krye me sukses! ID: ${data.reservationId}`);

      
      setForm({ name: "", email: "", date: "", time: "" });

    
      navigate("/");
    } catch (err) {
      alert(`Gabim: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const chosenItem = service || pkg;

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Rezervim për:{" "}
          <span className="text-green-600">{chosenItem.title}</span>
        </h2>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
          {chosenItem.image_url && (
            <img
              src={chosenItem.image_url}
              alt={chosenItem.title}
              className="w-full h-48 object-cover mb-4 rounded"
            />
          )}

          {chosenItem.description && (
            <p className="mb-2 text-gray-700">{chosenItem.description}</p>
          )}
          <p className="font-semibold mb-6">{chosenItem.price} €</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Emri juaj"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 transition disabled:opacity-50"
            >
              {loading ? "Duke ruajtur..." : "Konfirmo Rezervimin"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ReservationForm;
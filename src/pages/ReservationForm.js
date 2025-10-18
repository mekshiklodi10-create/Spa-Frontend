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
        <p className="font-semibold text-red-600">Asnjë shërbim ose paketë e zgjedhur</p>
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
      const res = await fetch("https://spa-backend-5xtx.onrender.com/api/reservations", {
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
    <section className="min-h-screen py-12 bg-gray-50">
      <div className="container px-6 mx-auto">
        <h2 className="mb-6 text-2xl font-bold text-center">
          Rezervim për:{" "}
          <span className="text-green-600">{chosenItem.title}</span>
        </h2>

        <div className="max-w-lg p-6 mx-auto bg-white rounded-lg shadow-md">
          {chosenItem.image_url && (
            <img src={chosenItem.image_url} alt={chosenItem.title} className="object-cover w-full h-48 mb-4 rounded"/>
          )}

          {chosenItem.description && (
            <p className="mb-2 text-gray-700">{chosenItem.description}</p>
          )}
          <p className="mb-6 font-semibold">{chosenItem.price} €</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Emri juaj" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" required/>
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" required/>
            <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2 border rounded" required/>
            <input type="time" name="time" value={form.time} onChange={handleChange} className="w-full p-2 border rounded" required/>

            <button type="submit" disabled={loading} className="w-full py-2 font-semibold text-white transition bg-green-500 rounded hover:bg-green-600 disabled:opacity-50">
              {loading ? "Duke ruajtur..." : "Konfirmo Rezervimin"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ReservationForm;
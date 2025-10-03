import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Services() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/services");
        if (!res.ok) throw new Error("Gabim në marrjen e shërbimeve");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleRezervoClick = (service) => {
    navigate("/reservation", { state: { service } });
  };

  if (loading) return <p>Po ngarkohen shërbimet...</p>;
  if (error) return <p className="text-red-600">Gabim: {error}</p>;
  if (services.length === 0) return <p>Nuk ka shërbime për të shfaqur</p>;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-6 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center">Të gjitha Shërbimet</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="overflow-hidden transition bg-white rounded-lg shadow-md hover:shadow-lg"
            >
              {service.image && (
                <img
                  src={`http://localhost:5000${service.image}`}
                  alt={service.title}
                  className="object-cover w-full h-48"
                />
              )}

              <div className="p-6">
                <h4 className="mb-2 text-xl font-semibold">{service.title}</h4>
                <p className="text-gray-600">{service.description}</p>
                <p className="mt-1 font-semibold">{service.price} €</p>
                <button
                  onClick={() => handleRezervoClick(service)}
                  className="px-6 py-2 mt-4 font-semibold text-black transition bg-green-400 rounded-md hover:bg-green-500"
                >
                  Rezervo Tani
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
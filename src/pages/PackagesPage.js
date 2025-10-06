import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PackagesPage() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/packages");
        if (!res.ok) throw new Error("Gabim në marrjen e paketimeve");
        const data = await res.json();
        setPackages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const handleRezervoClick = (pkg) => {
    navigate("/reservation", { state: { package: pkg } });
  };

  if (loading) return <p>Duke u ngarkuar paketat...</p>;
  if (error) return <p className="text-red-600">Gabim: {error}</p>;
  if (packages.length === 0) return <p>Nuk ka paketa për të shfaqur</p>;

  return (
    <section className="min-h-screen py-16 bg-gray-50">
      <div className="container px-6 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center">Të gjitha Paketat</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="overflow-hidden transition bg-white rounded-lg shadow-md hover:shadow-lg"
            >
              {pkg.image && (
                <img
                  src={`http://localhost:5000${pkg.image}`}
                  alt={pkg.title}
                  className="object-cover w-full h-68"
                />
              )}
              <div className="p-6">
                <h4 className="mb-2 text-xl font-semibold">{pkg.title}</h4>
                {pkg.description && (
                  <ul className="mb-2 text-gray-600 list-disc list-inside">
                    {pkg.description.split("|").map((item, index) => (
                      <li key={index}>{item.trim()}</li>
                    ))}
                  </ul>
                )}
                <p className="mt-1 font-semibold">{pkg.price} €</p>
                <button
                  onClick={() => handleRezervoClick(pkg)}
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

export default PackagesPage;
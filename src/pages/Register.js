
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      alert("Regjistrimi u krye me sukses!");
      navigate("/login", { state: location.state }); 
    } catch (err) {
      setError("Gabim në lidhje me serverin!");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Krijo Llogari</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            placeholder="Emri juaj"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="email"
            placeholder="Email-i juaj"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="password"
            placeholder="Fjalëkalimi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            Regjistrohu
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Ke tashmë një llogari?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Hyr këtu
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const fromReservation = location.state?.fromReservation;
  const serviceId = location.state?.serviceId;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));


      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (fromReservation) {
        navigate(serviceId ? `/reservation?serviceId=${serviceId}` : "/reservation");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Gabim në lidhje me serverin!");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Hyr në Llogari</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="email"
            placeholder="Email-i"
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
            Hyr
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Nuk ke llogari?{" "}
          <Link to="/register" state={location.state} className="text-green-500 hover:underline">
            Regjistrohu
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;

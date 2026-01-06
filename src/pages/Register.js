import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://spa-backend-2tfg.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "user", phone: "", address: "", photoUrl: "" }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message); return; }
      alert("Regjistrimi u krye me sukses!");
      navigate("/login");
    } catch (err) {
      setError("Gabim në lidhje me serverin!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Emri" required />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Regjistrohu</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default Register;

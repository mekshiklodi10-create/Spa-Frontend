import { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({});
  const [reservations, setReservations] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setForm(parsed);
      fetchUserData(parsed.email);
      if (parsed.role !== "admin") fetchReservations(parsed.email);
    }
  }, []);

  const fetchUserData = async (email) => {
    try {
      const res = await axios.get(`https://spa-backend-2tfg.onrender.com/api/users/${encodeURIComponent(email)}`);
      const u = res.data;
      setUser(u);
      setForm(u);
    } catch (err) { console.error(err); }
  };

  const fetchReservations = async (email) => {
    try {
      const res = await axios.get(`https://spa-backend-2tfg.onrender.com/api/reservations/user/${email}`);
      setReservations(res.data);
    } catch (err) { console.error(err); }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      const payload = { ...form, photo_url: form.photoUrl };
      await axios.put(`https://spa-backend-2tfg.onrender.com/api/users/${encodeURIComponent(user.email)}`, payload);
      setUser(form);
      localStorage.setItem("user", JSON.stringify(form));
      setEditing(false);
      alert("Profili u përditësua me sukses!");
    } catch (err) { console.error(err); alert("Gabim gjatë ruajtjes!"); }
  };

  if (!user) return <p>Duke u ngarkuar...</p>;

  return (
    <div>
      <h1>Profili i {user.name}</h1>
      {editing ? (
        <>
          <input name="name" value={form.name} onChange={handleChange} />
          <input name="phone" value={form.phone} onChange={handleChange} />
          <input name="address" value={form.address} onChange={handleChange} />
          <input name="photoUrl" value={form.photoUrl} onChange={handleChange} />
          <button onClick={handleSave}>Ruaj</button>
          <button onClick={() => setEditing(false)}>Anulo</button>
        </>
      ) : (
        <>
          <p>Email: {user.email}</p>
          <p>Telefon: {user.phone || "—"}</p>
          <p>Adresë: {user.address || "—"}</p>
          {user.photoUrl && <img src={user.photoUrl} alt="Foto" />}
          <button onClick={() => setEditing(true)}>Ndrysho profilin</button>
        </>
      )}
    </div>
  );
}

export default Profile;

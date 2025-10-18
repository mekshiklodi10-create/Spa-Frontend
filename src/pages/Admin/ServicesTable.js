import { useState, useEffect } from "react";

function ServicesDashboard() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    price: "",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Ju lutemi identifikohuni.");
        setLoading(false);
        return;
      }

      const res = await fetch("https://spa-backend-5xtx.onrender.com/api/services", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Gabim në marrjen e shërbimeve");
      }

      const data = await res.json();
      setServices(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Nuk mund të marrim shërbimet.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file) {
        const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
        if (!validTypes.includes(file.type)) {
          setError("Vetëm imazhe .jpg, .png ose .webp lejohen");
          return;
        }
        if (file.size > 2 * 1024 * 1024) {
          setError("Skedari nuk duhet të jetë më i madh se 2MB");
          return;
        }
        setForm((prev) => ({ ...prev, image: file }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const { id, title, description, price, image } = form;
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token mungon. Ju lutemi identifikohuni.");
      return;
    }

    if (!title || !price) {
      setError("Titulli dhe Çmimi janë të detyrueshme");
      return;
    }

    if (!isEditing && !image) {
      setError("Ngarkoni një imazh për shërbimin e ri.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", parseFloat(price).toFixed(2));

      if (image instanceof File) {
        formData.append("image", image);
      }

      const url = isEditing
        ? `https://spa-backend-5xtx.onrender.com/api/services/${id}`
        : `https://spa-backend-5xtx.onrender.com/api/services`;

      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Gabim gjatë ruajtjes së shërbimit");
      }

      await fetchServices();
      setForm({ id: null, title: "", description: "", price: "", image: null });
      setPreviewImage(null);
      setIsEditing(false);

      const msg = isEditing
        ? "Shërbimi u përditësua me sukses"
        : "Shërbimi u shtua me sukses";

      setSuccessMessage(msg);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (service) => {
    setForm({
      id: service.id,
      title: service.title,
      description: service.description,
      price: service.price,
      image: null,
    });
    setPreviewImage(service.image || null);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Je i sigurt që dëshiron të fshish këtë shërbim?")) return;

    try {
      setDeletingId(id);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token mungon. Ju lutemi identifikohuni.");
        return;
      }

      const res = await fetch(`https://spa-backend-5xtx.onrender.com/api/services/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Gabim gjatë fshirjes së shërbimit");
      }

      await fetchServices();
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p>Duke u ngarkuar...</p>;

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Menaxho Shërbimet</h1>

      {successMessage && (
        <p className="p-2 mb-4 text-green-700 bg-green-100 border border-green-300 rounded">
          {successMessage}
        </p>
      )}

      {error && (
        <p className="p-2 mb-4 text-red-700 bg-red-100 border border-red-300 rounded">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="p-4 mb-8 space-y-4 border rounded shadow">
        <h2 className="text-xl font-semibold">
          {isEditing ? "Edito Shërbimin" : "Shto Shërbim të Ri"}
        </h2>

        <input type="text" name="title" placeholder="Titulli" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" required/>
        <textarea name="description" placeholder="Përshkrimi" value={form.description} onChange={handleChange} className="w-full p-2 border rounded" rows={3}/>
        <input type="number" name="price" placeholder="Çmimi" value={form.price} onChange={handleChange} className="w-full p-2 border rounded" required step="0.01" min="0"/>
        <input type="file" name="image" onChange={handleChange} className="w-full p-2 border rounded" required={!isEditing}/>

        {previewImage && (
          <div className="pt-2">
            <img src={previewImage} alt="Imazhi ekzistues" className="object-cover w-24 h-24 border rounded"/>
          </div>
        )}

        <div className="flex gap-4">
          <button type="submit" className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700">
            {isEditing ? "Përditëso" : "Shto"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setForm({
                  id: null,
                  title: "",
                  description: "",
                  price: "",
                  image: null,
                });
                setPreviewImage(null);
              }}
              className="px-4 py-2 text-white bg-gray-400 rounded hover:bg-gray-500"
            >
              Anulo
            </button>
          )}
        </div>
      </form>

      <table className="w-full border border-collapse border-gray-300 table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Foto</th>
            <th className="p-2 border">Titulli</th>
            <th className="p-2 border">Përshkrimi</th>
            <th className="p-2 border">Çmimi</th>
            <th className="p-2 border">Veprime</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.id} className="hover:bg-gray-50">
              <td className="p-2 border">
                {s.image ? (
                  <img
                    src={`https://spa-backend-5xtx.onrender.com${s.image}`}
                    alt={s.title}
                    className="object-cover w-20 h-16 rounded"
                  />
                ) : (
                  <span>Pa foto</span>
                )}
              </td>
              <td className="p-2 border">{s.title}</td>
              <td className="p-2 border">{s.description}</td>
              <td className="p-2 border">{s.price} €</td>
              <td className="p-2 space-x-2 border">
                <button
                  onClick={() => handleEdit(s)}
                  className="px-2 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
                  aria-label={`Edito ${s.title}`}
                >
                  Edito
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="px-2 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                  disabled={deletingId === s.id}
                  aria-label={`Fshi ${s.title}`}
                >
                  {deletingId === s.id ? "Duke fshirë..." : "Fshi"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServicesDashboard;
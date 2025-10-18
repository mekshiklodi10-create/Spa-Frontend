import { useState, useEffect } from "react";

function PackagesDashboard() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    price: "",
    image: null, // ruaj imazhin për upload
    imagePreview: null, // për preview imazhi në formular
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/packages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Gabim në marrjen e paketave");
      const data = await res.json();
      setPackages(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const { id, title, description, price, image } = form;

    if (!title || !price) {
      alert("Titulli dhe Çmimi janë të detyrueshme");
      return;
    }

    try {
      const url = isEditing
        ? `/api/packages/${id}`
        : "/api/packages";
      const method = isEditing ? "PUT" : "POST";

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      if (image) formData.append("image", image);

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Gabim gjatë ruajtjes së paketës");

      setForm({ id: null, title: "", description: "", price: "", image: null, imagePreview: null });
      setIsEditing(false);
      fetchPackages();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (p) => {
    setForm({
      id: p.id,
      title: p.title,
      description: p.description,
      price: p.price,
      image: null,
      imagePreview: p.image ? `${p.image}` : null,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Je i sigurt që dëshiron të fshish këtë paketë?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/packages/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Gabim gjatë fshirjes së paketës");
      fetchPackages();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Duke u ngarkuar...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Menaxho Paketat</h1>

      <form onSubmit={handleSubmit} className="p-4 mb-8 space-y-4 border rounded shadow" encType="multipart/form-data">
        <h2 className="text-xl font-semibold">{isEditing ? "Edito Paketën" : "Shto Paketë të Re"}</h2>
        <input
          type="text"
          name="title"
          placeholder="Titulli"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Përshkrimi"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={3}
        />
        <input
          type="number"
          name="price"
          placeholder="Çmimi"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
          step="0.01"
          min="0"
        />
        <div>
          <label className="block mb-1 font-semibold">Foto Paketë</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {form.imagePreview && (
            <img
              src={form.imagePreview}
              alt="Preview"
              className="object-cover w-48 h-32 mt-2 border rounded"
            />
          )}
        </div>
        <div className="flex gap-4">
          <button type="submit" className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700">
            {isEditing ? "Përditëso" : "Shto"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setForm({ id: null, title: "", description: "", price: "", image: null, imagePreview: null });
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
          {packages.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="p-2 border">
                {p.image ? (
                  <img
                    src={`/uploads/${p.image}`}
                    alt={p.title}
                    className="object-cover w-20 h-16 rounded"
                  />
                ) : (
                  <span>Pa foto</span>
                )}
              </td>
              <td className="p-2 border">{p.title}</td>
              <td className="p-2 border">{p.description}</td>
              <td className="p-2 border">{p.price} €</td>
              <td className="p-2 space-x-2 border">
                <button
                  onClick={() => handleEdit(p)}
                  className="px-2 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Edito
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-2 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                >
                  Fshi
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PackagesDashboard;
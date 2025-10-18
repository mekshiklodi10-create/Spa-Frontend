import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Duke dërguar...");

    try {
      const response = await fetch("https://spa-backend-5xtx.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Mesazhi u dërgua me sukses ✅");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Dështoi dërgimi i mesazhit ❌");
      }
    } catch (error) {
      console.error(error);
      setStatus("Gabim gjatë dërgimit!");
    }
  };

  return (
    <section className="max-w-4xl px-6 py-5 mx-auto">
      <h2 className="mb-6 text-3xl font-bold text-center">Na Kontaktoni</h2>
      <p className="mb-10 text-center text-gray-600">
        Na shkruani për çdo pyetje, rezervim ose informacion shtesë.
        Ekipi ynë do të përgjigjet sa më shpejt të jetë e mundur.
      </p>

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Emri juaj"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Email-i juaj"
          value={formData.email}
          onChange={handleChange}
          required
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <textarea
          name="message"
          placeholder="Mesazhi juaj"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        ></textarea>

        <button
          type="submit"
          className="px-6 py-3 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
        >
          Dërgo Mesazhin
        </button>

        {status && (
          <p className="mt-4 text-sm text-center text-gray-700">{status}</p>
        )}
      </form>
    </section>
  );
}

export default Contact;

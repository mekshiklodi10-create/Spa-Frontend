import { Link } from "react-router-dom";
import massage from "../assets/massage.jpg";
import facial from "../assets/facial.jpg";
import aromatherapy from "../assets/aromatherapy.jpg";

function ServicesPreview() {
  const services = [
    {
      id: 1,
      title: "Masazh Relaksues",
      description: "Çlirohuni nga stresi dhe tensioni me një masazh të plotë trupor.",
      image: massage,
    },
    {
      id: 2,
      title: "Trajtime Fytyre",
      description: "Rifreskoni lëkurën tuaj me trajtime profesionale fytyre.",
      image: facial,
    },
    {
      id: 3,
      title: "Aromatherapy",
      description: "Shijoni terapinë me aroma natyrale për trupin dhe mendjen.",
      image: aromatherapy,
    },
  ];

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container px-6 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center">Shërbimet tona</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.id} className="overflow-hidden bg-white rounded-lg shadow-md">
              <img src={service.image} alt={service.title} className="object-cover w-full h-48" />
              <div className="p-6">
                <h4 className="mb-2 text-xl font-semibold">{service.title}</h4>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

      
        <div className="flex justify-center mt-10">
          <Link to="/services"className="px-6 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600">
            Shiko Shërbimet
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ServicesPreview;
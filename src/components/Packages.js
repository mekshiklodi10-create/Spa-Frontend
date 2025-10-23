import { Link } from "react-router-dom";
import spaPackages from "../assets/spa-packages.jpg";

function Packages() {
  return (
    <section
      id="packages"
      className="flex flex-col items-center max-w-6xl gap-10 px-6 py-16 mx-auto md:flex-row"
    >
      <div className="flex-1">
        <h2 className="mb-4 text-3xl font-bold">Paketat e Spa & Wellness Center</h2>
        <p className="mb-6 text-gray-600">
          Zgjidhni mes paketave tona të personalizuara që kombinojnë masazhe,
          trajtime fytyre dhe terapi aromatike për një eksperiencë të plotë
          relaksi dhe kujdesi.
        </p>
        
        <Link
          to="/packages"
          className="px-6 py-2 font-semibold text-black bg-green-400 rounded-md hover:bg-green-500"
        >
          Shiko Paketat
        </Link>
      </div>

      <div className="flex-1">
        <img
          src={spaPackages}
          alt="Spa Packages"
          className="rounded-lg shadow-md"
        />
      </div>
    </section>
  );
}

export default Packages;
import { useState } from "react";
import spaHero from "../assets/spa-hero.jpg";

function Hero() {
  const [showAbout, setShowAbout] = useState(false);

  const toggleAbout = () => {
    setShowAbout((prev) => !prev);
  };

  return (
    <section id="home" className="relative h-screen">
  <img
    src={spaHero}
    alt="Luxury spa interior with peaceful ambiance"
    className="absolute top-0 left-0 object-cover w-full h-full"
  />

  <div className="absolute top-0 left-0 flex flex-col justify-center w-full h-full px-6 text-white md:px-12 bg-black/40">
    <div className="max-w-4xl">
      <h2 className="mb-4 text-3xl font-bold md:text-4xl drop-shadow-lg">
        Mirë se vini në Spa & Wellness Center
      </h2>
      <p className="max-w-2xl mb-6 text-lg drop-shadow-md">
        Shijoni momente relaksi dhe rigjallërimi në një ambient të qetë dhe
        luksoz, në zemër të Tiranës.
      </p>

      <button
        onClick={toggleAbout}
        className="px-6 py-3 font-semibold text-black transition bg-green-400 rounded-md hover:bg-green-500"
      >
        {showAbout ? "Mbyll" : "Rreth Nesh"}
      </button>

      {showAbout && (
        <div className="p-4 mt-6 text-gray-800 rounded-lg shadow-lg bg-white/90">
          <h3 className="mb-4 text-2xl font-bold text-green-700">Rreth Nesh</h3>
          <p className="mb-4 text-base leading-relaxed md:text-lg">
            Mirë se erdhët në <span className="font-semibold">Spa & Wellness Center</span> – 
            një hapësirë e dedikuar për relaks dhe kujdes ndaj vetes.  
            Ne besojmë se harmonia trup–mendje është çelësi i mirëqenies dhe 
            për këtë arsye ofrojmë një gamë të gjerë shërbimesh si masazhe 
            relaksuese, trajtime fytyre dhe terapi të personalizuara.
          </p>

          <p className="mb-4 text-base leading-relaxed md:text-lg">
            Ekipi ynë përbëhet nga specialistë të trajnuar me përvojë shumëvjeçare 
            në fushën e estetikës dhe wellness-it. Çdo trajtim zhvillohet në një 
            ambient të qetë dhe elegant, ku ju mund të çlironi stresin dhe të 
            rifreskoni energjinë tuaj.
          </p>

          <p className="text-base leading-relaxed md:text-lg">
            Misioni ynë është që çdo vizitë në Spa Tirana të jetë një eksperiencë 
            unike që ju ndihmon të ndiheni më të qetë, më të shëndetshëm dhe më të 
            bukur. Ju ftojmë të na vizitoni dhe të përjetoni çaste të paharrueshme 
            relaksi në zemër të Tiranës.
          </p>
        </div>
      )}
    </div>
  </div>
</section>
  );
}

export default Hero;
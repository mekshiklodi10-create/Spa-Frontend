import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <footer className="py-10 text-gray-200 bg-gray-900">
      <div className="container grid grid-cols-1 gap-8 px-6 mx-auto md:grid-cols-2">
  
        <div>
          <h2 className="mb-4 text-xl font-bold">Spa Tirana</h2>
          <p className="text-sm leading-6">
            Spa Tirana është vendi ideal për relaks dhe kujdes ndaj vetes.
            Ofron masazhe relaksuese, trajtime fytyre dhe terapi të personalizuara
            për mirëqenien tuaj.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-bold">Kontakt</h2>
          <p className="text-sm">📍 <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">Rruga Him Kolli, Tiranë, Shqipëri</a></p>
          <p className="text-sm">📞 <a href="tel:+355675553631" className="hover:text-green-400">+355 67 555 3631</a></p>
          <p className="text-sm"><a href="mailto:mekshiklodi10.com" className="underline hover:text-green-400">mekshiklodi10@gmail.com</a></p>

          
          <div className="mb-4">
            <h3 className="mb-1 text-sm font-semibold">⏰ Orari i punës</h3>
            <p className="text-sm">E Hënë - E Shtunë: 09:00 - 20:00</p>
            <p className="text-sm">E Diel: Mbyllur</p>
          </div>

        
          <div className="flex mt-4 space-x-4">
            <a 
              href="https://www.facebook.com/myspatirana" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-2 transition bg-gray-800 rounded-full hover:bg-green-400"
            >
              <FaFacebookF className="text-xl" />
            </a>
            <a 
              href="https://www.instagram.com/myspatirana" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2 transition bg-gray-800 rounded-full hover:bg-green-400"
            >
              <FaInstagram className="text-xl" />
            </a>
            <a 
              href="https://wa.me/355697764745" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="p-2 transition bg-gray-800 rounded-full hover:bg-green-400"
            >
              <FaWhatsapp className="text-xl" />
            </a>
          </div>
        </div>
      </div>


      <div className="pt-4 mt-10 text-xs text-center text-gray-400 border-t border-gray-700">
        © {new Date().getFullYear()} My Spa Tirana. Të gjitha të drejtat e rezervuara.
      </div>
    </footer>
  );
}

export default Footer;
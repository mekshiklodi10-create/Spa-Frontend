import Hero from "../components/Hero";
import ServicesPreview from "../components/ServicesPreview";
import Packages from "../components/Packages";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
    
      <section id="home">
        <Hero />
      </section>

      
      <section id="services">
        <ServicesPreview />
      </section>

      
      <section id="packages">
        <Packages />
      </section>

      
      <Footer />
    </>
  );
}

export default Home;
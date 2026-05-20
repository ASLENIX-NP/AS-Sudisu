import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Hero from "../../components/sections/Hero";
import { useNavigate } from "react-router-dom";
import ProductsSection from "../../components/sections/ProductsSection";
import WhyChoose from "../../components/sections/WhyChoose";

import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* NEXT BUTTON */}

      <button
        className="nav-float nav-right"
        onClick={() => navigate("/products")}
      >
        Next →
      </button>

      {/* HERO */}
      <Hero />
      <WhyChoose />
      <ProductsSection />
      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Home;

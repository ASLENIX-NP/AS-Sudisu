import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Hero from "../../components/sections/Hero";
import { useNavigate } from "react-router-dom";
import ProductsSection from "../../components/sections/ProductsSection";
import WhyChoose from "../../components/sections/WhyChoose";
import { useEffect, useState } from "react";

import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  /* =========================
     SETTINGS STATE
  ========================= */

  const [settings, setSettings] = useState({
    companyName: "",
    heroTitle: "",
    heroSubtitle: "",
  });

  /* =========================
     FETCH SETTINGS
  ========================= */

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/settings"
      );

      const data = await response.json();

      if (data.success) {
        setSettings(data.settings);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

      <Hero
        heroTitle={settings.heroTitle}
        heroSubtitle={settings.heroSubtitle}
      />

      {/* WHY CHOOSE */}
      <WhyChoose />

      {/* PRODUCTS */}
      <ProductsSection />

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Home;
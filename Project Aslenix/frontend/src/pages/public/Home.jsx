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



  const [settings] = useState([]);
   
 

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

    
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

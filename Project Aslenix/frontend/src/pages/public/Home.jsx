import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Hero from "../../components/sections/Hero";
import { useNavigate } from "react-router-dom";
import HomeProducts from "../../components/sections/HomeProducts";
import WhyChoose from "../../components/sections/WhyChoose";
import { useEffect, useState } from "react";
import statsBg from "../../assets/images/finalContact.png";
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
      <section
        className="stats-section"
        style={{
          backgroundImage: `url(${statsBg})`,
        }}
      >
        <div className="stats-overlay">
          <div className="stat">
            <h2>100%</h2>
            <p>Natural Ingredients</p>
          </div>

          <div className="stat">
            <h2>20+</h2>
            <p>Products</p>
          </div>

          <div className="stat">
            <h2>5000+</h2>
            <p>Happy Customers</p>
          </div>

          <div className="stat">
            <h2>25+</h2>
            <p>Districts Served</p>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <HomeProducts />

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Home;

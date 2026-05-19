import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Hero from "../../components/sections/Hero";
import { useNavigate } from "react-router-dom";

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

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Home;
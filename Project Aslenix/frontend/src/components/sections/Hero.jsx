import "./Hero.css";
import heroBg from "../../assets/images/heropage1.png";

import { FaLeaf } from "react-icons/fa";
import { GiCookingPot } from "react-icons/gi";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaTruckFast } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import HeroNavbar from "../common/HeroNavbar";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <HeroNavbar className="hero">
      {/* BACKGROUND */}
      <div className="hero-bg" style={{ backgroundImage: `url(${heroBg})` }} />

      {/* DARK OVERLAY (LIGHTER LIKE YOUR 2ND IMAGE) */}
      <div className="hero-overlay" />

      {/* MAIN CONTENT */}
      <div className="hero-container">
        {/* LEFT SIDE */}
        <div className="hero-left">
          <p className="hero-subtitle">PREMIUM NEPALI SPICES</p>

          <h1 className="hero-title">
            THE NEW TASTE OF <span>NEPAL</span>
          </h1>
          <div className="hero-line"></div>
          <div className="hero-desktop-content">
            <p className="hero-desc">
              Handcrafted with tradition, purity, and rich flavors of Nepal.
            </p>

            <button
              className="hero-btn desktop-btn"
              onClick={() => navigate("/products")}
            >
              Explore Our Products →
            </button>
          </div>
        </div>

        {/* RIGHT SIDE (NO hero1/hero2 ERROR ANYMORE) */}
        <div className="hero-right">
          <div className="product-stack" />
        </div>
      </div>
      {/* MOBILE BUTTON */}
      <div className="hero-mobile-content">
        <p className="hero-desc">
          Handcrafted with tradition, purity, and rich flavors of Nepal.
        </p>
        <button
          className="hero-btn hero-mobile-btn"
          onClick={() => navigate("/products")}
        >
          Explore Our Products →
        </button>
      </div>
      {/* BOTTOM FEATURES BAR (EXACT STYLE LIKE IMAGE 2) */}
      <div className="hero-features-bar">
        <div className="feature-item">
          <FaLeaf className="feature-icon" />
          <div>
            <p className="feature-title">100% NATURAL</p>
            <p className="feature-sub">No Preservatives</p>
          </div>
        </div>

        <div className="divider" />

        <div className="feature-item">
          <GiCookingPot className="feature-icon" />
          <div>
            <p className="feature-title">TRADITIONAL RECIPE</p>
            <p className="feature-sub">Authentic Taste</p>
          </div>
        </div>

        <div className="divider" />

        <div className="feature-item">
          <AiFillSafetyCertificate className="feature-icon" />
          <div>
            <p className="feature-title">PREMIUM QUALITY</p>
            <p className="feature-sub">Pure & Handpicked</p>
          </div>
        </div>

        <div className="divider" />

        <div className="feature-item">
          <FaTruckFast className="feature-icon" />
          <div>
            <p className="feature-title">FAST DELIVERY</p>
            <p className="feature-sub">Across Nepal</p>
          </div>
        </div>
      </div>
    </HeroNavbar>
  );
};

export default Hero;

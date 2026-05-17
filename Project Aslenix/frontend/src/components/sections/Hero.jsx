import "./Hero.css";
import heroBg from "../../assets/images/hero-bg.jpg";

const Hero = () => {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <p className="hero-subtitle">
          Welcome to Sudiisu Pride
        </p>

        <h1 className="hero-title">
          The New Taste of <br /> Nepal
        </h1>

        <p className="hero-desc">
          Premium Nepali spices crafted with tradition, purity, and care.
        </p>

        <button className="hero-btn">
          Discover Now
        </button>
      </div>
    </section>
  );
};

export default Hero;

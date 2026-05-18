import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay">

        <div className="hero-content">

          <h4 className="hero-subtitle">
            PURE NEPALI FLAVOR
          </h4>

          <h1>
            Spices Made <br />
            for Daily Cooking
          </h1>

          <p>
            Stone-ground powders with rich aroma,
            natural color and honest taste.
          </p>

          <button className="hero-btn">
            Discover Now
          </button>

        </div>

      </div>
    </section>
  );
};

export default Hero;
import "./Hero.css";
import heroBg from "../../assets/images/hero-bg.jpg";

const Hero = () => {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(0, 0, 0, 0.45),
            rgba(0, 0, 0, 0.75)
          ),
          url(${heroBg})
        `,
      }}
    >
      <div className="hero-content">

        <h4>PURE NEPALI FLAVOR</h4>

        <h1>
          Spices Made
          <br />
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
    </section>
  );
};

export default Hero;
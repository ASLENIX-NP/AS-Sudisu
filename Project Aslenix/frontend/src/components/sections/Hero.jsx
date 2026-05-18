import "./Hero.css";
import heroBg from "../../assets/images/hero-bg.jpg";
import chilli from "../../assets/spice/chilli.jpg";
import mix from "../../assets/spice/mix.jpg";
import turmeric from "../../assets/spice/turmeric.jpg";

const heroSlides = [
  {
    subtitle: "Welcome to Sudiisu Pride",
    title: "The New Taste of Nepal",
    description: "Premium Nepali spices crafted with tradition, purity, and care.",
    image: heroBg,
  },
  {
    subtitle: "Pure Nepali Flavor",
    title: "Spices Made for Daily Cooking",
    description: "Stone-ground powders with rich aroma, natural color, and honest taste.",
    image: turmeric,
  },
  {
    subtitle: "Signature Masala",
    title: "Warm Blends, Bold Memories",
    description: "Balanced mixes for curries, grills, snacks, and family meals.",
    image: mix,
  },
];

const Hero = () => {
  return (
    <section className="hero" aria-label="Sudiisu Pride highlights">
      <div className="hero-row">
        {heroSlides.map((slide) => (
          <article
            className="hero-slide"
            key={slide.title}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay"></div>

            <div className="hero-content">
              <p className="hero-subtitle">{slide.subtitle}</p>

              <h1 className="hero-title">{slide.title}</h1>

              <p className="hero-desc">{slide.description}</p>

              <button className="hero-btn">Discover Now</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Hero;

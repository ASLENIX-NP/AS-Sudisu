import { useEffect, useState } from "react";
import "./Hero.css";
import heroBg from "../../assets/images/hero-bg.jpg";

import herobg from "../../assets/images/herobg.jpg";
import hero2 from "../../assets/images/hero2.jpg";
import hero3 from "../../assets/images/hero3.png";
import hero4 from "../../assets/images/hero4.jpg";
import hero5 from "../../assets/images/hero5.png";

const slides = [
  {
    image: herobg,
    subtitle: "WELCOME TO SUDIISU PRIDE",
    title: "The New Taste of Nepal",
    description:
      "Premium Nepali spices crafted with tradition, purity, and care.",
    button: "Discover Now",
  },

  {
    image: hero2,
    subtitle: "AUTHENTIC NEPALI FLAVORS",
    title: "Crafted With Care",
    description: "Experience the true essence of Nepal in every dish.",
    button: "Shop Now",

    /* DOUBLE ZOOM EFFECT */
  },

  {
    image: hero3,
    subtitle: "QUALITY YOU CAN TRUST",
    title: "Made With Tradition",
    description: "Healthy, fresh and premium quality spices for every home.",
    button: "Learn More",
  },

  {
    image: hero4,
    subtitle: "PREMIUM MASALA COLLECTION",
    title: "Rich Aroma & Flavor",
    description: "Handpicked Nepali spices blended for authentic taste.",
    button: "Explore Products",
  },

  {
    image: hero5,
    subtitle: "TRADITIONAL NEPALI SPICES",
    title: "Crafted With Excellence",
    description: "Delivering freshness and purity from Nepal to your kitchen.",
    button: "Learn More",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  /* AUTO SLIDER */

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
<<<<<<< HEAD
    <section className="hero">
      {/* BACKGROUND SLIDES */}

      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${
            currentSlide === index ? "active-slide" : ""
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: slide.imageSize,
            backgroundPosition: slide.imagePosition,
          }}
        />
      ))}

      {/* DARK OVERLAY */}

=======
    <section
      className="hero"
      style={{
<<<<<<< HEAD
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
=======
        backgroundImage: `url(${slides[currentSlide].image})`,
      }}
    >
>>>>>>> 20b5ca95969307ee95b5b1d3bec44e9c447cbbca
      <div className="hero-overlay"></div>

      {/* CONTENT */}

      <div className="hero-content" key={currentSlide}>
        <p className="hero-subtitle">{slides[currentSlide].subtitle}</p>

        <h1 className="hero-title">{slides[currentSlide].title}</h1>

        <p className="hero-desc">{slides[currentSlide].description}</p>
>>>>>>> a0d86c544a6f0f7ac7711d82e69a62030c35ef03

        <button className="hero-btn">{slides[currentSlide].button}</button>
      </div>

      {/* DOTS */}

  
    </section>
  );
};

export default Hero;

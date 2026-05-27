import { useEffect, useState } from "react";
import "./Hero.css";

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
    button: "Explore more",
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
    button: "learn more",
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
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
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

      <div className="hero-overlay"></div>

      {/* CONTENT */}

      <div className="hero-content" key={currentSlide}>
        <p className="hero-subtitle">
          {slides[currentSlide].subtitle}
        </p>

        <h1 className="hero-title">
          {slides[currentSlide].title}
        </h1>

        <p className="hero-desc">
          {slides[currentSlide].description}
        </p>

        <button className="hero-btn">
          {slides[currentSlide].button}
        </button>
      </div>

      {/* DOTS */}
    </section>
  );
};

export default Hero;
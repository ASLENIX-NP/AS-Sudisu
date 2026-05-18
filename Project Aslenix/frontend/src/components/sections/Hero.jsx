import { useEffect, useState } from "react";
import "./Hero.css";

import heroBg from "../../assets/images/hero-bg.jpg";

const slides = [
  {
    image: heroBg,
    subtitle: "WELCOME TO SUDIISU PRIDE",
    title: "The New Taste of Nepal",
    description:
      "Premium Nepali spices crafted with tradition, purity, and care.",
    button: "Discover Now",
  },

  {
    image: heroBg,
    subtitle: "AUTHENTIC NEPALI SPICES",
    title: "Fresh & Pure Ingredients",
    description: "Experience rich aroma and traditional Nepali flavor.",
    button: "Shop Now",
  },

  {
    image: heroBg,
    subtitle: "QUALITY YOU CAN TRUST",
    title: "Made With Tradition",
    description: "Healthy, fresh and premium quality spices for every home.",
    button: "Learn More",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${slides[currentSlide].image})`,
      }}
    >
      <div className="hero-overlay"></div>

      <div key={currentSlide} className="hero-content fade-animation">
        <p className="hero-subtitle">{slides[currentSlide].subtitle}</p>

        <h1 className="hero-title">{slides[currentSlide].title}</h1>

        <p className="hero-desc">{slides[currentSlide].description}</p>

        <button className="hero-btn">{slides[currentSlide].button}</button>
      </div>
    </section>
  );
};

export default Hero;

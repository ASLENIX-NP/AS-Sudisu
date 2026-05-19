import { useEffect, useState } from "react";
import "./Hero.css";
<<<<<<< HEAD

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
    button: "View Collection",
  },
];
=======
>>>>>>> 70b3205690c2696426ab868b177ba9f0b4123f51

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(slideInterval);
  }, []);

  return (
<<<<<<< HEAD
    <section
      className="hero"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(0,0,0,0.60),
            rgba(0,0,0,0.60)
          ),
          url(${slides[currentSlide].image})
        `,
      }}
    >
      <div className="hero-content fade-animation">
        <p className="hero-subtitle">{slides[currentSlide].subtitle}</p>

        <h1 className="hero-title">{slides[currentSlide].title}</h1>

        <p className="hero-desc">{slides[currentSlide].description}</p>

        <button className="hero-btn">{slides[currentSlide].button}</button>
=======
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

>>>>>>> 70b3205690c2696426ab868b177ba9f0b4123f51
      </div>
    </section>
  );
};

export default Hero;
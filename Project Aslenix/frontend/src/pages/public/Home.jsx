import Footer from "../../components/common/Footer";
import Hero from "../../components/sections/Hero";
import { useNavigate } from "react-router-dom";
import HomeProducts from "../../components/sections/HomeProducts";
import WhyChoose from "../../components/sections/WhyChoose";
import statsBg from "../../assets/images/herostat.jpg";
import "./home.css";
import { useEffect, useRef, useState } from "react";
import Counter from "../../components/common/counter";

const Home = () => {
  const navigate = useNavigate();



  const [settings] = useState([]);

  const statsRef = useRef(null);

  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.8, // 80% of section must be visible
      },
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <>
      {/* NAVBAR */}

      {/* HERO */}

      <Hero
        heroTitle={settings.heroTitle}
        heroSubtitle={settings.heroSubtitle}
      />

      {/* WHY CHOOSE */}
      <WhyChoose />
      <section
        ref={statsRef}
        className="stats-section"
        style={{
          backgroundImage: `url(${statsBg})`,
        }}
      >
        <div className="stats-overlay">
          <div className="stat">
            {statsVisible && <Counter target={100} suffix="%" />}
            <p>Natural Ingredients</p>
          </div>

          <div className="stat">
            {statsVisible && <Counter target={20} suffix="+" />}

            <p>Products</p>
          </div>

          <div className="stat">
            {statsVisible && <Counter target={5000} suffix="+" />}
            <p>Happy Customers</p>
          </div>

          <div className="stat">
            {statsVisible && <Counter target={25} suffix="+" />}
            <p>Districts Served</p>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <HomeProducts />

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Home;

import "./About.css";
import HeroNavbar from "../../components/common/HeroNavbar";
import Footer from "../../components/common/Footer";
import { useNavigate } from "react-router-dom";
import cookingWomen from "../../assets/images/cooking women.jpg";
import reachImage from "../../assets/images/AboutUS.png";

import mixMasala from "../../assets/spice/mix.jpg";
import meatMasala from "../../assets/spice/meat.jpg";
import garamMasala from "../../assets/spice/garam.jpg";
const About = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* FLOATING BUTTONS */}
      <HeroNavbar
        className="about-section"
        style={{
          backgroundImage: `
      linear-gradient(
        rgba(0, 0, 0, 0.55),
        rgba(0, 0, 0, 0.55)
      ),
      url(${cookingWomen})
    `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="about-container">
          <div className="about-text">
            <h1>About Us</h1>

            <p>
              Sudiisu Pride is a premium Nepali spice brand dedicated to
              preserving authenticity, purity and traditional craftsmanship.
            </p>

            <p>
              Rooted in Nepal’s rich culinary heritage, our spices are carefully
              sourced from trusted local farmers and processed with strict
              quality standards.
            </p>

            <p>
              Every product is crafted to deliver natural aroma, rich flavor and
              uncompromised freshness.
            </p>
          </div>
        </div>
      </HeroNavbar>
      <section className="our-reach">
        <img
          src={reachImage}
          alt="Our Reach Across Nepal"
          className="reach-image"
        />
      </section>
      <Footer />
    </>
  );
};

export default About;

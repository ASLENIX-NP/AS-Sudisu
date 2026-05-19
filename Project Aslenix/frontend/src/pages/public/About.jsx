import "./About.css";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
<<<<<<< HEAD
import "./About.css";
import aboutImage from "../../assets/images/aboutus.jpeg";
=======
import { useNavigate } from "react-router-dom";

import cookingWomen from "../../assets/images/cooking women.jpg";
>>>>>>> 70b3205690c2696426ab868b177ba9f0b4123f51

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* FLOATING BUTTONS */}

      <button
        className="nav-float nav-left"
        onClick={() => navigate("/products")}
      >
        ← Back
      </button>

      <button
        className="nav-float nav-right"
        onClick={() => navigate("/blog")}
      >
        Next →
      </button>

      <section
        className="about-section"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(0,0,0,0.72),
              rgba(0,0,0,0.72)
            ),
            url(${cookingWomen})
          `
        }}
      >
        <div className="about-container">
<<<<<<< HEAD
          {/* LEFT CONTENT */}
          <div className="about-text">
            <h1>About Us</h1>
            <p>
              <strong>Sudiisu Pride</strong> is a premium Nepali spice brand
              dedicated to preserving authenticity, purity, and traditional
              craftsmanship. Rooted in Nepal’s rich culinary heritage, our
              spices are carefully sourced from trusted local farmers and
              processed using strict quality standards.
            </p>
            <p>
              We believe great flavor begins at the source. Every product is
              crafted to deliver natural aroma, rich taste, and uncompromised
              freshness — bringing the true essence of Nepal to kitchens around
              the world.
            </p>
          </div>
=======

          <div className="about-text">
>>>>>>> 70b3205690c2696426ab868b177ba9f0b4123f51

            <h1>About Us</h1>

            <p>
              Sudiisu Pride is a premium Nepali spice brand
              dedicated to preserving authenticity, purity
              and traditional craftsmanship.
            </p>

            <p>
              Rooted in Nepal’s rich culinary heritage,
              our spices are carefully sourced from trusted
              local farmers and processed with strict
              quality standards.
            </p>

            <p>
              Every product is crafted to deliver
              natural aroma, rich flavor and
              uncompromised freshness.
            </p>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
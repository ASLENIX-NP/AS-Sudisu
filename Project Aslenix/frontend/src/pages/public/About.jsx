import "./About.css";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useNavigate } from "react-router-dom";
import cookingWomen from "../../assets/images/cooking women.jpg";

import mixMasala from "../../assets/spice/mix.jpg";
import meatMasala from "../../assets/spice/meat.jpg";
import garamMasala from "../../assets/spice/garam.jpg";

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* FLOATING BUTTONS */}

      <section
        className="about-section"
        style={{
          background:
              `url(${cookingWomen}) center/cover no-repeat`,
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
      </section>

      <section className="best-sellers">
        <h2>Our Best Sellers</h2>

        <div className="best-seller-grid">
          <div className="seller-card">
            <img src={mixMasala} alt="Mix Masala" />
            <h3>Mix Masala</h3>
            <p>Customer Favorite</p>
          </div>

          <div className="seller-card">
            <img src={meatMasala} alt="Meat Masala" />
            <h3>Meat Masala</h3>
            <p>Top Rated Product</p>
          </div>

          <div className="seller-card">
            <img src={garamMasala} alt="Garam Masala" />
            <h3>Garam Masala</h3>
            <p>Most Purchased</p>
          </div>
        </div>
      </section>

      <section className="reviews-section">
        <h2>Customer Reviews</h2>

        <div className="reviews-grid">
          <div className="review-card">
            <div className="stars">★★★★★</div>

            <p>The flavor is amazing. It feels like homemade Nepali spices.</p>

            <h4>— Ram Sharma</h4>
          </div>

          <div className="review-card">
            <div className="stars">★★★★★</div>

            <p>Very fresh and aromatic. My family loves Sudisu products.</p>

            <h4>— Sita Thapa</h4>
          </div>

          <div className="review-card">
            <div className="stars">★★★★★</div>

            <p>Excellent packaging and premium quality.</p>

            <h4>— Hari Gurung</h4>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;

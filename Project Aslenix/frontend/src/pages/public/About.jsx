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
      <HeroNavbar  className="about-section">
        <div className="about-container">
          <div className="about-text">
            <span className="about-tag">SUDIISU SPICES</span>

            <h1>
              More than Spices <span>A Story Of Passion</span>
              <br />
              And Excellence
            </h1>
            <p>
              Behind every pack of Sudiisu Pride is a team of passionate
              individuals committed to bringing authentic Nepali flavors to
              every kitchen.
            </p>

            <p>
              The people you see in this photograph are the heart of our
              journey. From sourcing premium ingredients to carefully preparing
              every spice blend, each member plays a vital role in preserving
              the taste, tradition, and trust that define our brand.
            </p>

            <p>
              We work closely with local farmers and communities, ensuring that
              every product reflects Nepal's rich culinary heritage while
              maintaining the highest standards of quality and purity.
            </p>

            <p>
              At Sudiisu Pride, we believe food is more than nourishment—it is a
              way to connect families, celebrate culture, and create
              unforgettable memories around the dining table.
            </p>
          </div>

          <div className="about-image">
            <img src={cookingWomen} alt="Sudiisu Pride Team" />
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

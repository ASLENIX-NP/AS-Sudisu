import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import "./About.css";
import aboutImage from "../../assets/images/about-us.jpg";

const About = () => {
  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* ABOUT SECTION */}
      <section className="about-page">
        <div className="about-container">

          {/* LEFT CONTENT */}
          <div className="about-text">
            <h1>About Us</h1>
            <p>
              <strong>Sudiisu Pride</strong> is a premium Nepali spice brand
              dedicated to preserving authenticity, purity, and traditional
              craftsmanship. Rooted in Nepal’s rich culinary heritage, our spices
              are carefully sourced from trusted local farmers and processed
              using strict quality standards.
            </p>
            <p>
              We believe great flavor begins at the source. Every product is
              crafted to deliver natural aroma, rich taste, and uncompromised
              freshness — bringing the true essence of Nepal to kitchens around
              the world.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="about-image">
            <img src={aboutImage} alt="About Sudiisu Pride" />
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default About;

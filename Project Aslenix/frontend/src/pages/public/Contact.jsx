import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import "./Contact.css";

const Contact = () => {
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* BACK BUTTON */}
      <button className="nav-float nav-left" onClick={() => navigate("/blog")}>
        ← Back
      </button>

      {/* HERO SECTION */}
      <section className="contact-hero">
        <div className="contact-overlay"></div>

        <div className="contact-container">
          {/* LEFT SIDE */}
          <div className="contact-left">
            <span className="contact-tag">PREMIUM SUPPORT</span>

            <h1>
              Let’s Build
              <br />
              Something
              <br />
              Extraordinary
              <br />
              Together.
            </h1>

            <p>
              We help brands grow with premium digital experiences, strategy,
              and innovation.
            </p>

            <div className="contact-buttons">
              {/* START CONVERSATION */}
              <button
                className="primary-btn"
                onClick={() => setShowPopup(true)}
              >
                Start Conversation
              </button>

              {/* VIEW SERVICES */}
              <button
                className="secondary-btn"
                onClick={() => navigate("/products")}
              >
                View Services
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="contact-right">
            <div className="info-card">
              <h3>Contact Information</h3>

              {/* LOCATION */}
              <div className="info-item">
                <span>📍</span>

                <a
                  href="https://maps.app.goo.gl/azF4zHRdJEBgkDYs8"
                  target="_blank"
                  rel="noreferrer"
                >
                  Manahari-07, Makawanpur, Nepal
                </a>
              </div>

              {/* PHONE */}
              <div className="info-item">
                <span>📞</span>

                <a href="tel:+97757590436">+977 57-590436</a>
              </div>

              {/* EMAIL */}
              <div className="info-item">
                <span>✉️</span>

                <a href="mailto:info@fortunegroup.com.np">
                  info@fortunegroup.com.np
                </a>
              </div>

              {/* TIME */}
              <div className="info-item">
                <span>🕒</span>

                <p>Monday – Friday (9AM – 6PM)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPUP */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <button className="close-btn" onClick={() => setShowPopup(false)}>
              ✕
            </button>

            <h2>Start Your Project</h2>

            <form className="popup-form">
              <input type="text" placeholder="Your Name" required />

              <input type="email" placeholder="Your Email" required />

              <input type="text" placeholder="Phone Number" />

              <textarea
                rows="5"
                placeholder="Tell us about your project..."
              ></textarea>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Contact;

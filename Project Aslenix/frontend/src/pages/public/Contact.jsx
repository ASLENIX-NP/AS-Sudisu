import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import "./Contact.css";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* FLOATING NAV BUTTONS */}
      <button
        className="nav-float nav-left"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <button
        className="nav-float nav-right"
        onClick={() => navigate("/products")}
      >
        Next →
      </button>

      {/* CONTACT PAGE */}
      <section className="contact-page">
        <h1 className="contact-title">Contact Us</h1>

        <div className="contact-card">
          {/* LEFT: CONTACT FORM */}
          <div className="contact-form">
            <h2>Get In Touch</h2>
            <p>We are here for you. How can we help?</p>

            <input type="text" placeholder="Full Name *" />
            <input type="email" placeholder="Email *" />
            <input type="text" placeholder="Phone Number *" />
            <input type="text" placeholder="Subject *" />
            <textarea placeholder="Message *"></textarea>

            <button className="contact-btn">Submit</button>
          </div>

          {/* RIGHT: CONTACT INFO */}
          <div className="contact-info">
            <h3>Our Contact Details</h3>

            <div className="info-row">
              <span className="info-label">📍 Address</span>
              <span className="info-value">
                Manahari-07, Makawanpur, Nepal
              </span>
            </div>

            <div className="info-row">
              <span className="info-label">📞 Phone</span>
              <span className="info-value">
                +977 57-590436
              </span>
            </div>

            <div className="info-row">
              <span className="info-label">✉️ Email</span>
              <span className="info-value">
                info@fortunegroup.com.np
              </span>
            </div>

            <div className="info-row">
              <span className="info-label">🌐 Instagram</span>
              <span className="info-value">
                instagram.com/fortunegroupofind
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Contact;

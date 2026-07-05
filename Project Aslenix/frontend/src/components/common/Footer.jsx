import "./Footer.css";
import { useState } from "react";

import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaGlobe,
} from "react-icons/fa";
import InquiryPopup from "./InquiryPopup";

export default function Footer() {
  const [openPopup, setOpenPopup] = useState(false);
  /* STATIC SETTINGS */

  const [settings] = useState({
    companyName: "SUDISU",

    email: "info@fortunegroup.com.np",

    phone: "057590436",

    address: "Manahari-07, Nepal",

    facebook: "https://www.facebook.com/sudisuspice",

    instagram: "https://www.instagram.com/sudisu_spices",

    whatsapp: "https://wa.me/977981-6259642",

    heroSubtitle: "BRING FLAVOUR TO YOUR KITCHEN WITH SUDISU SPICES",
  });

  return (
    <>
      <footer className="footer">
        {/* TOP CTA */}

        <div className="footer-top">
          <h2>{settings.heroSubtitle}</h2>

          <p className="footer-subtitle">
            Premium Nepali spices crafted with authentic ingredients,
            traditional recipes and trusted quality standards.
          </p>

          <div className="footer-actions">
            <button className="cta-btn" onClick={() => setOpenPopup(true)}>
              Bussiness with SUDISU
            </button>
            <Link
              to="/products#products-section"
              className="footer-product-btn"
            >
              Explore Products
            </Link>{" "}
          </div>
        </div>
        {/* FOOTER GRID */}

        <div className="footer-grid">
          {/* QUICK LINKS */}

          <div>
            <h4>Quick Links</h4>

            <Link to="/">Home</Link>

            <Link to="/products">Products</Link>

            <Link to="/contact">Contact</Link>
          </div>

          {/* CONTACT */}

          <div>
            <h4>Contact</h4>
            {/* PHONE */}
            <a href="tel:057590436">
              <FaPhone className="footer-icon phone-icon" />
              <span>Phone: 057-590436</span>
            </a>

            {/* EMAIL */}
            <a href="mailto:info@fortunegroup.com.np">
              <FaEnvelope className="footer-icon email-icon" />
              <span>info@fortunegroup.com.np</span>
            </a>

            {/* LOCATION */}
            <a
              href="https://www.google.com/maps/search/Fortune+group+of+industries+Pvt+LTD/@27.5395879,84.8074828,81m"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaMapMarkerAlt className="footer-icon location-icon" />
              <span>Manahari-07, Makwanpur, Nepal</span>
            </a>
          </div>

          {/* SOCIAL LINKS */}

          <div>
            <h4>Follow Us</h4>

            <a
              href="https://www.instagram.com/sudisu_spices/"
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              <FaInstagram className="footer-icon instagram-icon" />
              Instagram
            </a>

            <a
              href="https://www.facebook.com/sudisuspice"
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              <FaFacebook className="footer-icon facebook-icon" />
              Facebook
            </a>

            <a
              href="https://wa.me/9779816259642"
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              <FaWhatsapp className="footer-icon whatsapp-icon" />
              Whatsapp
            </a>
          </div>
        </div>

        {/* COPYRIGHT */}

        <div className="footer-bottom">
          &copy; 2026 SUDISU. All Rights Reserved.
        </div>
      </footer>

      {/* POPUP */}

      <InquiryPopup isOpen={openPopup} onClose={() => setOpenPopup(false)} />
    </>
  );
}

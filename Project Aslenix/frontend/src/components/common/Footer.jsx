import "./Footer.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
} from "react-icons/fa";

import InquiryPopup from "./InquiryPopup";

export default function Footer() {
  const [openPopup, setOpenPopup] =
    useState(false);

  /* STATIC SETTINGS */

  const [settings] = useState({
    companyName: "SUDIISU",

    email: "sudiisu@gmail.com",

    phone: "9800000000",

    address: "Kathmandu, Nepal",

    facebook:
      "https://facebook.com",

    instagram:
      "https://instagram.com",

    tiktok:
      "https://tiktok.com",

    heroSubtitle:
      "Premium Nepali Masala crafted with purity and authentic taste.",
  });

  /* =========================
     SETTINGS STATE
  ========================= */


  /* =========================
     FETCH SETTINGS
  ========================= */

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/settings"
      );

      const data = await response.json();

      if (data.success) {
        setSettings(data.settings);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <footer className="footer">
        {/* TOP CTA */}

        <div className="footer-top">
          <h2>{settings.heroSubtitle}</h2>

          <button
            className="cta-btn"
            onClick={() => setOpenPopup(true)}
          >
            Let’s Start Conversation
          </button>
        </div>

        {/* FOOTER GRID */}

        <div className="footer-grid">
          {/* QUICK LINKS */}

          <div>
            <h4>Quick Links</h4>

            <Link to="/">Home</Link>

            <Link to="/products">
              Products
            </Link>

            <Link to="/contact">
              Contact
            </Link>
          </div>

          {/* CONTACT */}

          <div>
            <h4>Contact</h4>

            <a href={`tel:${settings.phone}`}>
              📞 {settings.phone}
            </a>

            <a href={`mailto:${settings.email}`}>
              ✉️ {settings.email}
            </a>

            <a
              href="https://maps.app.goo.gl/azF4zHRdJEBgkDYs8"
              target="_blank"
              rel="noreferrer"
            >
              📍 {settings.address}
            </a>
          </div>

          {/* SOCIAL LINKS */}

          <div>
            <h4>Follow Us</h4>

            <a
              href={settings.instagram}
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              <FaInstagram /> Instagram
            </a>

            <a
              href={settings.facebook}
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              <FaFacebook /> Facebook
            </a>

            <a
              href={`https://wa.me/${settings.phone.replace(
                /\s+/g,
                ""
              )}`}
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              <FaWhatsapp /> Whatsapp
            </a>
          </div>
        </div>

        {/* COPYRIGHT */}

        <div className="footer-bottom">
          © 2026 {settings.companyName}. All Rights
          Reserved.
        </div>
      </footer>

      {/* POPUP */}

      <InquiryPopup
        isOpen={openPopup}
        onClose={() => setOpenPopup(false)}
      />
    </>
  );
}
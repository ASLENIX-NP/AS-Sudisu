import "./Footer.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import InquiryPopup from "./InquiryPopup";

export default function Footer() {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <footer className="footer">
        {/* TOP CTA */}
        <div className="footer-top">
          <h2>Bringing Pure Flavor to Your Kitchen</h2>

         

          <button className="cta-btn" onClick={() => setOpenPopup(true)}>
            Connect With Sudisu
          </button>
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

            <a href="tel:057-590436">📞 057-590436</a>

            <a href="mailto:info@fortunegroup.com.np">
              ✉️ info@fortunegroup.com.np
            </a>

            <a
              href="https://maps.app.goo.gl/azF4zHRdJEBgkDYs8"
              target="_blank"
              rel="noreferrer"
            >
              📍 Sudiisu Factory, Manahari-07, Makawanpur
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
              <FaInstagram /> Instagram
            </a>

            <a
              href="https://www.facebook.com/sudisuspice/"
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              <FaFacebook /> Facebook
            </a>

            <a
              href="https://wa.me/9779816259642"
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
          © 2026 Sudiisu Pride. All Rights Reserved.
        </div>
      </footer>

      {/* POPUP */}
      <InquiryPopup isOpen={openPopup} onClose={() => setOpenPopup(false)} />
    </>
  );
}

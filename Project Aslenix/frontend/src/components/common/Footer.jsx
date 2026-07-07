import "./Footer.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import InquiryPopup from "./InquiryPopup";

export default function Footer() {
  const [openPopup, setOpenPopup] = useState(false);

  const [settings, setSettings] = useState({
    // Business Information
    companyName: "SUDISU",
    businessEmail: "info@fortunegroup.com.np",
    phone: "057590436",
    address: "Manahari-07, Makwanpur, Nepal",
    whatsappNumber: "+9779816259642",
    mapLink:
      "https://www.google.com/maps/search/Fortune+group+of+industries+Pvt+LTD/@27.5395879,84.8074828,81m",

    // Footer Content
    footerHeading: "BRING FLAVOUR TO YOUR KITCHEN WITH SUDISU SPICES",
    footerDescription:
      "Premium Nepali spices crafted with authentic ingredients, traditional recipes and trusted quality standards.",
    footerButtonText: "Bussiness with SUDISU",
    footerExploreButton: "Explore Products",
    footerCopyright: "© 2026 SUDISU. All Rights Reserved.",

    // Quick Links
    quickLink1Name: "Home",
    quickLink1Url: "/",
    quickLink2Name: "Products",
    quickLink2Url: "/products",
    quickLink3Name: "Contact",
    quickLink3Url: "/contact",
    quickLink4Name: "About",
    quickLink4Url: "/about",

    // Social Media
    facebook: "https://www.facebook.com/sudisuspice",
    instagram: "https://www.instagram.com/sudisu_spices",
    whatsapp: "https://wa.me/9779816259642",
    tiktok: "",
    linkedin: "",
    youtube: "",

    // Footer Contact
    footerPhone: "057590436",
    footerEmail: "info@fortunegroup.com.np",
    footerAddress: "Manahari-07, Makwanpur, Nepal",
    footerMapLink:
      "https://www.google.com/maps/search/Fortune+group+of+industries+Pvt+LTD/@27.5395879,84.8074828,81m",
  });

  useEffect(() => {
    const fetchFooterSettings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/settings");
        const data = await response.json();
        if (data.success && data.settings) {
          setSettings((prev) => ({
            ...prev,
            ...data.settings,
            // Ensure backward compatibility with old field names
            footerHeading:
              data.settings.footerHeading ||
              data.settings.heroSubtitle ||
              prev.footerHeading,
            footerDescription:
              data.settings.footerDescription ||
              data.settings.heroDescription ||
              prev.footerDescription,
            footerPhone:
              data.settings.footerPhone ||
              data.settings.phone ||
              prev.footerPhone,
            footerEmail:
              data.settings.footerEmail ||
              data.settings.email ||
              prev.footerEmail,
            footerAddress:
              data.settings.footerAddress ||
              data.settings.address ||
              prev.footerAddress,
            footerMapLink:
              data.settings.footerGoogleMapLink ||
              data.settings.mapLink ||
              prev.footerMapLink,
            footerButtonText:
              data.settings.footerButtonText ||
              data.settings.heroButtonText ||
              prev.footerButtonText,
            footerExploreButton:
              data.settings.footerExploreButton ||
              data.settings.exploreButtonText ||
              prev.footerExploreButton,
            footerCopyright:
              data.settings.footerCopyright ||
              data.settings.copyrightText ||
              prev.footerCopyright,
          }));
        }
      } catch (error) {
        console.log("Error sync footer configuration settings:", error);
      }
    };
    fetchFooterSettings();
  }, []);

  // Prepare social links with icons
  const socialLinks = [
    { name: "Instagram", url: settings.instagram, icon: FaInstagram },
    { name: "Facebook", url: settings.facebook, icon: FaFacebook },
    { name: "WhatsApp", url: settings.whatsapp, icon: FaWhatsapp },
    { name: "TikTok", url: settings.tiktok, icon: FaTiktok },
    { name: "LinkedIn", url: settings.linkedin, icon: FaLinkedinIn },
    { name: "YouTube", url: settings.youtube, icon: FaYoutube },
  ].filter((social) => social.url && social.url.trim() !== "");

  // Prepare quick links
  const quickLinks = [
    { name: settings.quickLink1Name, url: settings.quickLink1Url },
    { name: settings.quickLink2Name, url: settings.quickLink2Url },
    { name: settings.quickLink3Name, url: settings.quickLink3Url },
    { name: settings.quickLink4Name, url: settings.quickLink4Url },
  ].filter((link) => link.name && link.name.trim() !== "");

  return (
    <>
      <footer className="footer">
        {/* TOP CTA */}
        <div className="footer-top">
          <h2>{settings.footerHeading}</h2>

          <p className="footer-subtitle">{settings.footerDescription}</p>

          <div className="footer-actions">
            <button className="cta-btn" onClick={() => setOpenPopup(true)}>
              {settings.footerButtonText}
            </button>
            <Link
              to="/products#products-section"
              className="footer-product-btn"
            >
              {settings.footerExploreButton}
            </Link>
          </div>
        </div>

        {/* FOOTER GRID */}
        <div className="footer-grid">
          {/* QUICK LINKS */}
          <div>
            <h4>Quick Links</h4>
            {quickLinks.map((link, index) => (
              <Link key={index} to={link.url}>
                {link.name}
              </Link>
            ))}
          </div>

          {/* CONTACT */}
          <div>
            <h4>Contact</h4>
            {/* PHONE */}
            <a href={`tel:${settings.footerPhone}`}>
              <FaPhone className="footer-icon phone-icon" />
              <span>Phone: {settings.footerPhone}</span>
            </a>

            {/* EMAIL */}
            <a href={`mailto:${settings.footerEmail}`}>
              <FaEnvelope className="footer-icon email-icon" />
              <span>{settings.footerEmail}</span>
            </a>

            {/* LOCATION */}
            <a
              href={settings.footerMapLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaMapMarkerAlt className="footer-icon location-icon" />
              <span>{settings.footerAddress}</span>
            </a>
          </div>

          {/* SOCIAL LINKS */}
          {socialLinks.length > 0 && (
            <div>
              <h4>Follow Us</h4>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="social-link"
                  >
                    <Icon className="footer-icon" />
                    {social.name}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* COPYRIGHT */}
        <div className="footer-bottom">{settings.footerCopyright}</div>
      </footer>

      {/* POPUP */}
      <InquiryPopup isOpen={openPopup} onClose={() => setOpenPopup(false)} />
    </>
  );
}

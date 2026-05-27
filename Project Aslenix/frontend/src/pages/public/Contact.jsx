import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegClock,
  FaWhatsapp,
} from "react-icons/fa";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import "./Contact.css";

import heroImg from "../../assets/images/finalContact.png";

const Contact = () => {
  const navigate = useNavigate();

  const southAsianCountries = [
    { name: "Nepal", code: "+977" },
    { name: "India", code: "+91" },
    { name: "Bangladesh", code: "+880" },
    { name: "Pakistan", code: "+92" },
    { name: "Sri Lanka", code: "+94" },
    { name: "Bhutan", code: "+975" },
    { name: "Maldives", code: "+960" },
    { name: "Afghanistan", code: "+93" },
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    country: "",
    province: "",
    district: "",
    phoneCode: "+977",
    phone: "",
    email: "",
    message: "",
  });

  const handleCountryChange = (e) => {
    const selectedCountry = southAsianCountries.find(
      (country) => country.name === e.target.value,
    );

    setFormData({
      ...formData,
      country: selectedCountry.name,
      phoneCode: selectedCountry.code,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <>
      <Navbar />

      <button className="nav-float nav-left" onClick={() => navigate("/blog")}>
        Back
      </button>

      <section className="contact-hero">
        <div className="hero-image-wrapper">
          <img src={heroImg} alt="Sudisu Spices" className="hero-image" />
        </div>

        <div className="contact-content">
          <span className="contact-tag">AUTHENTIC NEPALI SPICES</span>

          <h1>Connect With Sudisu Spices</h1>

          <p className="contact-description">
            Bringing authentic Nepali taste to every kitchen with premium
            handcrafted spices made from pure ingredients and traditional
            recipes.
          </p>

          <div className="info-card">
            <h2>Your Feedback Matters</h2>

            <form className="contact-form" onSubmit={handleSubmit}>
              {/* NAME */}

              <div className="form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              {/* COUNTRY */}

              <div className="form-group">
                <label>Country</label>

                <select
                  name="country"
                  value={formData.country}
                  onChange={handleCountryChange}
                >
                  <option value="">Select Country</option>

                  {southAsianCountries.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* PROVINCE */}

              <div className="form-group">
                <label>Province / State</label>

                <input
                  type="text"
                  name="province"
                  placeholder="Enter your province"
                  value={formData.province}
                  onChange={handleChange}
                />
              </div>

              {/* DISTRICT */}

              <div className="form-group">
                <label>District / City</label>

                <input
                  type="text"
                  name="district"
                  placeholder="Enter your district"
                  value={formData.district}
                  onChange={handleChange}
                />
              </div>

              {/* PHONE */}

              <div className="form-group">
                <label>Phone Number</label>

                <div className="phone-wrapper">
                  <input
                    type="text"
                    value={formData.phoneCode}
                    readOnly
                    className="phone-code"
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="98XXXXXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div className="form-group">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* MESSAGE */}

              <div className="form-group full-width">
                <label>Your Message</label>

                <textarea
                  rows="5"
                  name="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* BUTTON */}

              <button type="submit" className="contact-submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;

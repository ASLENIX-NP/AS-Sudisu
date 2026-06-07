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

  const countryPhoneRules = {
    Nepal: 10,
    India: 10,
    Bangladesh: 11,
    Pakistan: 10,
    "Sri Lanka": 9,
    Bhutan: 8,
    Maldives: 7,
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredLength = countryPhoneRules[formData.country];

    if (requiredLength && formData.phone.length !== requiredLength) {
      alert(`Phone number must contain exactly ${requiredLength} digits`);
      return;
    }

    if (formData.country === "Nepal" && !/^9[78]\d{8}$/.test(formData.phone)) {
      alert("Please enter a valid Nepal mobile number");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: `${formData.phoneCode} ${formData.phone}`,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Inquiry sent successfully");

        setFormData({
          fullName: "",
          country: "",
          province: "",
          district: "",
          phoneCode: "+977",
          phone: "",
          email: "",
          message: "",
        });
      } else {
        alert("Failed to send inquiry");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <>
      <Navbar />

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
                    value={formData.phone}
                    placeholder={
                      formData.country === "Nepal"
                        ? "9800000000"
                        : "Phone Number"
                    }
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "");

                      // Prevent user from typing country code again
                      if (
                        formData.country === "Nepal" &&
                        value.startsWith("977")
                      ) {
                        value = value.slice(3);
                      }

                      if (
                        formData.country === "India" &&
                        value.startsWith("91")
                      ) {
                        value = value.slice(2);
                      }

                      if (
                        formData.country === "Bangladesh" &&
                        value.startsWith("880")
                      ) {
                        value = value.slice(3);
                      }

                      const maxLength =
                        countryPhoneRules[formData.country] || 15;

                      value = value.slice(0, maxLength);

                      setFormData({
                        ...formData,
                        phone: value,
                      });
                    }}
                    maxLength={countryPhoneRules[formData.country] || 15}
                    required
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

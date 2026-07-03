import { useState } from "react";

import HeroNavbar from "../../components/common/HeroNavbar";
import Footer from "../../components/common/Footer";
import toast from "react-hot-toast";
import "./Contact.css";
import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
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
      toast.error(`Phone number must contain exactly ${requiredLength} digits`);
      return;
    }

    if (formData.country === "Nepal" && !/^9[78]\d{8}$/.test(formData.phone)) {
      toast.error("Please enter a valid Nepal mobile number");
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
        toast.success("Inquiry sent successfully");

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
        toast.error("Failed to send inquiry");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  return (
    <>
      <section className="contact-hero">
        <HeroNavbar as="section" className="contact-page-wrapper">
          <div className="contact-layout">
            {/* LEFT SIDE */}
            <div className="contact-info">
              <span className="blog-tag">🌶 SUDISU INFORMATION</span>{" "}
              <h1 className="company-name">SUDISU PRIDE</h1>
              <h2 className="company-slogan">
                “ स्वाद र स्वास्थ्य संगै संगै ”
              </h2>
              <p className="company-description">
                Fortune Group of Industries Pvt. Ltd. is committed to delivering
                authentic Nepali spices crafted with premium ingredients,
                traditional recipes and uncompromising quality standards.
              </p>
              <div className="contact-box">
                <a href="mailto:info@fortunegroup.com.np" className="icon-link">
                  <div className="icon-circle">
                    <FaEnvelope />
                  </div>
                </a>
                <div>
                  <h3>Email</h3>
                  <a
                    href="mailto:info@fortunegroup.com.np"
                    className="contact-link"
                  >
                    info@fortunegroup.com.np
                  </a>
                </div>
              </div>
              <div className="contact-box">
                <a
                  href="https://wa.me/9779816259642"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-box contact-box-link"
                >
                  <div className="icon-circle">
                    <FaWhatsapp />
                  </div>
                </a>

                <div>
                  <h3>WhatsApp</h3>
                  <a
                    href="https://wa.me/9779816259642"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    +977 9816259642
                  </a>
                </div>
              </div>
              <div className="contact-box">
                <a
                  href="https://www.google.com/maps?q=27.539477,84.8075733"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-box contact-box-link"
                >
                  <div className="icon-circle">
                    <FaMapMarkerAlt />
                  </div>
                </a>
                <div>
                  <h3>Location</h3>

                  <a
                    href="https://maps.google.com/?q=27.539477,84.8075733"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    Fortune Group of Industries Pvt. Ltd.
                    <br />
                    Manahari-07, Makwanpur, Nepal
                  </a>
                </div>
              </div>
              <div className="map-wrapper">
                <iframe
                  title="Fortune Group Location"
                  src="https://maps.google.com/maps?q=27.539477,84.8075733&z=17&output=embed"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
            {/* RIGHT SIDE */}
            <div className="feedback-card">
              <h2>Your Feedback Matters</h2>

              <form className="contact-form" onSubmit={handleSubmit}>
                {/* KEEP YOUR CURRENT FORM FIELDS HERE */}
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
        </HeroNavbar>
      </section>

      <Footer />
    </>
  );
};
export default Contact;

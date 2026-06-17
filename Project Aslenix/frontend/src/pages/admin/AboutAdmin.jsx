import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/AboutAdmin.css";

const AboutAdmin = () => {
  const [aboutData, setAboutData] = useState({
    companyName: "",
    foundedYear: "",
    location: "",
    email: "",
    phone: "",
    website: "",

    yearsExperience: "",
    productsCount: "",
    customersCount: "",
    districtsCount: "",

    story: "",
    mission: "",
    vision: "",
  });

  const handleChange = (e) => {
    setAboutData({
      ...aboutData,
      [e.target.name]: e.target.value,
    });
  };

  const saveAboutInfo = () => {
    console.log(aboutData);

    // save to database later
  };

  return (
    <AdminLayout>
      <div className="about-admin-page">

        <div className="about-header">
          <h1>About Us</h1>
          <p>
            Manage company information displayed on the website.
          </p>
        </div>

        {/* COMPANY INFO */}

        <div className="about-card">
          <h2>Company Information</h2>

          <div className="about-form-grid">

            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={aboutData.companyName}
              onChange={handleChange}
            />

            <input
              type="text"
              name="foundedYear"
              placeholder="Founded Year"
              value={aboutData.foundedYear}
              onChange={handleChange}
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={aboutData.location}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={aboutData.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={aboutData.phone}
              onChange={handleChange}
            />

            <input
              type="text"
              name="website"
              placeholder="Website URL"
              value={aboutData.website}
              onChange={handleChange}
            />

          </div>
        </div>

        {/* STATISTICS */}

        <div className="about-card">
          <h2>Statistics</h2>

          <div className="about-form-grid">

            <input
              type="text"
              name="yearsExperience"
              placeholder="Years of Experience"
              value={aboutData.yearsExperience}
              onChange={handleChange}
            />

            <input
              type="text"
              name="productsCount"
              placeholder="Products Count"
              value={aboutData.productsCount}
              onChange={handleChange}
            />

            <input
              type="text"
              name="customersCount"
              placeholder="Happy Customers"
              value={aboutData.customersCount}
              onChange={handleChange}
            />

            <input
              type="text"
              name="districtsCount"
              placeholder="District Coverage"
              value={aboutData.districtsCount}
              onChange={handleChange}
            />

          </div>
        </div>

        {/* STORY */}

        <div className="about-card">
          <h2>Our Story</h2>

          <textarea
            name="story"
            rows="8"
            placeholder="Write your company story..."
            value={aboutData.story}
            onChange={handleChange}
          />
        </div>

        {/* MISSION */}

        <div className="about-card">
          <h2>Mission</h2>

          <textarea
            name="mission"
            rows="5"
            placeholder="Company Mission..."
            value={aboutData.mission}
            onChange={handleChange}
          />
        </div>

        {/* VISION */}

        <div className="about-card">
          <h2>Vision</h2>

          <textarea
            name="vision"
            rows="5"
            placeholder="Company Vision..."
            value={aboutData.vision}
            onChange={handleChange}
          />
        </div>

        {/* IMAGES */}

        <div className="about-card">
          <h2>Company Images</h2>

          <div className="image-upload-grid">

            <div className="upload-box">
              About Banner
            </div>

            <div className="upload-box">
              Factory Image
            </div>

            <div className="upload-box">
              Team Image
            </div>

            <div className="upload-box">
              Production Image
            </div>

          </div>
        </div>

        <button
          className="save-about-btn"
          onClick={saveAboutInfo}
        >
          Save About Information
        </button>

      </div>
    </AdminLayout>
  );
};

export default AboutAdmin;
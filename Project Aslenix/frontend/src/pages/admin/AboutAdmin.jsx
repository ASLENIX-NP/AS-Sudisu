import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/AboutAdmin.css";

const AboutAdmin = () => {
const [images, setImages] = useState({
  
  banner: null,
  factory: null,
  team: null,
  production: null,
});
const [isDragging, setIsDragging] = useState(false);
const handleDragOver = (e) => {
  e.preventDefault();
  setIsDragging(true);
};

const handleDragLeave = (e) => {
  e.preventDefault();
  setIsDragging(false);
};

const handleDrop = (e) => {
  e.preventDefault();

  setIsDragging(false);

  const files = Array.from(e.dataTransfer.files);

  if (!files.length) return;

  const keys = ["banner", "factory", "team", "production"];

  const updated = { ...images };

  files.slice(0, 4).forEach((file, index) => {
    updated[keys[index]] = URL.createObjectURL(file);
  });

  setImages(updated);
};
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
const handleImageUpload = (e, key) => {
  const file = e.target.files[0];

  if (!file) return;

  setImages((prev) => ({
    ...prev,
    [key]: URL.createObjectURL(file),
  }));
};
const removeImage = (key) => {
  setImages((prev) => ({
    ...prev,
    [key]: null,
  }));
};
  const saveAboutInfo = () => {
    console.log(aboutData);

    // save to database later
  };

  return (
    <AdminLayout>
      <div className="about-admin-page">

 <div className="about-header">

  <div className="about-header-left">

    <span className="about-badge">
      🏢 Company Management
    </span>

    <h1>About Company</h1>

    <p>
      Manage your company information, statistics, branding,
      images and website content from one place.
    </p>

  </div>

  <div className="about-header-right">

    <button className="preview-btn">
      👁 Preview Website
    </button>

  </div>

</div>
        {/* COMPANY INFO */}

<div className="about-card">

  <div className="about-card-header">

    <div className="card-title">

      <div className="card-icon">
        🏢
      </div>

      <div>
        <h2>Company Information</h2>
        <p>Basic information displayed across your website.</p>
      </div>

    </div>

  </div>

  <div className="about-form-grid">

    <div className="form-group">
      <label>Company Name</label>
      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={aboutData.companyName}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Founded Year</label>
      <input
        type="text"
        name="foundedYear"
        placeholder="Founded Year"
        value={aboutData.foundedYear}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Location</label>
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={aboutData.location}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Email</label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={aboutData.email}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Phone Number</label>
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={aboutData.phone}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Website</label>
      <input
        type="text"
        name="website"
        placeholder="Website URL"
        value={aboutData.website}
        onChange={handleChange}
      />
    </div>

  </div>

</div>
      {/* STATISTICS */}

<div className="about-card">

  <div className="about-card-header">

    <div className="card-title">

      <div className="card-icon">
        📊
      </div>

      <div>
        <h2>Company Statistics</h2>
        <p>Display important numbers on your website.</p>
      </div>

    </div>

  </div>

  <div className="stats-grid">

    <div className="stat-box">
      <span>⭐ Years of Experience</span>

      <input
        type="number"
        name="yearsExperience"
        value={aboutData.yearsExperience}
        onChange={handleChange}
        placeholder="15"
      />
    </div>

    <div className="stat-box">
      <span>📦 Products</span>

      <input
        type="number"
        name="productsCount"
        value={aboutData.productsCount}
        onChange={handleChange}
        placeholder="120"
      />
    </div>

    <div className="stat-box">
      <span>😊 Happy Customers</span>

      <input
        type="number"
        name="customersCount"
        value={aboutData.customersCount}
        onChange={handleChange}
        placeholder="8500"
      />
    </div>

    <div className="stat-box">
      <span>📍 District Coverage</span>

      <input
        type="number"
        name="districtsCount"
        value={aboutData.districtsCount}
        onChange={handleChange}
        placeholder="77"
      />
    </div>

  </div>

</div>

       
        {/* STORY */}

<div className="about-card">

  <div className="about-card-header">

    <div className="card-title">

      <div className="card-icon">
        📖
      </div>

      <div>
        <h2>Our Story</h2>
        <p>Describe your company's journey and history.</p>
      </div>

    </div>

  </div>

<textarea
    className="about-editor"
    name="story"
    value={aboutData.story}
    onChange={handleChange}
    placeholder="Tell your company's story..."
/>
</div>

        {/* MISSION */}
        

      <div className="about-card">

  <div className="about-card-header">

    <div className="card-title">

      <div className="card-icon">
        🎯
      </div>
      <div>
        <h2>Mission</h2>
        <p>Your company's purpose and commitment.</p>
      </div>
    </div>
  </div>

 <textarea
    className="about-editor"
    name="mission"
    value={aboutData.mission}
    onChange={handleChange}
    placeholder="Write your company mission..."
/>
</div>

        {/* VISION */}

  <div className="about-card">

  <div className="about-card-header">

    <div className="card-title">

      <div className="card-icon">
        🚀
      </div>

      <div>
        <h2>Vision</h2>
        <p>Your long-term goals and future direction.</p>
      </div>

    </div>

  </div>

 <textarea
    className="about-editor"
    name="vision"
    value={aboutData.vision}
    onChange={handleChange}
    placeholder="Write your company vision..."
/>

</div>
{/* COMPANY IMAGES */}

<div className="about-card">

  <div className="about-card-header">

    <div className="card-title">

      <div className="card-icon">🖼️</div>

      <div>
        <h2>Company Images</h2>
        <p>Upload images that will be displayed on your website.</p>
      </div>

    </div>

  </div>

  {/* Drag & Drop Area */}

  <div
    className={`drag-upload-zone ${isDragging ? "dragging" : ""}`}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
  >

    <div className="drag-icon">☁️</div>

    <h3>Drag & Drop Images Here</h3>

    <p>or click to browse</p>

    <small>
      Supports JPG, PNG, WEBP (Max 5MB)
    </small>

    <input
      type="file"
      multiple
      accept="image/*"
      onChange={(e) => {

        const files = Array.from(e.target.files);

        const keys = [
          "banner",
          "factory",
          "team",
          "production",
        ];

        const updated = { ...images };

        files.slice(0, 4).forEach((file, index) => {
          updated[keys[index]] = URL.createObjectURL(file);
        });

        setImages(updated);

      }}
    />

  </div>

  {/* Upload Cards */}

  <div className="image-upload-grid">

    {[
      {
        title: "About Banner",
        key: "banner",
      },
      {
        title: "Factory Image",
        key: "factory",
      },
      {
        title: "Team Image",
        key: "team",
      },
      {
        title: "Production Image",
        key: "production",
      },
    ].map((item) => (

      <div
        className="upload-card"
        key={item.key}
      >

        <div className="upload-preview">

          {images[item.key] ? (

            <>

              <img
                src={images[item.key]}
                alt={item.title}
              />

              <button
                type="button"
                className="remove-image-btn"
                onClick={() => removeImage(item.key)}
              >
                ✕
              </button>

            </>

          ) : (

            <span>📷</span>

          )}

        </div>

        <h4>{item.title}</h4>

        <p>
          {images[item.key]
            ? "Image uploaded ✓"
            : "No image uploaded"}
        </p>

        <label className="upload-btn">

          {images[item.key]
            ? "📤 Change Image"
            : "📤 Upload Image"}

          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) =>
              handleImageUpload(e, item.key)
            }
          />

        </label>

      </div>

    ))}

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
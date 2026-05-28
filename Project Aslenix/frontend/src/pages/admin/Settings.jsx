import AdminLayout from "../../layouts/AdminLayout";
import { useEffect, useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    companyName: "SUDIISU",
    email: "sudiisu@gmail.com",
    phone: "+977 9800000000",
    address: "Kathmandu, Nepal",
    heroTitle: "Premium Nepali Masala",
    heroSubtitle: "Bringing Pure Flavor to Your Kitchen",
    facebook: "",
    instagram: "",
    tiktok: "",
  });

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

  /* =========================
     HANDLE INPUT CHANGE
  ========================= */

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================
     SAVE SETTINGS
  ========================= */

  const handleSave = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/settings",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(settings),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Settings Saved Successfully ✅");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to save settings");
    }
  };

  /* =========================
     INPUT STYLE
  ========================= */

  const inputStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "#334155",
    color: "white",
    fontSize: "15px",
  };

  return (
    <AdminLayout>
      <div
        style={{
          padding: "30px",
          color: "white",
        }}
      >
        {/* HEADER */}

        <div
          style={{
            marginBottom: "35px",
          }}
        >
          <h1
            style={{
              fontSize: "40px",
              marginBottom: "10px",
            }}
          >
            Website Settings ⚙️
          </h1>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Manage your website and business information.
          </p>
        </div>

        {/* SETTINGS BOX */}

        <div
          style={{
            background: "#1e293b",
            padding: "30px",
            borderRadius: "18px",
          }}
        >
          {/* BUSINESS INFO */}

          <h2 style={{ marginBottom: "20px" }}>
            Business Information
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginBottom: "35px",
            }}
          >
            <input
              type="text"
              name="companyName"
              value={settings.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              style={inputStyle}
            />

            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              placeholder="Business Email"
              style={inputStyle}
            />

            <input
              type="text"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              style={inputStyle}
            />

            <input
              type="text"
              name="address"
              value={settings.address}
              onChange={handleChange}
              placeholder="Business Address"
              style={inputStyle}
            />
          </div>

          {/* HERO CONTENT */}

          <h2 style={{ marginBottom: "20px" }}>
            Homepage Content
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginBottom: "35px",
            }}
          >
            <input
              type="text"
              name="heroTitle"
              value={settings.heroTitle}
              onChange={handleChange}
              placeholder="Hero Title"
              style={inputStyle}
            />

            <textarea
              name="heroSubtitle"
              value={settings.heroSubtitle}
              onChange={handleChange}
              placeholder="Hero Subtitle"
              rows="4"
              style={{
                ...inputStyle,
                resize: "none",
              }}
            />
          </div>

          {/* SOCIAL LINKS */}

          <h2 style={{ marginBottom: "20px" }}>
            Social Media Links
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            <input
              type="text"
              name="facebook"
              value={settings.facebook}
              onChange={handleChange}
              placeholder="Facebook Link"
              style={inputStyle}
            />

            <input
              type="text"
              name="instagram"
              value={settings.instagram}
              onChange={handleChange}
              placeholder="Instagram Link"
              style={inputStyle}
            />

            <input
              type="text"
              name="tiktok"
              value={settings.tiktok}
              onChange={handleChange}
              placeholder="TikTok Link"
              style={inputStyle}
            />
          </div>

          {/* SAVE BUTTON */}

          <button
            onClick={handleSave}
            style={{
              marginTop: "35px",
              background: "#facc15",
              color: "black",
              border: "none",
              padding: "14px 28px",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Save Settings
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
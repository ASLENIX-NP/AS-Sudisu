import AdminLayout from "../../layouts/AdminLayout";
import { useEffect, useState } from "react";
import "../../styles/Settings.css";
import toast from "react-hot-toast";

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

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

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

    if (!data.success) {
      toast.error("Failed to save settings");
      return;
    }

    toast.success(
      "Settings updated successfully"
    );
  } catch (error) {
    console.log(error);
    toast.error("Failed to save settings");
  }
};

  return (
    <AdminLayout>
      <div className="settings-page">

        <div className="settings-header">
          <h1 className="settings-title">
            Website Settings
          </h1>

          <p className="settings-subtitle">
            Manage your website and business information.
          </p>
        </div>

        <div className="settings-stats">

          <div className="settings-stat-card">
            <span>Business Info</span>
            <h2>4</h2>
          </div>

          <div className="settings-stat-card">
            <span>Homepage Fields</span>
            <h2>2</h2>
          </div>

          <div className="settings-stat-card">
            <span>Social Links</span>
            <h2>3</h2>
          </div>

        </div>

        <div className="settings-card">

          <h2>Business Information</h2>

          <div className="settings-grid">
            <input
              type="text"
              name="companyName"
              value={settings.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              className="settings-input"
            />

            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              placeholder="Business Email"
              className="settings-input"
            />

            <input
              type="text"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="settings-input"
            />

            <input
              type="text"
              name="address"
              value={settings.address}
              onChange={handleChange}
              placeholder="Business Address"
              className="settings-input"
            />
          </div>

          <h2>Homepage Content</h2>

          <div className="settings-column">
            <input
              type="text"
              name="heroTitle"
              value={settings.heroTitle}
              onChange={handleChange}
              placeholder="Hero Title"
              className="settings-input"
            />

            <textarea
              name="heroSubtitle"
              value={settings.heroSubtitle}
              onChange={handleChange}
              placeholder="Hero Subtitle"
              rows="4"
              className="settings-textarea"
            />
          </div>

          <h2>Social Media Links</h2>

          <div className="settings-grid">
            <input
              type="text"
              name="facebook"
              value={settings.facebook}
              onChange={handleChange}
              placeholder="Facebook Link"
              className="settings-input"
            />

            <input
              type="text"
              name="instagram"
              value={settings.instagram}
              onChange={handleChange}
              placeholder="Instagram Link"
              className="settings-input"
            />

            <input
              type="text"
              name="tiktok"
              value={settings.tiktok}
              onChange={handleChange}
              placeholder="TikTok Link"
              className="settings-input"
            />
          </div>

          <button
            onClick={handleSave}
            className="settings-save-btn"
          >
            Save Settings
          </button>

        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
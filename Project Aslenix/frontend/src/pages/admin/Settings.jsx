import AdminLayout from "../../layouts/AdminLayout";
import { useEffect, useState } from "react";
import "../../styles/Settings.css";
import toast from "react-hot-toast";

const Settings = () => {
  const [settings, setSettings] = useState({
    // Business Information
    companyName: "SUDISU",
    email: "info@fortunegroup.com.np",
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
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/settings");
      const data = await response.json();

      if (data.success && data.settings) {
        setSettings((prev) => ({ ...prev, ...data.settings }));
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
      console.log(settings);
      const response = await fetch("http://localhost:5000/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      const data = await response.json();

      if (!data.success) {
        toast.error("Failed to save settings");
        return;
      }

      toast.success("Settings updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to save settings");
    }
  };

  return (
    <AdminLayout>
      <div className="settings-page">
        <div className="settings-header">
          <h1 className="settings-title">Website Settings</h1>
          <p className="settings-subtitle">
            Manage your website and business information.
          </p>
        </div>

        <div className="settings-stats">
          <div className="settings-stat-card business-card">
            <span>🏢 Business Info</span>
            <h2>6</h2>
            <small>Fields Configured</small>
          </div>

          <div className="settings-stat-card homepage-card">
            <span>🦶 Footer Content</span>
            <h2>5</h2>
            <small>Sections Updated</small>
          </div>

          <div className="settings-stat-card social-card">
            <span>🌐 Connected Networks</span>
            <h2>6</h2>
            <small>Social Links</small>
          </div>
        </div>

        {/* Business Information */}
        <div className="settings-section">
          <h2>🏢 Business Information</h2>
          <p className="section-desc">
            Manage company identity and contact details.
          </p>
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
            <input
              type="text"
              name="whatsappNumber"
              value={settings.whatsappNumber}
              onChange={handleChange}
              placeholder="WhatsApp Number"
              className="settings-input"
            />
            <input
              type="text"
              name="mapLink"
              value={settings.mapLink}
              onChange={handleChange}
              placeholder="Google Map Link"
              className="settings-input"
            />
          </div>
        </div>

        {/* Footer Content */}
        <div className="settings-section">
          <h2>🦶 Footer Content</h2>
          <p className="section-desc">
            Manage all text displayed in the footer.
          </p>
          <div className="settings-column">
            <input
              type="text"
              name="footerHeading"
              value={settings.footerHeading}
              onChange={handleChange}
              placeholder="Footer Heading (Top Banner)"
              className="settings-input"
            />
            <textarea
              name="footerDescription"
              value={settings.footerDescription}
              onChange={handleChange}
              rows="3"
              placeholder="Footer Description"
              className="settings-textarea"
            />
            <input
              type="text"
              name="footerButtonText"
              value={settings.footerButtonText}
              onChange={handleChange}
              placeholder="Business Button Text"
              className="settings-input"
            />
            <input
              type="text"
              name="footerExploreButton"
              value={settings.footerExploreButton}
              onChange={handleChange}
              placeholder="Explore Button Text"
              className="settings-input"
            />
            <input
              type="text"
              name="footerCopyright"
              value={settings.footerCopyright}
              onChange={handleChange}
              placeholder="Copyright Text"
              className="settings-input"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="settings-section">
          <h2>🔗 Quick Links</h2>
          <p className="section-desc">
            Manage navigation links displayed in the footer.
          </p>
          <div className="settings-grid">
            <input
              type="text"
              name="quickLink1Name"
              value={settings.quickLink1Name}
              onChange={handleChange}
              placeholder="Quick Link 1 Name"
              className="settings-input"
            />
            <input
              type="text"
              name="quickLink1Url"
              value={settings.quickLink1Url}
              onChange={handleChange}
              placeholder="Quick Link 1 URL"
              className="settings-input"
            />
            <input
              type="text"
              name="quickLink2Name"
              value={settings.quickLink2Name}
              onChange={handleChange}
              placeholder="Quick Link 2 Name"
              className="settings-input"
            />
            <input
              type="text"
              name="quickLink2Url"
              value={settings.quickLink2Url}
              onChange={handleChange}
              placeholder="Quick Link 2 URL"
              className="settings-input"
            />
            <input
              type="text"
              name="quickLink3Name"
              value={settings.quickLink3Name}
              onChange={handleChange}
              placeholder="Quick Link 3 Name"
              className="settings-input"
            />
            <input
              type="text"
              name="quickLink3Url"
              value={settings.quickLink3Url}
              onChange={handleChange}
              placeholder="Quick Link 3 URL"
              className="settings-input"
            />
            <input
              type="text"
              name="quickLink4Name"
              value={settings.quickLink4Name}
              onChange={handleChange}
              placeholder="Quick Link 4 Name"
              className="settings-input"
            />
            <input
              type="text"
              name="quickLink4Url"
              value={settings.quickLink4Url}
              onChange={handleChange}
              placeholder="Quick Link 4 URL"
              className="settings-input"
            />
          </div>
        </div>

        {/* Social Media */}
        <div className="settings-section">
          <h2>🌐 Social Media</h2>
          <p className="section-desc">
            Add your social media links. Leave empty to hide the icon.
          </p>
          <div className="settings-grid">
            <input
              type="text"
              name="facebook"
              value={settings.facebook}
              onChange={handleChange}
              placeholder="Facebook URL"
              className="settings-input"
            />
            <input
              type="text"
              name="instagram"
              value={settings.instagram}
              onChange={handleChange}
              placeholder="Instagram URL"
              className="settings-input"
            />
            <input
              type="text"
              name="whatsapp"
              value={settings.whatsapp}
              onChange={handleChange}
              placeholder="WhatsApp URL"
              className="settings-input"
            />
            <input
              type="text"
              name="tiktok"
              value={settings.tiktok}
              onChange={handleChange}
              placeholder="TikTok URL"
              className="settings-input"
            />
            <input
              type="text"
              name="linkedin"
              value={settings.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn URL"
              className="settings-input"
            />
            <input
              type="text"
              name="youtube"
              value={settings.youtube}
              onChange={handleChange}
              placeholder="YouTube URL"
              className="settings-input"
            />
          </div>
        </div>

        {/* Footer Contact Information */}
        <div className="settings-section">
          <h2>📞 Footer Contact Information</h2>
          <p className="section-desc">
            Contact details displayed in the footer.
          </p>
          <div className="settings-grid">
            <input
              type="text"
              name="footerPhone"
              value={settings.footerPhone}
              onChange={handleChange}
              placeholder="Footer Phone Number"
              className="settings-input"
            />
            <input
              type="email"
              name="footerEmail"
              value={settings.footerEmail}
              onChange={handleChange}
              placeholder="Footer Email"
              className="settings-input"
            />
            <input
              type="text"
              name="footerAddress"
              value={settings.footerAddress}
              onChange={handleChange}
              placeholder="Footer Address"
              className="settings-input"
            />
            <input
              type="text"
              name="footerMapLink"
              value={settings.footerMapLink}
              onChange={handleChange}
              placeholder="Footer Google Map Link"
              className="settings-input"
            />
          </div>
        </div>

        <div className="settings-actions">
          <button onClick={handleSave} className="settings-save-btn">
            Save Changes
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;

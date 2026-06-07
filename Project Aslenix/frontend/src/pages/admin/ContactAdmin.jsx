import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/ContactAdmin.css";

const ContactAdmin = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
    whatsapp: "",
    facebook: "",
    instagram: "",
    tiktok: "",
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    const { data, error } = await supabase
      .from("contact_settings")
      .select("*")
      .eq("id", 1)
      .single();

    if (!error && data) {
      setFormData(data);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveSettings = async () => {
    const { error } = await supabase
      .from("contact_settings")
      .update({
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        whatsapp: formData.whatsapp,
        facebook: formData.facebook,
        instagram: formData.instagram,
        tiktok: formData.tiktok,
      })
      .eq("id", 1);

    if (error) {
      alert("Failed to save");
      console.log(error);
      return;
    }

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <AdminLayout>
      <div className="contact-page">

        <div className="contact-header">
          <h1 className="contact-title">
            Contact Settings
          </h1>

          <p className="contact-subtitle">
            Manage public contact information and social media links.
          </p>
        </div>

        <div className="contact-stats">
          <div className="contact-stat-card">
            <span>Email</span>
            <h2>✓</h2>
          </div>

          <div className="contact-stat-card">
            <span>Phone</span>
            <h2>✓</h2>
          </div>

          <div className="contact-stat-card">
            <span>Social Links</span>
            <h2>4</h2>
          </div>
        </div>

        <div className="contact-card">

          {saved && (
            <div className="contact-success">
              Contact settings updated successfully.
            </div>
          )}

          <div className="contact-section">
            <h3>Business Contact</h3>

            <div className="contact-grid">
              <input
                className="contact-input"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />

              <input
                className="contact-input"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <input
                className="contact-input"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="contact-section">
            <h3>Social Media Links</h3>

            <div className="contact-grid">
              <input
                className="contact-input"
                name="whatsapp"
                placeholder="WhatsApp"
                value={formData.whatsapp}
                onChange={handleChange}
              />

              <input
                className="contact-input"
                name="facebook"
                placeholder="Facebook"
                value={formData.facebook}
                onChange={handleChange}
              />

              <input
                className="contact-input"
                name="instagram"
                placeholder="Instagram"
                value={formData.instagram}
                onChange={handleChange}
              />

              <input
                className="contact-input"
                name="tiktok"
                placeholder="TikTok"
                value={formData.tiktok}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            className="contact-save-btn"
            onClick={saveSettings}
          >
            Save Contact Settings
          </button>

        </div>
      </div>
    </AdminLayout>
  );
};

export default ContactAdmin;
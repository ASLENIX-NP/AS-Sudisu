import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/ContactAdmin.css";
import toast from "react-hot-toast";

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
  toast.error("Failed to save contact settings");
  console.log(error);
  return;
}

    toast.success("Contact settings saved successfully");
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

 <div className="contact-stat-card email-card">
  <div className="stat-icon">
    📧
  </div>

  <div>
    <p className="stat-label">
      Business Email
    </p>

    <h2 className="stat-number">
      {formData.email || "Not Set"}
    </h2>
  </div>
</div>

<div className="contact-stat-card phone-card">
  <div className="stat-icon">
    📱
  </div>

  <div>
    <p className="stat-label">
      Contact Number
    </p>

    <h2 className="stat-number">
      {formData.phone || "Not Set"}
    </h2>
  </div>
</div>

<div className="contact-stat-card social-card">
  <div className="stat-icon">
    🌐
  </div>

  <div>
    <p className="stat-label">
      Social Platforms
    </p>

    <h2 className="stat-number">
      {
        [
          formData.whatsapp,
          formData.facebook,
          formData.instagram,
          formData.tiktok,
        ].filter(Boolean).length
      }
    </h2>
  </div>
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
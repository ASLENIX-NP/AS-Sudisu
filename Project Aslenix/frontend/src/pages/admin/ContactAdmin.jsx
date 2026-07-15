import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/ContactAdmin.css";
import toast from "react-hot-toast";

const defaultContactDetails = {
  contactCompanyName: "SUDISU PRIDE",
  contactSlogan: "स्वाद र स्वास्थ्य संगै संगै",
  contactDescription:
    "Fortune Group of Industries Pvt. Ltd. is committed to delivering authentic Nepali spices crafted with premium ingredients, traditional recipes and uncompromising quality standards.",
  email: "info@fortunegroup.com.np",
  whatsapp: "+977 9816259642",
  address: "Fortune Group of Industries Pvt. Ltd., Manahari-07, Makwanpur, Nepal",
  contactMapUrl: "https://www.google.com/maps?q=27.539477,84.8075733",
};

const ContactAdmin = () => {
  const [formData, setFormData] = useState(defaultContactDetails);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/settings");
        const data = await response.json();

        if (data.success && data.settings) {
          setFormData((current) => ({ ...current, ...data.settings }));
        }
      } catch (error) {
        console.error("Failed to load contact settings:", error);
        toast.error("Failed to load contact settings");
      }
    };

    fetchContact();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const saveSettings = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactCompanyName: formData.contactCompanyName,
          contactSlogan: formData.contactSlogan,
          contactDescription: formData.contactDescription,
          email: formData.email,
          whatsapp: formData.whatsapp,
          address: formData.address,
          contactMapUrl: formData.contactMapUrl,
        }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message);

      setFormData((current) => ({ ...current, ...data.settings }));
      setSaved(true);
      toast.success("Company contact details saved successfully");
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Failed to save contact settings:", error);
      toast.error("Failed to save company contact details");
    }
  };

  return (
    <AdminLayout>
      <div className="contact-page">
        <div className="contact-header">
          <h1 className="contact-title">Company Contact Details</h1>
          <p className="contact-subtitle">
            Manage the information displayed on the public Contact page.
          </p>
        </div>

        <div className="contact-stats">
          <div className="contact-stat-card email-card">
            <div className="stat-icon">🏢</div>
            <div>
              <p className="stat-label">Company Name</p>
              <h2 className="stat-number">
                {formData.contactCompanyName || "Not Set"}
              </h2>
            </div>
          </div>

          <div className="contact-stat-card phone-card">
            <div className="stat-icon">📧</div>
            <div>
              <p className="stat-label">Business Email</p>
              <h2 className="stat-number">{formData.email || "Not Set"}</h2>
            </div>
          </div>

          <div className="contact-stat-card social-card">
            <div className="stat-icon">💬</div>
            <div>
              <p className="stat-label">WhatsApp</p>
              <h2 className="stat-number">{formData.whatsapp || "Not Set"}</h2>
            </div>
          </div>
        </div>

        <div className="contact-card">
          {saved && (
            <div className="contact-success">
              Company contact details updated successfully.
            </div>
          )}

          <div className="contact-section">
            <h3>Company Information</h3>
            <div className="contact-grid">
              <input className="contact-input" name="contactCompanyName" placeholder="Company name" value={formData.contactCompanyName} onChange={handleChange} />
              <input className="contact-input" name="contactSlogan" placeholder="Company slogan" value={formData.contactSlogan} onChange={handleChange} />
              <textarea className="contact-input contact-textarea" name="contactDescription" placeholder="Company description" value={formData.contactDescription} onChange={handleChange} />
            </div>
          </div>

          <div className="contact-section">
            <h3>Contact Information</h3>
            <div className="contact-grid">
              <input className="contact-input" name="email" type="email" placeholder="Business email" value={formData.email} onChange={handleChange} />
              <input className="contact-input" name="whatsapp" placeholder="WhatsApp number" value={formData.whatsapp} onChange={handleChange} />
              <textarea className="contact-input contact-textarea" name="address" placeholder="Business address" value={formData.address} onChange={handleChange} />
              <input className="contact-input" name="contactMapUrl" type="url" placeholder="Google Maps link" value={formData.contactMapUrl} onChange={handleChange} />
            </div>
          </div>

          <button className="contact-save-btn" onClick={saveSettings}>
            Save Company Details
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContactAdmin;

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import AdminLayout from "../../layouts/AdminLayout";

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

    alert("Contact Settings Updated ✅");
  };

  return (
  <AdminLayout>
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1
        style={{
          fontSize: "42px",
          fontWeight: "700",
          color: "#0f172a",
          marginBottom: "25px",
        }}
      >
        Contact Settings 📞
      </h1>

      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "20px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          width: "250px",
        }}
      >
        <h3
          style={{
            color: "#64748b",
            margin: 0,
            fontSize: "14px",
          }}
        >
          Contact Fields
        </h3>

        <h1
          style={{
            margin: "10px 0 0",
            color: "#0f172a",
            fontSize: "36px",
          }}
        >
          7
        </h1>
      </div>

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          padding: "25px",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="whatsapp"
          placeholder="WhatsApp"
          value={formData.whatsapp}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="facebook"
          placeholder="Facebook"
          value={formData.facebook}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="instagram"
          placeholder="Instagram"
          value={formData.instagram}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="tiktok"
          placeholder="TikTok"
          value={formData.tiktok}
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          onClick={saveSettings}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "14px",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Save Contact Settings
        </button>
      </div>
    </div>
  </AdminLayout>
);
};

const inputStyle = {
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  background: "#f8fafc",
  color: "#0f172a",
  outline: "none",
};

export default ContactAdmin;
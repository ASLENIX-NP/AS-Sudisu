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
          color: "white",
        }}
      >
        <h1
          style={{
            marginBottom: "30px",
          }}
        >
          Contact Settings 📞
        </h1>

        <div
          style={{
            background: "#111c44",
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
              background: "#facc15",
              color: "black",
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
  border: "none",
  background: "#1e2b5c",
  color: "white",
};

export default ContactAdmin;
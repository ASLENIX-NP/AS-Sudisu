import { useState, useEffect } from "react";
import axios from "axios";
import "./Certificates.css";
import AdminLayout from "../../layouts/AdminLayout";

const Certificates = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/certificates");
      setCertificates(res.data);
    } catch (err) {
      console.log(err);
    }
  };

const submit = async () => {
  try {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image); // file

    const res = await axios.post(
      "http://localhost:5000/api/certificates",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("UPLOAD SUCCESS:", res.data);

    alert("Certificate Added");

    setTitle("");
    setDescription("");
    setImage(null);

    fetchCertificates();
  } catch (err) {
    console.log("UPLOAD ERROR:", err);
    alert("Error saving certificate");
  }
};

  return (
    <AdminLayout>
      <div className="cert-admin-page">
        <h1>Manage Certificates</h1>

        {/* FORM */}
        <div className="cert-form">
          <h2>Manage Certificates</h2>

          <div className="cert-form-grid">
            <input
              placeholder="Certificate Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>

          <textarea
            placeholder="Description of the certificate"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button onClick={submit}>Add Certificate</button>
        </div>

        {/* LIST */}
        <div className="cert-grid">
          {certificates.map((c) => (
            <div key={c.id} className="cert-card">
              {/* TITLE TOP */}
              <h3 className="cert-title">{c.title}</h3>

              {/* IMAGE MIDDLE */}
              <div className="cert-image-box">
                <img src={c.image_url} alt="" />
              </div>

              {/* DESCRIPTION BOTTOM */}
              <p className="cert-desc">{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Certificates;

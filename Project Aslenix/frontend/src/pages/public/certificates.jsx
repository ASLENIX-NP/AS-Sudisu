import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./certificates.css"
const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const navigate = useNavigate(); // ✅ CORRECT PLACE

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const res = await fetch("YOUR_API/certificates");
      const data = await res.json();
      setCertificates(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="cert-page">
      <h1>Our Certifications</h1>

      {/* GRID */}
      <div className="cert-grid">
        {certificates.map((cert) => (
          <div
            key={cert._id}
            onClick={() => navigate(`/certificates/${cert._id}`)}
            style={{ cursor: "pointer" }}
          >
            <img src={cert.image} alt={cert.title} />

            <h3>{cert.title}</h3>

            <p>
              {cert.description ? cert.description.slice(0, 80) + "..." : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;

import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import HeroNavbar from "../../components/common/HeroNavbar";
import Footer from "../../components/common/Footer";

import "./certificatedetail.css";

const CertificateDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const [certificate, setCertificate] = useState(
    location.state?.certificate || null,
  );

  useEffect(() => {
    if (!certificate) {
      fetchCertificate();
    }
  }, [id]);

  const fetchCertificate = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_API_BASE_URL + "/certificates");

      const found = res.data.find((item) => item.id === Number(id));

      setCertificate(found);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <HeroNavbar as="section" className="certificate-details-page">
        {certificate ? (
          <div className="certificate-container">
            <div className="certificate-left">
              <img src={certificate.image_url} alt={certificate.title} />
            </div>

            <div className="certificate-right">
              <span className="certificate-badge">Quality Certification</span>

              <h1>{certificate.title}</h1>

              <p>{certificate.description}</p>
            </div>
          </div>
        ) : (
          <div className="certificate-loading">
            <span className="certificate-badge">Quality Certification</span>
            <h1>Loading Certificate</h1>
            <p>Please wait while we prepare the certificate details.</p>
          </div>
        )}
      </HeroNavbar>
    </>
  );
};

export default CertificateDetails;

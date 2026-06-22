import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import HeroNavbar from "../../components/common/HeroNavbar";
import Footer from "../../components/common/Footer";

import "./certificatedetail.css";

const CertificateDetails = () => {
  const { id } = useParams();

  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    fetchCertificate();
  }, []);

  const fetchCertificate = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/certificates");

      const found = res.data.find((item) => item.id === Number(id));

      setCertificate(found);
    } catch (err) {
      console.log(err);
    }
  };

  if (!certificate) return <h2>Loading...</h2>;

  return (
    <>
      <HeroNavbar as="section" className="certificate-details-page">
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
      </HeroNavbar>

   
    </>
  );
};

export default CertificateDetails;

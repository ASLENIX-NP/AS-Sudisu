import HeroNavbar from "../../components/common/HeroNavbar";
import Footer from "../../components/common/Footer";
import { useNavigate } from "react-router-dom";

import "./Blog.css";

import blogImage from "../../assets/images/sudisuPH3.jpg";

import { useEffect, useState } from "react";
import axios from "axios";

const Blog = () => {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
const [selectedPost, setSelectedPost] = useState(null);
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

  return (
    <>
      <section className="sudisu-blog-section">
        {/* TOP CONTENT */}

        <HeroNavbar as="section" className="sudisu-blog-hero">
          <div className="sudisu-blog-container">
            {" "}
           
          </div>
        </HeroNavbar>

        {/* WHY SUDISU */}

        <div className="sudisu-blog-bottom">
          <div className="bottom-card">
            <h2>Why Families Choose Sudisu</h2>

            <p>
              Trusted by households who value authentic taste and purity, Sudisu
              spices are made to bring warmth, tradition, and healthy flavor
              into every kitchen. Our commitment to quality ensures that every
              meal becomes richer, fresher, and more memorable.
            </p>
          </div>
        </div>

        {/* CERTIFICATES */}

        <div className="cert-section">
          <div className="cert-header">
            <span className="cert-tag">QUALITY ASSURANCE</span>
            <h2>Our Certifications & Trust Marks</h2>
            <p>
              We maintain strict quality standards and follow approved food
              safety practices to ensure every Sudisu product reaches your
              family with purity, freshness, and trust.
            </p>
          </div>

          {certificates.length === 0 ? (
            <div className="cert-empty">
              Certificates will be available soon.{" "}
            </div>
          ) : (
            <div className="cert-grid">
              {certificates.map((item) => (
                <div key={item.id} className="cert-card">
                  <div className="cert-image-wrapper">
                    <img src={item.image_url} alt={item.title} />
                  </div>

                  <div className="cert-content">
                    <h3>{item.title}</h3>

                    <p>{item.description}</p>

                    <button
                      className="cert-view-btn"
                      onClick={() => setSelectedCertificate(item)}
                    >
                      View Certificate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      {selectedCertificate && (
        <div
          className="certificate-modal-overlay"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="certificate-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="certificate-close-btn"
              onClick={() => setSelectedCertificate(null)}
            >
              ×
            </button>

            <img
              src={selectedCertificate.image_url}
              alt={selectedCertificate.title}
            />

            <h3>{selectedCertificate.title}</h3>

            <p>{selectedCertificate.description}</p>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Blog;

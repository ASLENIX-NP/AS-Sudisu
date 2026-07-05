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
            <div className="sudisu-blog-text">
              <span className="blog-tag">🌶 SUDISU SPICES BLOG</span>
              <h1>
                Bringing Authentic
                <span> Nepali Flavors </span>
                To Every Kitchen
              </h1>
              <p className="hero-description">
                Discover the stories behind our spices, traditional recipes,
                quality standards, and the passion that goes into every Sudisu
                product.
              </p>
              <div className="blog-highlights">
                <div className="highlight-card">
                  <h3>100% Pure</h3>
                  <p>Carefully sourced premium ingredients.</p>
                </div>

                <div className="highlight-card">
                  <h3>Authentic Taste</h3>
                  <p>Traditional Nepali recipes and flavors.</p>
                </div>

                <div className="highlight-card">
                  <h3>Trusted Quality</h3>
                  <p>Certified and quality-tested products.</p>
                </div>
              </div>
              <button
                className="blog-cta-btn"
                onClick={() => navigate("/about")}
              >
                Explore Our Story
              </button>{" "}
            </div>
            {/* RIGHT SIDE IMAGE */}
            <div className="sudisu-blog-image">
              <div className="product-showcase-3d">
                <img src={blogImage} alt="Sudisu Products" />
              </div>
            </div>
          </div>
        </HeroNavbar>

        {/* WHY SUDISU */}

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
            <div className="certificates-showcase">
              {certificates.map((item, index) => (
                <div
                  key={item.id}
                  className={`certificate-showcase ${
                    index % 2 !== 0 ? "reverse" : ""
                  }`}
                >
                  <div className="certificate-image">
                    <img src={item.image_url} alt={item.title} />
                  </div>

                  <div className="certificate-info">
                    <span className="certificate-badge">
                      Quality Certificate
                    </span>

                    <h3>{item.title}</h3>

                    <p>{item.description}</p>

                    <button
                      className="cert-view-btn"
                      onClick={() => navigate(`/certificate/${item.id}`)}
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

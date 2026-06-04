import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useNavigate } from "react-router-dom";

import "./Blog.css";

import blogImage from "../../assets/images/sudisuPH3.jpg";
import { BiCertification } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";
const Blog = () => {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/certificates");

      console.log("CERTIFICATES DATA:", res.data); // DEBUG

      setCertificates(res.data);
    } catch (err) {
      console.log("ERROR loading certificates:", err);
    }
  };
  return (
    <>
      <Navbar />

      {/* BLOG SECTION */}

      <section className="sudisu-blog-section">
        <div className="sudisu-blog-container">
          {/* LEFT CONTENT */}

          <div className="sudisu-blog-text">
            <span className="blog-tag">SUDISU SPICES</span>

            <h1>The Taste That Brings Every Meal To Life</h1>

            <p>
              In every Nepali kitchen, spices are more than ingredients — they
              are memories, traditions, and emotions passed from one generation
              to another. At Sudisu, we carefully craft every spice blend to
              deliver the authentic taste of Nepal with unmatched freshness and
              purity.
            </p>

            <p>
              From rich turmeric and aromatic coriander to bold chilli and
              flavorful cumin, our products are prepared with premium
              ingredients that enhance every meal naturally.
            </p>

            <p>
              Sudisu stands for quality you can trust, flavor you can feel, and
              health your family deserves. Every pack is hygienically processed
              and carefully sealed to preserve its original aroma, texture, and
              natural goodness.
            </p>
          </div>

          {/* RIGHT IMAGE */}

          <div className="sudisu-blog-image">
            <img src={blogImage} alt="Sudisu Spices" />
          </div>
        </div>

        {/* BOTTOM SECTION */}

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

        <div className="cert-section">
          <h2>Our Certificates</h2>

          <div className="cert-grid">
            {certificates.map((item) => (
              <div key={item.id} className="cert-card">
                <img
                  src={item.image_url || ""}
                  alt={item.title || "certificate"}
                />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Blog;

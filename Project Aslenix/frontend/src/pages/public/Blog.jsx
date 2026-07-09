import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import HeroNavbar from "../../components/common/HeroNavbar";
import Footer from "../../components/common/Footer";
import { useNavigate } from "react-router-dom";
import "./Blog.css";
import blogImage from "../../assets/images/sudisuPH3.jpg";
import axios from "axios";

const Blog = () => {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [settings, setSettings] = useState({
    hero_title: "Bringing Authentic Nepali Flavors To Every Kitchen",
    hero_subtitle: "🌶 SUDISU SPICES BLOG",
    hero_description:
      "Discover the stories behind our spices, traditional recipes, quality standards, and the passion that goes into every Sudisu product.",
    hero_image: "",
    button_text: "Explore Our Story",
    button_link: "/about",
  });

  // Fetch certificates from backend (KEPT AS IS)
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

  // Fetch blog data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: settingsData, error: settingsError } = await supabase
        .from("blog_settings")
        .select("*")
        .eq("id", 1)
        .single();

      if (!settingsError && settingsData) {
        setSettings({
          hero_title:
            settingsData.hero_title ||
            "Bringing Authentic Nepali Flavors To Every Kitchen",
          hero_subtitle: settingsData.hero_subtitle || "🌶 SUDISU SPICES BLOG",
          hero_description:
            settingsData.hero_description ||
            "Discover the stories behind our spices, traditional recipes, quality standards, and the passion that goes into every Sudisu product.",
          hero_image: settingsData.hero_image || "",
          button_text: settingsData.button_text || "Explore Our Story",
          button_link: settingsData.button_link || "/about",
        });
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  return (
    <>
      <section className="sudisu-blog-section">
        {/* TOP CONTENT - KEPT EXACTLY AS ORIGINAL */}
        <HeroNavbar as="section" className="sudisu-blog-hero">
          <div className="sudisu-blog-container">
            <div className="sudisu-blog-text">
              <span className="blog-tag">{settings.hero_subtitle}</span>
              <h1>{settings.hero_title}</h1>
              <p className="hero-description">{settings.hero_description}</p>

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
                onClick={() => navigate(settings.button_link)}
              >
                {settings.button_text}
              </button>
            </div>

            <div className="sudisu-blog-image">
              <div className="product-showcase-3d">
                <img
                  src={settings.hero_image || blogImage}
                  alt="Sudisu Products"
                />
              </div>
            </div>
          </div>
        </HeroNavbar>

        {/* CERTIFICATES SECTION - KEPT EXACTLY AS ORIGINAL */}
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
              Certificates will be available soon.
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
                      onClick={() =>
                        navigate(`/certificate/${item.id}`, {
                          state: { certificate: item },
                        })
                      }
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

      {/* Certificate Modal - KEPT EXACTLY AS ORIGINAL */}
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

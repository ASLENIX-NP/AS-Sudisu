import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import HeroNavbar from "../../components/common/HeroNavbar";
import Footer from "../../components/common/Footer";
import { supabase } from "../../lib/supabase";

import fallbackImage from "../../assets/images/sudisuPH3.jpg";
import "./BlogDetail.css";

const formatDate = (dateValue) => {
  if (!dateValue) return "Sudisu Blog";

  return new Date(dateValue).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchBlog = async () => {
    setLoading(true);
    setNotFound(false);

    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data || data.status === "Draft") {
      console.error("Blog detail fetch error:", error);
      setBlog(null);
      setNotFound(true);
    } else {
      setBlog(data);
    }

    setLoading(false);
  };

  const contentParagraphs = useMemo(() => {
    const text = blog?.content || blog?.excerpt || "";
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }, [blog]);

  return (
    <>
      <section className="blog-detail-page">
        <HeroNavbar as="section" className="blog-detail-hero">
          <div className="blog-detail-hero-inner">
            <button
              type="button"
              className="back-blog-btn"
              onClick={() => navigate("/blog")}
            >
              ← Back to Blogs
            </button>

            {loading ? (
              <div className="blog-detail-state">Loading blog...</div>
            ) : notFound ? (
              <div className="blog-detail-state">
                <h1>Blog Not Found</h1>
                <p>
                  This blog may have been removed or changed to draft status.
                </p>
                <button type="button" onClick={() => navigate("/blog")}>
                  View All Blogs
                </button>
              </div>
            ) : (
              <>
                <div className="blog-detail-title-block">
                  <span className="blog-detail-tag">SUDISU BLOG</span>
                  <h1>{blog.title}</h1>
                  <p>{blog.excerpt}</p>
                  <div className="blog-detail-meta">
                    <span>{formatDate(blog.created_at)}</span>
                    <span>•</span>
                    <span>Sudisu Spices</span>
                  </div>
                </div>

                <div className="blog-detail-image-card">
                  <img
                    src={blog.image_url || fallbackImage}
                    alt={blog.title || "Sudisu blog"}
                    onError={(e) => {
                      e.currentTarget.src = fallbackImage;
                    }}
                  />
                </div>

                <article className="blog-detail-content-card">
                  {contentParagraphs.length > 0 ? (
                    contentParagraphs.map((paragraph, index) => (
                      <p key={`${paragraph}-${index}`}>{paragraph}</p>
                    ))
                  ) : (
                    <p>Full blog details will be available soon.</p>
                  )}
                </article>
              </>
            )}
          </div>
        </HeroNavbar>
      </section>

      <Footer />
    </>
  );
};

export default BlogDetail;

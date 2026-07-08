import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeroNavbar from "../../components/common/HeroNavbar";
import Footer from "../../components/common/Footer";
import { supabase } from "../../lib/supabase";
import "./BlogDetail.css";

import fallbackBlogImage from "../../assets/images/sudisuPH3.jpg";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("blogs")
      .select("id, title, excerpt, content, image_url, status, created_at")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Blog detail fetch error:", error.message);
      setBlog(null);
    } else {
      setBlog(data);
    }

    setLoading(false);
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "";

    return new Date(dateValue).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const bodyText = blog?.content?.trim() || blog?.excerpt?.trim() || "";
  const paragraphs = bodyText
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <>
      <section className="blog-detail-page">
        <HeroNavbar as="div" className="blog-detail-navbar-wrap">
          <div className="blog-detail-container">
            <button
              type="button"
              className="blog-back-btn"
              onClick={() => navigate("/blog")}
            >
              ← Back to Blogs
            </button>

            {loading ? (
              <div className="blog-detail-state">Loading blog...</div>
            ) : !blog ? (
              <div className="blog-detail-state">Blog article not found.</div>
            ) : (
              <article className="blog-detail-card">
                <div className="blog-detail-image">
                  <img
                    src={blog.image_url || fallbackBlogImage}
                    alt={blog.title}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = fallbackBlogImage;
                    }}
                  />
                </div>

                <div className="blog-detail-content">
                  <span className="blog-detail-date">
                    {formatDate(blog.created_at)}
                  </span>

                  <h1>{blog.title}</h1>

                  {blog.excerpt && <p className="blog-detail-excerpt">{blog.excerpt}</p>}

                  <div className="blog-detail-body">
                    {paragraphs.length > 0 ? (
                      paragraphs.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))
                    ) : (
                      <p>More details will be available soon.</p>
                    )}
                  </div>
                </div>
              </article>
            )}
          </div>
        </HeroNavbar>
      </section>

      <Footer />
    </>
  );
};

export default BlogDetail;

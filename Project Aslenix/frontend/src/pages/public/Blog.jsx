import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroNavbar from "../../components/common/HeroNavbar";
import Footer from "../../components/common/Footer";
import { supabase } from "../../lib/supabase";
import "./Blog.css";

import fallbackBlogImage from "../../assets/images/sudisuPH3.jpg";

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("blogs")
      .select("id, title, excerpt, content, image_url, status, created_at")
      .eq("status", "Published")
      .order("id", { ascending: false })
      .limit(3);

    if (error) {
      console.error("Blog fetch error:", error.message);
      setBlogs([]);
    } else {
      setBlogs(data || []);
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

  return (
    <>
      <section className="sudisu-blog-page">
        <HeroNavbar as="div" className="sudisu-blog-navbar-wrap">
          <div className="blog-section-container">
            <div className="blog-section-header">
              <span className="blog-section-tag">🌶 Latest Articles</span>
              <h1>From Our Blog</h1>
              <p>
                Read the latest stories, recipes, spice tips, and updates from
                Sudisu Spices.
              </p>
            </div>

            {loading ? (
              <div className="blog-state-card">Loading blogs...</div>
            ) : blogs.length === 0 ? (
              <div className="blog-state-card">
                Blog articles will be available soon.
              </div>
            ) : (
              <div className="blog-cards-grid">
                {blogs.map((blog) => (
                  <article className="blog-card" key={blog.id}>
                    <div className="blog-card-image">
                      <img
                        src={blog.image_url || fallbackBlogImage}
                        alt={blog.title}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = fallbackBlogImage;
                        }}
                      />
                    </div>

                    <div className="blog-card-content">
                      <h2>{blog.title}</h2>

                      <p>{blog.excerpt || blog.content || "Read more about Sudisu Spices."}</p>

                      <div className="blog-card-bottom">
                        <span>{formatDate(blog.created_at)}</span>

                        <button
                          type="button"
                          onClick={() => navigate(`/blog/${blog.id}`)}
                        >
                          Read More →
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </HeroNavbar>
      </section>

      <Footer />
    </>
  );
};

export default Blog;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import HeroNavbar from "../../components/common/HeroNavbar";
import Footer from "../../components/common/Footer";
import { supabase } from "../../lib/supabase";

import blogImage from "../../assets/images/sudisuPH3.jpg";
import "./Blog.css";

const formatDate = (dateValue) => {
  if (!dateValue) return "Sudisu Blog";

  return new Date(dateValue).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const makeExcerpt = (blog) => {
  const text = blog?.excerpt || blog?.content || "";
  if (text.length <= 140) return text;
  return `${text.slice(0, 140).trim()}...`;
};

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
      .select("*")
      .eq("status", "Published")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Blog fetch error:", error);
      setBlogs([]);
    } else {
      setBlogs(data || []);
    }

    setLoading(false);
  };

  return (
    <>
      <section className="sudisu-blog-page">
        <HeroNavbar as="section" className="sudisu-blog-hero">
          <div className="sudisu-blog-container">
            <div className="sudisu-blog-text">
              <span className="blog-tag">🌶 SUDISU SPICES BLOG</span>

              <h1>
                Stories, Recipes &
                <span> Authentic Nepali Flavors</span>
              </h1>

              <p className="hero-description">
                Read Sudisu updates, spice stories, kitchen tips, recipes, and
                quality information prepared for families who love real flavor.
              </p>

              <div className="blog-highlights">
                <div className="highlight-card">
                  <h3>Pure Spices</h3>
                  <p>Stories behind our carefully selected ingredients.</p>
                </div>

                <div className="highlight-card">
                  <h3>Kitchen Tips</h3>
                  <p>Simple ideas to make everyday food taste better.</p>
                </div>

                <div className="highlight-card">
                  <h3>Sudisu News</h3>
                  <p>Updates from our products, quality, and journey.</p>
                </div>
              </div>
            </div>

            <div className="sudisu-blog-image">
              <div className="product-showcase-3d">
                <img src={blogImage} alt="Sudisu spices" />
              </div>
            </div>
          </div>
        </HeroNavbar>

        <div className="blog-list-section">
          <div className="blog-list-header-public">
            <span className="blog-small-tag">LATEST ARTICLES</span>
            <h2>Read Our Latest Blogs</h2>
            <p>
              Explore our latest posts in a clean three-card layout. Click Read
              More to open the full image and details on a separate page.
            </p>
          </div>

          {loading ? (
            <div className="blog-state-box">Loading blogs...</div>
          ) : blogs.length === 0 ? (
            <div className="blog-state-box">
              Blogs will be available soon.
            </div>
          ) : (
            <div className="blog-card-grid">
              {blogs.map((blog) => (
                <article className="public-blog-card" key={blog.id}>
                  <div className="public-blog-image-wrap">
                    <img
                      src={blog.image_url || blogImage}
                      alt={blog.title || "Sudisu blog"}
                      onError={(e) => {
                        e.currentTarget.src = blogImage;
                      }}
                    />
                  </div>

                  <div className="public-blog-content">
                    <span className="public-blog-date">
                      {formatDate(blog.created_at)}
                    </span>

                    <h3>{blog.title}</h3>

                    <p>{makeExcerpt(blog)}</p>

                    <button
                      type="button"
                      className="read-more-btn"
                      onClick={() => navigate(`/blog/${blog.id}`)}
                    >
                      Read More
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Blog;

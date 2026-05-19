import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* FLOATING BUTTONS */}

      <button
        className="nav-float nav-left"
        onClick={() => navigate("/about")}
      >
        ← Back
      </button>

      <button
        className="nav-float nav-right"
        onClick={() => navigate("/contact")}
      >
        Next →
      </button>

      <section
        style={{
          minHeight: "80vh",
          padding: "120px 60px",
          background: "#000",
          color: "#fff",
        }}
      >
        <h1>Blog</h1>

        <p>
          Our stories and spice knowledge coming soon.
        </p>
      </section>

      <Footer />
    </>
  );
};

export default Blog;
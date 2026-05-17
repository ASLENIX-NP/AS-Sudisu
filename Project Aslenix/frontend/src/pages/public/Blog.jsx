import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

const Blog = () => {
  return (
    <>
      <Navbar />
      <section
        style={{
          minHeight: "80vh",
          padding: "120px 60px",
          background: "#000",
          color: "#fff",
        }}
      >
        <h1>Blog</h1>
        <p>Our stories and spice knowledge coming soon.</p>
      </section>
      <Footer />
    </>
  );
};

export default Blog;

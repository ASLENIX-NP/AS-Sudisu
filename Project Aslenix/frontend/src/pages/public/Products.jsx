import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import ProductsSection from "../../components/sections/Products";
import { useNavigate } from "react-router-dom";
import "./ProductsPage.css";
import heroProducts from "../../assets/images/Sudiisu2.png";

const ProductsPage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* =================================
    SUDISU PREMIUM HERO SECTION
================================= */}

      {/* PRODUCT SHOWCASE */}
      <div className="sudisu-product-showcase">
        {/* LEFT SPLASH */}
        <div className="splash-left"></div>

        {/* RIGHT SPLASH */}
        <div className="splash-right"></div>

        {/* PRODUCT IMAGE */}
        <img
          src={heroProducts}
          alt="Sudisu Products"
          className="sudisu-main-products"
        />
      </div>

      {/* SLOGAN */}
      {/* FLOATING NAV BUTTONS */}
      <button className="nav-float nav-left" onClick={() => navigate("/")}>
        ← Back
      </button>

      <button
        className="nav-float nav-right"
        onClick={() => navigate("/about")}
      >
        Next →
      </button>

      {/* PAGE CONTENT */}
      <section className="products-page">
        <div className="products-header">
          <h1>Our Products</h1>

          <p>
            Authentic Nepali spices crafted with purity, freshness, and
            unforgettable traditional flavor.
          </p>
        </div>

        <ProductsSection />
      </section>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default ProductsPage;

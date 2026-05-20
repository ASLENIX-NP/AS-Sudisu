import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import ProductsSection from "../../components/sections/Products";
import { useNavigate } from "react-router-dom";
import "./ProductsPage.css";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
const ProductsPage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* FLOATING NAV BUTTONS */}
      <button
        className="nav-float nav-left"
        onClick={() => navigate(-1)}
      >
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
        <h1 className="page-title">All Products</h1>

        <ProductsSection />
      </section>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default ProductsPage;
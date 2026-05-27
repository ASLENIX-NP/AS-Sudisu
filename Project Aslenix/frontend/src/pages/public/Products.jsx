import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import "./ProductsPage.css";

import heroProducts from "../../assets/images/Sudiisu2.png";

const ProductsPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      <div className="sudisu-product-showcase">
        <div className="splash-left"></div>

        <div className="splash-right"></div>

        <img
          src={heroProducts}
          alt="Sudisu Products"
          className="sudisu-main-products"
        />
      </div>

      {/* FLOAT BUTTONS */}
      <button
        className="nav-float nav-left"
        onClick={() =>
          navigate("/")
        }
      >
        ← Back
      </button>

      <button
        className="nav-float nav-right"
        onClick={() =>
          navigate("/about")
        }
      >
        Next →
      </button>

      {/* PRODUCTS */}
      <section className="products-page">
        <div className="products-header">
          <h1>Our Products</h1>

          <p>
            Authentic Nepali spices
            crafted with purity,
            freshness, and traditional
            flavor.
          </p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <Link
              to={`/products/${product.id}`}
              className="product-card"
              key={product.id}
            >
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />

              <h3>{product.name}</h3>

              <p className="product-price">
                Rs. {product.price}
              </p>

              <span className="product-weight">
                {product.weight}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProductsPage;
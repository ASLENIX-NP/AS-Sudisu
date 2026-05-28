import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import ProductModal from "../../components/sections/ProductModal";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import "./ProductsPage.css";

import heroProducts from "../../assets/images/Sudiisu2.png";

const ProductsPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

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

      <div className="sudisu-product-showcase">
        <img
          src={heroProducts}
          alt="Sudisu Products"
          className="sudisu-main-products"
        />
      </div>

      <button
        className="nav-float nav-left"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>

      <button
        className="nav-float nav-right"
        onClick={() => navigate("/about")}
      >
        Next →
      </button>

      <section className="products-page">
        <div className="products-header">
          <h1>Our Products</h1>

          <p>
            Authentic Nepali spices crafted with purity,
            freshness and traditional flavor.
          </p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div
              className="product-card"
              key={product.id}
            >
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />

              <h3>{product.name}</h3>

              <button
                onClick={() =>
                  setSelectedProduct(product)
                }
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() =>
            setSelectedProduct(null)
          }
        />
      )}

      <Footer />
    </>
  );
};

export default ProductsPage;
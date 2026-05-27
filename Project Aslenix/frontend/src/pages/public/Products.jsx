import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import { useCart } from "../../context/CartContext";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import {
  useNavigate,
  Link,
} from "react-router-dom";;

import "./ProductsPage.css";

import heroProducts from "../../assets/images/Sudiisu2.png";

const ProductsPage = () => {
  const { addToCart } = useCart();

  const navigate = useNavigate();

  // PRODUCTS STATE
  const [products, setProducts] = useState([]);

  // FETCH PRODUCTS
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <div className="sudisu-product-showcase">
        <div className="splash-left"></div>

        <div className="splash-right"></div>

        <img
          src={heroProducts}
          alt="Sudisu Products"
          className="sudisu-main-products"
        />
      </div>

      {/* FLOATING BUTTONS */}
      <button
        className="nav-float nav-left"
        onClick={() => navigate("/Home")}
      >
        ← Back
      </button>

      <button
        className="nav-float nav-right"
        onClick={() => navigate("/about")}
      >
        Next →
      </button>

      {/* PRODUCTS PAGE */}
      <section className="products-page">
        <div className="products-header">
          <h1>Our Products</h1>

          <p>
            Authentic Nepali spices crafted with purity,
            freshness, and unforgettable traditional flavor.
          </p>
        </div>

        {/* DYNAMIC PRODUCTS */}
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

              <p className="product-price">
                Rs. {product.price}
              </p>

              <span className="product-weight">
                {product.weight}
              </span>

              {/* ADD TO CART BUTTON */}
              <button
                className="add-cart-btn"
                onClick={() =>
                  addToCart(product)
                }
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default ProductsPage;
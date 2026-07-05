import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProducts } from "../../services/productService";
import HeroNavbar from "../../components/common/HeroNavbar";
import Footer from "../../components/common/Footer";

import ProductModal from "../../components/sections/ProductModal";
import mixMasala from "../../assets/spice/mix.jpg";
import meatMasala from "../../assets/spice/meat.jpg";
import garamMasala from "../../assets/spice/garam.jpg";

import "./ProductsPage.css";

import heroProducts from "../../assets/images/Sudiisu2.png";
const ProductsPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sliderProducts, setSliderProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 8;

  const totalPages = Math.ceil((products?.length || 0) / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const [currentSlide, setCurrentSlide] = useState(0);
  const currentProducts = (products || []).slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  console.log("Products Length:", products.length);
  console.log("Products:", products);
  console.log("Current Page:", currentPage);
  console.log("Total Pages:", totalPages);

  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [products.length]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (location.hash === "#products-section") {
      const element = document.getElementById("products-section");

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <>
      <HeroNavbar as="section" className="products-hero">
        <div className="products-hero-left">
          <span className="hero-badge">🌶 Premium Nepali Spices</span>
          <h1>
            Best Selling
            <span> Spices Collection</span>
          </h1>
          <p>
            Crafted with authentic Nepali ingredients, delivering unmatched
            aroma, freshness and flavor in every meal.
          </p>
          <div className="customer-review">
            ⭐⭐⭐⭐⭐
            <p>
              Loved by thousands of families across Nepal for authentic taste
              and premium quality.
            </p>
          </div>
          <div className="hero-stats">
            <div>
              <h3>50+</h3>
              <p>Premium Products</p>
            </div>

            <div>
              <h3>5000+</h3>
              <p>Happy Customers</p>
            </div>

            <div>
              <h3>100%</h3>
              <p>Pure Ingredients</p>
            </div>
          </div>{" "}
        </div>

        <div className="products-hero-right">
          <div className="slider-card">
            <img
              src={heroProducts}
              alt="Sudisu Products"
              className="hero-slider-image"
            />
          </div>
        </div>
      </HeroNavbar>

      <section id="products-section" className="products-page">
        <div className="products-header">
          <h1>Our Products</h1>

          <p>
            Authentic Nepali spices crafted with purity, freshness and
            traditional flavor.
          </p>
        </div>
        <div className="products-wrapper">
          {products?.length > 0 && (
            <>
              <div className="products-grid">
                {currentProducts.map((product) => (
                  <div className="product-card" key={product.id}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />

                    <h3>{product.name}</h3>

                    <button onClick={() => setSelectedProduct(product)}>
                      View Details
                    </button>
                  </div>
                ))}
              </div>
              <div className="pagination">
                {currentPage > 1 && (
                  <button
                    onClick={() => {
                      setCurrentPage((p) => Math.max(p - 1, 1));

                      setTimeout(() => {
                        document
                          .getElementById("products-section")
                          ?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                      }, 50);
                    }}
                  >
                    ← Back
                  </button>
                )}

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentPage(i + 1);

                      setTimeout(() => {
                        document
                          .getElementById("products-section")
                          ?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                      }, 50);
                    }}
                    className={currentPage === i + 1 ? "active" : ""}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => {
                    setCurrentPage((p) => Math.min(p + 1, totalPages));

                    setTimeout(() => {
                      document
                        .getElementById("products-section")
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                    }, 50);
                  }}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <Footer />
    </>
  );
};

export default ProductsPage;

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProducts } from "../../services/productService";
import { supabase } from "../../lib/supabase";
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
      const availableProducts = data || [];
      setProducts(availableProducts);

      const { data: approvedReviews, error: reviewsError } = await supabase
        .from("reviews")
        .select("product_id, rating")
        .eq("status", "Approved");

      if (reviewsError) throw reviewsError;

      const reviewStats = (approvedReviews || []).reduce((stats, review) => {
        const productId = String(review.product_id);
        const current = stats[productId] || { totalRating: 0, reviewCount: 0 };
        current.totalRating += Number(review.rating) || 0;
        current.reviewCount += 1;
        stats[productId] = current;
        return stats;
      }, {});

      const topProducts = availableProducts
        .map((product) => {
          const stats = reviewStats[String(product.id)];
          return stats ? { ...product, averageRating: stats.totalRating / stats.reviewCount, reviewCount: stats.reviewCount } : null;
        })
        .filter(Boolean)
        .sort((first, second) => second.averageRating - first.averageRating || second.reviewCount - first.reviewCount)
        .slice(0, 5);

      setSliderProducts(topProducts.length ? topProducts : availableProducts.slice(0, 5));
      setCurrentSlide(0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (sliderProducts.length < 2) return undefined;
    const slider = window.setInterval(() => {
      setCurrentSlide((slide) => (slide + 1) % sliderProducts.length);
    }, 5000);
    return () => window.clearInterval(slider);
  }, [sliderProducts.length]);

  const activeSliderProduct = sliderProducts[currentSlide] || null;
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
              key={activeSliderProduct?.id || "sudiisu-collection"}
              src={activeSliderProduct?.image || heroProducts}
              alt={activeSliderProduct?.name || "Sudiisu Products"}
              className="hero-slider-image"
            />
            {false && activeSliderProduct && (
              <div className="hero-product-summary">
                <span>Top rated product</span>
                <strong>{activeSliderProduct.name}</strong>
                {activeSliderProduct.reviewCount ? <small>★ {activeSliderProduct.averageRating.toFixed(1)} · {activeSliderProduct.reviewCount} review{activeSliderProduct.reviewCount === 1 ? "" : "s"}</small> : <small>Featured product</small>}
              </div>
            )}
            {sliderProducts.length > 1 && <div className="hero-slider-dots" aria-label="Top-rated product slides">{sliderProducts.map((product, index) => <button key={product.id} type="button" className={index === currentSlide ? "active" : ""} onClick={() => setCurrentSlide(index)} aria-label={`Show ${product.name}`} />)}</div>}
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

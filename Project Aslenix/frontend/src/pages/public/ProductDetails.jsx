import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProducts } from "../../services/productService";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import toast from "react-hot-toast";
/* REVIEW COMPONENT */
import Review from "./Review";

import "./ProductDetails.css";
import { supabase } from "../../lib/supabase";

const ProductDetails = () => {
  const { id } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchProduct();
  }, [id]);
  const [reviewData, setReviewData] = useState({
    name: "",
    rating: 5,
    comment: "",
  });
  const fetchProduct = async () => {
    const products = await getProducts();

    setAllProducts(products);

    const selectedProduct = products.find((item) => item.id == id);

    setProduct(selectedProduct);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setReviewData({
      ...reviewData,
      [name]: name === "rating" ? Number(value) : value,
    });
  };

  const handleSubmit = async () => {
    try {
      const { error } = await supabase.from("reviews").insert([
        {
          name: reviewData.name,
          rating: reviewData.rating,
          review: reviewData.comment,

          product_id: product.id,
          product_name: product.name,

          status: "Pending",
        },
      ]);

      if (error) {
        console.log(error);
        toast.error("Failed to submit review");
        return;
      }

      toast.success("🎉 Review submitted successfully!");

      setShowReview(false);

      setReviewData({
        name: "",
        rating: 5,
        comment: "",
      });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Navbar />

      <div className="product-container">
        {/* LEFT IMAGE */}
        <div className="product-image-section">
          <img src={product.image} alt={product.name} />
        </div>

        {/* RIGHT INFO */}
        <div className="product-info-section">
          <h1>{product.name}</h1>
          <h2>Rs. {product.price}</h2>

          <p>
            <b>Origin:</b> {product.origin}
          </p>
          <p>
            <b>Weight:</b> {product.weight}
          </p>
          <p>
            <b>Stock:</b> {product.stock}
          </p>

          <p className="desc">{product.description}</p>

          <button className="review-btn" onClick={() => setShowReview(true)}>
            ⭐ Write Review
          </button>
        </div>
      </div>

      {/* RELATED PRODUCTS (AMAZON STYLE) */}
      <div className="related-section">
        <h2>Related Products</h2>

        <div className="related-grid">
          {allProducts
            ?.filter((p) => p.id !== product.id)
            .slice(0, 5) // ✅ ONLY 5 PRODUCTS
            .map((p) => (
              <div
                className="related-card"
                key={p.id}
                onClick={() => navigate(`/products/${p.id}`)}
              >
                <img src={p.image} />
                <p>{p.name}</p>
              </div>
            ))}
        </div>
      </div>

      {/* REVIEW MODAL */}
      {showReview && (
        <div className="review-overlay" onClick={() => setShowReview(false)}>
          <div className="review-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Write Review</h2>
            <input
              name="name"
              placeholder="Name"
              value={reviewData.name}
              onChange={handleChange}
            />
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={reviewData.rating >= star ? "star active" : "star"}
                  onClick={() => setReviewData({ ...reviewData, rating: star })}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              name="comment"
              placeholder="Customer Review"
              value={reviewData.comment}
              onChange={handleChange}
            />
            <button className="submit-btn" onClick={handleSubmit}>
              Submit Review
            </button>{" "}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ProductDetails;

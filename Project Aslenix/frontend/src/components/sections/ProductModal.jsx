import { useState } from "react";
import "./ProductModal.css";

const ProductModal = ({ product, onClose }) => {
  const [showReview, setShowReview] = useState(false);

const [reviewData, setReviewData] = useState({
  name: "",
  comment: "",
});
  return (
    <div
      className="product-details-overlay"
      onClick={onClose}
    >
      <div
        className="product-details-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="product-details-close"
          onClick={onClose}
        >
           ✕
        </button>

        <div className="product-details-content">
          <div className="product-details-image">
            <img
              src={
                product.image ||
                "/products/turmeric.png"
              }
              alt={product.name}
            />
          </div>

          <div className="product-details-info">
            <h1>{product.name}</h1>

            <h2>Rs. {product.price}</h2>

            <p>
              <strong>Origin:</strong>{" "}
              {product.origin}
            </p>

            <p>
              <strong>Weight:</strong>{" "}
              {product.weight}
            </p>

            <p>
              <strong>Stock:</strong>{" "}
              {product.stock}
            </p>

            <button
  className="review-btn"
  onClick={() => alert("Review form coming soon")}
>
  ⭐ Write Review
</button>
{showReview && (
  <div
    className="review-overlay"
    onClick={() => setShowReview(false)}
  >
    <div
      className="review-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <h2>Write Review</h2>

      <input
        type="text"
        placeholder="Your Name"
        value={reviewData.name}
        onChange={(e) =>
          setReviewData({
            ...reviewData,
            name: e.target.value,
          })
        }
      />

      <textarea
        rows="5"
        placeholder="Write your review..."
        value={reviewData.comment}
        onChange={(e) =>
          setReviewData({
            ...reviewData,
            comment: e.target.value,
          })
        }
      />

      <button
        className="submit-btn"
        onClick={() => {
          console.log(reviewData);
          setShowReview(false);
        }}
      >
        Submit Review
      </button>
    </div>
  </div>
)}
          </div>
        </div>

        <div className="related-products-section">
          <h3>Related Products</h3>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
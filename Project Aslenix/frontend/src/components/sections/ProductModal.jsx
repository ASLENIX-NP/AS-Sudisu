import "./ProductModal.css";
import Review from "../../pages/public/Review";
import { useState } from "react";
const ProductModal = ({ product, onClose }) => {
  const [showReview, setShowReview] = useState(false);
  return (
    <div className="product-details-overlay" onClick={onClose}>
      <div
        className="product-details-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="product-details-close" onClick={onClose}>
          ✕
        </button>

        <div className="product-details-content">
          <div className="product-details-image">
            <img
              src={product.image || "/products/turmeric.png"}
              alt={product.name}
            />
          </div>

          <div
            className={`product-details-info ${
              showReview ? "review-active" : ""
            }`}
          >
            {!showReview ? (
              <>
                <h1>{product.name}</h1>

                <h2>Rs. {product.price}</h2>

                <p>
                  <strong>Origin:</strong> {product.origin}
                </p>

                <p>
                  <strong>Weight:</strong> {product.weight}
                </p>

                <p>
                  <strong>Ingredients:</strong> {product.ingredients || "—"}
                </p>

                <button
                  className="review-btn"
                  onClick={() => setShowReview(true)}
                >
                  ⭐ Write Review
                </button>
              </>
            ) : (
              <Review
                productId={product.id}
                productName={product.name}
                onReviewSubmitted={onClose}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductModal;

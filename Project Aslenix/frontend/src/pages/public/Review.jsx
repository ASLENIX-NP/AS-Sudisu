import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import "./Review.css";

const Review = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", productId)
      .eq("status", "Approved")
      .order("created_at", {
        ascending: false,
      });

    if (!error) {
      setReviews(data || []);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();

    if (!name || !review) {
      alert("Please fill all fields");
      return;
    }

    const { error } = await supabase
      .from("reviews")
      .insert([
        {
          name,
          rating,
          review,
          product_id: productId,
          status: "Pending",
        },
      ]);

    if (error) {
      alert("Failed to submit review");
      return;
    }

    alert(
      "Review submitted successfully. Waiting for approval."
    );

    setName("");
    setRating(5);
    setReview("");
  };

  return (
    <div className="review-section">

      <h2 className="review-title">
        Customer Reviews ({reviews.length})
      </h2>

      {/* EXISTING REVIEWS */}

      <div className="review-list">
        {reviews.length === 0 ? (
          <p className="no-reviews">
            No reviews yet.
          </p>
        ) : (
          reviews.map((item) => (
            <div
              key={item.id}
              className="review-card"
            >
              <div className="review-stars">
                {"⭐".repeat(
                  item.rating || 0
                )}
              </div>

              <p className="review-text">
                {item.review}
              </p>

              <span className="review-name">
                — {item.name}
              </span>
            </div>
          ))
        )}
      </div>

      {/* REVIEW FORM */}

      <form
        onSubmit={submitReview}
        className="review-form"
      >
        <h3>
          Leave a Review
        </h3>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <select
          value={rating}
          onChange={(e) =>
            setRating(
              Number(e.target.value)
            )
          }
        >
          <option value={5}>
            ⭐⭐⭐⭐⭐
          </option>

          <option value={4}>
            ⭐⭐⭐⭐
          </option>

          <option value={3}>
            ⭐⭐⭐
          </option>

          <option value={2}>
            ⭐⭐
          </option>

          <option value={1}>
            ⭐
          </option>
        </select>

        <textarea
          placeholder="Write your review..."
          value={review}
          onChange={(e) =>
            setReview(e.target.value)
          }
        />

        <button type="submit">
          Submit Review
        </button>
      </form>

    </div>
  );
};

export default Review;
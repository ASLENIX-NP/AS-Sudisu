import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import "./Review.css";
import toast from "react-hot-toast";
import ReactStars from "react-stars";

const Review = ({ productId, productName, onReviewSubmitted }) => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [formError, setFormError] = useState("");

  const [submitting, setSubmitting] = useState(false);

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
      toast.error("Please fill all fields before submitting");
      return;
    }

    const { error } = await supabase.from("reviews").insert([
      {
        name,
        rating,
        review,
        product_id: productId,
        product_name: productName,
        status: "Pending",
      },
    ]);
    if (error) {
      toast.error("Failed to submit review");
      return;
    }

    toast.success("Thank you! Your review has been submitted for approval.");

    setName("");
    setRating(5);
    setReview("");

    onReviewSubmitted();
  };

  return (
    <div id="review-section" className="review-section">
      <h2 className="review-title">Customer Reviews ({reviews.length})</h2>

      {/* EXISTING REVIEWS */}

      {/* REVIEW FORM */}

      <form onSubmit={submitReview} className="review-form">
        <h3>Share Your Experience</h3>
        {formError && <div className="review-error">{formError}</div>}
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="modern-rating">
          <label>Rate this Product</label>

          <ReactStars
            count={5}
            value={rating}
            onChange={(newRating) => setRating(newRating)}
            size={40}
            isHalf={true}
            activeColor="#FFD700"
          />
        </div>
        <textarea
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default Review;

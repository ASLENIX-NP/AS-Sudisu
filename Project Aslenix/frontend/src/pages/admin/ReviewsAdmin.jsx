import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/ReviewsAdmin.css";

const ReviewsAdmin = () => {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedReview, setSelectedReview] = useState(null);
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (!error) {
      setReviews(data || []);
    }
  };

  const approveReview = async (id) => {
    const { error } = await supabase
      .from("reviews")
      .update({
        status: "Approved",
      })
      .eq("id", id);

    if (!error) {
      fetchReviews();
    }
  };

  const rejectReview = async (id) => {
    const { error } = await supabase
      .from("reviews")
      .update({
        status: "Rejected",
      })
      .eq("id", id);

    if (!error) {
      fetchReviews();
    }
  };

const deleteReview = async () => {

  if (!selectedReview) return;

  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", selectedReview);

  if (!error) {
    fetchReviews();
  }

  setShowDeleteModal(false);
  setSelectedReview(null);
};

  const filteredReviews = reviews.filter(
    (review) =>
      review.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      review.review
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    
    <AdminLayout>
      <div className="reviews-page">
{/* Header */}

<div className="reviews-header">

  <div className="reviews-header-left">

    <div className="reviews-badge">
      ⭐ Customer Feedback
    </div>

    <h1>Review Management</h1>

    <p>
      Review, approve and manage customer feedback before it appears
      on your website.
    </p>

  </div>

  <div className="reviews-header-right">

    <button className="preview-btn">
      👁 Preview Reviews
    </button>

    <button className="primary-btn">
      ⭐ Review Guidelines
    </button>

  </div>

</div>

<div className="reviews-stats">

  <div className="review-stat-card">

    <div className="stat-icon">
      ⭐
    </div>

    <div>

      <span>Total Reviews</span>

      <h2>{reviews.length}</h2>

    </div>

    <div className="stat-pill blue">
      +{reviews.length}
    </div>

  </div>

  <div className="review-stat-card">

    <div className="stat-icon">
      ⏳
    </div>

    <div>

      <span>Pending Reviews</span>

      <h2>
        {
          reviews.filter(
            (r) => r.status === "Pending"
          ).length
        }
      </h2>

    </div>

    <div className="stat-pill orange">
      Pending
    </div>

  </div>

  <div className="review-stat-card">

    <div className="stat-icon">
      ✅
    </div>

    <div>

      <span>Approved Reviews</span>

      <h2>
        {
          reviews.filter(
            (r) => r.status === "Approved"
          ).length
        }
      </h2>

    </div>

    <div className="stat-pill green">
      Live
    </div>

  </div>

</div>
<div className="reviews-card">

  <div className="reviews-toolbar">

    <div className="search-box">


      <input
        type="text"
        placeholder="Search customer reviews..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="review-search"
      />

    </div>

    <div className="reviews-count">

      {filteredReviews.length} Review
      {filteredReviews.length !== 1 && "s"}

    </div>

  </div>

{filteredReviews.length === 0 ? (

  <div className="empty-reviews">

    <div className="empty-icon">
      ⭐
    </div>

    <h3>No Reviews Yet</h3>

    <p>
      Customer reviews will appear here once they are submitted.
    </p>

  </div>

) : (

  <div className="reviews-list">

    {filteredReviews.map((review) => (

      <div
        className="review-item"
        key={review.id}
      >

        <div className="review-top">

          <div className="review-user">

            <div className="review-avatar">
              {review.name?.charAt(0).toUpperCase()}
            </div>

            <div>

              <h3>{review.name}</h3>

              <div className="review-stars">
                {"⭐".repeat(review.rating || 0)}
              </div>

            </div>

          </div>

          <span
            className={`status-badge ${review.status
              ?.toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            {review.status}
          </span>

        </div>

        <p className="review-message">
          {review.review}
        </p>

        <div className="review-footer">

          <small>
            {new Date(
              review.created_at
            ).toLocaleDateString()}
          </small>

          <div className="review-actions">

            <button
              className="approve-btn"
              disabled={review.status === "Approved"}
              onClick={() =>
                approveReview(review.id)
              }
            >
              ✓ Approve
            </button>

            <button
              className="reject-btn"
              disabled={review.status === "Rejected"}
              onClick={() =>
                rejectReview(review.id)
              }
            >
              ✕ Reject
            </button>
<button
  className="delete-btn"
  onClick={() => {
    setSelectedReview(review.id);
    setShowDeleteModal(true);
  }}
>
  🗑 Delete
</button>

          </div>

        </div>

      </div>

    ))}

  </div>

)}
        </div>
        {showDeleteModal && (
  <div className="delete-modal-overlay">

    <div className="delete-modal">

      <div className="delete-modal-icon">
        🗑️
      </div>

      <h2>Delete Review?</h2>

      <p>
        This action cannot be undone.
        Are you sure you want to permanently delete this review?
      </p>

      <div className="delete-modal-actions">

        <button
          className="cancel-delete-btn"
          onClick={() => {
            setShowDeleteModal(false);
            setSelectedReview(null);
          }}
        >
          Cancel
        </button>

        <button
          className="confirm-delete-btn"
          onClick={deleteReview}
        >
          Delete
        </button>

      </div>

    </div>

  </div>
)}
      </div>
    </AdminLayout>
  );
};

export default ReviewsAdmin;
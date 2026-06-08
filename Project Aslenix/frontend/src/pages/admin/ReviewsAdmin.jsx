import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/ReviewsAdmin.css";

const ReviewsAdmin = () => {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");

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

  const deleteReview = async (id) => {
    const confirmed = window.confirm(
      "Delete this review?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", id);

    if (!error) {
      fetchReviews();
    }
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
        <div className="reviews-header">
          <h1 className="reviews-title">
            Reviews
          </h1>

          <p className="reviews-subtitle">
            Manage customer reviews and approvals.
          </p>
        </div>

        <div className="reviews-stats">
          <div className="review-stat-card">
            <span>Total Reviews</span>
            <h2>{reviews.length}</h2>
          </div>

          <div className="review-stat-card">
            <span>Pending</span>
            <h2>
              {
                reviews.filter(
                  (r) =>
                    r.status === "Pending"
                ).length
              }
            </h2>
          </div>

          <div className="review-stat-card">
            <span>Approved</span>
            <h2>
              {
                reviews.filter(
                  (r) =>
                    r.status === "Approved"
                ).length
              }
            </h2>
          </div>
        </div>

        <div className="reviews-card">
          <input
            type="text"
            placeholder="Search reviews..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="review-search"
          />

          <table className="reviews-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredReviews.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      padding: "40px",
                      color: "#64748b",
                    }}
                  >
                    No reviews found.
                  </td>
                </tr>
              ) : (
                filteredReviews.map(
                  (review) => (
                    <tr key={review.id}>
                      <td>
                        {review.name}
                      </td>

                      <td>
                        {"⭐".repeat(
                          review.rating || 0
                        )}
                      </td>

                      <td>
                        {review.review}
                      </td>

                      <td>
                        <span
                          className={`status-badge ${review.status
                            ?.toLowerCase()
                            .replace(
                              /\s+/g,
                              "-"
                            )}`}
                        >
                          {review.status}
                        </span>
                      </td>

                      <td>
                        <div className="review-actions">
                          <button
                            className="approve-btn"
                            disabled={
                              review.status ===
                              "Approved"
                            }
                            onClick={() =>
                              approveReview(
                                review.id
                              )
                            }
                          >
                            Approve
                          </button>

                          <button
                            className="reject-btn"
                            disabled={
                              review.status ===
                              "Rejected"
                            }
                            onClick={() =>
                              rejectReview(
                                review.id
                              )
                            }
                          >
                            Reject
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              deleteReview(
                                review.id
                              )
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReviewsAdmin;
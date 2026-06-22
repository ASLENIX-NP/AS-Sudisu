import { useEffect, useMemo, useState } from "react";
import { FaBell, FaEnvelope, FaServer, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { supabase } from "../../lib/supabase";
import "../../styles/NotificationsAdmin.css";
import { useSearchParams } from "react-router-dom";

const NotificationsAdmin = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const [pendingReviews, setPendingReviews] = useState(0);
  const [inquiryCount, setInquiryCount] = useState(0);
  const [databaseStatus, setDatabaseStatus] = useState("Checking");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const { count: reviewsCount } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true })
      .eq("status", "Pending");

    setPendingReviews(reviewsCount || 0);

    try {
      const response = await fetch("http://localhost:5000/api/inquiries");
      const data = await response.json();

      if (data.success) {
        setInquiryCount(data.inquiries.length);
      }
    } catch (error) {
      setInquiryCount(0);
    }

    const { error: dbError } = await supabase
      .from("products")
      .select("id")
      .limit(1);

    setDatabaseStatus(dbError ? "Needs attention" : "Healthy");
  };

  const notifications = useMemo(
    () => [
      {
        id: "inquiries",
        icon: <FaEnvelope />,
        title: "Customer inquiries",
        description:
          inquiryCount > 0
            ? `${inquiryCount} customer inquiries are waiting for admin review.`
            : "No unseen customer inquiries right now.",
        count: inquiryCount,
        action: "Open inquiries",
       path: "/admin/notifications?type=inquiries",
        tone: "blue",
      },
      {
        id: "reviews",
        icon: <FaStar />,
        title: "Pending reviews",
        description:
          pendingReviews > 0
            ? `${pendingReviews} product reviews are waiting for approval.`
            : "No pending reviews right now.",
        count: pendingReviews,
        action: "Manage reviews",
          path: "/admin/notifications?type=reviews",
        tone: "amber",
      },
      {
        id: "system",
        icon: <FaServer />,
        title: "System status",
        description:
          databaseStatus === "Healthy"
            ? "Database connection is healthy."
            : "Database connection needs attention.",
        count: databaseStatus === "Healthy" ? 0 : 1,
        action: "Open dashboard",
      path: "/admin/notifications?type=dashboard",
        tone: "green",
      },
    ],
    [databaseStatus, inquiryCount, pendingReviews],
  );

  const totalPending = notifications.reduce((sum, item) => sum + item.count, 0);

  return (
    <AdminLayout>
      <div className="notifications-admin-page">
        <div className="notifications-admin-header">
          <div>
            <span className="notifications-eyebrow">
              <FaBell /> Admin center
            </span>
            <h1>Notifications</h1>
            <p>
              Track customer messages, pending approvals, and admin alerts from
              one place.
            </p>
          </div>

          <div className="notifications-total-card">
            <span>Yet to see</span>
            <strong>{totalPending}</strong>
          </div>
        </div>

        <div className="notifications-admin-grid">
          {notifications.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`notifications-admin-card ${item.tone} ${
                item.count > 0 ? "has-pending" : ""
              }`}
              onClick={() => navigate(item.path)}
            >
              {type === "reviews" && (
  <div className="notification-detail-box">
    <h3>Pending Reviews</h3>
    <p>
      {pendingReviews} reviews are waiting for approval.
    </p>

    <button
      onClick={() => navigate("/admin/reviews")}
    >
      Open Reviews
    </button>
  </div>
)}

{type === "inquiries" && (
  <div className="notification-detail-box">
    <h3>Customer Inquiries</h3>
    <p>
      {inquiryCount} inquiry messages need review.
    </p>

    <button
      onClick={() => navigate("/admin/inquiries")}
    >
      Open Inquiries
    </button>
  </div>
)}

{type === "dashboard" && (
  <div className="notification-detail-box">
    <h3>System Status</h3>
    <p>
      Database Status: {databaseStatus}
    </p>

    <button
      onClick={() => navigate("/admin/dashboard")}
    >
      Open Dashboard
    </button>
  </div>
)}
              <span className="notifications-admin-icon">{item.icon}</span>

              <span className="notifications-admin-content">
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </span>

                <span className="notifications-admin-action">
                  {item.action}
                </span>
              </span>

              <span className="notifications-admin-count">{item.count}</span>
            </button>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default NotificationsAdmin;

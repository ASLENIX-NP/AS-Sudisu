import { useEffect, useMemo, useState } from "react";
import { FaBell, FaBriefcase, FaEnvelope, FaServer, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { supabase } from "../../lib/supabase";
import "../../styles/NotificationsAdmin.css";
import { useSearchParams } from "react-router-dom";

const BUSINESS_TYPES = [
  { id: "distributor", title: "Distributor applications", inquiryType: "Distributor Application", action: "Open distributor applications", tone: "green" },
  { id: "bulk-orders", title: "Bulk order inquiries", inquiryType: "Bulk Order Inquiry", action: "Open bulk orders", tone: "blue" },
  { id: "retail", title: "Retail partnerships", inquiryType: "Retail Partnership", action: "Open retail partnerships", tone: "amber" },
  { id: "catalog", title: "Catalog requests", inquiryType: "Catalog Request", action: "Open catalog requests", tone: "green" },
];

const NotificationsAdmin = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const [pendingReviews, setPendingReviews] = useState(0);
  const [inquiryCount, setInquiryCount] = useState(0);
  const [businessInquiries, setBusinessInquiries] = useState([]);
  const [databaseStatus, setDatabaseStatus] = useState("Checking");

  useEffect(() => {
    fetchNotifications();

    window.addEventListener("inquiries-read", fetchNotifications);
    window.addEventListener("business-inquiries-updated", fetchNotifications);

    return () => {
      window.removeEventListener("inquiries-read", fetchNotifications);
      window.removeEventListener("business-inquiries-updated", fetchNotifications);
    };
  }, []);

  const fetchNotifications = async () => {
    const { count: reviewsCount } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true })
      .eq("status", "Pending");

    setPendingReviews(reviewsCount || 0);

    try {
      const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/inquiries");
      const data = await response.json();

      if (data.success) {
        setInquiryCount(
          data.inquiries.filter((inquiry) => !inquiry.isRead).length,
        );
      }
    } catch (error) {
      setInquiryCount(0);
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/business-inquiries");
      const data = await response.json();
      const unread = data.success ? data.inquiries.filter((inquiry) => !inquiry.isRead) : [];
      setBusinessInquiries(unread);
    } catch (error) { setBusinessInquiries([]); }

    const { error: dbError } = await supabase
      .from("products")
      .select("id")
      .limit(1);

    setDatabaseStatus(dbError ? "Needs attention" : "Healthy");
  };

  const notifications = useMemo(
    () => [
      ...BUSINESS_TYPES.map((businessType) => {
        const count = businessInquiries.filter((inquiry) => inquiry.inquiryType === businessType.inquiryType).length;
        return {
          id: businessType.id,
          icon: <FaBriefcase />,
          title: businessType.title,
          description: count > 0 ? `${count} unread ${businessType.title.toLowerCase()} need review.` : `No unseen ${businessType.title.toLowerCase()} right now.`,
          count,
          action: businessType.action,
          path: `/admin/business-inquiries?type=${encodeURIComponent(businessType.inquiryType)}`,
          tone: businessType.tone,
        };
      }),
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
    [businessInquiries, databaseStatus, inquiryCount, pendingReviews],
  );

  const totalPending = notifications.reduce((sum, item) => sum + item.count, 0);

  return (
    <AdminLayout>
      <div className="notifications-admin-page">
        <div className="notifications-admin-header"></div>

        {!type && (
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
        )}
        {type === "inquiries" && (
          <div className="notification-detail-box">
            <h2>📩 Customer Inquiries</h2>

            <div className="notification-info">
              <div className="info-row">
                <strong>Status:</strong>
                <span>
                  {inquiryCount > 0
                    ? `${inquiryCount} New Inquiries`
                    : "No New Inquiries"}
                </span>
              </div>

              <div className="info-row">
                <strong>Priority:</strong>
                <span>
                  {inquiryCount > 5
                    ? "High"
                    : inquiryCount > 0
                      ? "Medium"
                      : "Low"}
                </span>
              </div>

              <div className="info-row">
                <strong>Description:</strong>
                <span>
                  Customer messages submitted through the website contact form
                  are waiting for review.
                </span>
              </div>

              <div className="info-row">
                <strong>Action Required:</strong>
                <span>
                  Open the inquiries page and reply to customer messages.
                </span>
              </div>
            </div>

            <button
              className="notification-action-btn"
              onClick={() => navigate("/admin/inquiries")}
            >
              Open Inquiries
            </button>
          </div>
        )}

        {type === "reviews" && (
          <div className="notification-detail-box">
            <h2>⭐ Pending Reviews</h2>

            <div className="notification-info">
              <div className="info-row">
                <strong>Pending Reviews:</strong>
                <span>{pendingReviews}</span>
              </div>

              <div className="info-row">
                <strong>Description:</strong>
                <span>
                  Customer reviews require approval before they appear publicly
                  on products.
                </span>
              </div>

              <div className="info-row">
                <strong>Action Required:</strong>
                <span>Approve genuine reviews and reject spam reviews.</span>
              </div>
            </div>
            <button
              className="notification-action-btn"
              onClick={() => navigate("/admin/reviews")}
            >
              Manage Reviews
            </button>
          </div>
        )}

        {type === "dashboard" && (
          <div className="notification-detail-box">
            <h2>🖥️ System Status</h2>

            <div className="notification-info">
              <div className="info-row">
                <strong>Database:</strong>
                <span>{databaseStatus}</span>
              </div>

              <div className="info-row">
                <strong>Server:</strong>
                <span>Running</span>
              </div>

              <div className="info-row">
                <strong>Description:</strong>
                <span>
                  Monitor database connectivity and overall system health.
                </span>
              </div>
            </div>

            <button
              className="notification-action-btn"
              onClick={() => navigate("/admin/dashboard")}
            >
              Open Dashboard
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default NotificationsAdmin;

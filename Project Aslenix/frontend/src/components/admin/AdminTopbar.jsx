import { useEffect, useMemo, useState } from "react";
import { FaBell, FaCheck, FaEnvelope, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./AdminTopbar.css";

const AdminTopbar = () => {
  const navigate = useNavigate();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [pendingReviews, setPendingReviews] = useState(0);
  const [inquiries, setInquiries] = useState(0);

  useEffect(() => {
    const fetchNotificationCounts = async () => {
      const { count: reviewsCount } = await supabase
        .from("reviews")
        .select("*", { count: "exact", head: true })
        .eq("status", "Pending");

      setPendingReviews(reviewsCount || 0);

      try {
        const response = await fetch("http://localhost:5000/api/inquiries");
        const data = await response.json();

        if (data.success) {
          setInquiries(data.inquiries.length);
        }
      } catch (error) {
        setInquiries(0);
      }
    };

    fetchNotificationCounts();
  }, []);

  const notifications = useMemo(
    () => [
      {
        id: "inquiries",
        icon: <FaEnvelope />,
        title: "Customer inquiries",
        message:
          inquiries > 0
            ? `${inquiries} inquiry messages need review`
            : "No new inquiry messages",
        count: inquiries,
        path: "/admin/inquiries",
      },
      {
        id: "reviews",
        icon: <FaStar />,
        title: "Pending reviews",
        message:
          pendingReviews > 0
            ? `${pendingReviews} reviews are waiting approval`
            : "No reviews waiting approval",
        count: pendingReviews,
        path: "/admin/reviews",
      },
    ],
    [inquiries, pendingReviews],
  );

  const unreadCount = notifications.reduce((total, item) => total + item.count, 0);

  const handleNotificationClick = (path) => {
    setIsNotificationsOpen(false);
    navigate(path);
  };

  return (
    <div className="admin-topbar">
      <input
        type="text"
        placeholder="Search..."
        className="admin-search"
      />

      <div className="admin-actions">
        <div className="admin-notification-wrapper">
          <button
            type="button"
            className={`admin-notification-button ${
              unreadCount > 0 ? "has-alerts" : ""
            }`}
            onClick={() => setIsNotificationsOpen((prev) => !prev)}
            aria-label="Open admin notifications"
            aria-expanded={isNotificationsOpen}
          >
            <FaBell />
            {unreadCount > 0 && (
              <span className="admin-notification-badge">{unreadCount}</span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="admin-notification-panel">
              <div className="admin-notification-panel-header">
                <div>
                  <h3>Notifications</h3>
                  <p>{unreadCount > 0 ? `${unreadCount} updates` : "All clear"}</p>
                </div>

                <FaCheck />
              </div>

              <div className="admin-notification-list">
                {notifications.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    className={`admin-notification-item ${
                      item.count > 0 ? "has-updates" : ""
                    }`}
                    onClick={() => handleNotificationClick(item.path)}
                  >
                    <span className="admin-notification-icon">{item.icon}</span>
                    <span>
                      <strong>{item.title}</strong>
                      <small>{item.message}</small>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="admin-profile">
          <div className="avatar">A</div>

          <div>
            <h4>Admin</h4>
            <p>Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTopbar;

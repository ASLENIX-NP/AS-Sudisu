import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./AdminTopbar.css";
import { FaBell, FaCheck, FaEnvelope, FaStar, FaBriefcase } from "react-icons/fa6";

const AdminTopbar = () => {
  const navigate = useNavigate();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [pendingReviews, setPendingReviews] = useState(0);
  const [inquiries, setInquiries] = useState(0);
  const [businessInquiries, setBusinessInquiries] = useState(0);
  const [latestBusinessInquiryId, setLatestBusinessInquiryId] = useState(null);
  const notificationRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchNotificationCounts = async () => {
      const { count: reviewsCount } = await supabase
        .from("reviews")
        .select("*", { count: "exact", head: true })
        .eq("status", "Pending");

      setPendingReviews(reviewsCount || 0);

      try {
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/inquiries");
        const data = await response.json();

        if (data.success) {
          setInquiries(
            data.inquiries.filter((inquiry) => !inquiry.isRead).length,
          );
        }
      } catch (error) {
        setInquiries(0);
      }
      try {
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/business-inquiries");
        const data = await response.json();
        const unread = data.success ? data.inquiries.filter((inquiry) => !inquiry.isRead) : [];
        setBusinessInquiries(unread.length);
        setLatestBusinessInquiryId(unread[0]?._id || null);
      } catch (error) { setBusinessInquiries(0); setLatestBusinessInquiryId(null); }
    };

    fetchNotificationCounts();

    window.addEventListener("inquiries-read", fetchNotificationCounts);
    window.addEventListener("business-inquiries-updated", fetchNotificationCounts);

    return () => {
      window.removeEventListener("inquiries-read", fetchNotificationCounts);
      window.removeEventListener("business-inquiries-updated", fetchNotificationCounts);
    };
  }, []);

  const notifications = useMemo(
    () => [
      {
        id: "business-inquiries",
        icon: <FaBriefcase />,
        title: "Business inquiries",
        message: businessInquiries > 0 ? `${businessInquiries} business inquiries need review` : "No new business inquiries",
        count: businessInquiries,
        path: latestBusinessInquiryId ? `/admin/business-inquiries/${latestBusinessInquiryId}` : "/admin/business-inquiries",
      },
      {
        id: "inquiries",
        icon: <FaEnvelope />,
        title: "Customer inquiries",
        message:
          inquiries > 0
            ? `${inquiries} inquiry messages need review`
            : "No new inquiry messages",
        count: inquiries,
        path: "/admin/notifications?type=inquiries",
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
        path: "/admin/notifications?type=reviews",
      },
    ],
    [businessInquiries, inquiries, latestBusinessInquiryId, pendingReviews],
  );

  const unreadCount = notifications.reduce(
    (total, item) => total + item.count,
    0,
  );

  const handleNotificationClick = (path) => {
    setIsNotificationsOpen(false);
    navigate(path);
  };

  return (
    <div className="admin-topbar">

      <div className="admin-actions">
        <div className="admin-notification-wrapper" ref={notificationRef}>
          <button
            type="button"
            className={`admin-notification-button ${
              unreadCount > 0 ? "has-alerts" : ""
            }`}
            onClick={() => navigate("/admin/notifications")}
            aria-label="Open admin notifications"
          >
            🔔
            {unreadCount > 0 && (
              <span className="admin-notification-badge">{unreadCount}</span>
            )}
          </button>
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

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { supabase } from "../../lib/supabase";

import "./AdminSidebar.css";

import {
  FaHome,
  FaBoxOpen,
  FaTags,
  FaEnvelope,
  FaChartBar,
  FaAddressBook,
  FaInfoCircle,
  FaBullhorn,
  FaBlog,
  FaCog,
  FaSignOutAlt,
  FaGraduationCap,
  FaStar,
  FaBell,
} from "react-icons/fa";

const AdminSidebar = () => {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    fetchNotificationCount();
  }, []);

  const fetchNotificationCount = async () => {
    const { count: pendingReviews } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true })
      .eq("status", "Pending");

    let inquiryCount = 0;

    try {
      const response = await fetch("http://localhost:5000/api/inquiries");
      const data = await response.json();

      if (data.success) {
        inquiryCount = data.inquiries.length;
      }
    } catch (error) {
      inquiryCount = 0;
    }

    setNotificationCount((pendingReviews || 0) + inquiryCount);
  };

  const logoutHandler = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin";
  };

  return (
    <div className="admin-sidebar">
      <div>
        <div className="admin-logo">
          <h2>
            SUDIISU
            <br />
            ADMIN
          </h2>
        </div>

        <div className="admin-links">

          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaHome />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaBoxOpen />
            Products
          </NavLink>

          <NavLink
            to="/admin/notifications"
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaBell />
            <span className="admin-link-label">Notifications</span>
            {notificationCount > 0 && (
              <span className="sidebar-notification-badge">
                {notificationCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaTags />
            Categories
          </NavLink>

          <NavLink
            to="/admin/inquiries"
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaEnvelope />
            Inquiries
          </NavLink>

          <NavLink
            to="/admin/analytics"
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaChartBar />
            Analytics
          </NavLink>

          <NavLink
            to="/admin/contact"
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaAddressBook />
            Contact
          </NavLink>

          <NavLink
            to="/admin/about"
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaInfoCircle />
            About
          </NavLink>

          <NavLink
            to="/admin/announcements"
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaBullhorn />
            Announcements
          </NavLink>

          <NavLink
            to="/admin/blog"
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaBlog />
            Blog
          </NavLink>

          <NavLink
            to="/admin/reviews"
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaStar />
            Reviews
          </NavLink>

          <NavLink
            to="/admin/certificates"
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaGraduationCap />
            Certificates
          </NavLink>

          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaCog />
            Settings
          </NavLink>

        </div>
      </div>

      <button
        onClick={logoutHandler}
        className="logout-btn"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;

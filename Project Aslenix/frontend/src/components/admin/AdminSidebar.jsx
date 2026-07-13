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
  FaBars,
  FaTimes,
  FaBriefcase,
} from "react-icons/fa";

const AdminSidebar = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchNotificationCount();

    window.addEventListener("inquiries-read", fetchNotificationCount);
    window.addEventListener("business-inquiries-updated", fetchNotificationCount);

    return () => {
      window.removeEventListener("inquiries-read", fetchNotificationCount);
      window.removeEventListener("business-inquiries-updated", fetchNotificationCount);
    };
  }, []);

  const fetchNotificationCount = async () => {
    const { count: pendingReviews } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true })
      .eq("status", "Pending");

    let inquiryCount = 0;
    let businessInquiryCount = 0;

    try {
      const response = await fetch("http://localhost:5000/api/inquiries");
      const data = await response.json();

      if (data.success) {
        inquiryCount = data.inquiries.filter((inquiry) => !inquiry.isRead).length;
      }
    } catch (error) {
      inquiryCount = 0;
    }

    try {
      const response = await fetch("http://localhost:5000/api/business-inquiries");
      const data = await response.json();
      if (data.success) businessInquiryCount = data.inquiries.filter((inquiry) => !inquiry.isRead).length;
    } catch (error) { businessInquiryCount = 0; }

    setNotificationCount((pendingReviews || 0) + inquiryCount + businessInquiryCount);
  };

  const logoutHandler = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin";
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`admin-sidebar ${isMobileMenuOpen ? "is-mobile-open" : ""}`}>
      <button
        type="button"
        className="admin-sidebar-backdrop"
        onClick={closeMobileMenu}
        aria-label="Close admin menu"
      />

      <div className="admin-sidebar-main">
        <div className="admin-sidebar-header">
          <div className="admin-logo">
          <h2>
            SUDIISU
            <br />
            ADMIN
          </h2>
          </div>

          <button
            type="button"
            className="admin-menu-toggle"
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            aria-label={isMobileMenuOpen ? "Close admin menu" : "Open admin menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="admin-mobile-drawer">
        <div className="admin-links">

          <NavLink
            to="/admin/dashboard"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaHome />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaBoxOpen />
            Products
          </NavLink>

          <NavLink
            to="/admin/notifications"
            onClick={closeMobileMenu}
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
            to="/admin/inquiries"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaEnvelope />
            Inquiries
          </NavLink>

          <NavLink to="/admin/business-inquiries" onClick={closeMobileMenu} className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>
            <FaBriefcase />
            Business Inquiries
          </NavLink>

          <NavLink
            to="/admin/analytics"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaChartBar />
            Analytics
          </NavLink>

          <NavLink
            to="/admin/contact"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaAddressBook />
            Contact
          </NavLink>

          <NavLink
            to="/admin/about"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaInfoCircle />
            About
          </NavLink>

          

          <NavLink
            to="/admin/blog"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaBlog />
            Blog
          </NavLink>

          <NavLink
            to="/admin/reviews"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaStar />
            Reviews
          </NavLink>

          <NavLink
            to="/admin/certificates"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaGraduationCap />
            Certificates
          </NavLink>

          <NavLink
            to="/admin/settings"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaCog />
            Settings
          </NavLink>

        </div>

          <button
            onClick={logoutHandler}
            className="logout-btn"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;

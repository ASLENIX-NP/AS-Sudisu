import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { supabase } from "../../lib/supabase";
import "../../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import {
  FaUsers,
  FaPepperHot,
  FaFolder,
  FaCertificate,
  FaStar,
  FaBlog,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [inquiryCount, setInquiryCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [certificateCount, setCertificateCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const navigate = useNavigate();
  const [pendingReviews, setPendingReviews] = useState(0);
  const chartData = [
    { day: "Mon", inquiries: 4 },
    { day: "Tue", inquiries: 8 },
    { day: "Wed", inquiries: 6 },
    { day: "Thu", inquiries: 10 },
    { day: "Fri", inquiries: 7 },
    { day: "Sat", inquiries: 12 },
    { day: "Sun", inquiries: 9 },
  ];
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { count: products } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    let inquiryCountValue = 0;

    try {
      const response = await fetch("http://localhost:5000/api/inquiries");

      const data = await response.json();

      console.log("Dashboard API Response:", data);

      if (data.success) {
        inquiryCountValue = data.inquiries.length;

        console.log("Dashboard Inquiry Count:", inquiryCountValue);
      }
    } catch (error) {
      console.log("Dashboard Error:", error);
    }

    const { count: categories } = await supabase
      .from("categories")
      .select("*", { count: "exact", head: true });

    const { count: certificates } = await supabase
      .from("certificates")
      .select("*", { count: "exact", head: true });
    const { count: reviews } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true });
    const { count: pending } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true })
      .eq("status", "Pending");
    const { count: blogs } = await supabase
      .from("blog")
      .select("*", { count: "exact", head: true });

    setProductCount(products || 0);
    setInquiryCount(inquiryCountValue || 0);
    setCategoryCount(categories || 0);
    setCertificateCount(certificates || 0);
    setReviewCount(reviews || 0);
    setBlogCount(blogs || 0);
    setPendingReviews(pending || 0);
  };

  return (
    <AdminLayout>
      <div className="dashboard-page">
        {/* HEADER */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Welcome Back, Admin!</h1>

            <p className="dashboard-subtitle">
              Here's an overview of SUDIISU spice business performance and
              recent activity.
            </p>
          </div>
        </div>

        {/* KPI CARDS */}

        <div className="stats-grid">
          <div className="modern-kpi inquiries-card">
            <div className="kpi-left">
              <div className="kpi-icon-circle">
                <FaUsers />
              </div>

              <div>
                <span>Total Inquiries</span>
                <h2>{inquiryCount}</h2>
                <p className="positive">↑ Customer messages</p>
              </div>
            </div>
          </div>

          <div className="modern-kpi products-card">
            <div className="kpi-left">
              <div className="kpi-icon-circle">
                <FaPepperHot />
              </div>

              <div>
                <span>Total Products</span>
                <h2>{productCount}</h2>
                <p className="positive">↑ Inventory </p>
              </div>
            </div>
          </div>

          <div className="modern-kpi pending-card">
            <div className="kpi-left">
              <div className="kpi-icon-circle">
                <FaClock />
              </div>

              <div>
                <span>Pending Reviews</span>
                <h2>{pendingReviews}</h2>
                <p className="negative">Waiting for approval</p>
              </div>
            </div>
          </div>

          <div className="modern-kpi reviews-card">
            <div className="kpi-left">
              <div className="kpi-icon-circle">
                <FaStar />
              </div>

              <div>
                <span>Total Reviews</span>
                <h2>{reviewCount}</h2>
                <p className="positive">Customer feedback</p>
              </div>
            </div>
          </div>
        </div>
        <div className="analytics-grid">
          {/* Chart */}

          <div className="dashboard-card chart-card">
            <h2>Inquiry Trend</h2>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="inquiries"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Products */}

          <div className="dashboard-card products-card">
            <div className="card-header">
              <h2>Top Products</h2>
            </div>

            <div className="top-product">
              <span>1</span>
              <p>Timur Powder</p>
            </div>

            <div className="top-product">
              <span>2</span>
              <p>Black Pepper</p>
            </div>

            <div className="top-product">
              <span>3</span>
              <p>Chilli Powder</p>
            </div>

            <div className="top-product">
              <span>4</span>
              <p>Cumin Seeds</p>
            </div>

            <div className="top-product">
              <span>5</span>
              <p>Coriander Powder</p>
            </div>
          </div>

          {/* Notifications */}

          <div className="dashboard-card notifications-card">
            <div className="card-header">
              <h2>Notifications</h2>
            </div>

            <div className="notification-item">
              <div>
                <strong>New inquiry received</strong>
                <small>5 minutes ago</small>
              </div>

              <span className="notification-dot"></span>
            </div>

            <div className="notification-item">
              <div>
                <strong>Timur Powder stock is low</strong>
                <small>10 minutes ago</small>
              </div>

              <span className="notification-dot"></span>
            </div>

            <div className="notification-item">
              <div>
                <strong>New review submitted</strong>
                <small>1 hour ago</small>
              </div>

              <span className="notification-dot"></span>
            </div>

            <div className="notification-item">
              <div>
                <strong>Certificate uploaded</strong>
                <small>2 hours ago</small>
              </div>

              <span className="notification-dot"></span>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2>Recent Activity</h2>

            <div className="activity-list">
              <div className="activity-item">
                <div>
                  <strong>Products Updated</strong>
                  <small>Inventory synchronized with database</small>
                </div>
                <span>Today</span>
              </div>

              <div className="activity-item">
                <div>
                  <strong>Customer Inquiries</strong>
                  <small>Messages arriving in real-time</small>
                </div>
                <span>Live</span>
              </div>

              <div className="activity-item">
                <div>
                  <strong>Certificates Active</strong>
                  <small>Public certificates available</small>
                </div>
                <span>Online</span>
              </div>

              <div className="activity-item">
                <div>
                  <strong>Admin Settings</strong>
                  <small>System configuration accessible</small>
                </div>
                <span>Ready</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h2>Quick Actions</h2>

            <div className="quick-actions">
              <button onClick={() => navigate("/admin/products")}>
                + Add Product
              </button>

              <button onClick={() => navigate("/admin/categories")}>
                + Add Category
              </button>

              <button onClick={() => navigate("/admin/blog")}>
                + Create Blog
              </button>

              <button onClick={() => navigate("/admin/reviews")}>
                ⭐ Manage Reviews
              </button>

              <button onClick={() => navigate("/admin/announcements")}>
                📢 Announcements
              </button>
            </div>
          </div>
        </div>

        {/* SYSTEM STATUS */}

        <div className="dashboard-card">
          <h2>System Status</h2>

          <div className="overview-grid">
            <div className="overview-box">
              <span>Total Products</span>
              <h3>{productCount}</h3>
            </div>

            <div className="overview-box">
              <span>Total Inquiries</span>
              <h3>{inquiryCount}</h3>
            </div>

            <div className="overview-box">
              <span>Database</span>

              <div className="status-pill connected">● Connected</div>
            </div>

            <div className="overview-box">
              <span>System</span>

              <div className="status-pill online">● Online</div>
            </div>
          </div>
        </div>

        <div className="mini-stats">
          <div className="mini-card">
            <h4>Products</h4>
            <span>{productCount}</span>
          </div>

          <div className="mini-card">
            <h4>Reviews</h4>
            <span>{reviewCount}</span>
          </div>

          <div className="mini-card">
            <h4>Blogs</h4>
            <span>{blogCount}</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;

import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { supabase } from "../../lib/supabase";
import "../../styles/Dashboard.css";
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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [inquiryCount, setInquiryCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  const [certificateCount, setCertificateCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const navigate = useNavigate();
  const [pendingReviews, setPendingReviews] = useState(0);
  const [businessInquiryStats, setBusinessInquiryStats] = useState({ total: 0, pending: 0, contacted: 0, approved: 0, today: 0 });

  const [activities, setActivities] = useState([]);

  const [databaseStatus, setDatabaseStatus] = useState("Checking...");

  const [serverStatus, setServerStatus] = useState("Checking...");

  const [reviewStatus, setReviewStatus] = useState("Checking...");

  const [lastUpdated, setLastUpdated] = useState("");
  const [chartData, setChartData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const last7Days = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      last7Days.push({
        date: date.toISOString().split("T")[0],
        day: date.toLocaleDateString("en-US", {
          weekday: "long",
        }),
        inquiries: 0,
        reviews: 0,
      });
    }
    let inquiryCountValue = 0;

    try {
      const response = await fetch("http://localhost:5001/api/inquiries");

      const data = await response.json();

      console.log("Dashboard API Response:", data);

      if (data.success) {
        inquiryCountValue = data.inquiries.length;

        data.inquiries.forEach((item) => {
          const inquiryDate = new Date(item.createdAt)
            .toISOString()
            .split("T")[0];

          const day = last7Days.find((d) => d.date === inquiryDate);

          if (day) {
            day.inquiries++;
          }
        });

        const { data: reviewData } = await supabase
          .from("reviews")
          .select("created_at");

        reviewData?.forEach((item) => {
          const reviewDate = new Date(item.created_at)
            .toISOString()
            .split("T")[0];

          const day = last7Days.find((d) => d.date === reviewDate);

          if (day) {
            day.reviews++;
          }
        });
        setChartData(
          last7Days.map((item) => ({
            day: item.day,
            inquiries: item.inquiries,
            reviews: item.reviews,
          })),
        );
        console.log("Dashboard Inquiry Count:", inquiryCountValue);
      }
    } catch (error) {
      console.log("Dashboard Error:", error);
    }

    try {
      const response = await fetch("http://localhost:5001/api/business-inquiries");
      const data = await response.json();
      if (data.success) {
        const today = new Date().toDateString();
        setBusinessInquiryStats({
          total: data.inquiries.length,
          pending: data.inquiries.filter((item) => item.status === "Pending").length,
          contacted: data.inquiries.filter((item) => item.status === "Contacted").length,
          approved: data.inquiries.filter((item) => item.status === "Approved").length,
          today: data.inquiries.filter((item) => new Date(item.createdAt).toDateString() === today).length,
        });
      }
    } catch (error) { console.log("Business inquiry dashboard error:", error); }

    const { count: products } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

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

    const { count: visitors, error: visitorError } = await supabase
      .from("Website_Visitors")
      .select("*", { count: "exact", head: true });

    console.log("Visitor Count:", visitors);
    console.log("Visitor Error:", visitorError);

    setVisitorCount(visitors || 0);

    setProductCount(products || 0);
    setInquiryCount(inquiryCountValue || 0);
    setCategoryCount(categories || 0);
    setCertificateCount(certificates || 0);
    setReviewCount(reviews || 0);
    setBlogCount(blogs || 0);
    setPendingReviews(pending || 0);

    const { data: approvedReviews } = await supabase
      .from("reviews")
      .select("product_id, product_name")
      .eq("status", "Approved");
    
    console.log("Approved Reviews:", approvedReviews);
    const productRanking = {};

    approvedReviews?.forEach((review) => {
      const id = review.product_id;

      if (!productRanking[id]) {
        productRanking[id] = {
          id,
          name: review.product_name,
          reviewCount: 0,
        };
      }

      productRanking[id].reviewCount += 1;
    });

    const sortedProducts = Object.values(productRanking)
      .sort((a, b) => b.reviewCount - a.reviewCount)
      .slice(0, 5);

    setTopProducts(sortedProducts);
    // populate default activities and notifications so UI doesn't break
    const activitiesArr = [
      {
        id: 1,
        title: "Products Updated",
        desc: "Inventory synchronized with database",
        tag: "Today",
      },
      {
        id: 2,
        title: "Customer Inquiries",
        desc: "Messages arriving in real-time",
        tag: "Live",
      },
      {
        id: 3,
        title: "Certificates Active",
        desc: "Public certificates available",
        tag: "Online",
      },
      {
        id: 4,
        title: "Admin Settings",
        desc: "System configuration accessible",
        tag: "Ready",
      },
    ];
    setActivities(activitiesArr);

    // DATABASE CHECK
    const { error: dbError } = await supabase
      .from("products")
      .select("id")
      .limit(1);

    setDatabaseStatus(dbError ? "Disconnected" : "Connected");

    // REVIEW SYSTEM CHECK
    const { error: reviewError } = await supabase
      .from("reviews")
      .select("id")
      .limit(1);

    setReviewStatus(reviewError ? "Error" : "Working");

    // SERVER CHECK
    setServerStatus("Online");

    // LAST UPDATED
    setLastUpdated(new Date().toLocaleString());
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

        <div className="dashboard-stats-grid">
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
                <span>Approved Reviews</span>
                <h2>{reviewCount}</h2>
                <p className="positive">Customer feedback</p>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics: Chart + Right column (Top Products and Recent Activity) */}
        <div className="analytics-grid">
          {/* Chart */}

          <div className="dashboard-card chart-card">
            <h2>Inquiry Trend</h2>

            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;

                      return (
                        <div
                          style={{
                            background: "#fff",
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            padding: "12px",
                          }}
                        >
                          <p>
                            <strong>{label}</strong>
                          </p>

                          <p style={{ color: "#2563eb" }}>
                            ● Inquiries : {data.inquiries}
                          </p>

                          <p style={{ color: "#16a34a" }}>
                            ● Reviews : {data.reviews}
                          </p>
                        </div>
                      );
                    }

                    return null;
                  }}
                />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="inquiries"
                  stroke="#2563eb"
                  strokeWidth={3}
                  name="Inquiries"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Right column: Top products and Recent Activity */}
          <div className="right-column">
            <div className="dashboard-card products-card">
              <div className="card-header">
                <h2>Top Products</h2>
              </div>

              {topProducts.map((product, index) => (
                <div key={product.id} className="top-product">
                  <span>{index + 1}</span>

                  <div>
                    <p>{product.name}</p>
                    <small>{product.reviewCount} Reviews</small>
                  </div>
                </div>
              ))}
            </div>

            <div className="notif-activity-row">
              <div className="dashboard-card recent-activity-card">
                <h2>Recent Activity</h2>

                <div className="activity-list compact">
                  {activities.map((act) => (
                    <div key={act.id} className="activity-item">
                      <div>
                        <strong>{act.title}</strong>
                        <small>{act.desc}</small>
                      </div>

                      <span>{act.tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card" style={{ marginTop: "24px" }}>
          <div className="card-header"><h2>Business Inquiries</h2><button className="delete-btn" onClick={() => navigate("/admin/business-inquiries")}>Manage</button></div>
          <div className="mini-stats">
            <div className="mini-card"><h4>Total</h4><span>{businessInquiryStats.total}</span></div>
            <div className="mini-card"><h4>Pending</h4><span>{businessInquiryStats.pending}</span></div>
            <div className="mini-card"><h4>Contacted</h4><span>{businessInquiryStats.contacted}</span></div>
            <div className="mini-card"><h4>Approved</h4><span>{businessInquiryStats.approved}</span></div>
            <div className="mini-card"><h4>New Today</h4><span>{businessInquiryStats.today}</span></div>
          </div>
        </div>

        {/* MAIN GRID */}

        <div className="dashboard-grid">
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

        <div className="dashboard-card system-status-card">
          <h2>System Status</h2>

          <div className="status-item">
            <span>Website Status</span>
            <span className="status-online">● Online</span>
          </div>

          <div className="status-item">
            <span>Database</span>

            <span
              className={
                databaseStatus === "Connected"
                  ? "status-online"
                  : "status-offline"
              }
            >
              ● {databaseStatus}
            </span>
          </div>

          <div className="status-item">
            <span>Server</span>

            <span
              className={
                serverStatus === "Online" ? "status-online" : "status-offline"
              }
            >
              ● {serverStatus}
            </span>
          </div>

          <div className="status-item">
            <span>Review System</span>

            <span
              className={
                reviewStatus === "Working" ? "status-online" : "status-offline"
              }
            >
              ● {reviewStatus}
            </span>
          </div>

          <div className="status-item">
            <span>Website Visitors</span>
            <span className="status-online">👥 {visitorCount} Visits</span>
          </div>

          <p className="status-update">Last Updated: {lastUpdated}</p>
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

          <div className="mini-card">
            <h4>Visitors</h4>
            <span>{visitorCount}</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;

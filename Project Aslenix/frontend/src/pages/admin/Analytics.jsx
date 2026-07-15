import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { supabase } from "../../lib/supabase";
import "../../styles/Analytics.css";
import {
  FaBoxOpen,
  FaCertificate,
  FaEnvelope,
  FaPenNib,
  FaStar,
  FaRegClock,
  FaSyncAlt,
} from "react-icons/fa";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const emptyMetrics = {
  products: [],
  reviews: [],
  blogs: [],
  inquiries: [],
  certificates: [],
};

const Analytics = () => {
  const [metrics, setMetrics] = useState(emptyMetrics);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [dataError, setDataError] = useState(false);

  const fetchAnalytics = async () => {
    setLoading(true);
    setDataError(false);

    const [productsResult, reviewsResult, blogsResult, inquiriesResult, certificatesResult] =
      await Promise.allSettled([
        supabase.from("products").select("id, created_at"),
        supabase.from("reviews").select("id, status, rating, created_at"),
        supabase.from("blogs").select("id, status, created_at"),
        fetch(`${API_URL}/inquiries`).then(async (response) => {
          if (!response.ok) throw new Error("Could not load inquiries");
          const payload = await response.json();
          if (!payload.success) throw new Error("Could not load inquiries");
          return payload.inquiries || [];
        }),
        fetch(`${API_URL}/certificates`).then(async (response) => {
          if (!response.ok) throw new Error("Could not load certificates");
          return response.json();
        }),
      ]);

    const resultData = (result, fallback = []) =>
      result.status === "fulfilled" && !result.value?.error
        ? result.value.data ?? result.value
        : fallback;

    const results = [productsResult, reviewsResult, blogsResult, inquiriesResult, certificatesResult];
    setDataError(results.some((result) => result.status === "rejected" || result.value?.error));
    setMetrics({
      products: resultData(productsResult),
      reviews: resultData(reviewsResult),
      blogs: resultData(blogsResult),
      inquiries: resultData(inquiriesResult),
      certificates: resultData(certificatesResult),
    });
    setLastUpdated(new Date());
    setLoading(false);
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const pendingReviews = metrics.reviews.filter(
    (review) => review.status?.toLowerCase() === "pending",
  ).length;

  const inquiryTrend = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 6 }, (_, position) => {
      const date = new Date(now.getFullYear(), now.getMonth() - 5 + position, 1);
      const total = metrics.inquiries.filter((inquiry) => {
        const createdAt = new Date(inquiry.createdAt || inquiry.created_at);
        return (
          !Number.isNaN(createdAt.getTime()) &&
          createdAt.getFullYear() === date.getFullYear() &&
          createdAt.getMonth() === date.getMonth()
        );
      }).length;
      return {
        month: date.toLocaleString("en-US", { month: "short" }),
        inquiries: total,
      };
    });
  }, [metrics.inquiries]);

  const ratingDistribution = useMemo(
    () =>
      [5, 4, 3, 2, 1].map((rating) => ({
        rating: `${rating} star`,
        reviews: metrics.reviews.filter((review) => Number(review.rating) === rating).length,
      })),
    [metrics.reviews],
  );

  const statCards = [
    { label: "Total Products", value: metrics.products.length, note: "Products in your catalog", icon: FaBoxOpen, tone: "blue" },
    { label: "Customer Inquiries", value: metrics.inquiries.length, note: "Messages received", icon: FaEnvelope, tone: "green" },
    { label: "Total Reviews", value: metrics.reviews.length, note: "Customer feedback received", icon: FaStar, tone: "orange" },
    { label: "Pending Reviews", value: pendingReviews, note: "Waiting for moderation", icon: FaRegClock, tone: "purple" },
    { label: "Certificates", value: metrics.certificates.length, note: "Quality documents uploaded", icon: FaCertificate, tone: "teal" },
    { label: "Blog Posts", value: metrics.blogs.length, note: "Articles in your CMS", icon: FaPenNib, tone: "pink" },
  ];

  return (
    <AdminLayout>
      <div className="analytics-page">
        <div className="analytics-header">
          <div>
            <h1>Website Overview</h1>
            <p>Live catalog, content, and customer engagement data from your application.</p>
          </div>
          <button className="analytics-refresh" type="button" onClick={fetchAnalytics} disabled={loading}>
            <FaSyncAlt className={loading ? "is-spinning" : ""} /> {loading ? "Refreshing" : "Refresh"}
          </button>
        </div>

        {dataError && (
          <div className="analytics-notice">
            Some data could not be loaded. The available figures below are still current.
          </div>
        )}

        <div className="analytics-stats">
          {statCards.map(({ label, value, note, icon: Icon, tone }) => (
            <div className={`analytics-card ${tone}`} key={label}>
              <Icon className="analytics-icon" />
              <span>{label}</span>
              <h2>{loading ? "—" : value}</h2>
              <small>{note}</small>
            </div>
          ))}
        </div>

        <div className="analytics-grid">
          <section className="analytics-panel analytics-chart">
            <div className="chart-header">
              <div><h3>Monthly Inquiry Trend</h3><p>Customer inquiries received over the last six months.</p></div>
              <span>Last 6 months</span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={inquiryTrend}>
                <defs><linearGradient id="inquiriesGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} /><stop offset="95%" stopColor="#2563eb" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="inquiries" name="Inquiries" stroke="#2563eb" strokeWidth={3} fill="url(#inquiriesGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </section>

          <section className="analytics-panel system-overview">
            <h3>System Overview</h3>
            <div className="system-row"><span>Database</span><div className={`status-pill ${dataError ? "attention" : "connected"}`}>{dataError ? "Check connection" : "Connected"}</div></div>
            <div className="system-row"><span>Review moderation</span><strong>{pendingReviews} pending</strong></div>
            <div className="system-row"><span>Published blogs</span><strong>{metrics.blogs.filter((blog) => blog.status?.toLowerCase() === "published").length}</strong></div>
            <div className="system-row"><span>Last updated</span><strong>{lastUpdated ? lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"}</strong></div>
          </section>

          <section className="analytics-panel rating-chart">
            <div className="chart-header"><div><h3>Review Rating Distribution</h3><p>How customers rate your products.</p></div></div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={ratingDistribution} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="4 4" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" allowDecimals={false} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="rating" width={52} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="reviews" name="Reviews" fill="#f59e0b" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </section>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Analytics;

import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { supabase } from "../../lib/supabase";
import "../../styles/dashboard.css";

import {
  FaUsers,
  FaPepperHot,
  FaFolder,
  FaCertificate,
  FaBoxOpen,
  FaCog,
} from "react-icons/fa";

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [inquiryCount, setInquiryCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [certificateCount, setCertificateCount] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { count: products } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    const { count: inquiries } = await supabase
      .from("inquiries")
      .select("*", { count: "exact", head: true });

    const { count: categories } = await supabase
      .from("categories")
      .select("*", { count: "exact", head: true });

    const { count: certificates } = await supabase
      .from("certificates")
      .select("*", { count: "exact", head: true });

    setProductCount(products || 0);
    setInquiryCount(inquiries || 0);
    setCategoryCount(categories || 0);
    setCertificateCount(certificates || 0);
  };

  return (
    <AdminLayout>
      <div className="dashboard-page">

        {/* HEADER */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Dashboard</h1>

<p className="dashboard-subtitle">
  Overview of products, inquiries, certificates and system status.
</p>
          </div>
        </div>

        {/* KPI CARDS */}

        <div className="stats-grid">

  <div className="stat-card">
    <FaPepperHot className="stat-icon products" />

    <div>
      <span className="card-label">Products</span>
      <h2>{productCount}</h2>
      <p>Active inventory items</p>
    </div>
  </div>

  <div className="stat-card">
    <FaUsers className="stat-icon inquiries" />

    <div>
      <span className="card-label">Inquiries</span>
      <h2>{inquiryCount}</h2>
      <p>Customer messages</p>
    </div>
  </div>

  <div className="stat-card">
    <FaFolder className="stat-icon categories" />

    <div>
      <span className="card-label">Categories</span>
      <h2>{categoryCount}</h2>
      <p>Product groups</p>
    </div>
  </div>

  <div className="stat-card">
    <FaCertificate className="stat-icon certificates" />

    <div>
      <span className="card-label">Certificates</span>
      <h2>{certificateCount}</h2>
      <p>Uploaded documents</p>
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

  <button>
    + Add Product
  </button>

  <button>
    + Add Category
  </button>

  <button>
    ↑ Upload Certificate
  </button>

  <button>
    📩 View Inquiries
  </button>

</div>
          </div>

        </div>

        {/* SYSTEM STATUS */}

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

      <div className="status-pill connected">
        ● Connected
      </div>
    </div>

    <div className="overview-box">
      <span>System</span>

      <div className="status-pill online">
        ● Online
      </div>
    </div>

  </div>
</div>

      </div>
    </AdminLayout>
  );
};

export default Dashboard;
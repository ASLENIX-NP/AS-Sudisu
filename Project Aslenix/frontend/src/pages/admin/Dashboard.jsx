import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { supabase } from "../../lib/supabase";

import {
  FaUsers,
  FaPepperHot,
} from "react-icons/fa";

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [inquiryCount, setInquiryCount] = useState(0);

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

    setProductCount(products || 0);
    setInquiryCount(inquiries || 0);
  };

  const cardStyle = {
    flex: "1",
    minWidth: "220px",
    background: "#1e293b",
    borderRadius: "16px",
    padding: "25px",
    color: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
    transition: "0.3s",
  };

  return (
    <AdminLayout>
      <div
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "32px",
              marginBottom: "10px",
            }}
          >
            SUDIISU Admin Dashboard
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "16px",
            }}
          >
            Welcome to SUDIISU Spice Management 🌶️
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {/* Inquiries */}
          <div style={cardStyle}>
            <FaUsers size={35} color="#38bdf8" />

            <h2 style={{ marginTop: "15px" }}>
              {inquiryCount}
            </h2>

            <p style={{ color: "#cbd5e1" }}>
              Customer Inquiries
            </p>
          </div>

          {/* Products */}
          <div style={cardStyle}>
            <FaPepperHot
              size={35}
              color="#e879f9"
            />

            <h2 style={{ marginTop: "15px" }}>
              {productCount}
            </h2>

            <p style={{ color: "#cbd5e1" }}>
              Total Products
            </p>
          </div>
        </div>

        {/* System Status */}
        <div
          style={{
            marginTop: "40px",
            background: "#1e293b",
            borderRadius: "16px",
            padding: "25px",
            color: "white",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>
            System Status
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <div
              style={{
                background: "#334155",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              📦 Products are managed through Supabase
            </div>

            <div
              style={{
                background: "#334155",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              📨 Customer inquiries are arriving live
            </div>

            <div
              style={{
                background: "#334155",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              ⚙️ Settings can be updated from Admin Panel
            </div>

            <div
              style={{
                background: "#334155",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              🚀 SUDIISU Admin System Active
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
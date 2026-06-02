import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { supabase } from "../../lib/supabase";

import {
  FaUsers,
  FaPepperHot,
  FaSearch,
  FaUserCircle,
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
  minWidth: "260px",
  background: "#ffffff",
  borderRadius: "16px",
  padding: "24px",
  color: "#0f172a",
  border: "1px solid #e2e8f0",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};
  return (
    <AdminLayout>
      <div
        style={{
          flex: 1,
          padding: "30px",
        }}
      >


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
          <FaUsers size={34} color="#3b82f6" />

          <h2
           style={{
          marginTop: "16px",
           color: "#0f172a",
             }}
          >
          {inquiryCount}
          </h2>

         <p style={{ color: "#64748b" }}>
          Customer Inquiries
          </p>
          </div>

          {/* Products */}
         <div style={cardStyle}>
  <FaPepperHot
    size={34}
    color="#a855f7"
  />

  <h2
    style={{
      marginTop: "16px",
      color: "#0f172a",
    }}
  >
    {productCount}
  </h2>

  <p style={{ color: "#64748b" }}>
    Total Products
  </p>
</div>
        </div>
        <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginTop: "25px",
  }}
>
  <div style={cardStyle}>
    <h3>Active Products</h3>
    <h1>{productCount}</h1>
  </div>

  <div style={cardStyle}>
    <h3>Customer Messages</h3>
    <h1>{inquiryCount}</h1>
  </div>

  <div style={cardStyle}>
    <h3>System Status</h3>
    <h1 style={{ color: "#22c55e" }}>
      Online
    </h1>
  </div>
</div>
        {/* System Status */}
        <div
          style={{
  marginTop: "40px",
  background: "#ffffff",
  borderRadius: "16px",
  padding: "25px",
  color: "#0f172a",
  border: "1px solid #e2e8f0",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
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
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              📦 Products are managed through Supabase
            </div>

            <div
              style={{
                background: "#f8fafc",
                 border: "1px solid #e2e8f0",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              📨 Customer inquiries are arriving live
            </div>

            <div
              style={{
                  background: "#f8fafc",
                 border: "1px solid #e2e8f0",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              ⚙️ Settings can be updated from Admin Panel
            </div>

            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
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
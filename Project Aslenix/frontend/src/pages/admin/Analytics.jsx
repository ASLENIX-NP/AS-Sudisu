import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { supabase } from "../../lib/supabase";
import {
  FaBoxOpen,
  FaEnvelope,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";

const Analytics = () => {
 const [productCount, setProductCount] = useState(0);
const [inquiryCount, setInquiryCount] = useState(0);
  const cardStyle = {
    background: "#1e293b",
    padding: "25px",
    borderRadius: "18px",
    color: "white",
    flex: "1",
    minWidth: "240px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
  };
useEffect(() => {
  fetchAnalytics();
}, []);

const fetchAnalytics = async () => {
  try {
    // PRODUCTS FROM SUPABASE
    const { data: products } = await supabase
      .from("products")
      .select("*");

    setProductCount(products.length);

    // INQUIRIES FROM MONGODB
    const response = await fetch(
      "http://localhost:5000/api/inquiries"
    );

    const data = await response.json();

    if (data.success) {
      setInquiryCount(data.inquiries.length);
    }
  } catch (error) {
    console.log(error);
  }
};
  return (
    <AdminLayout>
      <div
        style={{
          padding: "30px",
          color: "white",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            marginBottom: "35px",
          }}
        >
          <h1
            style={{
              fontSize: "42px",
              marginBottom: "10px",
            }}
          >
            Analytics Dashboard 📊
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "17px",
            }}
          >
            Business insights and website performance overview.
          </p>
        </div>

        {/* ANALYTICS CARDS */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {/* PRODUCTS */}
          <div style={cardStyle}>
            <FaBoxOpen size={35} color="#38bdf8" />

            <h2
              style={{
                marginTop: "18px",
                fontSize: "34px",
              }}
            >
              {productCount}
            </h2>

            <p
              style={{
                color: "#cbd5e1",
                marginTop: "8px",
              }}
            >
              Total Products
            </p>
          </div>

          {/* INQUIRIES */}
          <div style={cardStyle}>
            <FaEnvelope size={35} color="#22c55e" />

            <h2
              style={{
                marginTop: "18px",
                fontSize: "34px",
              }}
            >
            {inquiryCount}
            </h2>

            <p
              style={{
                color: "#cbd5e1",
                marginTop: "8px",
              }}
            >
              Customer Inquiries
            </p>
          </div>

          {/* VISITORS */}
          <div style={cardStyle}>
            <FaUsers size={35} color="#f97316" />

            <h2
              style={{
                marginTop: "18px",
                fontSize: "34px",
              }}
            >
              1.2K
            </h2>

            <p
              style={{
                color: "#cbd5e1",
                marginTop: "8px",
              }}
            >
              Website Visitors
            </p>
          </div>

          {/* GROWTH */}
          <div style={cardStyle}>
            <FaChartLine size={35} color="#e879f9" />

            <h2
              style={{
                marginTop: "18px",
                fontSize: "34px",
              }}
            >
              +18%
            </h2>

            <p
              style={{
                color: "#cbd5e1",
                marginTop: "8px",
              }}
            >
              Monthly Growth
            </p>
          </div>
        </div>

        {/* RECENT INSIGHTS */}
        <div
          style={{
            marginTop: "40px",
            background: "#1e293b",
            borderRadius: "18px",
            padding: "25px",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            Recent Insights
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
              🌶️ Chilli Powder is the most viewed product this week.
            </div>

            <div
              style={{
                background: "#334155",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              📩 Inquiry traffic increased by 22% this month.
            </div>

            <div
              style={{
                background: "#334155",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              📦 New product additions improved customer engagement.
            </div>

            <div
              style={{
                background: "#334155",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              🚀 Website growth is steadily increasing in Nepal region.
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Analytics;
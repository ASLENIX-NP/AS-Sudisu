import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { supabase } from "../../lib/supabase";
import "../../styles/analytics.css";

import {
  FaBoxOpen,
  FaEnvelope,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";

const Analytics = () => {
  const [productCount, setProductCount] = useState(0);
  const [inquiryCount, setInquiryCount] = useState(0);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data: products } = await supabase
        .from("products")
        .select("*");

      setProductCount(products?.length || 0);

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
      <div className="analytics-page">

        <div className="analytics-header">
          <h1>Analytics</h1>
          <p>
            Business performance and customer engagement overview.
          </p>
        </div>

        <div className="analytics-stats">

          <div className="analytics-card">
            <FaBoxOpen className="analytics-icon blue" />
            <span>Products</span>
            <h2>{productCount}</h2>
            <small>Active inventory items</small>
          </div>

          <div className="analytics-card">
            <FaEnvelope className="analytics-icon green" />
            <span>Inquiries</span>
            <h2>{inquiryCount}</h2>
            <small>Customer messages</small>
          </div>

          <div className="analytics-card">
            <FaUsers className="analytics-icon orange" />
            <span>Visitors</span>
            <h2>1.2K</h2>
            <small>Monthly traffic</small>
          </div>

          <div className="analytics-card">
            <FaChartLine className="analytics-icon purple" />
            <span>Growth</span>
            <h2>+18%</h2>
            <small>Compared to last month</small>
          </div>

        </div>

        <div className="analytics-grid">

          <div className="analytics-panel">
            <h3>Performance Insights</h3>

            <div className="insight-item">
              Chilli Powder remains the most viewed product.
            </div>

            <div className="insight-item">
              Inquiry volume increased this month.
            </div>

            <div className="insight-item">
              Product catalog engagement remains strong.
            </div>

            <div className="insight-item">
              Traffic growth continues across Nepal.
            </div>
          </div>

          <div className="analytics-panel">
            <h3>System Overview</h3>

            <div className="system-row">
              <span>Products</span>
              <strong>{productCount}</strong>
            </div>

            <div className="system-row">
              <span>Inquiries</span>
              <strong>{inquiryCount}</strong>
            </div>

            <div className="system-row">
              <span>Database</span>
              <div className="status-pill connected">
                Connected
              </div>
            </div>

            <div className="system-row">
              <span>Status</span>
              <div className="status-pill online">
                Online
              </div>
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default Analytics;
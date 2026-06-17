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

  <div className="analytics-panel analytics-chart">

  <div className="chart-header">
    <h3>Analytics Overview</h3>

    <span>Last 6 Months</span>
  </div>

  <div className="fake-chart">

    <div className="chart-line"></div>

    <div className="chart-point p1"></div>
    <div className="chart-point p2"></div>
    <div className="chart-point p3"></div>
    <div className="chart-point p4"></div>
    <div className="chart-point p5"></div>
    <div className="chart-point p6"></div>

    <div className="chart-months">
      <span>Jan</span>
      <span>Feb</span>
      <span>Mar</span>
      <span>Apr</span>
      <span>May</span>
      <span>Jun</span>
    </div>

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
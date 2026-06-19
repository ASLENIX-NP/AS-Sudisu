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
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";
const Analytics = () => {
  const [productCount, setProductCount] = useState(0);
const [inquiryCount, setInquiryCount] = useState(0);

const [visitorCount, setVisitorCount] = useState(0);
const [growth, setGrowth] = useState(0);
const [chartData, setChartData] = useState([]);

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
        const { data: visitors } = await supabase
  .from("Website_Visitors")
  .select("created_at");

setVisitorCount(visitors?.length || 0);

const monthlyData = [
  { month: "Jan", visitors: 0 },
  { month: "Feb", visitors: 0 },
  { month: "Mar", visitors: 0 },
  { month: "Apr", visitors: 0 },
  { month: "May", visitors: 0 },
  { month: "Jun", visitors: 0 },
  { month: "Jul", visitors: 0 },
  { month: "Aug", visitors: 0 },
  { month: "Sep", visitors: 0 },
  { month: "Oct", visitors: 0 },
  { month: "Nov", visitors: 0 },
  { month: "Dec", visitors: 0 },
];

visitors?.forEach((v) => {
  const monthIndex = new Date(
    v.created_at
  ).getMonth();

  monthlyData[monthIndex].visitors += 1;
});

setChartData([
  { month: "Jan", visitors: 20 },
  { month: "Feb", visitors: 40 },
  { month: "Mar", visitors: 15 },
  { month: "Apr", visitors: 60 },
  { month: "May", visitors: 35 },
  { month: "Jun", visitors: 90 },
]);
console.log("Visitors:", visitors);
console.log("Monthly Data:", monthlyData);

const currentMonth =
  monthlyData[new Date().getMonth()]
    ?.visitors || 0;

const previousMonth =
  monthlyData[
    new Date().getMonth() - 1
  ]?.visitors || 0;

if (previousMonth > 0) {
  setGrowth(
    (
      ((currentMonth - previousMonth) /
        previousMonth) *
      100
    ).toFixed(0)
  );
}
      }
    } catch (error) {
      console.log(error);
    }
  };
console.log("Chart Data:", chartData);
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
            <h2>{visitorCount}</h2>
            <small>Monthly traffic</small>
          </div>

          <div className="analytics-card">
            <FaChartLine className="analytics-icon purple" />
            <span>Growth</span>
            <h2>+{growth}%</h2>
            <small>Compared to last month</small>
          </div>
        </div>

        <div className="analytics-grid">

  <div className="analytics-panel analytics-chart">

  <div className="chart-header">
    <h3>Analytics Overview</h3>

    <span>Last 6 Months</span>
  </div>

<ResponsiveContainer width="100%" height={350}>
  <AreaChart data={chartData}>
    <XAxis dataKey="month" />
    <Tooltip />
    <Area
      type="monotone"
      dataKey="visitors"
      stroke="#2563eb"
      fill="#93c5fd"
    />
  </AreaChart>
</ResponsiveContainer>

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
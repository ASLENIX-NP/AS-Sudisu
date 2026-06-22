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
  YAxis,
  Tooltip,
  CartesianGrid,
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
    // PRODUCTS

    const { data: products } = await supabase
      .from("products")
      .select("*");

    setProductCount(products?.length || 0);

    // INQUIRIES

    try {
      const response = await fetch(
        "http://localhost:5000/api/inquiries"
      );

      const inquiryData = await response.json();

      if (inquiryData.success) {
        setInquiryCount(
          inquiryData.inquiries.length
        );
      }
    } catch (err) {
      console.log(
        "Inquiry API Failed:",
        err
      );
    }

    // VISITORS

    const { data: visitors } = await supabase
      .from("Website_Visitors")
      .select("created_at");
    console.log("Visitors:", visitors);
    console.log("Visitor Count:", visitors?.length);
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

      monthlyData[monthIndex].visitors++;
    });

    const currentMonthIndex =
  new Date().getMonth();

const last6Months = [];

for (let i = 5; i >= 0; i--) {
  const index =
    (currentMonthIndex - i + 12) % 12;

  last6Months.push(
    monthlyData[index]
  );
}

setChartData(last6Months);
    

const previousMonthIndex =
  currentMonthIndex === 0
    ? 11
    : currentMonthIndex - 1;

const currentMonthVisitors =
  monthlyData[currentMonthIndex]
    ?.visitors || 0;

const previousMonthVisitors =
  monthlyData[previousMonthIndex]
    ?.visitors || 0;

if (previousMonthVisitors > 0) {
  setGrowth(
    Math.round(
      (
        (currentMonthVisitors -
          previousMonthVisitors) /
        previousMonthVisitors
      ) * 100
    )
  );
} else {
  setGrowth(0);
}

    console.log(
      "Chart Data:",
      monthlyData
    );
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
    <defs>
      <linearGradient
        id="visitorsGradient"
        x1="0"
        y1="0"
        x2="0"
        y2="1"
      >
        <stop
          offset="5%"
          stopColor="#2563eb"
          stopOpacity={0.35}
        />
        <stop
          offset="95%"
          stopColor="#2563eb"
          stopOpacity={0}
        />
      </linearGradient>
    </defs>

    <CartesianGrid
      strokeDasharray="4 4"
      stroke="#e2e8f0"
    />
   <YAxis
  tickLine={false}
  axisLine={false}
/>
    <XAxis
      dataKey="month"
      tickLine={false}
      axisLine={false}
    />

    <Tooltip />

    <Area
      type="monotone"
      dataKey="visitors"
      stroke="#2563eb"
      strokeWidth={3}
      fill="url(#visitorsGradient)"
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
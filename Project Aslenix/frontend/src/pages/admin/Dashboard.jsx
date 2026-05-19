import AdminSidebar from "../../components/admin/AdminSidebar";
import {
  FaUsers,
  FaMoneyBillWave,
  FaShoppingCart,
  FaCapsules,
} from "react-icons/fa";

const Dashboard = () => {
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
    <div
      style={{
        display: "flex",
        background: "#0f172a",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
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
            Admin Dashboard
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "16px",
            }}
          >
            Welcome back, Admin 👋
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
          {/* Users */}
          <div style={cardStyle}>
            <FaUsers size={35} color="#38bdf8" />
            <h2 style={{ marginTop: "15px" }}>1,250</h2>
            <p style={{ color: "#cbd5e1" }}>Total Users</p>
          </div>

          {/* Sales */}
          <div style={cardStyle}>
            <FaMoneyBillWave size={35} color="#22c55e" />
            <h2 style={{ marginTop: "15px" }}>$12,400</h2>
            <p style={{ color: "#cbd5e1" }}>Total Revenue</p>
          </div>

          {/* Orders */}
          <div style={cardStyle}>
            <FaShoppingCart size={35} color="#f97316" />
            <h2 style={{ marginTop: "15px" }}>320</h2>
            <p style={{ color: "#cbd5e1" }}>Orders</p>
          </div>

          {/* Medicines */}
          <div style={cardStyle}>
            <FaCapsules size={35} color="#e879f9" />
            <h2 style={{ marginTop: "15px" }}>540</h2>
            <p style={{ color: "#cbd5e1" }}>Medicines</p>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div
          style={{
            marginTop: "40px",
            background: "#1e293b",
            borderRadius: "16px",
            padding: "25px",
            color: "white",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Recent Activity</h2>

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
              ✅ New Order Received
            </div>

            <div
              style={{
                background: "#334155",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              💊 Medicine Stock Updated
            </div>

            <div
              style={{
                background: "#334155",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              👤 New User Registered
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
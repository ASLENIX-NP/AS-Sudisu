import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await supabase.auth.signOut();

    window.location.href = "/admin";
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "600",
    padding: "14px 18px",
    borderRadius: "10px",
    transition: "0.3s",
    background: "#0f172a",
  };

  return (
    <div
      style={{
        width: "250px",
        background: "#020f44",
        padding: "30px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* TOP SECTION */}
      <div>
        <h2
          style={{
            color: "white",
            marginBottom: "40px",
            fontSize: "32px",
          }}
        >
          SUDIISU ADMIN
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <Link to="/admin/dashboard" style={linkStyle}>
            Dashboard
          </Link>

          <Link to="/admin/products" style={linkStyle}>
            Products
          </Link>

          <Link to="/admin/inquiries" style={linkStyle}>
            Inquiries
          </Link>

          <Link to="/admin/analytics" style={linkStyle}>
            Analytics
          </Link>

          <Link to="/admin/settings" style={linkStyle}>
            Settings
          </Link>
        </div>
      </div>

      {/* LOGOUT */}
     <button
     onClick={handleLogout}
      className="logout-btn"
        style={{
          background: "#facc15",
          color: "black",
          border: "none",
          padding: "14px",
          borderRadius: "10px",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
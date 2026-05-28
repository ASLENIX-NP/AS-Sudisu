import { NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin");
  };

  const linkStyle = ({ isActive }) => ({
    display: "block",
    padding: "15px 20px",
    marginBottom: "10px",
    borderRadius: "10px",
    textDecoration: "none",
    background: isActive ? "#f5cc15" : "transparent",
    color: isActive ? "#000" : "#fff",
    fontWeight: "600",
    transition: "0.3s",
  });

  return (
    <div
      style={{
        width: "250px",
        minHeight: "100vh",
        background: "#071133",
        padding: "30px 20px",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          color: "#fff",
          marginBottom: "40px",
        }}
      >
        Admin Panel
      </h2>

      <NavLink to="/admin/dashboard" style={linkStyle}>
        Dashboard
      </NavLink>

      <NavLink to="/admin/products" style={linkStyle}>
        Products
      </NavLink>

      <NavLink to="/admin/orders" style={linkStyle}>
        Orders
      </NavLink>

      <NavLink to="/admin/customers" style={linkStyle}>
        Customers
      </NavLink>

      <NavLink to="/admin/settings" style={linkStyle}>
        Settings
      </NavLink>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "40px",
          width: "100%",
          padding: "15px",
          border: "none",
          borderRadius: "10px",
          background: "#f5cc15",
          color: "#000",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
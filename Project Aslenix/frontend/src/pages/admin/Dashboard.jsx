import AdminSidebar from "../../components/admin/AdminSidebar";

export default function Dashboard() {
  return (
    <div className="admin">
      <AdminSidebar />

      <div className="adminMain">
        <h1>Dashboard</h1>
        <p className="muted">
          Control products, orders, and notices for SUDIISU.
        </p>

        <div className="admin-cards">
          <div className="admin-card">Products</div>
          <div className="admin-card">Orders</div>
          <div className="admin-card">Notices</div>
        </div>
      </div>
    </div>
  );
}

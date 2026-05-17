csdimport AdminSidebar from "../../components/admin/AdminSidebar";

const Dashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <h2 style={{ color: "white", padding: "40px" }}>Admin Dashboard</h2>
    </div>
  );
};

export default Dashboard;

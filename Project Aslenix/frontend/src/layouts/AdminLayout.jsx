import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#03103f",
      }}
    >
      <AdminSidebar />

      <div
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
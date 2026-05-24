import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn");

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default AdminRoute;
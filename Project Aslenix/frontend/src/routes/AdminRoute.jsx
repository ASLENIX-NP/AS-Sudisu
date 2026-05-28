import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("adminLoggedIn");

  if (!isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default AdminRoute;
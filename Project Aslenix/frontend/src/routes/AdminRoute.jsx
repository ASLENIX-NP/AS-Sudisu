const AdminRoute = ({ children }) => {
  const isAdmin = true; // later from AuthContext

  return isAdmin ? children : <h2>Access Denied</h2>;
};

export default AdminRoute;

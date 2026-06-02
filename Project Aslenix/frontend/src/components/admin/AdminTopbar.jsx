import "./AdminTopbar.css";

const AdminTopbar = () => {
  return (
    <div className="admin-topbar">
      <input
        type="text"
        placeholder="Search..."
        className="admin-search"
      />

      <div className="admin-profile">
        <div className="avatar">A</div>

        <div>
          <h4>Admin</h4>
          <p>Administrator</p>
        </div>
      </div>
    </div>
  );
};

export default AdminTopbar;
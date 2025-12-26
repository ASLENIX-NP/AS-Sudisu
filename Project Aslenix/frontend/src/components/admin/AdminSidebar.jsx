import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/admin">Dashboard</NavLink>
    </aside>
  );
}

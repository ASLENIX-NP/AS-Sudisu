import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/Announcements.css";
import toast from "react-hot-toast";

const Announcements = () => {
const [announcements, setAnnouncements] = useState([]);
 const [title, setTitle] = useState("");
 const [message, setMessage] = useState("");
 const [status, setStatus] = useState("Active");
const [editingId, setEditingId] = useState(null);
const [search, setSearch] = useState("");

const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    const { data, error } = await supabase
      .from("Announcement")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setAnnouncements(data || []);
  };
const saveAnnouncement = async () => {
if (!title.trim()) {
  toast.error("Title is required");
  return;
}

  const { error } = await supabase
    .from("Announcement")
    .insert([
      {
        title,
        message,
        status,
      },
    ]);

 if (error) {
  toast.error(error.message);
  return;
}

  setTitle("");
  setMessage("");
  setStatus("Active");

  fetchAnnouncements();
  toast.success("Announcement created successfully");
};

  const addAnnouncement = async () => {
   if (!title.trim()) {
  toast.error("Title is required");
  return;
}

    const { error } = await supabase
      .from("Announcement")
      .insert([
        {
          title,
          message,
          status,
        },
      ]);

   if (error) {
  toast.error(error.message);
  return;
}

    setTitle("");
    setMessage("");
    setStatus("Active");

    fetchAnnouncements();
  toast.success("Announcement created successfully");
  };

  const editAnnouncement = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setMessage(item.message);
    setStatus(item.status);
  };

  const updateAnnouncement = async () => {
    const { error } = await supabase
      .from("Announcement")
      .update({
        title,
        message,
        status,
      })
      .eq("id", editingId);

if (error) {
  toast.error(error.message);
  return;
}

    setEditingId(null);
    setTitle("");
    setMessage("");
    setStatus("Active");

    fetchAnnouncements();
    toast.success("Announcement updated successfully");
  };
const deleteAnnouncement = async () => {

  if (!selectedAnnouncement) return;

  const { error } = await supabase
    .from("Announcement")
    .delete()
    .eq("id", selectedAnnouncement);

  if (error) {
    toast.error(error.message);
    return;
  }

  fetchAnnouncements();

  toast.success("Announcement deleted successfully");

  setShowDeleteModal(false);
  setSelectedAnnouncement(null);
};

  const filteredAnnouncements =
    announcements.filter((item) =>
      item.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

return (
  <AdminLayout>

    <div className="announcements-page">

      <div className="announcement-header">

    <div className="announcement-header-left">

        <span className="announcement-badge">
            📢 Content Management
        </span>

        <h1>Announcements</h1>

        <p>
            Create, edit and manage announcements that appear throughout your website.
        </p>

    </div>

    <div className="announcement-header-right">

        <button className="preview-btn">
            👁 Preview
        </button>

        <button className="save-btn">
            ➕ New Announcement
        </button>

    </div>

</div>
{/* Statistics */}

<div className="stats-grid">

  <div className="stat-card total-card">

    <div className="stat-top">
      <span className="stat-icon">📢</span>
    </div>

    <h4>Total Announcements</h4>

    <h2>{announcements.length}</h2>

    <p>All announcements created</p>

  </div>

  <div className="stat-card active-card">

    <div className="stat-top">
      <span className="stat-icon">✅</span>
    </div>

    <h4>Active</h4>

    <h2>
      {
        announcements.filter(
          (a) => a.status === "Active"
        ).length
      }
    </h2>

    <p>Currently visible</p>

  </div>

  <div className="stat-card inactive-card">

    <div className="stat-top">
      <span className="stat-icon">⏸</span>
    </div>

    <h4>Inactive</h4>

    <h2>
      {
        announcements.filter(
          (a) => a.status === "Inactive"
        ).length
      }
    </h2>

    <p>Hidden announcements</p>

  </div>

</div>

     {/* Add / Edit Announcement */}

<div className="announcements-card">

  <div className="form-header">

    <div className="form-title">

      <div className="form-icon">
        📢
      </div>

      <div>

        <h2>
          {editingId
            ? "Edit Announcement"
            : "Create Announcement"} 
        </h2>

        <p>
          Publish important updates that will appear on your website.
        </p>

      </div>

    </div>

  </div>

  <div className="form-grid">

    <div className="form-group">

      <label>Announcement Title</label>

      <input
        className="form-input"
        placeholder="Enter announcement title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

    </div>

    <div className="form-group">

      <label>Status</label>

      <select
        className="form-select"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Active</option>
        <option>Inactive</option>
      </select>

    </div>

    <div className="form-group full-width">

      <label>Announcement Message</label>

      <textarea
        className="form-textarea"
        placeholder="Write your announcement here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

    </div>

    <div className="form-actions">

      <button
        className="publish-btn"
        onClick={
          editingId
            ? updateAnnouncement
            : addAnnouncement
        }
      >
        {editingId
          ? "💾 Update Announcement"
          : "🚀 Publish Announcement"}
      </button>

    </div>

  </div>

</div>

{/* Search Toolbar */}

<div className="announcements-card">

  <div className="table-toolbar">

    <div className="search-wrapper">

      <span className="search-icon">🔍</span>

      <input
        type="text"
        placeholder="Search announcements..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

    </div>

    <div className="table-count">

      {filteredAnnouncements.length} Announcement
      {filteredAnnouncements.length !== 1 && "s"}

    </div>

  </div>

</div>

{/* Announcement List */}

<div className="announcements-card">

  <div className="table-header">

    <h2>Announcements</h2>

    <p>
      Manage all announcements published on your website.
    </p>

  </div>

  {filteredAnnouncements.length === 0 ? (

    <div className="empty-state">

      <div className="empty-icon">📢</div>

      <h3>No Announcements Found</h3>

      <p>
        Create your first announcement to keep visitors informed.
      </p>

    </div>

  ) : (

    <div className="announcement-list">

      {filteredAnnouncements.map((item) => (

        <div
          className="announcement-row"
          key={item.id}
        >
<div className="announcement-content">

  <div className="announcement-title">

    <div className="empty-icon">

    <div className="empty-circle">
        📢
    </div>

</div>

    <div>

      <h3>{item.title}</h3>

      <p>{item.message}</p>

    </div>

  </div>

</div>

          <div className="announcement-meta">

            <span
              className={
                item.status === "Active"
                  ? "status-active"
                  : "status-inactive"
              }
            >
              {item.status}
            </span>

            <div className="announcement-actions">

              <button
                className="edit-btn"
                 title="edit Announcement"
                onClick={() => editAnnouncement(item)}
              >
                ✏ Edit
              </button>
<button
    className="delete-btn"
    title="Delete Announcement"
    onClick={() => {
        setSelectedAnnouncement(item.id);
        setShowDeleteModal(true);
    }}
>
    🗑
</button>

            </div>

          </div>

        </div>

      ))}

    </div>

  )}

</div>
      </div>
      {showDeleteModal && (

<div className="delete-modal-overlay">

    <div className="delete-modal">

        <div className="delete-modal-icon">
            🗑️
        </div>

        <h2>Delete Announcement?</h2>

        <p>
            This action cannot be undone.
            This announcement will be permanently deleted.
        </p>

        <div className="delete-modal-actions">

            <button
                className="cancel-delete-btn"
                onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedAnnouncement(null);
                }}
            >
                Cancel
            </button>

            <button
                className="confirm-delete-btn"
                onClick={deleteAnnouncement}
            >
                Delete
            </button>

        </div>

    </div>

</div>

)}
    </AdminLayout>
  );
};

const cardStyle = {
  background: "#fff",
  borderRadius: "20px",
  padding: "25px",
  border: "1px solid #e2e8f0",
};

const statsCard = {
  background: "#fff",
  borderRadius: "20px",
  padding: "20px",
  border: "1px solid #e2e8f0",
};

const inputStyle = {
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  background: "#f8fafc",
};

const saveButton = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  width: "fit-content",
};

const thStyle = {
  padding: "16px",
  textAlign: "left",
  color: "#475569",
};

const tdStyle = {
  padding: "16px",
  borderBottom: "1px solid #e2e8f0",
};

export default Announcements;
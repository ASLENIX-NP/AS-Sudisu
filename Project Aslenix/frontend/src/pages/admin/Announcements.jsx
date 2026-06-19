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

  const deleteAnnouncement = async (id) => {
  
    const confirmed = window.confirm(
      "Delete this announcement?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("Announcement")
      .delete()
      .eq("id", id);

    if (error) {
  toast.error(error.message);
  return;
}
    fetchAnnouncements();
toast.success("Announcement deleted successfully");
  };

  const filteredAnnouncements =
    announcements.filter((item) =>
      item.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <AdminLayout>
      <div
        style={{
          padding: "10px 0",
          width: "100%",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <h1
            style={{
              fontSize: "54px",
              fontWeight: "800",
              color: "#0f172a",
              marginBottom: "10px",
            }}
          >
            Announcements
          </h1>

          <p
            style={{
              color: "#64748b",
            }}
          >
            Manage announcements for customers.
          </p>
        </div>

        {/* Stats */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3, 1fr)",
            gap: "20px",
            marginBottom: "25px",
          }}
        >
          <div style={statsCard}>
            <p>Total Announcements</p>
            <h2>{announcements.length}</h2>
          </div>

          <div style={statsCard}>
            <p>Active</p>
            <h2 style={{ color: "#16a34a" }}>
              {
                announcements.filter(
                  (a) =>
                    a.status === "Active"
                ).length
              }
            </h2>
          </div>

          <div style={statsCard}>
            <p>Inactive</p>
            <h2 style={{ color: "#dc2626" }}>
              {
                announcements.filter(
                  (a) =>
                    a.status === "Inactive"
                ).length
              }
            </h2>
          </div>
        </div>

        {/* Form */}

        <div style={cardStyle}>
          <h2 style={{ marginBottom: "20px" }}>
            {editingId
              ? "Edit Announcement"
              : "Add Announcement"}
          </h2>

          <div
            style={{
              display: "grid",
              gap: "15px",
            }}
          >
            <input
              placeholder="Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              style={inputStyle}
            />

            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              style={{
                ...inputStyle,
                minHeight: "120px",
              }}
            />

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              style={inputStyle}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <button
              onClick={
                editingId
                  ? updateAnnouncement
                  : addAnnouncement
              }
              style={saveButton}
            >
              {editingId
                ? "Update Announcement"
                : "Save Announcement"}
            </button>
          </div>
        </div>

        {/* Search */}

        <div
          style={{
            ...cardStyle,
            marginTop: "20px",
          }}
        >
          <input
            placeholder="🔍 Search announcements..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={inputStyle}
          />
        </div>

        {/* Table */}

        <div
          style={{
            ...cardStyle,
            marginTop: "20px",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Message</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredAnnouncements.map(
                (item) => (
                  <tr key={item.id}>
                    <td style={tdStyle}>
                      {item.title}
                    </td>

                    <td style={tdStyle}>
                      {item.message}
                    </td>

                    <td style={tdStyle}>
                      {item.status}
                    </td>

                    <td style={tdStyle}>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        <button
                          onClick={() =>
                            editAnnouncement(
                              item
                            )
                          }
                        >
                          ✏️ Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteAnnouncement(
                              item.id
                            )
                          }
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
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
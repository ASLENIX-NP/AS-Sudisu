import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import AdminLayout from "../../layouts/AdminLayout";

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [editingId, setEditingId] = useState(null);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setCategories(data || []);
  };

  const addCategory = async () => {
    if (!name.trim()) {
      alert("Category name is required");
      return;
    }

    const { error } = await supabase
      .from("categories")
      .insert([
        {
          name,
          description,
          status,
        },
      ]);

    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    alert("Category Added Successfully");

    setName("");
    setDescription("");
    setStatus("Active");

    fetchCategories();
  };
 const deleteCategory = async (id) => {
  const confirmed = window.confirm(
    "Delete this category?"
  );

  if (!confirmed) return;

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  fetchCategories();
};
const editCategory = (category) => {
  setEditingId(category.id);
  setName(category.name);
  setDescription(category.description);
  setStatus(category.status);
};
const updateCategory = async () => {
  const { error } = await supabase
    .from("categories")
    .update({
      name,
      description,
      status,
    })
    .eq("id", editingId);

  if (error) {
    alert(error.message);
    return;
  }

  setEditingId(null);
  setName("");
  setDescription("");
  setStatus("Active");

  fetchCategories();
};
  return (
    <AdminLayout>
      <div
        style={{
          padding: "30px",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "700",
            color: "#0f172a",
            marginBottom: "25px",
          }}
        >
          Categories 📂
        </h1>
          <div
  style={{
    background: "#ffffff",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "20px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    width: "250px",
  }}
>
  <h3
    style={{
      color: "#64748b",
      margin: 0,
      fontSize: "14px",
    }}
  >
    Total Categories
  </h3>

  <h1
    style={{
      margin: "10px 0 0",
      color: "#0f172a",
      fontSize: "36px",
    }}
  >
    {categories.length}
  </h1>
</div>
        {/* Add Category Card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            padding: "25px",
            border: "1px solid #e2e8f0",
            marginBottom: "25px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              color: "#0f172a",
            }}
          >
            Add Category
          </h2>

          <div
            style={{
              display: "grid",
              gap: "15px",
            }}
          >
            <input
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              style={{
                ...inputStyle,
                minHeight: "100px",
              }}
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={inputStyle}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <button
            onClick={
             editingId
              ? updateCategory
              : addCategory
               }
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "600",
                width: "fit-content",
              }}
            >
               {editingId
    ? "Update Category"
    : "Save Category"}
            </button>
          </div>
        </div>

        {/* Categories Table */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            padding: "25px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#f8fafc",
                }}
              >
                <th style={thStyle}>Name</th>
                 <th style={thStyle}>Description</th>
                 <th style={thStyle}>Status</th>
                 <th style={thStyle}>Actions</th>
              </tr>
            </thead>
              
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td style={tdStyle}>
                    {category.name}
                  </td>

                  <td style={tdStyle}>
                    {category.description}
                  </td>

<td style={tdStyle}>
  <span
    style={{
      background:
        category.status === "Active"
          ? "#dcfce7"
          : "#fee2e2",
      color:
        category.status === "Active"
          ? "#16a34a"
          : "#dc2626",
      padding: "6px 12px",
      borderRadius: "999px",
      fontSize: "13px",
      fontWeight: "600",
    }}
  >
    {category.status}
  </span>
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
        editCategory(category)
      }
      style={{
        background: "#eff6ff",
        color: "#2563eb",
        border: "1px solid #bfdbfe",
        padding: "8px 12px",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      ✏️ Edit
    </button>

    <button
      onClick={() =>
        deleteCategory(category.id)
      }
      style={{
        background: "#fef2f2",
        color: "#dc2626",
        border: "1px solid #fecaca",
        padding: "8px 12px",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      🗑 Delete
    </button>
  </div>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

const thStyle = {
  padding: "16px",
  textAlign: "left",
  color: "#475569",
  fontWeight: "600",
};

const tdStyle = {
  padding: "16px",
  borderBottom: "1px solid #e2e8f0",
  color: "#0f172a",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  outline: "none",
  background: "#f8fafc",
  color: "#0f172a",
};

export default CategoriesAdmin;
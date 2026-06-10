import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/CategoriesAdmin.css";

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
    const filteredCategories = categories.filter((category) =>
      
    category.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );
  
  
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
      <div className="categories-page">
        <div className="categories-header">
 <h1 className="categories-title">
    Categories
  </h1>

  <p className="categories-subtitle">
    Manage product categories and organization.
  </p>
</div>
<div className="categories-stats">
 <div className="category-stat-card">
    <p
      style={{
        color: "#64748b",
        marginBottom: "8px",
      }}
    >
      Total Categories
    </p>

    <h2
      style={{
        fontSize: "40px",
        color: "#0f172a",
      }}
    >
      {categories.length}
    </h2>
  </div>
<div className="category-upload-box">
  <label className="upload-label">
    Category Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setImage(e.target.files[0])
    }
  />
</div>
  <div className="category-stat-card">
    <p
      style={{
        color: "#64748b",
        marginBottom: "8px",
      }}
    >
      Active Categories
    </p>

    <h2
      style={{
        fontSize: "40px",
        color: "#16a34a",
      }}
    >
      {
        categories.filter(
          (c) => c.status === "Active"
        ).length
      }
    </h2>
  </div>

  <div className="category-stat-card">
    <p
      style={{
        color: "#64748b",
        marginBottom: "8px",
      }}
    >
      Inactive Categories
    </p>

    <h2
      style={{
        fontSize: "40px",
        color: "#dc2626",
      }}
    >
      {
        categories.filter(
          (c) => c.status === "Inactive"
        ).length
      }
    </h2>
  </div>
</div>
        {/* Add Category Card */}
        <div className="categories-form-card">
         <h2
  style={{
    marginBottom: "8px",
    color: "#0f172a",
  }}
>
  {editingId
    ? "Edit Category"
    : "Create New Category"}
</h2>

<p className="form-subtitle">
  Organize your products into groups and
  make browsing easier for customers.
</p>
         <div className="categories-form-grid">
            <input
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="categories-input"
            />

            <textarea
  className="categories-input categories-textarea"
  placeholder="Description"
  value={description}
  onChange={(e) =>
    setDescription(e.target.value)
  }
/>

            <select
  className="categories-input"
  value={status}
  onChange={(e) => setStatus(e.target.value)}
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
              className="categories-save-btn"
            >
               {editingId
    ? "Update Category"
    : "Save Category"}
            </button>
          </div>
        </div>
<div className="categories-search">
  <input
    type="text"
    className="categories-search-input"
    placeholder="🔍 Search categories..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>
        {/* Categories Table */}
        <div className="categories-table-card">
          <table className="categories-table">
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
              {filteredCategories.map((category) => (
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
  <div className="action-buttons">
    <button
  className="edit-btn"
  onClick={() =>
    editCategory(category)
  }
>
  ✏️ Edit
</button>

   <button
  className="delete-btn"
  onClick={() =>
    deleteCategory(category.id)
  }
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

const statsCard = {
  background: "#fff",
  borderRadius: "20px",
  padding: "24px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

export default CategoriesAdmin;
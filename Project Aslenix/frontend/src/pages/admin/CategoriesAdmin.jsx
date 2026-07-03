import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import toast from "react-hot-toast";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/CategoriesAdmin.css";

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [editingId, setEditingId] = useState(null);
  const [image, setImage] = useState(null);
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
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
  toast.error("Category name is required");
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
  toast.error(error.message);
  return;
}

toast.success("Category created successfully");

    setName("");
    setDescription("");
    setStatus("Active");

    fetchCategories();

  };
const deleteCategory = async () => {

  if (!selectedCategory) return;

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", selectedCategory);

  if (error) {
    toast.error(error.message);
    return;
  }

  fetchCategories();

  toast.success("Category deleted successfully");

  setShowDeleteModal(false);
  setSelectedCategory(null);
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
  toast.error(error.message);
  return;
}

  setEditingId(null);
  setName("");
  setDescription("");
  setStatus("Active");

  fetchCategories();
  toast.success("Category updated successfully");
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

<div className="category-stat-card total-card">
  <div className="stat-icon">📂</div>

  <div>
    <p className="stat-label">
      Total Categories
    </p>

    <h2 className="stat-number">
      {categories.length}
    </h2>
  </div>
</div>
<div className="category-upload-card">
  <input
    type="file"
    id="category-image"
    className="category-file-input"
    accept="image/*"
    onChange={(e) =>
      setImage(e.target.files[0])
    }
  />

  <label
  
    htmlFor="category-image"
    className="category-upload-label"
  >
  <div className="upload-icon">
  ⬆
</div>
{image && (
  <img
    src={URL.createObjectURL(image)}
    alt="preview"
    className="category-preview"
  />
)}
    <h4>Upload Category Image</h4>

    <p>
      Drag & Drop or Click to Browse
    </p>

 
  </label>
</div>
 <div className="category-stat-card active-card">
  <div className="stat-icon">✅</div>

  <div>
    <p className="stat-label">
      Active Categories
    </p>

    <h2 className="stat-number">
      {
        categories.filter(
          (c) => c.status === "Active"
        ).length
      }
    </h2>
  </div>
</div>

 <div className="category-stat-card inactive-card">
  <div className="stat-icon">🚫</div>

  <div>
    <p className="stat-label">
      Inactive Categories
    </p>

    <h2 className="stat-number">
      {
        categories.filter(
          (c) => c.status === "Inactive"
        ).length
      }
    </h2>
  </div>
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
   placeholder="Search categories by name..."
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
  onClick={() => {
    setSelectedCategory(category.id);
    setShowDeleteModal(true);
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
      {showDeleteModal && (

  <div className="delete-modal-overlay">

    <div className="delete-modal">

      <div className="delete-modal-icon">
        🗑️
      </div>

      <h2>Delete Category?</h2>

      <p>
        This action cannot be undone.
        This category will be permanently deleted.
      </p>

      <div className="delete-modal-actions">

        <button
          className="cancel-delete-btn"
          onClick={() => {
            setShowDeleteModal(false);
            setSelectedCategory(null);
          }}
        >
          Cancel
        </button>

        <button
          className="confirm-delete-btn"
          onClick={deleteCategory}
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


export default CategoriesAdmin;
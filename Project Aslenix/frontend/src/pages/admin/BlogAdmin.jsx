import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";
import { supabase } from "../../lib/supabase";
import "../../styles/BlogAdmin.css";

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  imageUrl: "",
  status: "Published",
};

const BlogAdmin = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(error.message);
      setBlogs([]);
    } else {
      setBlogs(data || []);
    }

    setLoading(false);
  };

  const updateField = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData(emptyForm);
  };

  const saveBlog = async () => {
    const payload = {
      title: formData.title.trim(),
      excerpt: formData.excerpt.trim(),
      content: formData.content.trim(),
      image_url: formData.imageUrl.trim(),
      status: formData.status,
    };

    if (!payload.title) {
      toast.error("Blog title is required");
      return;
    }

    if (!payload.excerpt) {
      toast.error("Short excerpt is required");
      return;
    }

    if (!payload.content) {
      toast.error("Blog content is required");
      return;
    }

    setSaving(true);

    const { error } = editingId
      ? await supabase.from("blogs").update(payload).eq("id", editingId)
      : await supabase.from("blogs").insert([payload]);

    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(
      editingId ? "Blog updated successfully" : "Blog published successfully"
    );

    resetForm();
    fetchBlogs();
  };

  const editBlog = (blog) => {
    setEditingId(blog.id);
    setFormData({
      title: blog.title || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      imageUrl: blog.image_url || "",
      status: blog.status || "Published",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openDeleteModal = (blog) => {
    setSelectedBlog(blog);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedBlog(null);
    setShowDeleteModal(false);
  };

  const deleteBlog = async () => {
    if (!selectedBlog) return;

    const { error } = await supabase
      .from("blogs")
      .delete()
      .eq("id", selectedBlog.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Blog deleted successfully");
    closeDeleteModal();
    fetchBlogs();
  };

  const filteredBlogs = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    if (!searchText) return blogs;

    return blogs.filter((blog) => {
      return (
        blog.title?.toLowerCase().includes(searchText) ||
        blog.excerpt?.toLowerCase().includes(searchText) ||
        blog.status?.toLowerCase().includes(searchText)
      );
    });
  }, [blogs, search]);

  const publishedCount = blogs.filter((blog) => blog.status === "Published").length;
  const draftCount = blogs.filter((blog) => blog.status === "Draft").length;

  return (
    <AdminLayout>
      <div className="blog-admin-page">
        <div className="blog-header">
          <div className="blog-header-left">
            <span className="blog-badge">✍️ Content Management</span>
            <h1>Blog Management</h1>
            <p>
              Create, edit, publish and delete blog articles shown on the public
              blog page.
            </p>
          </div>

          <div className="blog-header-right">
            <button
              className="preview-blog-btn"
              type="button"
              onClick={() => navigate("/blog")}
            >
              👁 Preview Blogs
            </button>

            <button className="new-blog-btn" type="button" onClick={resetForm}>
              ➕ New Blog
            </button>
          </div>
        </div>

        <div className="blog-stats">
          <div className="blog-stat-card total-card">
            <div className="stat-icon">📝</div>
            <div className="blog-stat-content">
              <span>Total Posts</span>
              <h2>{blogs.length}</h2>
              <small>All blog posts</small>
            </div>
          </div>

          <div className="blog-stat-card published-card">
            <div className="stat-icon">🚀</div>
            <div className="blog-stat-content">
              <span>Published</span>
              <h2>{publishedCount}</h2>
              <small>Visible on website</small>
            </div>
          </div>

          <div className="blog-stat-card draft-card">
            <div className="stat-icon">📄</div>
            <div className="blog-stat-content">
              <span>Draft Posts</span>
              <h2>{draftCount}</h2>
              <small>Hidden from public</small>
            </div>
          </div>
        </div>

        <div className="blog-form">
          <div className="blog-form-header">
            <div>
              <h2>{editingId ? "Edit Blog Post" : "Create Blog Post"}</h2>
              <p>
                Add the title, image, short excerpt and full content. Published
                blogs appear on the website.
              </p>
            </div>

            <div className="blog-form-icon">📝</div>
          </div>

          <div className="blog-form-row">
            <div className="blog-field blog-title-field">
              <label>Blog Title</label>
              <input
                type="text"
                placeholder="Enter blog title..."
                value={formData.title}
                onChange={(event) => updateField("title", event.target.value)}
              />
            </div>

            <div className="blog-field blog-status-field">
              <label>Status</label>
              <select
                value={formData.status}
                onChange={(event) => updateField("status", event.target.value)}
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="blog-form-row two-column-row">
            <div className="blog-field excerpt-field">
              <label>Short Excerpt</label>
              <textarea
                placeholder="Write a short summary shown on the blog card..."
                value={formData.excerpt}
                onChange={(event) => updateField("excerpt", event.target.value)}
              />
              <div className="character-count">
                {formData.excerpt.length} / 250 characters
              </div>
            </div>

            <div className="blog-field image-field">
              <label>Featured Image URL</label>
              <input
                type="text"
                placeholder="Paste image URL..."
                value={formData.imageUrl}
                onChange={(event) => updateField("imageUrl", event.target.value)}
              />

              {formData.imageUrl ? (
                <div className="image-preview">
                  <img src={formData.imageUrl} alt="Blog preview" />
                </div>
              ) : (
                <div className="image-preview empty-preview">Image preview</div>
              )}
            </div>
          </div>

          <div className="blog-field content-field">
            <label>Full Blog Content</label>
            <textarea
              placeholder="Write the full blog details. Use new lines to create separate paragraphs on the detail page..."
              value={formData.content}
              onChange={(event) => updateField("content", event.target.value)}
            />
          </div>

          <div className="blog-form-actions">
            {editingId && (
              <button className="cancel-edit-btn" type="button" onClick={resetForm}>
                Cancel Edit
              </button>
            )}

            <button
              className="save-blog-btn"
              type="button"
              onClick={saveBlog}
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingId
                ? "Update Blog"
                : "Publish Blog"}
            </button>
          </div>
        </div>

        <div className="blog-toolbar">
          <div className="blog-search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="blog-toolbar-info">
            Showing <strong>{filteredBlogs.length}</strong> of{" "}
            <strong>{blogs.length}</strong> blogs
          </div>
        </div>

        <div className="blog-list-card">
          <div className="blog-list-header">
            <div>
              <h2>All Blogs</h2>
              <p>Manage all blog posts from one place.</p>
            </div>

            <span className="blog-count">{filteredBlogs.length} Posts</span>
          </div>

          {loading ? (
            <div className="empty-blog">
              <div className="empty-circle">⏳</div>
              <h3>Loading Blogs</h3>
              <p>Please wait while blogs are loaded.</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="empty-blog">
              <div className="empty-circle">📝</div>
              <h3>No Blogs Yet</h3>
              <p>Publish your first article to see it here.</p>
            </div>
          ) : (
            <div className="blog-list">
              {filteredBlogs.map((blog) => (
                <div className="blog-item" key={blog.id}>
                  <div className="blog-thumbnail">
                    {blog.image_url ? (
                      <img src={blog.image_url} alt={blog.title} />
                    ) : (
                      <div className="blog-placeholder">📰</div>
                    )}
                  </div>

                  <div className="blog-info">
                    <h3>{blog.title}</h3>
                    <p>{blog.excerpt}</p>
                    <small>
                      {blog.created_at
                        ? new Date(blog.created_at).toLocaleDateString()
                        : "No date"}
                    </small>
                  </div>

                  <div className="blog-right">
                    <span
                      className={
                        blog.status === "Published" ? "published" : "draft"
                      }
                    >
                      {blog.status}
                    </span>

                    <div className="blog-actions">
                      <button
                        className="edit-btn"
                        type="button"
                        onClick={() => editBlog(blog)}
                      >
                        ✏ Edit
                      </button>

                      <button
                        className="view-btn"
                        type="button"
                        onClick={() => navigate(`/blog/${blog.id}`)}
                      >
                        👁 View
                      </button>

                      <button
                        className="delete-btn"
                        type="button"
                        onClick={() => openDeleteModal(blog)}
                      >
                        🗑 Delete
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
            <div className="delete-modal-icon">🗑️</div>

            <h2>Delete Blog?</h2>

            <p>
              This action cannot be undone. The blog
              {selectedBlog?.title ? ` "${selectedBlog.title}"` : ""} will be
              permanently deleted.
            </p>

            <div className="delete-modal-actions">
              <button
                className="cancel-delete-btn"
                type="button"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>

              <button
                className="confirm-delete-btn"
                type="button"
                onClick={deleteBlog}
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

export default BlogAdmin;

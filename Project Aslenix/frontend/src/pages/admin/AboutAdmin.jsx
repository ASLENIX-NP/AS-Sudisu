import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/BlogAdmin.css";
import toast from "react-hot-toast";

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [status, setStatus] = useState("Published");

  const [editingId, setEditingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("id", { ascending: false });

    if (!error) {
      setBlogs(data || []);
    } else {
      console.error("Error fetching blogs:", error);
    }
  };

  const uploadImageToSupabase = async (file) => {
    if (!file) return null;

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `blog/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("blog-images").getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    setExistingImageUrl("");
  };

  const saveBlog = async () => {
    if (!title.trim()) {
      toast.error("Blog title is required");
      return;
    }

    setUploading(true);

    try {
      let imageUrl = existingImageUrl;

      // Upload new image if selected
      if (imageFile) {
        imageUrl = await uploadImageToSupabase(imageFile);
      }

      const blogContent = content || "Blog content goes here...";

      let error;

      if (editingId) {
        ({ error } = await supabase
          .from("blogs")
          .update({
            title,
            excerpt,
            content: blogContent,
            image_url: imageUrl,
            status,
          })
          .eq("id", editingId));
      } else {
        ({ error } = await supabase.from("blogs").insert([
          {
            title,
            excerpt,
            content: blogContent,
            image_url: imageUrl,
            status,
          },
        ]));
      }

      if (error) throw error;

      resetForm();
      await fetchBlogs();
      toast.success(
        editingId ? "Blog updated successfully" : "Blog published successfully",
      );
    } catch (error) {
      console.error("Save error:", error);
      toast.error(error.message || "Failed to save blog");
    } finally {
      setUploading(false);
    }
  };

  const editBlog = (blog) => {
    setEditingId(blog.id);
    setTitle(blog.title);
    setExcerpt(blog.excerpt);
    setContent(blog.content || "");
    setExistingImageUrl(blog.image_url || "");
    setImagePreview(blog.image_url || "");
    setStatus(blog.status);
    setImageFile(null);
  };

  const deleteBlog = async () => {
    if (!selectedBlog) return;

    const { error } = await supabase
      .from("blogs")
      .delete()
      .eq("id", selectedBlog);

    if (error) {
      toast.error(error.message);
      return;
    }

    await fetchBlogs();
    toast.success("Blog deleted successfully");
    setShowDeleteModal(false);
    setSelectedBlog(null);
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setExcerpt("");
    setContent("");
    setImageFile(null);
    setImagePreview("");
    setExistingImageUrl("");
    setStatus("Published");
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <AdminLayout>
      <div className="blog-admin-page">
        {/* Header */}
        <div className="blog-header">
          <div className="blog-header-left">
            <span className="blog-badge">✍️ Content Management</span>
            <h1>Blog Management</h1>
            <p>
              Create, edit and publish blog articles for your website from one
              place.
            </p>
          </div>
          <div className="blog-header-right">
            <button className="preview-blog-btn" type="button">
              👁 Preview Blogs
            </button>
            <button className="new-blog-btn" type="button" onClick={resetForm}>
              ➕ New Blog
            </button>
          </div>
        </div>

        {/* Stats */}
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
              <h2>{blogs.filter((b) => b.status === "Published").length}</h2>
              <small>Currently live</small>
            </div>
          </div>
          <div className="blog-stat-card draft-card">
            <div className="stat-icon">📄</div>
            <div className="blog-stat-content">
              <span>Draft Posts</span>
              <h2>{blogs.filter((b) => b.status === "Draft").length}</h2>
              <small>Not published</small>
            </div>
          </div>
        </div>

        {/* Blog Form */}
        <div className="blog-form">
          <div className="blog-form-header">
            <div>
              <h2>{editingId ? "Edit Blog Post" : "Create Blog Post"}</h2>
              <p>Write engaging articles, product updates and company news.</p>
            </div>
            <div className="blog-form-icon">📝</div>
          </div>

          <div className="blog-form-grid">
            <div className="blog-field blog-title-field">
              <label>Blog Title</label>
              <input
                placeholder="Enter blog title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="blog-field blog-status-field">
              <label>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Published</option>
                <option>Draft</option>
              </select>
            </div>
          </div>

          <div className="blog-form-row">
            <div className="blog-field excerpt-field">
              <label>Short Excerpt</label>
              <textarea
                placeholder="Write a short summary..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />
              <div className="character-count">
                {excerpt.length} / 250 characters
              </div>
            </div>

            {/* IMAGE UPLOAD - FILE INPUT INSTEAD OF URL */}
            <div className="blog-field image-field">
              <label>Featured Image</label>
              <div className="image-upload-container">
                <label className="image-upload-btn">
                  📤 Choose Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
                {imagePreview && (
                  <button className="remove-image-btn" onClick={removeImage}>
                    ✕
                  </button>
                )}
              </div>
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                </div>
              )}
              {!imagePreview && existingImageUrl && (
                <div className="image-preview">
                  <img src={existingImageUrl} alt="Existing" />
                  <p className="existing-image-label">Current image</p>
                </div>
              )}
              <small className="image-hint">
                Supported: JPG, PNG, WEBP (Max 5MB)
              </small>
            </div>
          </div>

          {/* CONTENT FIELD */}
          <div className="blog-form-row">
            <div className="blog-field content-field" style={{ width: "100%" }}>
              <label>Content (Full Article)</label>
              <textarea
                placeholder="Write your full blog content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="8"
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "1px solid #dbeafe",
                  fontSize: "15px",
                  fontFamily: "inherit",
                  resize: "vertical",
                  background: "#f8fbff",
                }}
              />
              <div className="character-count">{content.length} characters</div>
            </div>
          </div>

          <button
            className="publish-blog-btn"
            onClick={saveBlog}
            disabled={uploading}
          >
            {uploading
              ? "Uploading..."
              : editingId
                ? "Update Blog"
                : "Publish Blog"}
          </button>
        </div>

        {/* Blog List */}
        <div className="blog-toolbar">
          <div className="blog-search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
              <h2>Published Blogs</h2>
              <p>Manage all blog posts from one place.</p>
            </div>
            <span className="blog-count">{filteredBlogs.length} Posts</span>
          </div>

          {filteredBlogs.length === 0 ? (
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
                      {new Date(blog.created_at).toLocaleDateString()}
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
                        onClick={() => editBlog(blog)}
                      >
                        ✏ Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => {
                          setSelectedBlog(blog.id);
                          setShowDeleteModal(true);
                        }}
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

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <div className="delete-modal-icon">🗑️</div>
            <h2>Delete Blog?</h2>
            <p>
              This action cannot be undone. This blog will be permanently
              deleted.
            </p>
            <div className="delete-modal-actions">
              <button
                className="cancel-delete-btn"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedBlog(null);
                }}
              >
                Cancel
              </button>
              <button className="confirm-delete-btn" onClick={deleteBlog}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AboutAdmin;

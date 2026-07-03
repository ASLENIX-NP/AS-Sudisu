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
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("Published");

  const [editingId, setEditingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedBlog, setSelectedBlog] = useState(null);
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
    }
  };

  const saveBlog = async () => {
    if (!title.trim()) {
  toast.error("Blog title is required");
  return;
}

    let error;

    if (editingId) {
      ({ error } = await supabase
        .from("blogs")
        .update({
          title,
          excerpt,
          content,
          image_url: imageUrl,
          status,
        })
        .eq("id", editingId));
    } else {
      ({ error } = await supabase
        .from("blogs")
        .insert([
          {
            title,
            excerpt,
            content,
            image_url: imageUrl,
            status,
          },
        ]));
    }

    if (error) {
  toast.error(error.message);
  return;
}

  resetForm();
fetchBlogs();

toast.success(
  editingId
    ? "Blog updated successfully"
    : "Blog published successfully"
);
  };

  const editBlog = (blog) => {
    setEditingId(blog.id);
    setTitle(blog.title);
    setExcerpt(blog.excerpt);
    setContent(blog.content);
    setImageUrl(blog.image_url);
    setStatus(blog.status);
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

  fetchBlogs();

  toast.success("Blog deleted successfully");

  setShowDeleteModal(false);
  setSelectedBlog(null);
};
  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setExcerpt("");
    setContent("");
    setImageUrl("");
    setStatus("Published");
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="blog-admin-page">

       <div className="blog-header">

  <div className="blog-header-left">

    <span className="blog-badge">
      ✍️ Content Management
    </span>

    <h1>Blog Management</h1>

    <p>
      Create, edit and publish blog articles for your website from one place.
    </p>

  </div>

  <div className="blog-header-right">

    <button
      className="preview-blog-btn"
      type="button"
    >
      👁 Preview Blogs
    </button>

    <button
      className="new-blog-btn"
      type="button"
      onClick={resetForm}
    >
      ➕ New Blog
    </button>

  </div>

</div>
<div className="blog-stats">

  <div className="blog-stat-card total-card">
    <div className="stat-icon">
      📝
    </div>

    <div className="blog-stat-content">
      <span>Total Posts</span>
      <h2>{blogs.length}</h2>
      <small>All blog posts</small>
    </div>
  </div>

  <div className="blog-stat-card published-card">
    <div className="stat-icon">
      🚀
    </div>

    <div className="blog-stat-content">
      <span>Published</span>
      <h2>
        {
          blogs.filter(
            (b) => b.status === "Published"
          ).length
        }
      </h2>
      <small>Currently live</small>
    </div>
  </div>

  <div className="blog-stat-card draft-card">
    <div className="stat-icon">
      📄
    </div>

    <div className="blog-stat-content">
      <span>Draft Posts</span>
      <h2>
        {
          blogs.filter(
            (b) => b.status === "Draft"
          ).length
        }
      </h2>
      <small>Not published</small>
    </div>
  </div>

</div>

<div className="blog-form">
  <div className="blog-form-header">

    <div>

        <h2>Create Blog Post</h2>

        <p>
            Write engaging articles, product updates and company news.
        </p>

    </div>

    <div className="blog-form-icon">
        📝
    </div>

</div>
<div className="blog-form-grid">

  <div className="blog-field">

<div className="blog-form-row">

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

  </div>

</div><div className="blog-form-row">

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

  <div className="blog-field image-field">

    <label>Featured Image</label>

    <input
      placeholder="Paste image URL..."
      value={imageUrl}
      onChange={(e) => setImageUrl(e.target.value)}
    />

    {imageUrl && (
      <div className="image-preview">
        <img
          src={imageUrl}
          alt="Preview"
        />
      </div>
    )}

  </div>

</div>

          <button onClick={saveBlog}>
            {editingId
              ? "Update Blog"
              : "Publish Blog"}
          </button>

        </div>

<div className="blog-toolbar">

  <div className="blog-search-box">

    <span className="search-icon">
      🔍
    </span>

    <input
      type="text"
      placeholder="Search blogs..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />

  </div>

  <div className="blog-toolbar-info">

    Showing

    <strong>
      {" "}
      {filteredBlogs.length}
      {" "}
    </strong>

    of

    <strong>
      {" "}
      {blogs.length}
      {" "}
    </strong>

    blogs

  </div>

</div>
{/* BLOG LIST */}

<div className="blog-list-card">

  <div className="blog-list-header">

    <div>

      <h2>Published Blogs</h2>

      <p>
        Manage all blog posts from one place.
      </p>

    </div>

    <span className="blog-count">
      {filteredBlogs.length} Posts
    </span>

  </div>

  {filteredBlogs.length === 0 ? (

    <div className="empty-blog">

     <div className="empty-circle">

    📝

</div>

      <h3>No Blogs Yet</h3>

      <p>
        Publish your first article to see it here.
      </p>

    </div>

  ) : (

    <div className="blog-list">

      {filteredBlogs.map((blog) => (

        <div
          className="blog-item"
          key={blog.id}
        >

          <div className="blog-thumbnail">

            {blog.image_url ? (

              <img
                src={blog.image_url}
                alt={blog.title}
              />

            ) : (

              <div className="blog-placeholder">
                📰
              </div>

            )}

          </div>

          <div className="blog-info">

            <h3>{blog.title}</h3>

            <p>
              {blog.excerpt}
            </p>

            <small>

              {new Date(
                blog.created_at
              ).toLocaleDateString()}

            </small>

          </div>

          <div className="blog-right">

            <span
              className={
                blog.status === "Published"
                  ? "published"
                  : "draft"
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
      {showDeleteModal && (

  <div className="delete-modal-overlay">

    <div className="delete-modal">

      <div className="delete-modal-icon">
        🗑️
      </div>

      <h2>Delete Blog?</h2>

      <p>
        This action cannot be undone.
        This blog will be permanently deleted.
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

        <button
          className="confirm-delete-btn"
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
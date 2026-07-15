import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/BlogAdmin.css";
import toast from "react-hot-toast";

const BlogAdmin = () => {
  // ============ SETTINGS STATE ============
  const [settings, setSettings] = useState({
    hero_title: "Bringing Authentic Nepali Flavors To Every Kitchen",
    hero_subtitle: "🌶 SUDISU SPICES BLOG",
    hero_description:
      "Discover the stories behind our spices, traditional recipes, quality standards, and the passion that goes into every Sudisu product.",
    hero_image: "",
    button_text: "Explore Our Story",
    button_link: "/about",
  });

  const [settingsImage, setSettingsImage] = useState(null);
  const [settingsImagePreview, setSettingsImagePreview] = useState("");
  const [settingsLoading, setSettingsLoading] = useState(false);

  // ============ BLOG POSTS STATE ============
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [status, setStatus] = useState("Published");

  const [editingId, setEditingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [uploading, setUploading] = useState(false);

  // ============ FETCH DATA ============
  useEffect(() => {
    fetchSettings();
    fetchBlogs();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_settings")
        .select("*")
        .eq("id", 1)
        .single();

      if (error) throw error;

      if (data) {
        setSettings({
          hero_title:
            data.hero_title ||
            "Bringing Authentic Nepali Flavors To Every Kitchen",
          hero_subtitle: data.hero_subtitle || "🌶 SUDISU SPICES BLOG",
          hero_description:
            data.hero_description ||
            "Discover the stories behind our spices...",
          hero_image: data.hero_image || "",
          button_text: data.button_text || "Explore Our Story",
          button_link: data.button_link || "/about",
        });
        setSettingsImagePreview(data.hero_image || "");
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setBlogs(data || []);
    } else {
      console.error("Error fetching blogs:", error);
    }
  };

  // ============ SETTINGS FUNCTIONS ============
  const handleSettingsChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSettingsImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSettingsImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setSettingsImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const removeSettingsImage = () => {
    setSettingsImage(null);
    setSettingsImagePreview("");
    setSettings({ ...settings, hero_image: "" });
  };

  const uploadSettingsImage = async (file) => {
    if (!file) return null;

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `settings/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("blog-images").getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading settings image:", error);
      throw error;
    }
  };

  const saveSettings = async () => {
    setSettingsLoading(true);
    try {
      let heroImageUrl = settings.hero_image;

      if (settingsImage) {
        heroImageUrl = await uploadSettingsImage(settingsImage);
      }

      const { error } = await supabase.from("blog_settings").upsert(
        {
          id: 1,
          hero_title: settings.hero_title,
          hero_subtitle: settings.hero_subtitle,
          hero_description: settings.hero_description,
          hero_image: heroImageUrl,
          button_text: settings.button_text,
          button_link: settings.button_link,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" },
      );

      if (error) throw error;

      toast.success("Blog settings saved successfully!");
      await fetchSettings();
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setSettingsLoading(false);
    }
  };

  // ============ BLOG POST FUNCTIONS ============
  const uploadBlogImage = async (file) => {
    if (!file) return null;

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `posts/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("blog-images").getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading blog image:", error);
      throw error;
    }
  };

  const handleBlogImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const removeBlogImage = () => {
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

      if (imageFile) {
        imageUrl = await uploadBlogImage(imageFile);
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
            category,
            author,
            image_url: imageUrl,
            status,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingId));
      } else {
        ({ error } = await supabase.from("blogs").insert([
          {
            title,
            excerpt,
            content: blogContent,
            category,
            author,
            image_url: imageUrl,
            status,
          },
        ]));
      }

      if (error) throw error;

      resetBlogForm();
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
    setExcerpt(blog.excerpt || "");
    setContent(blog.content || "");
    setCategory(blog.category || "");
    setAuthor(blog.author || "");
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

  const resetBlogForm = () => {
    setEditingId(null);
    setTitle("");
    setExcerpt("");
    setContent("");
    setCategory("");
    setAuthor("");
    setImageFile(null);
    setImagePreview("");
    setExistingImageUrl("");
    setStatus("Published");
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title?.toLowerCase().includes(search.toLowerCase()),
  );

  // ============ RENDER ============
  return (
    <AdminLayout>
      <div className="blog-admin-page">
        {/* HEADER */}
        <div className="blog-header">
          <div className="blog-header-left">
            <span className="blog-badge">✍️ Content Management</span>
            <h1>Blog Management</h1>
            <p>Control your entire blog page from one place.</p>
          </div>
          <div className="blog-header-right">
            <button className="preview-blog-btn" type="button">
              👁 Preview Blog
            </button>
          </div>
        </div>

        {/* ============ SECTION 1: BLOG SETTINGS ============ */}
        <div className="blog-card">
          <div className="blog-card-header">
            <div className="card-title">
              <div className="card-icon">⚙️</div>
              <div>
                <h2>Blog Page Settings</h2>
                <p>
                  Control the hero section and main content of your blog page.
                </p>
              </div>
            </div>
          </div>

          <div className="settings-form-grid">
            <div className="form-group">
              <label>Hero Subtitle / Tag</label>
              <input
                type="text"
                name="hero_subtitle"
                placeholder="e.g., 🌶 SUDISU SPICES BLOG"
                value={settings.hero_subtitle}
                onChange={handleSettingsChange}
              />
            </div>

            <div className="form-group">
              <label>Hero Title</label>
              <input
                type="text"
                name="hero_title"
                placeholder="e.g., Bringing Authentic Nepali Flavors..."
                value={settings.hero_title}
                onChange={handleSettingsChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Hero Description</label>
              <textarea
                name="hero_description"
                placeholder="Write a brief description..."
                value={settings.hero_description}
                onChange={handleSettingsChange}
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Button Text</label>
              <input
                type="text"
                name="button_text"
                placeholder="e.g., Explore Our Story"
                value={settings.button_text}
                onChange={handleSettingsChange}
              />
            </div>

            <div className="form-group">
              <label>Button Link</label>
              <input
                type="text"
                name="button_link"
                placeholder="e.g., /about"
                value={settings.button_link}
                onChange={handleSettingsChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Hero Image</label>
              <div className="image-upload-container">
                <label className="image-upload-btn">
                  📤 Choose Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleSettingsImageChange}
                  />
                </label>
                {settingsImagePreview && (
                  <button
                    className="remove-image-btn"
                    onClick={removeSettingsImage}
                  >
                    ✕ Remove
                  </button>
                )}
              </div>
              {settingsImagePreview && (
                <div className="image-preview">
                  <img src={settingsImagePreview} alt="Hero" />
                </div>
              )}
              <small className="image-hint">Recommended size: 1200x800px</small>
            </div>
          </div>

          <button
            className="save-settings-btn"
            onClick={saveSettings}
            disabled={settingsLoading}
          >
            {settingsLoading ? "Saving..." : "Save Blog Settings"}
          </button>
        </div>

        {/* ============ SECTION 2: CREATE / EDIT BLOG ============ */}
        <div className="blog-card">
          <div className="blog-card-header">
            <div className="card-title">
              <div className="card-icon">📝</div>
              <div>
                <h2>{editingId ? "Edit Blog Post" : "Create New Blog Post"}</h2>
                <p>Write and publish a new post to your blog.</p>
              </div>
            </div>
            {editingId && (
              <button className="cancel-edit-btn" onClick={resetBlogForm}>
                Cancel Edit
              </button>
            )}
          </div>

          <div className="blog-form-grid">
            <div className="form-group full-width">
              <label>Post Title *</label>
              <input
                type="text"
                placeholder="Enter an engaging title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group full-width">
              <label>Short Excerpt</label>
              <textarea
                placeholder="A brief summary for the blog preview card..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows="2"
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category...</option>
                <option value="Recipes">Recipes</option>
                <option value="Spices 101">Spices 101</option>
                <option value="Health & Wellness">Health & Wellness</option>
                <option value="Company News">Company News</option>
              </select>
            </div>

            <div className="form-group">
              <label>Author</label>
              <input
                type="text"
                placeholder="e.g., Sudisu Team"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Featured Image</label>
              <div className="image-upload-container">
                <label className="image-upload-btn">
                  📤 Choose Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleBlogImageChange}
                  />
                </label>
                {imagePreview && (
                  <button className="remove-image-btn" onClick={removeBlogImage}>
                    ✕ Remove
                  </button>
                )}
              </div>
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Blog Featured" />
                </div>
              )}
            </div>

            <div className="form-group full-width">
              <label>Main Content *</label>
              <textarea
                placeholder="Write your amazing blog post here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="10"
                className="content-textarea"
              />
            </div>
          </div>

          <button
            className="save-blog-btn"
            onClick={saveBlog}
            disabled={uploading}
          >
            {uploading ? "Saving..." : (editingId ? "Update Blog Post" : "Publish Blog Post")}
          </button>
        </div>

        {/* ============ SECTION 3: MANAGE BLOGS ============ */}
        <div className="blog-card">
          <div className="blog-card-header">
            <div className="card-title">
              <div className="card-icon">📚</div>
              <div>
                <h2>Manage Blog Posts</h2>
                <p>View, edit, or delete your existing blog posts.</p>
              </div>
            </div>
            <input
              type="text"
              className="blog-search"
              placeholder="🔍 Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="blogs-table-container">
            <table className="blogs-table">
              <thead>
                <tr>
                  <th>Post</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="no-blogs">
                      No blog posts found.
                    </td>
                  </tr>
                ) : (
                  filteredBlogs.map((blog) => (
                    <tr key={blog.id}>
                      <td className="blog-title-cell">
                        {blog.image_url && (
                          <img src={blog.image_url} alt={blog.title} className="blog-thumbnail" />
                        )}
                        <div>
                          <strong>{blog.title}</strong>
                          <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td>
                        <span className="blog-tag">{blog.category || "Uncategorized"}</span>
                      </td>
                      <td>{blog.author || "Admin"}</td>
                      <td>
                        <span className={`status-badge ${blog.status === "Published" ? "status-published" : "status-draft"}`}>
                          {blog.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="edit-btn" onClick={() => editBlog(blog)} title="Edit">
                            ✏️
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => {
                              setSelectedBlog(blog.id);
                              setShowDeleteModal(true);
                            }}
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
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

export default BlogAdmin;

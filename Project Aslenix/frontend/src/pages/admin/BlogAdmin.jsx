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

const deleteBlog = async (id) => {
  const confirmed = window.confirm(
    "Delete this blog?"
  );

  if (!confirmed) return;

  const { error } = await supabase
    .from("blogs")
    .delete()
    .eq("id", id);

  if (error) {
    toast.error(error.message);
    return;
  }

  fetchBlogs();

  toast.success("Blog deleted successfully");
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
          <h1>Blog Management</h1>
          <p>
            Manage website articles and content.
          </p>
        </div>

        <div className="blog-stats">

          <div className="blog-stat-card">
            <span>Total Posts</span>
            <h2>{blogs.length}</h2>
          </div>

          <div className="blog-stat-card">
            <span>Published</span>
            <h2>
              {
                blogs.filter(
                  (b) =>
                    b.status === "Published"
                ).length
              }
            </h2>
          </div>

          <div className="blog-stat-card">
            <span>Drafts</span>
            <h2>
              {
                blogs.filter(
                  (b) =>
                    b.status === "Draft"
                ).length
              }
            </h2>
          </div>

        </div>

        <div className="blog-form">

          <h2>
            {editingId
              ? "Edit Blog"
              : "Add Blog"}
          </h2>

          <input
            placeholder="Blog Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <textarea
            placeholder="Short Excerpt"
            value={excerpt}
            onChange={(e) =>
              setExcerpt(e.target.value)
            }
          />

          <textarea
            placeholder="Full Content"
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
          />

          <input
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) =>
              setImageUrl(e.target.value)
            }
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <option>
              Published
            </option>
            <option>
              Draft
            </option>
          </select>

          <button onClick={saveBlog}>
            {editingId
              ? "Update Blog"
              : "Publish Blog"}
          </button>

        </div>

        <div className="blog-search">
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <div className="blog-table">

          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredBlogs.map((blog) => (
                <tr key={blog.id}>
                  <td>{blog.title}</td>

                  <td>
                    <span
                      className={
                        blog.status ===
                        "Published"
                          ? "published"
                          : "draft"
                      }
                    >
                      {blog.status}
                    </span>
                  </td>

                  <td>
                    {new Date(
                      blog.created_at
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        editBlog(blog)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteBlog(blog.id)
                      }
                    >
                      Delete
                    </button>
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

export default BlogAdmin;
import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Certificates.css";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";

const Certificates = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/certificates"
      );

      setCertificates(res.data);
    } catch (err) {
      console.log(err);
    }
  };

const submit = async () => {
  try {
    if (!title.trim()) {
  toast.error("Certificate title is required");
  return;
}

if (!image) {
  toast.error("Please select a certificate image");
  return;
}
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    const res = await axios.post(
      "http://localhost:5000/api/certificates",
      formData
    );

    console.log("SUCCESS:", res.data);

    toast.success("Certificate uploaded successfully");

    setTitle("");
    setDescription("");
    setImage(null);

    fetchCertificates();
  } catch (err) {
    console.log("ERROR:", err);

  toast.error(
  err?.response?.data?.error ||
  err.message ||
  "Upload Failed"
);
  }
};

  const deleteCertificate = async (id) => {
    const confirmed = window.confirm(
      "Delete certificate?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/certificates/${id}`
      );

      fetchCertificates();
      toast.success("Certificate deleted successfully");
    } catch (err) {
  console.log(err);

  toast.error(
    "Failed to delete certificate"
  );
}
  };

  const filteredCertificates =
    certificates.filter((c) =>
      c.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <AdminLayout>
      <div className="cert-admin-page">

        {/* HEADER */}
        <div className="cert-header">
          <h1 className="cert-page-title">
            Certificates
          </h1>

          <p className="cert-subtitle">
            Manage certifications, approvals and
            quality documents.
          </p>
        </div>

        {/* STATS */}
        <div className="cert-stats">

          <div className="cert-stat-card">
            <span>Total Certificates</span>
            <h2>{certificates.length}</h2>
          </div>

          <div className="cert-stat-card">
            <span>Uploaded</span>
            <h2>{certificates.length}</h2>
          </div>

          <div className="cert-stat-card">
            <span>Status</span>
            <h2 className="online">
              Active
            </h2>
          </div>

        </div>

        {/* FORM */}
        <div className="cert-form">
          <h2>Add New Certificate</h2>

          <div className="cert-form-grid">

            <input
              placeholder="Certificate Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <input
              type="file"
              onChange={(e) =>
                setImage(e.target.files[0])
              }
            />
{image && (
  <div className="cert-preview">
    <img
      src={URL.createObjectURL(image)}
      alt="preview"
    />
  </div>
)}
          </div>

          <textarea
            placeholder="Description of the certificate"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <button onClick={submit}>
            Upload Certificate
          </button>
          const [uploading, setUploading] =
            useState(false);
        </div>

        {/* SEARCH */}
        <div className="cert-search">
          <input
            type="text"
            placeholder="🔍 Search certificates..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        {/* CERTIFICATES */}
        {filteredCertificates.length === 0 ? (
          <div className="cert-empty">
            No certificates found.
          </div>
        ) : (
          <div className="cert-grid">

            {filteredCertificates.map((c) => (
              <div
                key={c.id}
                className="cert-card"
              >
                <img
                  src={c.image_url}
                  alt={c.title}
                />

                <div className="cert-card-body">
                  <button
  className="cert-view-btn"
  onClick={() =>
    window.open(c.image_url, "_blank")
  }
>
  View Certificate
</button>

                  <h3>{c.title}</h3>

                  <p>{c.description}</p>

                  <button
                    className="cert-delete-btn"
                    onClick={() =>
                      deleteCertificate(c.id)
                    }
                  >
                    Delete
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default Certificates;
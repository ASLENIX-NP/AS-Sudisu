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

const [uploading, setUploading] = useState(false);

const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedCertificate, setSelectedCertificate] = useState(null);
  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/certificates"
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
      "http://localhost:5001/api/certificates",
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

const deleteCertificate = async () => {
  if (!selectedCertificate) return;

  try {
    await axios.delete(
      `http://localhost:5001/api/certificates/${selectedCertificate}`
    );

    fetchCertificates();

    toast.success("Certificate deleted successfully");

  } catch (err) {

    console.log(err);

    toast.error("Failed to delete certificate");

  }

  setShowDeleteModal(false);
  setSelectedCertificate(null);
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

  <div className="cert-header-left">

    <div className="cert-badge">
      🏆 Quality Management
    </div>

    <h1 className="cert-page-title">
      Certificates
    </h1>

    <p className="cert-subtitle">
      Upload and manage certifications, approvals and
      quality documents from one place.
    </p>

  </div>

  <div className="cert-header-right">

    <button className="preview-btn">
      👁 Preview
    </button>

    <button
      className="primary-btn"
      onClick={()=>{
        setTitle("");
        setDescription("");
        setImage(null);
      }}
    >
      ➕ Add Certificate
    </button>

  </div>

</div>

        {/* STATS */}
<div className="cert-stats">

  <div className="cert-stat-card total-card">

    <div className="cert-stat-icon">
      📜
    </div>

    <div className="cert-stat-content">

      <span>Total Certificates</span>

      <h2>{certificates.length}</h2>

      <small>All uploaded certificates</small>

    </div>

  </div>

  <div className="cert-stat-card uploaded-card">

    <div className="cert-stat-icon">
      ☁️
    </div>

    <div className="cert-stat-content">

      <span>Uploaded</span>

      <h2>{certificates.length}</h2>

      <small>Stored successfully</small>

    </div>

  </div>

  <div className="cert-stat-card status-card">

    <div className="cert-stat-icon">
      ✅
    </div>

    <div className="cert-stat-content">

      <span>Status</span>

      <h2>Active</h2>

      <small>System online</small>

    </div>

  </div>

</div>

        {/* FORM */}
<div className="cert-form">

  <div className="cert-form-header">

    <div className="cert-form-icon">
      📜
    </div>

    <div>
      <h2>Add New Certificate</h2>
      <p>
        Upload certificates, approvals and quality documents.
      </p>
    </div>

  </div>


  <div className="cert-form-grid">

    {/* LEFT */}

    <div className="cert-left">

      <div className="form-group">

        <label>
          Certificate Title
          <span>*</span>
        </label>

        <input
          placeholder="Enter certificate title..."
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

      </div>

    </div>


    {/* RIGHT */}

    <div className="cert-right">

      <label>
        Certificate Image
        <span>*</span>
      </label>

      <label className="upload-box">

        <input
          type="file"
          hidden
          onChange={(e)=>setImage(e.target.files[0])}
        />

        <div className="upload-icon">
          📤
        </div>

        <h4>
          {image ? image.name : "Choose Certificate"}
        </h4>

        <p>PNG, JPG or JPEG</p>

        <small>
          Click to browse or drag & drop
        </small>

      </label>

    </div>

  </div>


  {image && (

    <div className="cert-preview">

      <img
        src={URL.createObjectURL(image)}
        alt="preview"
      />

    </div>

  )}


  <div className="form-group">

    <label>Description</label>

    <textarea
      placeholder="Write a short description about this certificate..."
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
      maxLength={500}
    />

    <div className="char-counter">

      {description.length}/500

    </div>

  </div>


  <div className="cert-buttons">

    <button
      className="upload-cert-btn"
      onClick={submit}
    >
      ⬆ Upload Certificate
    </button>

    <button
      className="reset-btn"
      type="button"
      onClick={()=>{
        setTitle("");
        setDescription("");
        setImage(null);
      }}
    >
      ↻ Reset
    </button>

  </div>

</div>
        {/* SEARCH */}
<div className="cert-toolbar">

  <div className="cert-search-box">

    <span className="search-icon">
      🔍
    </span>

    <input
      type="text"
      placeholder="Search certificates..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

  </div>

  <div className="cert-toolbar-info">

    Showing

    <strong>
      {" "}
      {filteredCertificates.length}
      {" "}
    </strong>

    of

    <strong>
      {" "}
      {certificates.length}
      {" "}
    </strong>

    certificates

  </div>

</div>

        {/* CERTIFICATES */}
        {filteredCertificates.length === 0 ? (
         <div className="cert-empty">

  <div className="cert-empty-icon">
    📜
  </div>

  <h3>No Certificates Yet</h3>

  <p>
    Upload your first certificate to showcase your
    company's achievements and quality standards.
  </p>

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
  onClick={() => {
    setSelectedCertificate(c.id);
    setShowDeleteModal(true);
  }}
>
  Delete
</button>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
      {showDeleteModal && (

  <div className="delete-modal-overlay">

    <div className="delete-modal">

      <div className="delete-modal-icon">
        🗑️
      </div>

      <h2>Delete Certificate?</h2>

      <p>
        This action cannot be undone.
        This certificate will be permanently deleted.
      </p>

      <div className="delete-modal-actions">

        <button
          className="cancel-delete-btn"
          onClick={() => {
            setShowDeleteModal(false);
            setSelectedCertificate(null);
          }}
        >
          Cancel
        </button>

        <button
          className="confirm-delete-btn"
          onClick={deleteCertificate}
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

export default Certificates;
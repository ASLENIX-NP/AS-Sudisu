import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/AboutAdmin.css";

const AboutAdmin = () => {
  return (
    <AdminLayout>
      <div className="about-admin-page">

        <div className="about-header">
          <h1>About Us</h1>

          <p>
            Manage company information displayed on the website.
          </p>
        </div>

        <div className="about-grid">

          <div className="about-card">
            <h2>Company Information</h2>
            <p>Company details will go here.</p>
          </div>

          <div className="about-card">
            <h2>Statistics</h2>
            <p>Business statistics will go here.</p>
          </div>

          <div className="about-card full-width">
            <h2>Our Story</h2>
            <p>Company story content will go here.</p>
          </div>

          <div className="about-card full-width">
            <h2>Images</h2>
            <p>Upload company images here.</p>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default AboutAdmin;
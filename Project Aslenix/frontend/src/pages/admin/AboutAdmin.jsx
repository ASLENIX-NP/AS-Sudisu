import { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/AboutAdmin.css";
import { supabase } from "../../utils/supabase";
import toast from "react-hot-toast";

const AboutAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [aboutData, setAboutData] = useState({
    badge: "SUDIISU SPICES",
    heading: "More than Spices",
    highlighted_heading: "A Story Of Passion",
    paragraph1:
      "Behind every pack of Sudiisu Pride is a team of passionate individuals committed to bringing authentic Nepali flavors to every kitchen.",
    paragraph2:
      "The people you see in this photograph are the heart of our journey. From sourcing premium ingredients to carefully preparing every spice blend, each member plays a vital role in preserving the taste, tradition, and trust that define our brand.",
    paragraph3:
      "We work closely with local farmers and communities, ensuring that every product reflects Nepal's rich culinary heritage while maintaining the highest standards of quality and purity.",
    paragraph4:
      "At Sudiisu Pride, we believe food is more than nourishment—it is a way to connect families, celebrate culture, and create unforgettable memories around the dining table.",
  });

  const [images, setImages] = useState({
    team: null,
    reach: null,
  });

  const [imageFiles, setImageFiles] = useState({
    team: null,
    reach: null,
  });

  // Fetch existing data on load
  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const { data, error } = await supabase
        .from("about_page")
        .select("*")
        .eq("id", 1)
        .single();

      if (error) throw error;

      if (data) {
        setAboutData({
          badge: data.badge || "SUDIISU SPICES",
          heading: data.heading || "More than Spices",
          highlighted_heading: data.highlighted_heading || "A Story Of Passion",
          paragraph1:
            data.paragraph1 ||
            "Behind every pack of Sudiisu Pride is a team of passionate individuals committed to bringing authentic Nepali flavors to every kitchen.",
          paragraph2:
            data.paragraph2 ||
            "The people you see in this photograph are the heart of our journey. From sourcing premium ingredients to carefully preparing every spice blend, each member plays a vital role in preserving the taste, tradition, and trust that define our brand.",
          paragraph3:
            data.paragraph3 ||
            "We work closely with local farmers and communities, ensuring that every product reflects Nepal's rich culinary heritage while maintaining the highest standards of quality and purity.",
          paragraph4:
            data.paragraph4 ||
            "At Sudiisu Pride, we believe food is more than nourishment—it is a way to connect families, celebrate culture, and create unforgettable memories around the dining table.",
        });

        setImages({
          team: data.team_image || null,
          reach: data.reach_image || null,
        });
      }
    } catch (error) {
      console.error("Error fetching about data:", error);
    }
  };

  const handleChange = (e) => {
    setAboutData({
      ...aboutData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFiles((prev) => ({
      ...prev,
      [key]: file,
    }));

    const reader = new FileReader();
    reader.onload = (e) => {
      setImages((prev) => ({
        ...prev,
        [key]: e.target.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (key) => {
    setImages((prev) => ({
      ...prev,
      [key]: null,
    }));
    setImageFiles((prev) => ({
      ...prev,
      [key]: null,
    }));
  };

  const uploadImageToSupabase = async (file, folder) => {
    if (!file) return null;

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${folder}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("about-images") // Make sure this matches your bucket name
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("about-images").getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const saveAboutInfo = async () => {
    setLoading(true);
    try {
      let teamImageUrl = images.team;
      let reachImageUrl = images.reach;

      if (imageFiles.team) {
        teamImageUrl = await uploadImageToSupabase(imageFiles.team, "team");
      }

      if (imageFiles.reach) {
        reachImageUrl = await uploadImageToSupabase(imageFiles.reach, "reach");
      }

      const { error } = await supabase.from("about_page").upsert(
        {
          id: 1,
          badge: aboutData.badge,
          heading: aboutData.heading,
          highlighted_heading: aboutData.highlighted_heading,
          paragraph1: aboutData.paragraph1,
          paragraph2: aboutData.paragraph2,
          paragraph3: aboutData.paragraph3,
          paragraph4: aboutData.paragraph4,
          team_image: teamImageUrl,
          reach_image: reachImageUrl,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" },
      );

      if (error) throw error;

      toast.success("About information saved successfully!");
      await fetchAboutData();
    } catch (error) {
      console.error("Error saving about data:", error);
      toast.error("Failed to save about information");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="about-admin-page">
        {/* Header */}
        <div className="about-header">
          <div className="about-header-left">
            <span className="about-badge">🏢 Company Management</span>
            <h1>About Company</h1>
            <p>
              Manage your company information, statistics, branding, images and
              website content from one place.
            </p>
          </div>
          <div className="about-header-right">
            <button className="preview-btn">👁 Preview Website</button>
          </div>
        </div>

        {/* Hero Section Content */}
        <div className="about-card">
          <div className="about-card-header">
            <div className="card-title">
              <div className="card-icon">📝</div>
              <div>
                <h2>Hero Section</h2>
                <p>Edit the main content displayed on the about page.</p>
              </div>
            </div>
          </div>

          <div className="about-form-grid">
            <div className="form-group">
              <label>Badge/Tag</label>
              <input
                type="text"
                name="badge"
                placeholder="e.g., SUDIISU SPICES"
                value={aboutData.badge}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Main Heading</label>
              <input
                type="text"
                name="heading"
                placeholder="e.g., More than Spices"
                value={aboutData.heading}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Highlighted Heading</label>
              <input
                type="text"
                name="highlighted_heading"
                placeholder="e.g., A Story Of Passion"
                value={aboutData.highlighted_heading}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: "20px" }}>
            <label>Paragraph 1</label>
            <textarea
              className="about-editor"
              name="paragraph1"
              value={aboutData.paragraph1}
              onChange={handleChange}
              placeholder="First paragraph..."
              rows="3"
            />
          </div>

          <div className="form-group" style={{ marginTop: "20px" }}>
            <label>Paragraph 2</label>
            <textarea
              className="about-editor"
              name="paragraph2"
              value={aboutData.paragraph2}
              onChange={handleChange}
              placeholder="Second paragraph..."
              rows="3"
            />
          </div>

          <div className="form-group" style={{ marginTop: "20px" }}>
            <label>Paragraph 3</label>
            <textarea
              className="about-editor"
              name="paragraph3"
              value={aboutData.paragraph3}
              onChange={handleChange}
              placeholder="Third paragraph..."
              rows="3"
            />
          </div>

          <div className="form-group" style={{ marginTop: "20px" }}>
            <label>Paragraph 4</label>
            <textarea
              className="about-editor"
              name="paragraph4"
              value={aboutData.paragraph4}
              onChange={handleChange}
              placeholder="Fourth paragraph..."
              rows="3"
            />
          </div>
        </div>

        {/* Images Section */}
        <div className="about-card">
          <div className="about-card-header">
            <div className="card-title">
              <div className="card-icon">🖼️</div>
              <div>
                <h2>Images</h2>
                <p>Upload images for the about page.</p>
              </div>
            </div>
          </div>

          <div className="image-upload-grid">
            <div className="upload-card">
              <div className="upload-preview">
                {images.team ? (
                  <>
                    <img src={images.team} alt="Team" />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => removeImage("team")}
                    >
                      ✕
                    </button>
                  </>
                ) : (
                  <span>📷</span>
                )}
              </div>
              <h4>Team Image</h4>
              <p>{images.team ? "Image uploaded ✓" : "No image uploaded"}</p>
              <label className="upload-btn">
                📤 {images.team ? "Change Image" : "Upload Image"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "team")}
                />
              </label>
            </div>

            <div className="upload-card">
              <div className="upload-preview">
                {images.reach ? (
                  <>
                    <img src={images.reach} alt="Reach" />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => removeImage("reach")}
                    >
                      ✕
                    </button>
                  </>
                ) : (
                  <span>📷</span>
                )}
              </div>
              <h4>Reach Image</h4>
              <p>{images.reach ? "Image uploaded ✓" : "No image uploaded"}</p>
              <label className="upload-btn">
                📤 {images.reach ? "Change Image" : "Upload Image"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "reach")}
                />
              </label>
            </div>
          </div>
        </div>

        <button
          className="save-about-btn"
          onClick={saveAboutInfo}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save About Information"}
        </button>
      </div>
    </AdminLayout>
  );
};

export default AboutAdmin;

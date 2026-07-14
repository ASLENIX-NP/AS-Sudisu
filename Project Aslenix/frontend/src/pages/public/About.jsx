import { useState, useEffect } from "react";
import "./About.css";
import HeroNavbar from "../../components/common/HeroNavbar";
import Footer from "../../components/common/Footer";
import { supabase } from "../../lib/supabase";
import cookingWomen from "../../assets/images/cooking women.jpg";
import reachImage from "../../assets/images/AboutUS.png";

const About = () => {
  const [about, setAbout] = useState({
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
    team_image: "",
    reach_image: "",
  });
  const [loading, setLoading] = useState(false);

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
        setAbout((prev) => ({
          ...prev,
          ...data,
        }));
      }
    } catch (error) {
      console.error("Error fetching about data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeroNavbar className="about-section">
        <div className="about-container">
          <div className="about-text">
            {/* Badge - Dynamic with fallback */}
            <span className="about-tag">{about.badge || "SUDISU SPICES"}</span>

            <h1>
              {/* Heading - Dynamic with fallback */}
              {about.heading || "More than Spices"}
              <span>{about.highlighted_heading || "A Story Of Passion"}</span>
              <br />
              And Excellence
            </h1>

            {/* Paragraphs - Dynamic with fallback */}
            <p>
              {about.paragraph1 ||
                "Behind every pack of Sudiisu Pride is a team of passionate individuals committed to bringing authentic Nepali flavors to every kitchen."}
            </p>

            <p>
              {about.paragraph2 ||
                "The people you see in this photograph are the heart of our journey. From sourcing premium ingredients to carefully preparing every spice blend, each member plays a vital role in preserving the taste, tradition, and trust that define our brand."}
            </p>

            <p>
              {about.paragraph3 ||
                "We work closely with local farmers and communities, ensuring that every product reflects Nepal's rich culinary heritage while maintaining the highest standards of quality and purity."}
            </p>

            <p>
              {about.paragraph4 ||
                "At Sudiisu Pride, we believe food is more than nourishment—it is a way to connect families, celebrate culture, and create unforgettable memories around the dining table."}
            </p>
          </div>

          <div className="about-image">
            {/* Team Image - Dynamic with fallback to local image */}
            <img
              src={about.team_image || cookingWomen}
              alt="Sudiisu Pride Team"
            />
          </div>
        </div>
      </HeroNavbar>

      <section className="our-reach">
        {/* Reach Image - Dynamic with fallback to local image */}
        <img
          src={about.reach_image || reachImage}
          alt="Our Reach Across Nepal"
          className="reach-image"
        />
      </section>

      <Footer />
    </>
  );
};

export default About;

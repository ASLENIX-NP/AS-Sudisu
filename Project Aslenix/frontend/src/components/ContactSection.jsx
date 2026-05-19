import { useState } from "react";
import "./ContactPopup.css";

const ContactSection = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      {/* CONTACT SECTION */}
      <section className="contact-section">
        <h1>Let’s connect and turn your vision into reality.</h1>

        <p>Available Monday – Friday (9:00 AM – 6:00 PM)</p>

        <button
          className="contact-btn"
          onClick={() => setShowPopup(true)}
        >
          Let’s Start Conversation
        </button>
      </section>

      {/* POPUP */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <button
              className="close-btn"
              onClick={() => setShowPopup(false)}
            >
              ✕
            </button>

            <h2>Contact Us</h2>

            {/* CONTACT INFO */}
            <div className="contact-info">
              <p>📍 Manahari-07, Makawanpur, Nepal</p>
              <p>📞 +977 57-590436</p>
              <p>✉️ info@fortunegroup.com.np</p>
            </div>

            {/* FORM */}
            <form className="popup-form">
              <input
                type="text"
                placeholder="Your Name"
                required
              />

              <input
                type="email"
                placeholder="Your Email"
                required
              />

              <input
                type="text"
                placeholder="Phone Number"
              />

              <textarea
                rows="5"
                placeholder="Write your message..."
              ></textarea>

              <button
                type="submit"
                className="submit-btn"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactSection;
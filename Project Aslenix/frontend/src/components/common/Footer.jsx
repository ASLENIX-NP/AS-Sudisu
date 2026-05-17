import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h2>Let’s connect and turn your vision into reality.</h2>
        <p>Available Monday – Friday (9:00 AM – 6:00 PM)</p>
        <button className="footer-cta">Let’s Start Conversation</button>
      </div>

      <div className="footer-grid">
        <div>
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/contact">Contact</a>
        </div>

        <div>
          <h4>Contact</h4>
          <p>📞 +977 57-590436</p>
          <p>✉️ info@fortunegroup.com.np</p>
          <p>📍 Manahari-07, Makawanpur</p>
        </div>

        <div>
          <h4>Follow Us</h4>
          <p>Instagram</p>
          <p>Facebook</p>
          <p>LinkedIn</p>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Sudiisu Pride. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;

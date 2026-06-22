import "./WhatsAppFloat.css";
import { MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat() {
  const phone = "9779816259642";

  const handleClick = () => {
    const message =
      "Hello Sudiisu Team, I would like to know more about your products.";

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className="whatsapp-chat-widget" onClick={handleClick}>
      <div className="chat-text">
        Need Help? <strong>Chat with us</strong>
      </div>

      <div className="chat-icon">
        <FaWhatsapp size={32} />
      </div>
    </div>
  );
}

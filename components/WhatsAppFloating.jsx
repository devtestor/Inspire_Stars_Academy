"use client";

import { MessageCircleMore } from "lucide-react";

const whatsappUrl = "https://wa.me/250789921727";

export default function WhatsAppFloating() {
  return (
    <a
      className="whatsapp-float"
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Inspire Stars Academy on WhatsApp"
    >
      <MessageCircleMore size={22} />
      <span>WhatsApp</span>
    </a>
  );
}

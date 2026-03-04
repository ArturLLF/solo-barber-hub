import { MessageCircle } from "lucide-react";

const PHONE = "556196980205";
const MESSAGE = encodeURIComponent("Olá! Gostaria de tirar uma dúvida sobre os serviços da barbearia.");

const WhatsAppButton = () => (
  <a
    href={`https://wa.me/${PHONE}?text=${MESSAGE}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Fale conosco no WhatsApp"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe57] text-white flex items-center justify-center shadow-lg shadow-black/30 transition-transform hover:scale-110 mb-safe"
  >
    <MessageCircle className="w-7 h-7" />
  </a>
);

export default WhatsAppButton;

import { MessageCircle } from 'lucide-react';
import { useSiteContext } from '../context/SiteContext';

const WhatsAppButton = () => {
  const { settings } = useSiteContext();

  const cleanNumber = settings.whatsapp
    ? settings.whatsapp.replace(/[^0-9]/g, '')
    : '919860342172';

  const defaultMsg = encodeURIComponent("Hello Sanjivani Computer, I would like to inquire about your courses and services.");

  return (
    <a
      href={`https://wa.me/${cleanNumber}?text=${defaultMsg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Sanjivani Computer on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 group"
    >
      <MessageCircle className="w-5 h-5 fill-current" />
      <span className="hidden sm:inline text-sm font-semibold tracking-wide pr-1">
        WhatsApp Us
      </span>
      {/* Subtle indicator ping */}
      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
      </span>
    </a>
  );
};

export default WhatsAppButton;

const WhatsAppButton = () => {
  const phoneNumber = "919876543210"; 
  const message = "Hello Sanjivani Computer, I have an inquiry.";

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] hover:bg-green-600 hover:-translate-y-1 transition-all duration-300 z-50 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
      >
        <path d="M11.964.041C5.399.041.06 5.385.06 11.956c0 2.112.553 4.148 1.59 5.952L.034 23.967l6.23-1.637a11.83 11.83 0 005.7 1.455c6.561 0 11.895-5.343 11.895-11.916 0-3.18-1.238-6.166-3.486-8.411A11.82 11.82 0 0011.964.041zM20.218 16.59c-.313.882-1.789 1.631-2.486 1.706-.605.065-1.393.208-4.437-1.054-3.673-1.523-6.046-5.266-6.227-5.508-.182-.243-1.487-1.982-1.487-3.784 0-1.801.936-2.686 1.268-3.05.333-.364.726-.455.967-.455.242 0 .484 0 .696.012.23.012.535-.084.838.643.302.729 1.026 2.502 1.117 2.685.091.182.151.395.03.637-.121.242-.182.395-.363.607-.182.212-.383.473-.556.626-.182.164-.37.34-.176.674.194.333.864 1.428 1.856 2.316 1.282 1.147 2.35 1.5 2.682 1.666.333.164.526.134.722-.091.196-.226.837-.972 1.066-1.305.228-.333.456-.277.759-.164.303.116 1.918.904 2.251 1.07.333.164.556.242.637.377.081.134.081.782-.232 1.664z" />
      </svg>
      {/* Tooltip */}
      <span className="absolute right-16 bg-white text-slate-800 text-sm font-medium px-4 py-2 rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Chat with us!
      </span>
    </button>
  );
};

export default WhatsAppButton;

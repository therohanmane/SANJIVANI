import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

const defaultImages = [
  "/gallery/1.jpg",
  "/gallery/2.jpg",
  "/gallery/3.jpg",
  "/gallery/4.jpg",
  "/gallery/5.jpg",
  "/gallery/6.jpg",
  "/gallery/7.jpg",
  "/gallery/8.jpg",
  "/gallery/9.jpg",
  "/gallery/10.jpg",
  "/gallery/11.jpg",
  "/gallery/12.jpg",
  "/gallery/13.jpg",
  "/gallery/14.jpg"
];

const captions = [
  "Hands-on Computer Lab Training",
  "Dedicated Student Workstations",
  "MKCL Practical Sessions & Assessments",
  "Typing Lab Practice Sessions",
  "Educational Seminars & Student Guidance",
  "Interactive Group Discussions",
  "Annual Student Celebrations",
  "Recognizing Student Achievements",
  "Personality & Digital Skills Workshops",
  "Classroom Theory & Practical Balance",
  "Educational Field Trips & Outdoor Activities",
  "Technical Project Demonstrations",
  "Local Community Learning Events",
  "19 Years of Continuous Growth at Kurkumbh"
];

const ImageGallery = ({ images = defaultImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Slideshow Frame */}
      <div className="relative h-64 sm:h-80 md:h-[420px] rounded-2xl overflow-hidden shadow-sm border border-[#E4E7EC] bg-slate-900">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={img}
              alt={`Sanjivani Institute Photo ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/founder-bg.jpg';
              }}
            />
            {/* Subtle Gradient for Caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
          </div>
        ))}

        {/* Caption Overlay */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-white pointer-events-none">
          <div className="bg-black/40 backdrop-blur-xs px-3.5 py-1.5 rounded-lg text-xs font-semibold">
            <span>{captions[currentIndex] || `Activity Showcase ${currentIndex + 1}`}</span>
          </div>
          <div className="text-xs text-slate-300 font-medium bg-black/40 px-2.5 py-1 rounded-md">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white text-[#14213D] rounded-full shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white text-[#14213D] rounded-full shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnails / Indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-4 overflow-x-auto py-1">
        {images.slice(0, 10).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-[#155EEF] w-7' 
                : 'bg-slate-300 hover:bg-slate-400 w-2'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;

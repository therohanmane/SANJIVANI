import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { useSiteContext } from '../context/SiteContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { settings } = useSiteContext();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Online Services', path: '/online-services' },
    { name: 'IT Services', path: '/it-services' },
    { name: 'Business AMC', path: '/business-amc' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cleanPhone = settings.phone ? settings.phone.replace(/[^0-9]/g, '') : '919860342172';
  const cleanWhatsApp = settings.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, '') : cleanPhone;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Notification Bar */}
      <div className="bg-[#0E2142] text-slate-200 text-xs py-1.5 px-4 hidden sm:block border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-medium text-slate-300">
              19 Years of Experience in Computer Education & IT Services
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">{settings.address.split(',')[1] || 'Kurkumbh'}, Tal. Daund, Dist. Pune</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={`tel:${settings.phone}`} 
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-purple-300" />
              <span>{settings.phone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href={`https://wa.me/${cleanWhatsApp}?text=Hello%20Sanjivani%20Computer,%20I%20have%20an%20inquiry.`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`w-full transition-all duration-200 bg-white border-b border-[#E5E7EB] ${
        scrolled ? 'py-2 shadow-xs' : 'py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            
            {/* Brand Logo Using Provided Official Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="/logo-tight.png" 
                alt="Sanjivani Computer" 
                className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-102"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 ${
                      isActive
                        ? 'text-[#491F6B] bg-[#F6EEFB]'
                        : 'text-[#2B3342] hover:text-[#491F6B] hover:bg-[#F8F9FC]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Quick Contact Action Buttons */}
            <div className="hidden sm:flex items-center gap-2.5">
              <a
                href={`tel:${settings.phone}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-[#163262] bg-[#F8F9FC] border border-[#E5E7EB] rounded-lg hover:bg-slate-100 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#491F6B]" />
                <span>Call</span>
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#9C225B] hover:bg-[#83184B] rounded-lg shadow-xs transition-colors"
              >
                Get in Touch
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <a
                href={`tel:${settings.phone}`}
                aria-label="Call Now"
                className="p-2 text-[#2B3342] hover:text-[#491F6B] rounded-lg border border-[#E5E7EB] sm:hidden"
              >
                <Phone className="w-5 h-5 text-[#491F6B]" />
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation menu"
                className="p-2 text-[#2B3342] hover:text-[#491F6B] rounded-lg border border-[#E5E7EB] hover:bg-[#F8F9FC]"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-[#E5E7EB] shadow-xl px-4 pt-3 pb-6 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                    isActive
                      ? 'text-[#491F6B] bg-[#F6EEFB]'
                      : 'text-[#2B3342] hover:bg-[#F8F9FC]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-[#E5E7EB] flex flex-col gap-2">
              <a
                href={`tel:${settings.phone}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-base font-semibold text-[#163262] bg-[#F8F9FC] border border-[#E5E7EB] rounded-xl"
              >
                <Phone className="w-5 h-5 text-[#491F6B]" />
                Call {settings.phone}
              </a>
              <a
                href={`https://wa.me/${cleanWhatsApp}?text=Hello%20Sanjivani%20Computer,%20I%20have%20an%20inquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-base font-semibold text-white bg-[#16A34A] rounded-xl shadow-xs"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

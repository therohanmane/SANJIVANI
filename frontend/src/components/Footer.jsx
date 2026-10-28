import { MapPin, Phone, Mail, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteContext } from '../context/SiteContext';

const Footer = () => {
  const { settings } = useSiteContext();

  const cleanPhone = settings.phone ? settings.phone.replace(/[^0-9]/g, '') : '919860342172';
  const cleanWhatsApp = settings.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, '') : cleanPhone;

  return (
    <footer className="bg-[#0E2142] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block bg-white p-2.5 rounded-xl shadow-xs">
              <img 
                src="/logo-tight.png" 
                alt="Sanjivani Computer Logo" 
                className="h-8 w-auto object-contain"
              />
            </Link>
            
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Established computer education institute, digital citizen service center, and IT hardware solutions provider with 19 years of practical experience serving Kurkumbh, Daund, and regional organizations.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 bg-white/10 border border-white/15 rounded-md text-slate-200 font-medium">
                19+ Years Experience
              </span>
              <span className="px-2.5 py-1 bg-white/10 border border-white/15 rounded-md text-slate-200 font-medium">
                MKCL Courses
              </span>
              <span className="px-2.5 py-1 bg-white/10 border border-white/15 rounded-md text-slate-200 font-medium">
                Hardware & AMC Support
              </span>
            </div>

            <div className="pt-2">
              <a 
                href={`https://wa.me/${cleanWhatsApp}?text=Hello%20Sanjivani%20Computer`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold hover:bg-emerald-600/30 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Instant WhatsApp Inquiry</span>
              </a>
            </div>
          </div>

          {/* Col 2: Education & Courses */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#9C225B] pl-2">
              Education & Courses
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">MS-CIT Certification</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">Tally Prime with GST</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">Typing (30/40/50 WPM)</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">Graphic Design & DTP</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">Computer Fundamentals</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">Web Development</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Solutions */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#491F6B] pl-2">
              Services & AMC
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/it-services" className="hover:text-white transition-colors">Desktop & PC Repair</Link>
              </li>
              <li>
                <Link to="/it-services" className="hover:text-white transition-colors">Laptop Servicing</Link>
              </li>
              <li>
                <Link to="/it-services" className="hover:text-white transition-colors">Printer Repair & Refill</Link>
              </li>
              <li>
                <Link to="/it-services" className="hover:text-white transition-colors">CCTV Camera Installation</Link>
              </li>
              <li>
                <Link to="/online-services" className="hover:text-white transition-colors">Online Citizen Services</Link>
              </li>
              <li>
                <Link to="/business-amc" className="hover:text-white transition-colors text-purple-300 font-medium">Business IT AMC</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-emerald-400 pl-2">
              Contact & Hours
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" />
                <a 
                  href={settings.mapUrl || "https://maps.app.goo.gl/vk5Zh8VVvzaPxjfe9"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors inline-flex items-center gap-1 leading-snug"
                >
                  <span>{settings.address}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                </a>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone className="w-4 h-4 text-purple-300 shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-white transition-colors font-medium text-slate-200">
                  {settings.phone}
                </a>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail className="w-4 h-4 text-purple-300 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors truncate">
                  {settings.email}
                </a>
              </li>
              <li className="flex gap-2.5 items-start pt-1 border-t border-white/10">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300 leading-relaxed">
                  {settings.workingHours || "Mon – Sat: 9:00 AM – 8:00 PM"}
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} {settings.brandName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-slate-200 transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-slate-200 transition-colors">Contact</Link>
            <Link to="/admin/login" className="text-slate-400 hover:text-slate-300 transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

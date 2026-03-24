import { MapPin, Phone, Mail, MonitorPlay, Globe, MessagesSquare, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-white">
              <MonitorPlay className="h-8 w-8 text-primary-500" />
              <span className="font-bold text-xl tracking-tight">SANJIVANI</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Your one-stop destination for professional IT training and reliable computer services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-400 transition-colors"><Globe className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary-400 transition-colors"><MessagesSquare className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary-400 transition-colors"><Share2 className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 lg:ml-12">Quick Links</h3>
            <ul className="space-y-2 lg:ml-12 text-sm">
              <li><Link to="/courses" className="hover:text-primary-400 transition-colors">Training Courses</Link></li>
              <li><Link to="/services" className="hover:text-primary-400 transition-colors">IT Repair Services</Link></li>
              <li><Link to="/shop" className="hover:text-primary-400 transition-colors">Electronics Shop</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-primary-400 transition-colors cursor-pointer">Computer Repair</li>
              <li className="hover:text-primary-400 transition-colors cursor-pointer">Laptop Maintenance</li>
              <li className="hover:text-primary-400 transition-colors cursor-pointer">Printer Repair</li>
              <li className="hover:text-primary-400 transition-colors cursor-pointer">CCTV Installation</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary-500 shrink-0" />
                <span>123 Tech Avenue, Future City, State 400001</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-primary-500 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-primary-500 shrink-0" />
                <span>info@sanjivani.tech</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} SANJIVANI Cyber Cafe & Institute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

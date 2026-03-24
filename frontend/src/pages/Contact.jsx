import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useSiteContext } from '../context/SiteContext';

const Contact = () => {
  const { siteSettings, loading } = useSiteContext();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  if (loading || !siteSettings) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  const cc = siteSettings.contact || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">Get in Touch</h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">We're here to help and answer any question you might have. We look forward to hearing from you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8 p-8 bg-slate-900 border border-slate-900 dark:border-slate-800 rounded-3xl text-white">
            <h2 className="text-2xl font-bold mb-6 text-white">Contact Information</h2>
            
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-full"><MapPin className="w-6 h-6 text-primary-400" /></div>
              <div>
                <h4 className="font-semibold text-lg text-white">Our Location</h4>
                <p className="text-slate-400 text-sm mt-1">{cc.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-full"><Phone className="w-6 h-6 text-primary-400" /></div>
              <div>
                <h4 className="font-semibold text-lg text-white">Phone Number</h4>
                {cc.phone1 && <p className="text-slate-400 text-sm mt-1">{cc.phone1}</p>}
                {cc.phone2 && <p className="text-slate-400 text-sm mt-1">{cc.phone2}</p>}
                {cc.whatsapp && (
                  <p className="text-green-400 text-sm mt-2 flex items-center gap-1 font-medium">
                    <MessageCircle className="w-4 h-4" /> WhatsApp: {cc.whatsapp}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-full"><Mail className="w-6 h-6 text-primary-400" /></div>
              <div>
                <h4 className="font-semibold text-lg text-white">Email Address</h4>
                {cc.email1 && <p className="text-slate-400 text-sm mt-1">{cc.email1}</p>}
                {cc.email2 && <p className="text-slate-400 text-sm mt-1">{cc.email2}</p>}
              </div>
            </div>

            <div className="flex items-start gap-4 mt-8 pt-8 border-t border-slate-700">
              <div className="bg-white/10 p-3 rounded-full"><Clock className="w-6 h-6 text-primary-400" /></div>
              <div>
                <h4 className="font-semibold text-lg text-white">Working Hours</h4>
                {cc.hours1 && <p className="text-slate-400 text-sm mt-1">{cc.hours1}</p>}
                {cc.hours2 && <p className="text-slate-400 text-sm mt-1">{cc.hours2}</p>}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-slate-50 dark:bg-slate-900/50 p-8 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your Name</label>
                  <input required type="text" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                  <input required type="email" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                <textarea required rows="5" value={formData.message} onChange={e=>setFormData({...formData, message: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="px-8 py-4 bg-primary-600 text-white font-bold rounded-xl shadow-md hover:bg-primary-700 hover:-translate-y-1 transition-all">Send Message</button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="mt-16 h-96 bg-slate-200 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center">
            {/* Using an iframe to embed Google Map representing generic coordinates */}
            {cc.mapUrl ? (
              <iframe 
                 src={cc.mapUrl} 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen="" 
                 loading="lazy">
              </iframe>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500 bg-slate-100 dark:bg-slate-800">Map not configured</div>
            )}
        </div>
      </div>
    </div>
  );
};
export default Contact;

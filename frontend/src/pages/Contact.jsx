import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Get in Touch</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">We're here to help and answer any question you might have. We look forward to hearing from you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8 p-8 bg-slate-900 rounded-3xl text-white">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-full"><MapPin className="w-6 h-6 text-primary-400" /></div>
              <div>
                <h4 className="font-semibold text-lg text-white">Our Location</h4>
                <p className="text-slate-400 text-sm mt-1">123 Tech Avenue, Future City, State 400001</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-full"><Phone className="w-6 h-6 text-primary-400" /></div>
              <div>
                <h4 className="font-semibold text-lg text-white">Phone Number</h4>
                <p className="text-slate-400 text-sm mt-1">+91 98765 43210</p>
                <p className="text-slate-400 text-sm mt-1">+91 91234 56789</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-full"><Mail className="w-6 h-6 text-primary-400" /></div>
              <div>
                <h4 className="font-semibold text-lg text-white">Email Address</h4>
                <p className="text-slate-400 text-sm mt-1">info@sanjivani.tech</p>
                <p className="text-slate-400 text-sm mt-1">support@sanjivani.tech</p>
              </div>
            </div>

            <div className="flex items-start gap-4 mt-8 pt-8 border-t border-slate-700">
              <div className="bg-white/10 p-3 rounded-full"><Clock className="w-6 h-6 text-primary-400" /></div>
              <div>
                <h4 className="font-semibold text-lg text-white">Working Hours</h4>
                <p className="text-slate-400 text-sm mt-1">Mon - Sat: 9:00 AM - 8:00 PM</p>
                <p className="text-slate-400 text-sm mt-1">Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Your Name</label>
                  <input required type="text" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input required type="email" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea required rows="5" value={formData.message} onChange={e=>setFormData({...formData, message: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="px-8 py-4 bg-primary-600 text-white font-bold rounded-xl shadow-md hover:bg-primary-700 hover:-translate-y-1 transition-all">Send Message</button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="mt-16 h-96 bg-slate-200 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center">
            {/* Using an iframe to embed Google Map representing generic coordinates */}
            <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.833890333246!2d72.822818!3d18.966465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDU3JzU5LjMiTiA3MsKwNDknMjIuMSJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen="" 
               loading="lazy">
            </iframe>
        </div>
      </div>
    </div>
  );
};
export default Contact;

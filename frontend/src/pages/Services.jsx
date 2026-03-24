import { Wrench, MonitorSmartphone, Printer, Video, PhoneCall } from 'lucide-react';
import { useState } from 'react';

const Services = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', issue: '', address: '' });
  const [submitted, setSubmitted] = useState(false);

  const services = [
    { title: 'Computer Repair', icon: <MonitorSmartphone className="w-8 h-8"/>, desc: 'Hardware diagnostics, OS installation, and performance upgrades.' },
    { title: 'Laptop Maintenance', icon: <Wrench className="w-8 h-8"/>, desc: 'Screen replacement, keyboard repair, battery issues, and full servicing.' },
    { title: 'Printer Repair', icon: <Printer className="w-8 h-8"/>, desc: 'Inkjet and LaserJet repair, toner refilling, and paper jam solutions.' },
    { title: 'CCTV Setup & Maintenance', icon: <Video className="w-8 h-8"/>, desc: 'Professional installation of HD/IP cameras with remote mobile viewing setup.' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // API logic here
    console.log('Service requested:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', phone: '', issue: '', address: '' });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Expert IT <span className="text-primary-400">Services</span></h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">Fast, reliable, and professional repair services for all your tech gadgets.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Services List */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">What We Repair</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((svc, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary-200 hover:bg-white hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-4">
                  {svc.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{svc.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Request Form */}
        <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 lg:sticky lg:top-24 h-fit">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-primary-100 rounded-full text-primary-600">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Request a Callback</h3>
              <p className="text-sm text-slate-500">We'll get back to you within 2 hours.</p>
            </div>
          </div>
          
          {submitted ? (
            <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-200">
              Thank you! Your service request has been submitted successfully.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input required type="text" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <input required type="tel" value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="+91 XXXXXXXXXX" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Describe the Issue</label>
                <textarea required rows="3" value={formData.issue} onChange={e=>setFormData({...formData, issue: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="E.g., Laptop screen is broken..."></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Pickup Address</label>
                <input required type="text" value={formData.address} onChange={e=>setFormData({...formData, address: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="House no, Street, City" />
              </div>
              <button type="submit" className="w-full py-4 bg-primary-600 text-white font-bold rounded-xl shadow-md hover:bg-primary-700 hover:-translate-y-0.5 transition-all">Submit Request</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
export default Services;

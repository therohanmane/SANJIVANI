import { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { useSiteContext } from '../context/SiteContext';
import { api } from '../utils/api';

const Contact = () => {
  const { settings, loading } = useSiteContext();

  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    email: '', 
    subject: 'General Inquiry',
    message: '' 
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  if (loading) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');
    try {
      await api.submitContact(formData);
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', subject: 'General Inquiry', message: '' });
      setTimeout(() => setSubmitted(false), 8000);
    } catch (err) {
      setFormError('Failed to send message. Please call our institute or message us on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const cleanPhone = settings.phone ? settings.phone.replace(/[^0-9]/g, '') : '919860342172';
  const cleanWhatsApp = settings.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, '') : cleanPhone;

  return (
    <div className="bg-[#F7F9FC] min-h-screen py-12 sm:py-16">
      <div className="section-container">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6EEFB] border border-[#E5D1F4] text-[#491F6B] text-xs font-semibold mb-3">
            <MapPin className="w-4 h-4" />
            <span>Kurkumbh, Tal. Daund, Dist. Pune 413802</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#163262] tracking-tight">
            Contact Sanjivani Computer
          </h1>
          <p className="text-[#667085] text-base sm:text-lg mt-3 leading-relaxed">
            Have questions about course admissions, device repairs, or online citizen applications? Reach out to us or visit our center.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Details Card (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#E4E7EC] shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#163262]">
                Institute Information
              </h2>
              <p className="text-xs text-[#667085] mt-1">
                Direct contact details for Sanjivani Computer.
              </p>
            </div>

            <div className="space-y-4 text-sm text-[#344054]">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#F6EEFB] text-[#491F6B] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#667085]">Address</h3>
                  <p className="font-semibold text-[#163262] mt-0.5 leading-snug">
                    {settings.address}
                  </p>
                  <a
                    href={settings.mapUrl || "https://maps.app.goo.gl/vk5Zh8VVvzaPxjfe9"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#491F6B] hover:underline inline-flex items-center gap-1 mt-1"
                  >
                    Open in Google Maps <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#F6EEFB] text-[#491F6B] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#667085]">Phone Call</h3>
                  <a href={`tel:${settings.phone}`} className="font-bold text-[#163262] hover:text-[#491F6B] block mt-0.5">
                    {settings.phone}
                  </a>
                  <p className="text-[11px] text-[#667085]">Direct line for admissions & support</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#667085]">WhatsApp Chat</h3>
                  <a
                    href={`https://wa.me/${cleanWhatsApp}?text=Hello%20Sanjivani%20Computer,%20I%20have%20an%20inquiry.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#16A34A] hover:underline block mt-0.5"
                  >
                    {settings.whatsapp || settings.phone}
                  </a>
                  <p className="text-[11px] text-[#667085]">Instant messaging & photo sharing</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#F6EEFB] text-[#491F6B] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#667085]">Email Address</h3>
                  <a href={`mailto:${settings.email}`} className="font-medium text-[#163262] hover:underline block mt-0.5 truncate">
                    {settings.email}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3.5 pt-3 border-t border-[#E4E7EC]">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#667085]">Working Hours</h3>
                  <p className="font-semibold text-[#163262] mt-0.5">
                    {settings.workingHours || "Monday – Saturday: 9:00 AM – 8:00 PM"}
                  </p>
                  <p className="text-xs text-[#667085]">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={`tel:${settings.phone}`}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#9C225B] hover:bg-[#83184B] text-white text-xs font-bold rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <a
                href={`https://wa.me/${cleanWhatsApp}?text=Hello%20Sanjivani%20Computer`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E4E7EC] shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#163262]">
                Send Us a Message
              </h2>
              <p className="text-xs text-[#667085] mt-1">
                Fill in the form below and we will get back to you promptly.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-[#16A34A] mx-auto" />
                <h3 className="text-base font-bold text-[#163262]">
                  Thank you! Your message has been sent.
                </h3>
                <p className="text-xs text-emerald-700">
                  We have received your inquiry and will reach out to your phone or email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {formError && (
                  <div className="p-3 text-xs text-red-700 bg-red-50 rounded-lg border border-red-200">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Nilesh Jagtap"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98XXXXXXXX"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                      Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="yourname@gmail.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054]"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Course Admission (MS-CIT, Tally, Typing)">Course Admission</option>
                      <option value="Online Citizen Service / Form Filling">Online Citizen Service</option>
                      <option value="Computer / Laptop Repair Service">Computer / Laptop Repair</option>
                      <option value="Printer Repair / Toner Refilling">Printer Repair / Refilling</option>
                      <option value="CCTV Installation / Support">CCTV Installation / Support</option>
                      <option value="Business IT Support / AMC">Business IT Support / AMC</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help you? Feel free to mention details regarding the service, error message, or course batch you are asking about."
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-[#9C225B] hover:bg-[#83184B] text-white font-bold rounded-xl shadow-xs transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Embedded Map */}
        <div className="mt-14 rounded-2xl overflow-hidden border border-[#E4E7EC] shadow-xs bg-slate-100 h-96">
          <iframe 
            title="Sanjivani Computer Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3788.1693796587635!2d74.5369!3d18.4239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc37466dc0eef87%3A0x6332194b595ca2c8!2sKurkumbh%2C%20Maharashtra%20413802!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default Contact;

import { useState, useEffect } from 'react';
import { 
  Wrench, 
  Laptop, 
  Printer, 
  Video, 
  ShieldCheck, 
  Network, 
  Phone, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Clock, 
  MapPin,
  HelpCircle
} from 'lucide-react';
import { api } from '../utils/api';
import { useSiteContext } from '../context/SiteContext';

const fallbackServices = [
  {
    id: "desktop-repair",
    title: "Desktop PC Repair & Diagnostics",
    category: "Computer & Laptop Repair",
    description: "Comprehensive troubleshooting for desktop computers. Hardware diagnosis, motherboard repair, power supply replacement, RAM/SSD upgrades, and system speed optimization.",
    features: [
      "No display or system reboot loop fixes",
      "Power supply unit (SMPS) testing & replacement",
      "Hard drive to high-speed SSD data migration",
      "Thermal cleaning & motherboard component inspection"
    ]
  },
  {
    id: "laptop-maintenance",
    title: "Laptop Repair & Servicing",
    category: "Computer & Laptop Repair",
    description: "Professional care for all laptop brands. We fix broken screens, failing keyboards, charging ports, battery drain issues, damaged hinges, and overheating motherboards.",
    features: [
      "LED/LCD screen replacement & cable repair",
      "Keyboard & trackpad servicing",
      "Battery replacement with genuine quality components",
      "Body hinge fabrication & internal heat dissipation cleaning"
    ]
  },
  {
    id: "printer-repair",
    title: "Printer Repair & Toner Refilling",
    category: "Hardware Support",
    description: "Reliable repair services for laser, inkjet, and all-in-one printers from HP, Canon, Epson, and Brother. Toner cartridge refilling, roller replacements, and paper jam resolutions.",
    features: [
      "Cartridge toner refilling & drum replacements",
      "Pickup roller repair & paper jam fixes",
      "Print head unclogging & ink line servicing",
      "Network printer configuration for office sharing"
    ]
  },
  {
    id: "cctv-setup",
    title: "CCTV Installation & Maintenance",
    category: "Security & Infrastructure",
    description: "End-to-end security camera solutions for homes, commercial shops, schools, and factories. High-definition (HD) and IP cameras, DVR/NVR configuration, and remote mobile viewing.",
    features: [
      "Indoor dome and outdoor bullet camera installation",
      "DVR/NVR storage configuration & hard drive health checks",
      "Secure mobile app setup for real-time remote monitoring",
      "Camera realignment, wire maintenance, and adapter replacement"
    ]
  },
  {
    id: "os-software-support",
    title: "OS Installation & Software Support",
    category: "Software & System",
    description: "Operating system installations, clean formatting, licensed antivirus setup, driver troubleshooting, and slow computer tune-ups for seamless everyday performance.",
    features: [
      "Windows 10 / 11 setup and essential driver configurations",
      "Antivirus installation & malware / adware removal",
      "Software installation (Office, Accounting, Graphic tools)",
      "System data backup & corruption recovery guidance"
    ]
  },
  {
    id: "networking-solutions",
    title: "Office Networking & Wi-Fi Setup",
    category: "Infrastructure",
    description: "Structured cabling and wireless networking solutions for small offices, educational labs, and retail businesses to ensure fast and reliable connectivity.",
    features: [
      "LAN cabling (Cat6) & RJ45 crimping",
      "Wi-Fi router, range extender & switch installations",
      "File and printer sharing setup across multiple computers",
      "Broadband & internet troubleshooting"
    ]
  }
];

const ITServices = () => {
  const { settings } = useSiteContext();
  const [servicesList, setServicesList] = useState(fallbackServices);

  // Form State
  const [requestForm, setRequestForm] = useState({
    name: '',
    phone: '',
    serviceType: 'Desktop PC Repair',
    issue: '',
    address: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.getServices();
        if (Array.isArray(data) && data.length > 0) {
          setServicesList(data);
        }
      } catch (e) {
        console.warn('Using fallback services data');
      }
    };
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');
    try {
      await api.submitServiceRequest(requestForm);
      setSubmitted(true);
      setRequestForm({
        name: '',
        phone: '',
        serviceType: 'Desktop PC Repair',
        issue: '',
        address: ''
      });
      setTimeout(() => setSubmitted(false), 8000);
    } catch (err) {
      setFormError('Submission failed. Please call or WhatsApp our institute directly.');
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF2F7] border border-[#FAD3E6] text-[#9C225B] text-xs font-semibold mb-3">
            <Wrench className="w-4 h-4" />
            <span>Hardware & Technical Solutions • 19 Years Industry Practice</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#163262] tracking-tight">
            Reliable Computer & IT Support
          </h1>
          <p className="text-[#667085] text-base sm:text-lg mt-3 leading-relaxed">
            From everyday computer problems to business IT maintenance, Sanjivani Computer helps customers keep their technology working reliably.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Services List (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {servicesList.map((svc) => (
                <div
                  key={svc.id}
                  className="bg-white rounded-2xl border border-[#E4E7EC] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9C225B] block mb-2">
                      {svc.category}
                    </span>
                    <h2 className="text-base font-bold text-[#163262] mb-2 leading-snug">
                      {svc.title}
                    </h2>
                    <p className="text-xs text-[#667085] leading-relaxed mb-4">
                      {svc.description}
                    </p>

                    {svc.features && (
                      <ul className="text-xs text-[#344054] space-y-1.5 mb-4">
                        {svc.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#E4E7EC]">
                    <a
                      href={`https://wa.me/${cleanWhatsApp}?text=Hello%20Sanjivani%20Computer,%20I%20need%20assistance%20with%20${encodeURIComponent(svc.title)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#9C225B] hover:underline inline-flex items-center gap-1"
                    >
                      Inquire on WhatsApp <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Practical Experience Callout */}
            <div className="p-5 rounded-2xl bg-white border border-[#E4E7EC] shadow-xs flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#163262]">
                  Need Urgent Hardware Troubleshooting?
                </h4>
                <p className="text-xs text-[#667085] mt-0.5">
                  Call our technical desk directly or bring your device to our Kurkumbh service center.
                </p>
              </div>
              <a
                href={`tel:${settings.phone}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#14213D] text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors shrink-0"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                Call {settings.phone}
              </a>
            </div>
          </div>

          {/* Interactive Request Form (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#E4E7EC] shadow-sm lg:sticky lg:top-28">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9C225B]">
                Service Request
              </span>
              <h3 className="text-xl font-bold text-[#163262] mt-0.5">
                Book a Service or Callback
              </h3>
              <p className="text-xs text-[#667085] mt-1">
                Provide device details and our hardware specialist will contact you with diagnostic advice.
              </p>
            </div>

            {submitted ? (
              <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
                <p className="font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Service Request Received!
                </p>
                <p className="text-xs text-emerald-700 mt-1">
                  We have logged your request. Our technician will contact you via your phone number.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {formError && (
                  <div className="p-3 text-xs text-red-700 bg-red-50 rounded-lg border border-red-200">
                    {formError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={requestForm.name}
                    onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })}
                    placeholder="e.g. Rahul Shinde"
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
                    value={requestForm.phone}
                    onChange={(e) => setRequestForm({ ...requestForm, phone: e.target.value })}
                    placeholder="+91 98XXXXXXXX"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                    Device / Service Needed *
                  </label>
                  <select
                    value={requestForm.serviceType}
                    onChange={(e) => setRequestForm({ ...requestForm, serviceType: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054]"
                  >
                    <option value="Desktop PC Repair">Desktop PC Repair</option>
                    <option value="Laptop Maintenance / Screen / Battery">Laptop Maintenance / Screen / Battery</option>
                    <option value="Printer Repair / Toner Refill">Printer Repair / Toner Refill</option>
                    <option value="CCTV Security Setup / Maintenance">CCTV Security Setup / Maintenance</option>
                    <option value="OS / Software / Antivirus Troubleshooting">OS / Software / Antivirus Troubleshooting</option>
                    <option value="Office Networking / Wi-Fi Support">Office Networking / Wi-Fi Support</option>
                    <option value="Other Technical Service">Other Technical Service</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                    Describe the Problem *
                  </label>
                  <textarea
                    rows="3"
                    required
                    value={requestForm.issue}
                    onChange={(e) => setRequestForm({ ...requestForm, issue: e.target.value })}
                    placeholder="e.g. Laptop display is blinking / Printer paper jam / Need CCTV camera checked."
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054]"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                    Location / Village <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={requestForm.address}
                    onChange={(e) => setRequestForm({ ...requestForm, address: e.target.value })}
                    placeholder="e.g. Kurkumbh / Daund / MIDC"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-[#9C225B] hover:bg-[#83184B] text-white font-bold rounded-xl shadow-xs transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Submitting Request...' : 'Submit Service Request'}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default ITServices;

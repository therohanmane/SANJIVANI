import { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Wrench, 
  Printer, 
  Video, 
  Laptop, 
  Phone, 
  MessageCircle, 
  Send,
  Clock,
  Briefcase
} from 'lucide-react';
import { api } from '../utils/api';
import { useSiteContext } from '../context/SiteContext';

const BusinessAMC = () => {
  const { settings } = useSiteContext();

  const [form, setForm] = useState({
    name: '',
    organization: '',
    phone: '',
    email: '',
    serviceRequired: 'Comprehensive AMC (Computers + Printers + CCTV + Network)',
    hardwareScope: '10 - 25 Systems',
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');
    try {
      await api.submitServiceRequest({
        type: 'Business AMC Request',
        ...form
      });
      setSubmitted(true);
      setForm({
        name: '',
        organization: '',
        phone: '',
        email: '',
        serviceRequired: 'Comprehensive AMC (Computers + Printers + CCTV + Network)',
        hardwareScope: '10 - 25 Systems',
        description: ''
      });
      setTimeout(() => setSubmitted(false), 9000);
    } catch (err) {
      setFormError('Submission failed. Please call or WhatsApp our technical desk directly.');
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0F4FA] border border-[#D4DEED] text-[#163262] text-xs font-semibold mb-3">
            <Building2 className="w-4 h-4" />
            <span>Enterprise & Institutional IT Maintenance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#163262] tracking-tight">
            IT Maintenance & AMC for Organizations
          </h1>
          <p className="text-[#667085] text-base sm:text-lg mt-3 leading-relaxed">
            Looking for dependable IT maintenance for your office, institution, or business? Sanjivani Computer provides IT support services and AMC solutions tailored to the requirements of organizations.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          <div className="bg-white p-6 rounded-2xl border border-[#E4E7EC] shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#F6EEFB] text-[#491F6B] flex items-center justify-center mb-4">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#163262] mb-2">
              Workstation Maintenance
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Scheduled health inspections for desktop computers and laptops, preventive internal dust cleaning, thermal care, and fast hardware replacement.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E4E7EC] shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#F6EEFB] text-[#491F6B] flex items-center justify-center mb-4">
              <Printer className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#163262] mb-2">
              Printer Fleet Support
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Proactive maintenance of laser and all-in-one printers, scheduled toner refilling, roller replacements, and shared office printing continuity.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E4E7EC] shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#F6EEFB] text-[#491F6B] flex items-center justify-center mb-4">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#163262] mb-2">
              CCTV Surveillance AMC
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Regular inspection of security camera connections, DVR/NVR hard drive recording health, lens cleaning, and remote monitoring verification.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E4E7EC] shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#F6EEFB] text-[#491F6B] flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#163262] mb-2">
              50+ Companies Managed
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Our founder Mr. Sampat Sahebrao Bankar and our team bring practical industry understanding developed over 19 years across regional industries and offices.
            </p>
          </div>

        </div>

        {/* AMC Scope & Real Quote Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* AMC Benefits and Details (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E4E7EC] shadow-xs space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#491F6B]">
                  Service Inclusions
                </span>
                <h3 className="text-xl font-bold text-[#163262] mt-0.5">
                  What Does Our Organization AMC Include?
                </h3>
                <p className="text-xs text-[#667085] mt-1">
                  Flexible contract terms adapted for schools, colleges, manufacturing offices, hospitals, and local retail operations.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#163262]">Preventive Scheduled Visits</h4>
                    <p className="text-xs text-[#667085] leading-relaxed">
                      Routine periodic visits to inspect equipment condition before breakdowns happen.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#163262]">On-Call Emergency Troubleshooting</h4>
                    <p className="text-xs text-[#667085] leading-relaxed">
                      Priority technician response for sudden network failures, boot issues, or printer breakdowns.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#163262]">Software & Security Maintenance</h4>
                    <p className="text-xs text-[#667085] leading-relaxed">
                      Antivirus license renewals, operating system patches, network security, and essential backup checks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#163262]">Hardware Upgrades at Preferential Rates</h4>
                    <p className="text-xs text-[#667085] leading-relaxed">
                      Cost-effective RAM, SSD, and printer toner supplies with genuine quality components.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E4E7EC] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-[#667085]">Direct Consultation with Founder:</p>
                  <p className="text-sm font-bold text-[#163262]">{settings.founderName}</p>
                </div>
                <a
                  href={`tel:${settings.phone}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#14213D] text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  Call {settings.phone}
                </a>
              </div>
            </div>
          </div>

          {/* AMC Quote Request Form (6 cols) */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#E4E7EC] shadow-sm">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#491F6B]">
                Get an AMC Proposal
              </span>
              <h3 className="text-xl font-bold text-[#163262] mt-0.5">
                Request an Organization Proposal
              </h3>
              <p className="text-xs text-[#667085] mt-1">
                Tell us about your organization's IT setup and we will propose an appropriate maintenance contract.
              </p>
            </div>

            {submitted ? (
              <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
                <p className="font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  AMC Inquiry Submitted!
                </p>
                <p className="text-xs text-emerald-700 mt-1">
                  We have received your requirements. Mr. Sampat Bankar or our technical team will contact your office to coordinate a preliminary site visit.
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
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Anand Kulkarni"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                      Organization / Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.organization}
                      onChange={(e) => setForm({ ...form, organization: e.target.value })}
                      placeholder="e.g. Apex Industries, Kurkumbh"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                      Contact Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98XXXXXXXX"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                      Official Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="admin@company.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                      Service Scope
                    </label>
                    <select
                      value={form.serviceRequired}
                      onChange={(e) => setForm({ ...form, serviceRequired: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054]"
                    >
                      <option value="Comprehensive AMC (Computers + Printers + CCTV + Network)">Comprehensive (All IT Equipment)</option>
                      <option value="Desktop & Laptop Maintenance Only">Desktop & Laptop Only</option>
                      <option value="Printer Fleet Maintenance Contract">Printer Fleet Contract</option>
                      <option value="CCTV Surveillance Security Maintenance">CCTV Surveillance AMC</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                      Approximate Equipment Count
                    </label>
                    <select
                      value={form.hardwareScope}
                      onChange={(e) => setForm({ ...form, hardwareScope: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054]"
                    >
                      <option value="1 - 5 Systems (Small Office)">1 - 5 Systems (Small Office)</option>
                      <option value="6 - 15 Systems (Growing Office)">6 - 15 Systems (Growing Office)</option>
                      <option value="16 - 35 Systems (Commercial / Institute)">16 - 35 Systems (Commercial / Institute)</option>
                      <option value="36+ Systems (Large Organization)">36+ Systems (Large Organization)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                    Brief Notes on Setup or Current Issues *
                  </label>
                  <textarea
                    rows="3"
                    required
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="e.g. Office located in Kurkumbh MIDC. 15 PCs, 2 Network Printers, 8 CCTV Cameras needing monthly maintenance."
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-[#9C225B] hover:bg-[#83184B] text-white font-bold rounded-xl shadow-xs transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Submitting Details...' : 'Submit AMC Proposal Request'}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default BusinessAMC;

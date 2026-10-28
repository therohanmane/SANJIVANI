import { useState, useEffect } from 'react';
import { 
  FileCheck2, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  Phone, 
  FileText, 
  ExternalLink,
  HelpCircle,
  Clock,
  Printer
} from 'lucide-react';
import { api } from '../utils/api';
import { useSiteContext } from '../context/SiteContext';

const fallbackOnlineServices = [
  {
    id: "aadhaar-pan",
    category: "Identity Documents",
    title: "PAN Card & Aadhaar Assistance",
    description: "Guidance and submission assistance for new PAN card applications (Form 49A), PAN corrections, and Aadhaar document update verification.",
    documents: [
      "Passport size recent photographs",
      "Valid proof of identity (School LC, Voter ID, Aadhaar)",
      "Proof of address (Electricity bill, Ration card)",
      "Active mobile number linked with Aadhaar for OTP"
    ],
    process: "Document review at counter -> Portal application submission -> Official acknowledgment receipt generated -> Track dispatch"
  },
  {
    id: "voter-passport",
    category: "Identity Documents",
    title: "Voter ID Registration & Passport Guidance",
    description: "New voter card registration (Form 6), constituency transfer, digital voter card download, and Passport Seva online appointment booking assistance.",
    documents: [
      "Age proof (Birth Certificate or 10th Marksheet)",
      "Address proof & family voter details",
      "For Passport: Original educational marksheets, Aadhaar, and PAN"
    ],
    process: "Online form entry -> Document upload -> Appointment scheduling (for Passport) or submission tracking"
  },
  {
    id: "aaple-sarkar-certificates",
    category: "Certificates & Revenue",
    title: "Income, Domicile & Caste Certificate Facilitation",
    description: "Citizen facilitation for state revenue certificates through the official Aaple Sarkar portal. We assist with documentation and affidavit preparation.",
    documents: [
      "Applicant Aadhaar Card & Ration Card copy",
      "Income certificate (Talathi / Tahsildar report or Form 16)",
      "School Leaving Certificate (LC) showing place of birth for Domicile",
      "Father's / Relative's School LC & Caste proof for Caste Certificate"
    ],
    process: "Document compilation -> Portal upload -> Fee receipt -> Tracking status -> Digital certificate printout on approval"
  },
  {
    id: "land-records",
    category: "Certificates & Revenue",
    title: "7/12 & 8A Land Record Digital Downloads",
    description: "Instant access and high-resolution printing of digitally signed 7/12 (Satbara), 8A Utara, and Ferfar land records from Mahabhulekh / Mahabhumi portals.",
    documents: [
      "Village name, Taluka, and District (e.g. Kurkumbh / Daund / Pune)",
      "Survey / Gut number or Khata number"
    ],
    process: "Gut number verification -> Record retrieval on portal -> Digitally signed printout with QR verification"
  },
  {
    id: "scholarship-forms",
    category: "Student Assistance",
    title: "MahaDBT Scholarship & Fee Reimbursement",
    description: "Comprehensive guidance for college and school students applying for Social Justice, Tribal, Minority, and EBC scholarships on Maharashtra MahaDBT.",
    documents: [
      "Current college admission allotment letter & fee receipt",
      "Previous academic year marksheet",
      "Income certificate valid for current financial year",
      "Caste / Domicile certificate (if applicable)",
      "Aadhaar-seeded bank passbook copy"
    ],
    process: "Profile registration -> Course selection -> Document uploading -> Institute nodal verification tracking"
  },
  {
    id: "exam-forms",
    category: "Student Assistance",
    title: "Recruitment & Competitive Exam Form Filling",
    description: "Accurate online form submission for government recruitments (MPSC, UPSC, Police Bharti, Talathi, ZP, Army, Banking, SSC, Railway) and university exam forms.",
    documents: [
      "Educational qualification certificates & marksheets",
      "Passport photo and signature resized to notification guidelines",
      "Caste / Non-Creamy Layer / EWS certificate (if applying under quota)",
      "Active email ID and mobile number"
    ],
    process: "Notification check -> Error-free data entry -> Photo/signature resizing -> Online fee payment -> Print confirmation"
  },
  {
    id: "business-msme",
    category: "Business & Schemes",
    title: "Udyam (MSME) & Basic Food License (FSSAI)",
    description: "Guidance for micro and small businesses, retail shops, and traders in Kurkumbh and Daund taluka for MSME Udyam registration and basic FSSAI licenses.",
    documents: [
      "Proprietor / Partner Aadhaar and PAN card",
      "Business shop name, address, and bank account details",
      "Nature of business / manufacturing / service activity"
    ],
    process: "Registration on official portal -> Mobile OTP authentication -> Free digital certificate download"
  },
  {
    id: "pm-kisan-schemes",
    category: "Business & Schemes",
    title: "PM Kisan eKYC & Farmer Scheme Services",
    description: "Assistance for local farmers with biometric/OTP-based eKYC for PM Kisan Samman Nidhi, crop insurance (Pik Vima) registration, and status verification.",
    documents: [
      "Farmer Aadhaar Card",
      "7/12 Land record and bank passbook",
      "Aadhaar-linked mobile number"
    ],
    process: "Biometric or OTP authentication -> Instant verification on portal -> Print status acknowledgment"
  },
  {
    id: "printing-documentation",
    category: "Printing & Utilities",
    title: "Xerox, Scanning, Lamination & Utility Payments",
    description: "High-speed laser printing (B&W and Color), document scanning to PDF, smart PVC card printing, and electricity / utility bill payment processing.",
    documents: [
      "Softcopy via WhatsApp / Email / USB drive",
      "Original physical documents for Xerox or scanning"
    ],
    process: "Counter service with clean output and clear computerized payment receipts"
  }
];

const OnlineServices = () => {
  const { settings } = useSiteContext();
  const [servicesList, setServicesList] = useState(fallbackOnlineServices);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.getOnlineServices();
        if (Array.isArray(data) && data.length > 0) {
          setServicesList(data);
        }
      } catch (e) {
        console.warn('Using fallback online services');
      }
    };
    fetchServices();
  }, []);

  const categories = ['All', 'Identity Documents', 'Certificates & Revenue', 'Student Assistance', 'Business & Schemes', 'Printing & Utilities'];

  const filteredServices = servicesList.filter((s) => {
    const matchCat = activeCategory === 'All' || s.category === activeCategory;
    const matchQuery = !searchQuery.trim() || 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.documents && s.documents.some(d => d.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchCat && matchQuery;
  });

  const cleanPhone = settings.phone ? settings.phone.replace(/[^0-9]/g, '') : '919860342172';
  const cleanWhatsApp = settings.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, '') : cleanPhone;

  return (
    <div className="bg-[#F7F9FC] min-h-screen py-12 sm:py-16">
      <div className="section-container">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#16A34A] text-xs font-semibold mb-3">
            <FileCheck2 className="w-4 h-4" />
            <span>Digital Citizen Facilitation Desk • Kurkumbh</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#163262] tracking-tight">
            Online Services, Made Easier
          </h1>
          <p className="text-[#667085] text-base sm:text-lg mt-3 leading-relaxed">
            Get assistance with the online services currently offered by Sanjivani Computer, with clear guidance on required documents, process steps, and hassle-free submission.
          </p>
        </div>

        {/* Search and Category Filter */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by service name or document (e.g. PAN card, 7/12, scholarship, income certificate)..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-[#E4E7EC] rounded-2xl text-sm focus:border-[#491F6B] text-[#344054] shadow-xs"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#14213D] text-white shadow-xs'
                    : 'bg-white text-[#344054] border border-[#E4E7EC] hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-[#E4E7EC] p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#16A34A] block mb-2">
                  {service.category}
                </span>

                <h2 className="text-lg font-bold text-[#163262] mb-2 leading-snug">
                  {service.title}
                </h2>

                <p className="text-xs text-[#667085] leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Document List */}
                {service.documents && (
                  <div className="bg-[#F7F9FC] p-3.5 rounded-xl border border-[#E4E7EC] mb-4">
                    <p className="text-xs font-bold text-[#344054] mb-2 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#491F6B]" />
                      Required Documents:
                    </p>
                    <ul className="text-xs text-[#667085] space-y-1.5">
                      {service.documents.map((doc, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Process Steps */}
                {service.process && (
                  <div className="text-[11px] text-[#667085] bg-slate-50 p-2.5 rounded-lg border border-[#E4E7EC] mb-4">
                    <strong className="text-[#344054] block mb-0.5">Workflow:</strong>
                    <span>{service.process}</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#E4E7EC] flex items-center justify-between">
                <span className="text-xs text-[#667085]">Visit Center / WhatsApp</span>
                <a
                  href={`https://wa.me/${cleanWhatsApp}?text=Hello%20Sanjivani%20Computer,%20I%20need%20assistance%20with%20${encodeURIComponent(service.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-50 text-[#16A34A] hover:bg-emerald-100 text-xs font-bold transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Inquire Now
                </a>
              </div>

            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#E4E7EC] p-8 max-w-md mx-auto">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#163262]">No matching online service found</h3>
            <p className="text-xs text-[#667085] mt-1 mb-4">
              Looking for a service not listed here? We handle a wide variety of citizen forms.
            </p>
            <a
              href={`https://wa.me/${cleanWhatsApp}?text=Hello%20Sanjivani%20Computer,%20I%20have%20an%20inquiry%20regarding%20an%20online%20service.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#163262] text-white text-xs font-bold rounded-lg"
            >
              Ask on WhatsApp
            </a>
          </div>
        )}

        {/* Required Notice */}
        <div className="mt-12 p-5 rounded-2xl bg-white border border-[#E4E7EC] shadow-xs flex flex-col sm:flex-row items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#491F6B] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="text-xs text-[#344054] space-y-1">
            <h4 className="font-bold text-[#163262] text-sm">
              Citizen Digital Assistance Transparency Policy
            </h4>
            <p className="leading-relaxed text-[#667085]">
              Sanjivani Computer operates as an independent private computer center and cyber facilitation desk. We are not an official government department, ministry, or authorized government body. All applications are submitted through respective government citizen portals (Aaple Sarkar, MahaDBT, NSDL, Mahabhulekh, etc.) on behalf of citizens. All fees charged are for guidance, technical data entry, printing, and facilitation services. Official approvals and issuance remain the sole authority of the respective government departments.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OnlineServices;

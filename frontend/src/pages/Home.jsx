import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  FileCheck2, 
  Wrench, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Laptop, 
  Printer, 
  Video, 
  Send,
  HelpCircle,
  ExternalLink,
  Award,
  Mail
} from 'lucide-react';
import { useSiteContext } from '../context/SiteContext';
import { api } from '../utils/api';
import ImageGallery from '../components/ImageGallery';

const Home = () => {
  const { settings } = useSiteContext();

  // State for fetched courses & services for quick display
  const [courses, setCourses] = useState([]);
  const [onlineServices, setOnlineServices] = useState([]);
  const [services, setServices] = useState([]);

  // Business AMC Form State
  const [amcForm, setAmcForm] = useState({
    name: '',
    organization: '',
    phone: '',
    email: '',
    serviceRequired: 'Comprehensive IT AMC',
    description: ''
  });
  const [amcSubmitting, setAmcSubmitting] = useState(false);
  const [amcSuccess, setAmcSuccess] = useState(false);
  const [amcError, setAmcError] = useState('');

  // Quick Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState('');

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [cData, oData, sData] = await Promise.allSettled([
          api.getCourses(),
          api.getOnlineServices(),
          api.getServices()
        ]);
        if (cData.status === 'fulfilled' && Array.isArray(cData.value)) {
          setCourses(cData.value.slice(0, 4));
        }
        if (oData.status === 'fulfilled' && Array.isArray(oData.value)) {
          setOnlineServices(oData.value.slice(0, 4));
        }
        if (sData.status === 'fulfilled' && Array.isArray(sData.value)) {
          setServices(sData.value.slice(0, 4));
        }
      } catch (err) {
        console.error('Failed to load homepage preview data:', err);
      }
    };
    loadHomeData();
  }, []);

  const handleAmcSubmit = async (e) => {
    e.preventDefault();
    setAmcSubmitting(true);
    setAmcError('');
    try {
      await api.submitServiceRequest({
        type: 'Business AMC Inquiry',
        ...amcForm
      });
      setAmcSuccess(true);
      setAmcForm({
        name: '',
        organization: '',
        phone: '',
        email: '',
        serviceRequired: 'Comprehensive IT AMC',
        description: ''
      });
      setTimeout(() => setAmcSuccess(false), 8000);
    } catch (err) {
      setAmcError('Unable to submit inquiry at this moment. Please call or WhatsApp us directly.');
    } finally {
      setAmcSubmitting(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactSubmitting(true);
    setContactError('');
    try {
      await api.submitContact(contactForm);
      setContactSuccess(true);
      setContactForm({ name: '', phone: '', email: '', message: '' });
      setTimeout(() => setContactSuccess(false), 8000);
    } catch (err) {
      setContactError('Unable to send message. Please call our institute directly.');
    } finally {
      setContactSubmitting(false);
    }
  };

  const cleanPhone = settings.phone ? settings.phone.replace(/[^0-9]/g, '') : '919860342172';
  const cleanWhatsApp = settings.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, '') : cleanPhone;

  return (
    <div className="flex flex-col w-full">

      {/* ========================================================
          SECTION A: HERO
      ======================================================== */}
      <section className="relative bg-white border-b border-[#E4E7EC] py-14 sm:py-20 lg:py-24">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headlines & Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6EEFB] border border-[#E5D1F4] text-[#491F6B] text-xs sm:text-sm font-semibold">
                <Award className="w-4 h-4 text-[#491F6B]" />
                <span>{settings.trustLine || "19 Years of Experience in Computer Education and IT Services"}</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#163262] tracking-tight leading-[1.15]">
                Learn. Get Digital Services. <br className="hidden sm:inline" />
                <span className="text-[#9C225B]">Keep Your Technology Running.</span>
              </h1>

              {/* Supporting Description */}
              <p className="text-base sm:text-lg text-[#344054] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {settings.heroSubtitle || "Sanjivani Computer is an experienced computer education and IT services institute offering MKCL-related courses, online services, computer and laptop repairs, printer support, CCTV maintenance, and IT maintenance solutions for businesses and organizations."}
              </p>

              {/* Call to Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <Link
                  to="/courses"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#9C225B] hover:bg-[#83184B] text-white font-bold rounded-xl shadow-sm hover:shadow transition-all text-base"
                >
                  Explore Our Courses
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/it-services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-[#F6EEFB] text-[#163262] font-bold rounded-xl border border-[#E4E7EC] hover:border-[#E5D1F4] transition-all text-base"
                >
                  Explore Our Services
                </Link>

                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-[#667085] hover:text-[#163262] font-semibold text-base transition-colors"
                >
                  Contact Us
                </Link>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-6 border-t border-[#E4E7EC] grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <div className="text-2xl font-black text-[#163262]">19+</div>
                  <div className="text-xs text-[#667085] font-medium">Years in Service</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#163262]">50+</div>
                  <div className="text-xs text-[#667085] font-medium">Companies Supported</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#163262]">MKCL</div>
                  <div className="text-xs text-[#667085] font-medium">Education Partner</div>
                </div>
              </div>

            </div>

            {/* Right Column: Verified Office / Institute Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E4E7EC] bg-slate-100">
                  <img
                    src="/founder-bg.jpg"
                    alt="Sanjivani Computer Education & Service Center"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14213D]/80 via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white p-2">
                    <p className="text-xs font-semibold tracking-wider uppercase text-blue-200">
                      Sanjivani Computer • Kurkumbh Center
                    </p>
                    <p className="text-sm font-medium text-slate-100 mt-0.5">
                      Dedicated Computer Labs & Technical Support Desk
                    </p>
                  </div>
                </div>

                {/* Floating Experience Badge */}
                <div className="absolute -bottom-5 -left-4 sm:left-4 bg-white p-3.5 rounded-xl shadow-md border border-[#E4E7EC] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F6EEFB] text-[#491F6B] flex items-center justify-center font-black">
                    19
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#163262]">Institutional Legacy</p>
                    <p className="text-[11px] text-[#667085]">Education & IT Support</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================
          SECTION B: QUICK SERVICE CATEGORIES
      ======================================================== */}
      <section className="py-16 bg-[#F7F9FC]">
        <div className="section-container">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#163262] tracking-tight">
              Everything You Need in One Place
            </h2>
            <p className="text-[#667085] text-sm sm:text-base mt-2">
              Whether you are a student building digital skills, a resident needing document assistance, or a business requiring IT maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Computer Education */}
            <div className="bg-white p-6 rounded-2xl border border-[#E4E7EC] shadow-sm hover:border-[#155EEF] hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F6EEFB] text-[#491F6B] flex items-center justify-center mb-5">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#163262] mb-2">
                  Computer Education
                </h3>
                <p className="text-sm text-[#667085] leading-relaxed mb-4">
                  MKCL MS-CIT certification, Tally Prime accounting, GCC-TBC typing in English/Marathi/Hindi, and graphic design.
                </p>
              </div>
              <Link 
                to="/courses" 
                className="inline-flex items-center text-sm font-bold text-[#491F6B] hover:text-[#3B1758] pt-2 border-t border-[#E4E7EC]"
              >
                Explore Courses <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>

            {/* 2. Online Services */}
            <div className="bg-white p-6 rounded-2xl border border-[#E4E7EC] shadow-sm hover:border-[#155EEF] hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center mb-5">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#163262] mb-2">
                  Online Services
                </h3>
                <p className="text-sm text-[#667085] leading-relaxed mb-4">
                  Guidance for PAN, Aadhaar updates, revenue certificates (Aaple Sarkar), MahaDBT scholarships, and exam applications.
                </p>
              </div>
              <Link 
                to="/online-services" 
                className="inline-flex items-center text-sm font-bold text-[#16A34A] hover:text-emerald-700 pt-2 border-t border-[#E4E7EC]"
              >
                View Online Services <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>

            {/* 3. Computer & Laptop Repair */}
            <div className="bg-white p-6 rounded-2xl border border-[#E4E7EC] shadow-sm hover:border-[#155EEF] hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FDF2F7] text-[#9C225B] flex items-center justify-center mb-5">
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#163262] mb-2">
                  Computer & Laptop Repair
                </h3>
                <p className="text-sm text-[#667085] leading-relaxed mb-4">
                  Hardware diagnostics, screen repair, printer servicing, toner refilling, CCTV troubleshooting, and OS installations.
                </p>
              </div>
              <Link 
                to="/it-services" 
                className="inline-flex items-center text-sm font-bold text-[#9C225B] hover:text-[#83184B] pt-2 border-t border-[#E4E7EC]"
              >
                View Repair Services <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>

            {/* 4. Business IT Support */}
            <div className="bg-white p-6 rounded-2xl border border-[#E4E7EC] shadow-sm hover:border-[#155EEF] hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F0F4FA] text-[#163262] flex items-center justify-center mb-5">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#163262] mb-2">
                  Business IT Support
                </h3>
                <p className="text-sm text-[#667085] leading-relaxed mb-4">
                  Annual Maintenance Contracts (AMC), structured office networking, printer maintenance, and reliable uptime for organizations.
                </p>
              </div>
              <Link 
                to="/business-amc" 
                className="inline-flex items-center text-sm font-bold text-[#163262] hover:text-[#0E2142] pt-2 border-t border-[#E4E7EC]"
              >
                Learn About AMC <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================
          SECTION C: COURSES AND COMPUTER EDUCATION
      ======================================================== */}
      <section className="py-20 bg-white border-b border-[#E4E7EC]">
        <div className="section-container">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#491F6B]">
                Practical Skill Training
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#163262] tracking-tight mt-1">
                Build Your Digital Skills with Sanjivani Computer
              </h2>
              <p className="text-[#667085] text-base mt-2">
                Explore computer education and MKCL-related courses designed to help learners develop practical computer skills and digital confidence.
              </p>
            </div>
            <Link
              to="/courses"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-[#491F6B] hover:text-[#3B1758]"
            >
              View All Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(courses.length > 0 ? courses : [
              {
                id: 'mscit',
                title: 'MS-CIT Certification',
                fullName: 'Maharashtra State Certificate in Information Technology',
                duration: '2 to 3 Months',
                eligibility: 'Open to all learners',
                description: 'Official MKCL program covering Windows, MS Word, Excel, PowerPoint, internet and digital skills.'
              },
              {
                id: 'tally-prime',
                title: 'Tally Prime with GST',
                fullName: 'Computerized Business Accounting',
                duration: '2 Months',
                eligibility: 'Commerce & general students',
                description: 'Hands-on training for bookkeeping, GST computation, billing, invoicing, and inventory control.'
              },
              {
                id: 'typing-skills',
                title: 'GCC-TBC Typing Course',
                fullName: 'English, Marathi & Hindi (30/40/50 WPM)',
                duration: '2 to 3 Months',
                eligibility: 'Govt & private job aspirants',
                description: 'Touch-typing mastery with speed drills and accuracy preparation for recognized certifications.'
              },
              {
                id: 'graphic-design',
                title: 'Graphic Design & DTP',
                fullName: 'Photoshop & CorelDRAW Artwork',
                duration: '2 Months',
                eligibility: 'Creative aspirants & students',
                description: 'Practical training in photo retouching, banner design, visiting cards, and print publishing.'
              }
            ]).map((course) => (
              <div 
                key={course.id}
                className="bg-[#F7F9FC] border border-[#E4E7EC] rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#F6EEFB] text-[#491F6B]">
                      {course.duration}
                    </span>
                    <span className="text-xs text-[#667085]">
                      {course.eligibility?.split(' ')[0]} Eligibility
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#163262] leading-snug">
                    {course.title}
                  </h3>
                  {course.fullName && (
                    <p className="text-xs text-[#9C225B] font-medium mt-0.5 mb-2">
                      {course.fullName}
                    </p>
                  )}
                  <p className="text-xs text-[#667085] leading-relaxed line-clamp-3 mb-4">
                    {course.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E4E7EC] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#163262]">
                    {course.fees || 'Affordable Fee'}
                  </span>
                  <Link
                    to="/courses"
                    className="text-xs font-bold text-[#491F6B] hover:underline inline-flex items-center gap-1"
                  >
                    View Syllabus <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#491F6B] hover:bg-[#3B1758] text-white font-bold rounded-xl text-sm shadow-sm transition-colors"
            >
              View Full Course Catalog & Syllabi
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>


      {/* ========================================================
          SECTION D: ONLINE SERVICES
      ======================================================== */}
      <section className="py-20 bg-[#F7F9FC] border-b border-[#E4E7EC]">
        <div className="section-container">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A]">
              Digital Citizen Center
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#163262] tracking-tight mt-1">
              Online Services, Made Easier
            </h2>
            <p className="text-[#667085] text-base mt-2">
              Get assistance with the online services currently offered by Sanjivani Computer, with clear guidance on the required documents, process, and next steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(onlineServices.length > 0 ? onlineServices : [
              {
                id: 'aadhaar-pan',
                category: 'Identity Documents',
                title: 'PAN & Aadhaar Assistance',
                description: 'Guidance and submission assistance for new PAN cards, corrections, and document verification.',
                documents: ['Aadhaar Card', 'Passport Photos', 'Proof of Address']
              },
              {
                id: 'certificates',
                category: 'Revenue Records',
                title: 'Income & Domicile Guidance',
                description: 'Digital facilitation for citizen certificates through the official Aaple Sarkar portal.',
                documents: ['School LC', 'Ration Card', 'Income Proof']
              },
              {
                id: 'scholarships',
                category: 'Student Assistance',
                title: 'MahaDBT Scholarships',
                description: 'End-to-end guidance for college and school students applying for state scholarships.',
                documents: ['Marksheet', 'Fee Receipt', 'Bank Passbook']
              },
              {
                id: 'schemes',
                category: 'Farmer & Business',
                title: 'PM Kisan & MSME Udyam',
                description: 'Biometric and OTP eKYC verification for farmers, plus Udyam MSME certificates for traders.',
                documents: ['7/12 Land Record', 'Aadhaar', 'Bank Details']
              }
            ]).map((srv) => (
              <div 
                key={srv.id}
                className="bg-white border border-[#E4E7EC] rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#16A34A] block mb-2">
                    {srv.category}
                  </span>
                  <h3 className="text-base font-bold text-[#163262] mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-[#667085] leading-relaxed mb-4">
                    {srv.description}
                  </p>

                  {srv.documents && (
                    <div className="bg-[#F7F9FC] p-3 rounded-lg border border-[#E4E7EC] mb-4">
                      <p className="text-[11px] font-semibold text-[#344054] mb-1.5">
                        Typical Documents Needed:
                      </p>
                      <ul className="text-[11px] text-[#667085] space-y-1">
                        {srv.documents.slice(0, 3).map((doc, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-[#16A34A]"></span>
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <Link
                  to="/online-services"
                  className="text-xs font-bold text-[#163262] hover:text-[#491F6B] pt-3 border-t border-[#E4E7EC] inline-flex items-center justify-between"
                >
                  <span>Check Requirements</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

          {/* Clarity Disclaimer Note */}
          <div className="mt-8 p-4 rounded-xl bg-[#F6EEFB]/70 border border-[#E5D1F4] text-xs text-[#344054] flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#491F6B] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-[#163262]">Digital Facilitation Notice:</strong> Sanjivani Computer provides guidance, document review, and online application submission assistance to local citizens. Official certificates, cards, and approvals are issued directly by the competent government authorities.
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/online-services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#E4E7EC] hover:bg-slate-50 text-[#163262] font-bold rounded-xl text-sm transition-colors shadow-sm"
            >
              View All Online Services & Document Lists
              <ArrowRight className="w-4 h-4 text-[#491F6B]" />
            </Link>
          </div>

        </div>
      </section>


      {/* ========================================================
          SECTION E: COMPUTER AND IT REPAIR SERVICES
      ======================================================== */}
      <section className="py-20 bg-white border-b border-[#E4E7EC]">
        <div className="section-container">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9C225B]">
              Hardware & Systems
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#163262] tracking-tight mt-1">
              Reliable Computer & IT Support
            </h2>
            <p className="text-[#667085] text-base mt-2">
              From everyday computer problems to business IT maintenance, Sanjivani Computer helps customers keep their technology working reliably.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Desktop Repair */}
            <div className="bg-[#F7F9FC] border border-[#E4E7EC] rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#FDF2F7] text-[#9C225B] flex items-center justify-center mb-4">
                  <Laptop className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#163262] mb-1.5">
                  Desktop PC Repair
                </h3>
                <p className="text-xs text-[#667085] leading-relaxed mb-4">
                  Hardware diagnostics, SMPS power supplies, RAM/SSD upgrades, and motherboard component repairs.
                </p>
              </div>
              <a
                href={`https://wa.me/${cleanWhatsApp}?text=Hello,%20I%20need%20assistance%20with%20Desktop%20PC%20Repair.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#155EEF] hover:underline inline-flex items-center gap-1"
              >
                Inquire on WhatsApp <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Laptop Repair */}
            <div className="bg-[#F7F9FC] border border-[#E4E7EC] rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#FDF2F7] text-[#9C225B] flex items-center justify-center mb-4">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#163262] mb-1.5">
                  Laptop Maintenance
                </h3>
                <p className="text-xs text-[#667085] leading-relaxed mb-4">
                  Broken screen replacements, keyboard servicing, battery replacement, body hinge repairs, and thermal dust cleaning.
                </p>
              </div>
              <a
                href={`https://wa.me/${cleanWhatsApp}?text=Hello,%20I%20need%20assistance%20with%20Laptop%20Servicing.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#155EEF] hover:underline inline-flex items-center gap-1"
              >
                Inquire on WhatsApp <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Printer Repair */}
            <div className="bg-[#F7F9FC] border border-[#E4E7EC] rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#FDF2F7] text-[#9C225B] flex items-center justify-center mb-4">
                  <Printer className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#163262] mb-1.5">
                  Printer Repair & Toner Refilling
                </h3>
                <p className="text-xs text-[#667085] leading-relaxed mb-4">
                  Cartridge refilling, drum replacements, paper jam solutions, and network printer sharing for offices.
                </p>
              </div>
              <a
                href={`https://wa.me/${cleanWhatsApp}?text=Hello,%20I%20need%20Printer%20Repair%20or%20Toner%20Refilling.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#155EEF] hover:underline inline-flex items-center gap-1"
              >
                Inquire on WhatsApp <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* CCTV Security */}
            <div className="bg-[#F7F9FC] border border-[#E4E7EC] rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#FDF2F7] text-[#9C225B] flex items-center justify-center mb-4">
                  <Video className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#163262] mb-1.5">
                  CCTV Installation & Maintenance
                </h3>
                <p className="text-xs text-[#667085] leading-relaxed mb-4">
                  Installation of HD and IP surveillance cameras, DVR/NVR hard drive setup, and mobile live viewing.
                </p>
              </div>
              <a
                href={`https://wa.me/${cleanWhatsApp}?text=Hello,%20I%20need%20CCTV%20Setup%20or%20Maintenance.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#155EEF] hover:underline inline-flex items-center gap-1"
              >
                Inquire on WhatsApp <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* OS & Software */}
            <div className="bg-[#F7F9FC] border border-[#E4E7EC] rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#FDF2F7] text-[#9C225B] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#163262] mb-1.5">
                  OS & Software Support
                </h3>
                <p className="text-xs text-[#667085] leading-relaxed mb-4">
                  Windows operating system setup, official software drivers, antivirus configuration, and system speed optimization.
                </p>
              </div>
              <a
                href={`https://wa.me/${cleanWhatsApp}?text=Hello,%20I%20need%20OS%20or%20Software%20Support.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#155EEF] hover:underline inline-flex items-center gap-1"
              >
                Inquire on WhatsApp <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Dedicated Action Card */}
            <div className="bg-[#0E2142] text-white rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white mb-2">
                  Need an Immediate Diagnostic?
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Bring your computer, laptop, or printer to our center near Primary School, Kurkumbh, or speak with our hardware specialist directly.
                </p>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <a
                  href={`tel:${settings.phone}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#9C225B] hover:bg-[#83184B] text-white text-xs font-bold rounded-lg transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call {settings.phone}
                </a>
                <Link
                  to="/it-services"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  View All Repair Options
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================
          SECTION F: BUSINESS IT SUPPORT AND AMC
      ======================================================== */}
      <section className="py-20 bg-[#F7F9FC] border-b border-[#E4E7EC]" id="amc-section">
        <div className="section-container">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Business Differentiator Text */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#163262]">
                Organizational Solutions
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#163262] tracking-tight leading-tight">
                IT Maintenance & AMC for Organizations
              </h2>
              <p className="text-[#344054] text-base leading-relaxed">
                Looking for dependable IT maintenance for your office, institution, or business? Sanjivani Computer provides IT support services and AMC solutions tailored to the requirements of organizations.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm text-[#163262]">Desktop & Laptop Maintenance:</strong>
                    <p className="text-xs text-[#667085]">Scheduled preventive cleaning, hardware health checkups, and quick replacement support.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm text-[#163262]">Printer & Toner Fleet Support:</strong>
                    <p className="text-xs text-[#667085]">Routine maintenance and toner refilling to avoid office printing interruptions.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm text-[#163262]">CCTV Surveillance Uptime:</strong>
                    <p className="text-xs text-[#667085]">DVR/NVR storage monitoring, wiring maintenance, and continuous security recording.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm text-[#163262]">Practical Experience with 50+ Companies:</strong>
                    <p className="text-xs text-[#667085]">Mr. Sampat Sahebrao Bankar and our team have managed hardware operations across Kurkumbh MIDC and regional offices.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#E4E7EC] flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#667085]">Prefer a direct technical discussion?</p>
                  <p className="text-sm font-bold text-[#163262]">Call Founder Mr. Sampat Bankar</p>
                </div>
                <a
                  href={`tel:${settings.phone}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#163262] text-white text-xs font-bold rounded-lg hover:bg-[#0E2142] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Now
                </a>
              </div>
            </div>

            {/* Right Column: Real AMC Inquiry Form */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#E4E7EC] shadow-sm">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#163262]">
                  Discuss Your IT Requirements
                </h3>
                <p className="text-xs text-[#667085] mt-1">
                  Submit your details below and our team will get back to you with a tailored maintenance plan.
                </p>
              </div>

              {amcSuccess ? (
                <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
                  <p className="font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    Thank you! Your AMC inquiry has been received.
                  </p>
                  <p className="text-xs text-emerald-700 mt-1">
                    We will review your requirements and reach out to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAmcSubmit} className="space-y-4">
                  {amcError && (
                    <div className="p-3 text-xs text-red-700 bg-red-50 rounded-lg border border-red-200">
                      {amcError}
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
                        value={amcForm.name}
                        onChange={(e) => setAmcForm({ ...amcForm, name: e.target.value })}
                        placeholder="e.g. Ramesh Patil"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                        Organization Name <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={amcForm.organization}
                        onChange={(e) => setAmcForm({ ...amcForm, organization: e.target.value })}
                        placeholder="Company / School / Office"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={amcForm.phone}
                        onChange={(e) => setAmcForm({ ...amcForm, phone: e.target.value })}
                        placeholder="+91 98XXXXXXXX"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                        Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        value={amcForm.email}
                        onChange={(e) => setAmcForm({ ...amcForm, email: e.target.value })}
                        placeholder="office@example.com"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                      Service Required *
                    </label>
                    <select
                      value={amcForm.serviceRequired}
                      onChange={(e) => setAmcForm({ ...amcForm, serviceRequired: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054] transition-colors"
                    >
                      <option value="Comprehensive IT AMC">Comprehensive IT AMC (Computers + Printers + Network)</option>
                      <option value="Computer & Laptop Fleet Maintenance">Computer & Laptop Fleet Maintenance</option>
                      <option value="Printer Maintenance & Refill Contract">Printer Maintenance & Refill Contract</option>
                      <option value="CCTV Security Maintenance AMC">CCTV Security Maintenance AMC</option>
                      <option value="One-time IT Overhaul / Setup">One-time IT Overhaul / Setup</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                      Brief Description of Requirement *
                    </label>
                    <textarea
                      rows="3"
                      required
                      value={amcForm.description}
                      onChange={(e) => setAmcForm({ ...amcForm, description: e.target.value })}
                      placeholder="e.g. 15 Desktop PCs, 2 Network Printers, needing regular checkup and on-call support."
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054] transition-colors"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={amcSubmitting}
                    className="w-full py-3.5 bg-[#9C225B] hover:bg-[#83184B] text-white font-bold rounded-xl shadow-sm transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    <Send className="w-4 h-4" />
                    {amcSubmitting ? 'Submitting Details...' : 'Submit AMC Inquiry'}
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================
          SECTION G: WHY SANJIVANI COMPUTER?
      ======================================================== */}
      <section className="py-20 bg-white border-b border-[#E4E7EC]">
        <div className="section-container">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#491F6B]">
              Trusted Track Record
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#163262] tracking-tight mt-1">
              Experience You Can Rely On
            </h2>
            <p className="text-[#667085] text-sm sm:text-base mt-2">
              Our 19-year standing reflects practical industry contacts, dependable local service, and genuine dedication to our learners and clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-6 rounded-2xl bg-[#F7F9FC] border border-[#E4E7EC]">
              <div className="w-10 h-10 rounded-lg bg-[#F6EEFB] text-[#491F6B] flex items-center justify-center font-bold mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-[#163262] mb-2">
                19 Years of Institutional Experience
              </h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Established continuity in computer education, MKCL certifications, and regional IT hardware operations since our inception.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F9FC] border border-[#E4E7EC]">
              <div className="w-10 h-10 rounded-lg bg-[#F6EEFB] text-[#491F6B] flex items-center justify-center font-bold mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-[#163262] mb-2">
                Education & Support Under One Roof
              </h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Whether you need training on modern software, quick laptop servicing, or document facilitation, you do not have to run between multiple vendors.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F9FC] border border-[#E4E7EC]">
              <div className="w-10 h-10 rounded-lg bg-[#F6EEFB] text-[#491F6B] flex items-center justify-center font-bold mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-[#163262] mb-2">
                Proven Organization Support
              </h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Practical experience handling hardware operations and technical maintenance for over 50 companies, schools, and commercial establishments.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================
          INSTITUTE LIFE / LAB GALLERY
      ======================================================== */}
      <section className="py-16 bg-[#F7F9FC] border-b border-[#E4E7EC]">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#491F6B]">
              Institute Life
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#163262] tracking-tight mt-1">
              Classrooms, Labs & Community
            </h2>
            <p className="text-[#667085] text-xs sm:text-sm mt-1">
              A glimpse of hands-on learning, student practicals, and activities at Sanjivani Computer.
            </p>
          </div>

          <ImageGallery />
        </div>
      </section>


      {/* ========================================================
          SECTION H: HOW WE HELP
      ======================================================== */}
      <section className="py-16 bg-white border-b border-[#E4E7EC]">
        <div className="section-container">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#163262] tracking-tight">
              How We Help You
            </h2>
            <p className="text-[#667085] text-xs sm:text-sm mt-1">
              A simple, transparent 3-step process for every student, citizen, and business client.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            
            <div className="text-center p-6 bg-[#F7F9FC] border border-[#E4E7EC] rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-[#491F6B] text-white flex items-center justify-center font-bold text-sm mx-auto mb-3">
                1
              </div>
              <h3 className="text-base font-bold text-[#163262] mb-1.5">
                Tell Us What You Need
              </h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Visit our center, call us, or send a quick WhatsApp message describing your course interest, device problem, or service requirement.
              </p>
            </div>

            <div className="text-center p-6 bg-[#F7F9FC] border border-[#E4E7EC] rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-[#491F6B] text-white flex items-center justify-center font-bold text-sm mx-auto mb-3">
                2
              </div>
              <h3 className="text-base font-bold text-[#163262] mb-1.5">
                Get Clear Guidance
              </h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                We explain the exact syllabus, document requirements, or technical repair options with upfront honesty and no unnecessary jargon.
              </p>
            </div>

            <div className="text-center p-6 bg-[#F7F9FC] border border-[#E4E7EC] rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-[#491F6B] text-white flex items-center justify-center font-bold text-sm mx-auto mb-3">
                3
              </div>
              <h3 className="text-base font-bold text-[#163262] mb-1.5">
                Receive the Relevant Support
              </h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Begin your certified course, complete your online application smoothly, or collect your repaired device tested and ready.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================
          SECTION I: CONTACT AND LOCATION
      ======================================================== */}
      <section className="py-20 bg-[#F7F9FC]">
        <div className="section-container">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9C225B]">
              Get in Touch
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#163262] tracking-tight mt-1">
              Visit or Contact Sanjivani Computer
            </h2>
            <p className="text-[#667085] text-sm sm:text-base mt-2">
              We are conveniently located in Kurkumbh and welcome visits during our regular working hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Contact Details Card */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#E4E7EC] shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#163262] mb-1">
                  Institute Contact Information
                </h3>
                <p className="text-xs text-[#667085]">
                  Reach out directly for admissions, service inquiries, or technical support.
                </p>
              </div>

              <div className="space-y-4 text-sm text-[#344054]">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#F6EEFB] text-[#491F6B] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#667085]">Physical Address</h4>
                    <p className="font-medium text-[#163262] mt-0.5">{settings.address}</p>
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

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#F6EEFB] text-[#491F6B] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#667085]">Phone / Call</h4>
                    <a href={`tel:${settings.phone}`} className="font-bold text-[#163262] hover:text-[#491F6B] block mt-0.5">
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#16A34A] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#667085]">WhatsApp</h4>
                    <a 
                      href={`https://wa.me/${cleanWhatsApp}?text=Hello%20Sanjivani%20Computer,%20I%20have%20an%20inquiry.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#16A34A] hover:underline block mt-0.5"
                    >
                      {settings.whatsapp || settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#F6EEFB] text-[#491F6B] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#667085]">Email Address</h4>
                    <a href={`mailto:${settings.email}`} className="font-medium text-[#163262] hover:underline block mt-0.5">
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-3 border-t border-[#E4E7EC]">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#667085]">Working Hours</h4>
                    <p className="font-medium text-[#163262] mt-0.5">{settings.workingHours || "Mon – Sat: 9:00 AM – 8:00 PM"}</p>
                    <p className="text-xs text-[#667085]">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`tel:${settings.phone}`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#163262] hover:bg-[#0E2142] text-white text-xs font-bold rounded-xl transition-colors"
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
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* General Contact Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E4E7EC] shadow-sm">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-[#163262]">
                  Send an Inquiry
                </h3>
                <p className="text-xs text-[#667085] mt-1">
                  Have a question about courses, admission dates, or a device repair? Leave a message.
                </p>
              </div>

              {contactSuccess ? (
                <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
                  <p className="font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    Thank you! Your message has been sent successfully.
                  </p>
                  <p className="text-xs text-emerald-700 mt-1">
                    We will respond to your phone number or email soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  {contactError && (
                    <div className="p-3 text-xs text-red-700 bg-red-50 rounded-lg border border-red-200">
                      {contactError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="+91 98XXXXXXXX"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                      Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="yourname@gmail.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                      How Can We Help You? *
                    </label>
                    <textarea
                      rows="4"
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="e.g. Inquiring about next batch timings for MS-CIT / Need printer cartridge refill."
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054] transition-colors"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={contactSubmitting}
                    className="w-full py-3.5 bg-[#9C225B] hover:bg-[#83184B] text-white font-bold rounded-xl shadow-sm transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    <Send className="w-4 h-4" />
                    {contactSubmitting ? 'Sending Message...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Embedded Directions Map */}
          <div className="mt-12 rounded-2xl overflow-hidden border border-[#E4E7EC] shadow-sm bg-slate-100 h-80">
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
      </section>

    </div>
  );
};

export default Home;

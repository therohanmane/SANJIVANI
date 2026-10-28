import { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  MessageCircle, 
  Phone, 
  X, 
  Send,
  HelpCircle,
  FileText
} from 'lucide-react';
import { api } from '../utils/api';
import { useSiteContext } from '../context/SiteContext';

const fallbackCourses = [
  {
    id: "mscit",
    title: "MS-CIT Certification",
    fullName: "Maharashtra State Certificate in Information Technology",
    category: "Certifications",
    duration: "2 to 3 Months (144 Hours)",
    fees: "MKCL Standard Fee",
    eligibility: "Open to all students, job seekers, and professionals",
    description: "The flagship computer literacy course recognized across Maharashtra. Learn Windows operating system, Microsoft Word, Excel, PowerPoint, Outlook, internet research, and essential digital citizen skills.",
    syllabus: [
      "Computer Fundamentals & Hardware Awareness",
      "Windows 11 Navigation & File Management",
      "MS Word: Document Design, Tables & Official Letters",
      "MS Excel: Formulas, Functions, Data Sheets & Charts",
      "MS PowerPoint: Slide Decks, Animations & Transitions",
      "Internet, Email, Online Banking & Cyber Safety",
      "Digital Freelancing & Workplace Collaboration"
    ],
    highlights: [
      "Recognized by Maharashtra Government for public recruitment",
      "MKCL Authorized curriculum with hands-on computer lab sessions",
      "Personalized guidance by certified instructors"
    ]
  },
  {
    id: "tally-prime",
    title: "Tally Prime with GST",
    fullName: "Computerized Accounting, Inventory & Taxation",
    category: "Accounting",
    duration: "2 Months",
    fees: "Contact Institute",
    eligibility: "Commerce students, business owners, and accounts aspirants",
    description: "Comprehensive practical training in modern business accounting using Tally Prime. Learn ledger creation, GST calculations, purchase/sales invoicing, inventory control, and financial reporting.",
    syllabus: [
      "Principles of Double-Entry Bookkeeping",
      "Company Creation & Chart of Accounts Setup",
      "Voucher Entry: Payment, Receipt, Contra, Journal",
      "GST Configuration: CGST, SGST, IGST Calculation",
      "Inventory Management, Stock Items & Units of Measure",
      "Generating GST Returns (GSTR-1, GSTR-3B) & E-Way Bills",
      "Balance Sheet, Profit & Loss Account, and Bank Reconciliation"
    ],
    highlights: [
      "Hands-on practice on real business transactions",
      "Covers latest GST compliance and e-invoicing workflows",
      "Ideal for accounting jobs in local businesses and industries"
    ]
  },
  {
    id: "typing-skills",
    title: "GCC-TBC Typing Course",
    fullName: "English, Marathi & Hindi Keyboard Typing (30 / 40 / 50 WPM)",
    category: "Typing",
    duration: "2 to 3 Months",
    fees: "Contact Institute",
    eligibility: "Students, job applicants, and government examination aspirants",
    description: "Master touch typing on standard computer keyboards with speed and high accuracy in English, Marathi, and Hindi. Prepares students for Maharashtra Government typing certifications (GCC-TBC).",
    syllabus: [
      "Keyboard Fingering & Touch Typing Ergonomics",
      "Speed Drills & Accuracy Training (30, 40, 50 WPM)",
      "Official Letter Drafting & Tabulation Formatting",
      "Government Exam Mock Typing Tests",
      "Marathi (Inscript / Unicode) & Hindi Typing Practicals"
    ],
    highlights: [
      "State-of-the-art computer lab with dedicated typing software",
      "Comprehensive preparation for government typing exams",
      "Daily progress monitoring and speed feedback"
    ]
  },
  {
    id: "graphic-design",
    title: "Graphic Design & DTP",
    fullName: "Adobe Photoshop & CorelDRAW Masterclass",
    category: "Design",
    duration: "2 Months",
    fees: "Contact Institute",
    eligibility: "Creative students, print shop operators, and freelance aspirants",
    description: "Practical training in commercial design and Desktop Publishing (DTP). Learn photo editing, social media banner creation, logo designing, visiting cards, and print-ready prepress artwork.",
    syllabus: [
      "Photoshop: Layers, Masks, Selections & Retouching",
      "Color Correction, Lighting Adjustments & Background Removal",
      "CorelDRAW: Vector Shapes, Typography & Logo Drafting",
      "Pamphlets, Flex Banners, Visiting Cards & Letterheads",
      "Color Modes (RGB vs CMYK) & Printing Prepress Workflows"
    ],
    highlights: [
      "Portfolio creation with real design projects",
      "Practical focus on local business advertising and printing jobs",
      "Expert guidance on industry-standard design tools"
    ]
  },
  {
    id: "computer-basics",
    title: "Basic Computer & Digital Skills",
    fullName: "Foundation Course in Computing & Digital Tools",
    category: "Foundations",
    duration: "1 Month",
    fees: "Contact Institute",
    eligibility: "Beginners of all ages, senior citizens, and young students",
    description: "A beginner-friendly introduction to computers, the internet, and smartphone connectivity. Designed to remove computer hesitation and build everyday digital self-confidence.",
    syllabus: [
      "Hardware Components: CPU, Monitor, Keyboard, Mouse, Storage",
      "Using Windows OS: File Management & Folder Organization",
      "Creating Documents in MS Word & Basic Notes",
      "Safe Web Browsing, Google Search & Online Safety",
      "Smartphone-to-PC File Transfer, Cloud Storage Basics",
      "Making Digital Payments Safely via UPI & Net Banking"
    ],
    highlights: [
      "Patient, step-by-step teaching in Marathi and English",
      "Zero prerequisites; open to every learner",
      "Practical daily digital tasks"
    ]
  },
  {
    id: "web-development",
    title: "Web Development Fundamentals",
    fullName: "HTML, CSS, JavaScript & Modern Frontend Concepts",
    category: "Programming",
    duration: "3 to 4 Months",
    fees: "Contact Institute",
    eligibility: "College students and beginners interested in coding",
    description: "Learn the foundational languages of the World Wide Web. Build structured web pages using HTML5, style them with modern CSS, and add interactive logic using JavaScript.",
    syllabus: [
      "HTML5 Semantics, Forms, Audio, Video & Tables",
      "CSS3 Styling, Flexbox, Grid Layouts & Responsive Design",
      "JavaScript Fundamentals: Variables, Functions, Loops & DOM",
      "Interactive Web Components & Event Handling",
      "Version Control Basics with Git & GitHub",
      "Publishing a Live Website on the Internet"
    ],
    highlights: [
      "Hands-on coding exercises with real project outputs",
      "Direct guidance from IT professionals",
      "Strong foundation for modern software and engineering paths"
    ]
  }
];

const Courses = () => {
  const { settings } = useSiteContext();
  const [courses, setCourses] = useState(fallbackCourses);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeCourseModal, setActiveCourseModal] = useState(null);

  // Enrollment Modal state
  const [enrollModalCourse, setEnrollModalCourse] = useState(null);
  const [enrollForm, setEnrollForm] = useState({
    name: '',
    phone: '',
    email: '',
    preferredBatch: 'Morning (9:00 AM - 12:00 PM)',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [enrollSuccess, setEnrollSuccess] = useState(false);
  const [enrollError, setEnrollError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await api.getCourses();
        if (Array.isArray(data) && data.length > 0) {
          setCourses(data);
        }
      } catch (e) {
        console.warn('Using fallback courses list');
      }
    };
    fetchCourses();
  }, []);

  const categories = ['All', 'Certifications', 'Accounting', 'Typing', 'Design', 'Programming'];

  const filteredCourses = selectedCategory === 'All'
    ? courses
    : courses.filter(c => c.category === selectedCategory || (c.category && c.category.toLowerCase().includes(selectedCategory.toLowerCase())));

  const cleanPhone = settings.phone ? settings.phone.replace(/[^0-9]/g, '') : '919860342172';
  const cleanWhatsApp = settings.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, '') : cleanPhone;

  const handleEnrollSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setEnrollError('');
    try {
      await api.submitEnrollment({
        courseId: enrollModalCourse?.id,
        courseTitle: enrollModalCourse?.title,
        ...enrollForm
      });
      setEnrollSuccess(true);
      setEnrollForm({
        name: '',
        phone: '',
        email: '',
        preferredBatch: 'Morning (9:00 AM - 12:00 PM)',
        notes: ''
      });
      setTimeout(() => {
        setEnrollSuccess(false);
        setEnrollModalCourse(null);
      }, 4000);
    } catch (err) {
      setEnrollError('Submission failed. Please call or WhatsApp our institute directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F7F9FC] min-h-screen py-12 sm:py-16">
      <div className="section-container">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6EEFB] border border-[#E5D1F4] text-[#491F6B] text-xs font-semibold mb-3">
            <GraduationCap className="w-4 h-4" />
            <span>Practical Computer Education • 19 Years Experience</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#163262] tracking-tight">
            Computer Training Programs
          </h1>
          <p className="text-[#667085] text-base sm:text-lg mt-3 leading-relaxed">
            From official MKCL certifications to hands-on accounting and typing speed mastery, our courses are structured to build practical workplace skills and digital confidence.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#491F6B] text-white shadow-sm'
                  : 'bg-white text-[#344054] border border-[#E4E7EC] hover:bg-slate-50'
              }`}
            >
              {cat === 'All' ? 'All Courses' : cat}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-[#E4E7EC] shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="p-6 sm:p-7">
                
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#F6EEFB] text-[#491F6B]">
                    {course.category || 'Computer Education'}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-[#667085]">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Course Name */}
                <h2 className="text-xl font-bold text-[#163262] mb-1">
                  {course.title}
                </h2>
                {course.fullName && (
                  <p className="text-xs font-medium text-[#155EEF] mb-3">
                    {course.fullName}
                  </p>
                )}

                {/* Description */}
                <p className="text-sm text-[#667085] leading-relaxed mb-5">
                  {course.description}
                </p>

                {/* Eligibility & Highlights */}
                <div className="bg-[#F7F9FC] p-3.5 rounded-xl border border-[#E4E7EC] space-y-2 mb-5">
                  <div className="text-xs text-[#344054]">
                    <strong>Eligibility:</strong> {course.eligibility}
                  </div>
                  {course.highlights && course.highlights.length > 0 && (
                    <div className="pt-2 border-t border-[#E4E7EC]">
                      <p className="text-[11px] font-semibold text-[#667085] mb-1">Key Highlights:</p>
                      <ul className="text-xs text-[#344054] space-y-1">
                        {course.highlights.slice(0, 2).map((h, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Quick Syllabus Toggle Trigger */}
                {course.syllabus && course.syllabus.length > 0 && (
                  <button
                    onClick={() => setActiveCourseModal(course)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#491F6B] hover:underline"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    View Detailed Syllabus ({course.syllabus.length} Modules)
                  </button>
                )}

              </div>

              {/* Card Footer Actions */}
              <div className="p-6 bg-[#F7F9FC] border-t border-[#E4E7EC] flex items-center justify-between gap-3">
                <div className="text-xs">
                  <span className="text-[#667085] block">Course Fee</span>
                  <span className="font-bold text-[#163262] text-sm">
                    {course.fees || 'Inquire at Center'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${cleanWhatsApp}?text=Hello%20Sanjivani%20Computer,%20I%20am%20interested%20in%20enrolling%20in%20${encodeURIComponent(course.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-emerald-50 text-[#16A34A] hover:bg-emerald-100 transition-colors"
                    title="Inquire on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => setEnrollModalCourse(course)}
                    className="px-4 py-2.5 bg-[#9C225B] hover:bg-[#83184B] text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
                  >
                    Inquire / Enroll
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Guidance Box */}
        <div className="mt-16 bg-white p-6 sm:p-8 rounded-2xl border border-[#E4E7EC] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-[#163262]">
              Unsure Which Course is Right for Your Career?
            </h3>
            <p className="text-sm text-[#667085] mt-1 max-w-2xl">
              Visit our center near Primary School, Kurkumbh, or call Founder Mr. Sampat Sahebrao Bankar directly for personalized academic and vocational counseling.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${settings.phone}`}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#14213D] hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-colors"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              Call {settings.phone}
            </a>
          </div>
        </div>

      </div>

      {/* ========================================================
          SYLLABUS DETAILS MODAL
      ======================================================== */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-2xl border border-[#E4E7EC] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E4E7EC]">
              <div>
                <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider">
                  Course Syllabus
                </span>
                <h3 className="text-xl font-bold text-[#163262] mt-0.5">
                  {activeCourseModal.title}
                </h3>
                <p className="text-xs text-[#667085]">
                  Duration: {activeCourseModal.duration}
                </p>
              </div>
              <button
                onClick={() => setActiveCourseModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-3">
              <h4 className="text-xs font-bold text-[#163262] uppercase tracking-wider">
                Modules & Topics Covered:
              </h4>
              <ul className="space-y-2.5">
                {activeCourseModal.syllabus?.map((topic, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#344054]">
                    <span className="w-5 h-5 rounded-full bg-[#F6EEFB] text-[#491F6B] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#E4E7EC] flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setEnrollModalCourse(activeCourseModal);
                  setActiveCourseModal(null);
                }}
                className="w-full py-2.5 bg-[#155EEF] text-white text-sm font-bold rounded-xl hover:bg-[#004EEB] transition-colors"
              >
                Inquire for Admission
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          ENROLLMENT INQUIRY MODAL
      ======================================================== */}
      {enrollModalCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-2xl border border-[#E4E7EC] shadow-2xl p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E4E7EC]">
              <div>
                <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider">
                  Admission Inquiry
                </span>
                <h3 className="text-xl font-bold text-[#163262] mt-0.5">
                  {enrollModalCourse.title}
                </h3>
              </div>
              <button
                onClick={() => setEnrollModalCourse(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {enrollSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#16A34A] mx-auto" />
                <h4 className="text-lg font-bold text-[#163262]">
                  Inquiry Submitted Successfully!
                </h4>
                <p className="text-xs text-[#667085] max-w-xs mx-auto">
                  Our coordinator will reach out to discuss batch schedules and seat availability.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEnrollSubmit} className="py-4 space-y-4">
                {enrollError && (
                  <div className="p-3 text-xs text-red-700 bg-red-50 rounded-lg border border-red-200">
                    {enrollError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#344054] mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={enrollForm.name}
                    onChange={(e) => setEnrollForm({ ...enrollForm, name: e.target.value })}
                    placeholder="e.g. Amit Patil"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={enrollForm.phone}
                      onChange={(e) => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                      placeholder="+91 98XXXXXXXX"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1">
                      Email <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      value={enrollForm.email}
                      onChange={(e) => setEnrollForm({ ...enrollForm, email: e.target.value })}
                      placeholder="student@example.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#344054] mb-1">
                    Preferred Batch Timing
                  </label>
                  <select
                    value={enrollForm.preferredBatch}
                    onChange={(e) => setEnrollForm({ ...enrollForm, preferredBatch: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054]"
                  >
                    <option value="Morning (9:00 AM - 12:00 PM)">Morning Batch (9:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon Batch (1:00 PM - 4:00 PM)</option>
                    <option value="Evening (5:00 PM - 8:00 PM)">Evening Batch (5:00 PM - 8:00 PM)</option>
                    <option value="Weekend / Flexible">Weekend / Flexible Practice Hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#344054] mb-1">
                    Notes or Questions <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows="2"
                    value={enrollForm.notes}
                    onChange={(e) => setEnrollForm({ ...enrollForm, notes: e.target.value })}
                    placeholder="e.g. Any specific exam deadline or previous experience?"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E7EC] rounded-lg focus:border-[#491F6B] text-[#344054]"
                  ></textarea>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEnrollModalCourse(null)}
                    className="px-4 py-2 text-xs font-semibold text-[#667085] hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 bg-[#9C225B] hover:bg-[#83184B] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-2 disabled:opacity-70"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {submitting ? 'Submitting...' : 'Submit Admission Inquiry'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Courses;

import { Link } from 'react-router-dom';
import { 
  Award, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  MessageCircle, 
  GraduationCap, 
  Wrench, 
  Building2, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useSiteContext } from '../context/SiteContext';
import ImageGallery from '../components/ImageGallery';

const About = () => {
  const { settings } = useSiteContext();

  const cleanPhone = settings.phone ? settings.phone.replace(/[^0-9]/g, '') : '919860342172';
  const cleanWhatsApp = settings.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, '') : cleanPhone;

  return (
    <div className="bg-[#F7F9FC] min-h-screen py-12 sm:py-16">
      <div className="section-container">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6EEFB] border border-[#E5D1F4] text-[#491F6B] text-xs font-semibold mb-3">
            <Award className="w-4 h-4" />
            <span>Serving Kurkumbh & Daund Region for 19 Years</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#163262] tracking-tight">
            About Sanjivani Computer
          </h1>
          <p className="text-[#667085] text-base sm:text-lg mt-3 leading-relaxed">
            Bridging the gap between practical computer education, essential citizen online services, and dependable enterprise IT maintenance under one trusted roof.
          </p>
        </div>

        {/* Founder Story Section */}
        <div className="bg-white rounded-3xl border border-[#E4E7EC] p-6 sm:p-10 lg:p-12 shadow-xs mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Visuals */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#E4E7EC]">
                <img
                  src="/founder.jpg"
                  alt={`${settings.founderName} - Founder of Sanjivani Computer`}
                  className="w-full h-80 sm:h-96 object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14213D]/70 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-sm font-bold">{settings.founderName}</p>
                  <p className="text-xs text-slate-200">{settings.founderRole}</p>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-[#F7F9FC] border border-[#E4E7EC] flex items-center justify-around text-center">
                <div>
                  <div className="text-xl font-black text-[#491F6B]">19+</div>
                  <div className="text-[11px] text-[#667085] font-semibold">Years Experience</div>
                </div>
                <div className="h-8 w-px bg-[#E4E7EC]"></div>
                <div>
                  <div className="text-xl font-black text-[#163262]">50+</div>
                  <div className="text-[11px] text-[#667085] font-semibold">Companies Supported</div>
                </div>
                <div className="h-8 w-px bg-[#E4E7EC]"></div>
                <div>
                  <div className="text-xl font-black text-[#16A34A]">100s</div>
                  <div className="text-[11px] text-[#667085] font-semibold">Trained Students</div>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#491F6B]">
                Leadership & Vision
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#163262] tracking-tight">
                Meet The Founder
              </h2>
              <h3 className="text-lg font-bold text-[#344054]">
                {settings.founderName}
              </h3>

              <div className="text-sm text-[#667085] leading-relaxed space-y-3.5 pt-1">
                {settings.founderDescription ? (
                  settings.founderDescription.split('\n').filter(p => p.trim() !== '').map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))
                ) : (
                  <>
                    <p>
                      With over 19+ years of extensive experience in Information Technology, Mr. Sampat Sahebrao Bankar is a seasoned professional and educator in computer hardware and technical education.
                    </p>
                    <p>
                      He has built a strong reputation through his practical expertise in computer, laptop, and printer repair, CCTV installation and maintenance, networking solutions, and IT hardware support. Over the years, he has successfully handled technical and hardware operations for 50+ companies, delivering reliable solutions while maintaining long-term customer relationships.
                    </p>
                    <p>
                      In addition to technical excellence, Mr. Bankar has trained hundreds of students in courses such as MSCIT, Tally Prime, English-Marathi-Hindi typing (30/40/50 WPM), Photoshop, and CorelDRAW. His practical teaching approach focuses on real-world skills, empowering students to become confident and job-ready.
                    </p>
                  </>
                )}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${settings.phone}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#9C225B] hover:bg-[#83184B] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                >
                  <Phone className="w-4 h-4" />
                  Call {settings.phone}
                </a>

                <a
                  href={`https://wa.me/${cleanWhatsApp}?text=Hello%20Mr.%20Bankar,%20I%20would%20like%20to%20connect.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E4E7EC] hover:bg-slate-50 text-[#163262] text-xs font-bold rounded-xl transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-[#16A34A]" />
                  Chat on WhatsApp
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E4E7EC] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#F6EEFB] text-[#491F6B] flex items-center justify-center mb-4">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#163262] mb-2">
              Vocational & Digital Education
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Equipping local youth, school students, and job seekers with MKCL certifications, GCC-TBC typing, and computerized accounting to foster employability.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E4E7EC] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#F6EEFB] text-[#491F6B] flex items-center justify-center mb-4">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#163262] mb-2">
              Dependable Hardware Service
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Fast, honest troubleshooting for desktop PCs, laptops, printers, and CCTV setups, using quality components and transparent diagnostics.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E4E7EC] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#F6EEFB] text-[#491F6B] flex items-center justify-center mb-4">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#163262] mb-2">
              Local Organization Partner
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Trusted by 50+ regional companies, educational institutions, and commercial establishments for ongoing IT maintenance and rapid on-call support.
            </p>
          </div>
        </div>

        {/* Showcase Gallery */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl font-extrabold text-[#163262]">
              Institute Life & Student Community
            </h2>
            <p className="text-xs sm:text-sm text-[#667085] mt-1">
              Real moments from our computer lab, educational trips, typing speed tests, and annual events.
            </p>
          </div>
          <ImageGallery />
        </div>

        {/* Location Box */}
        <div className="bg-white rounded-2xl border border-[#E4E7EC] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-bold text-[#163262]">
              Located in Kurkumbh, Tal. Daund, Dist. Pune
            </h3>
            <p className="text-xs text-[#667085] mt-0.5">
              {settings.address}
            </p>
            <p className="text-xs text-[#491F6B] font-semibold mt-1">
              Working Hours: {settings.workingHours || "Mon – Sat: 9:00 AM – 8:00 PM"}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={settings.mapUrl || "https://maps.app.goo.gl/vk5Zh8VVvzaPxjfe9"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#F7F9FC] border border-[#E4E7EC] text-[#163262] text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#491F6B]" />
              Get Directions
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#163262] text-white text-xs font-bold rounded-xl hover:bg-[#004EEB] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;

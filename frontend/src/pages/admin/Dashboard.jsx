import { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Wrench, 
  ShoppingCart, 
  MessageSquare, 
  LogOut, 
  Users, 
  Bell, 
  Settings, 
  Clock, 
  Mail, 
  Phone,
  RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SettingsPanel from './SettingsPanel';
import { api } from '../../utils/api';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('inquiries');
  const [inquirySubTab, setInquirySubTab] = useState('contacts');
  
  const [contacts, setContacts] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin/login');
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [cRes, sRes, eRes, crsRes] = await Promise.allSettled([
        api.getContacts(),
        api.getServiceRequests(),
        api.getEnrollments(),
        api.getCourses()
      ]);
      if (cRes.status === 'fulfilled' && Array.isArray(cRes.value)) setContacts(cRes.value);
      if (sRes.status === 'fulfilled' && Array.isArray(sRes.value)) setServiceRequests(sRes.value);
      if (eRes.status === 'fulfilled' && Array.isArray(eRes.value)) setEnrollments(eRes.value);
      if (crsRes.status === 'fulfilled' && Array.isArray(crsRes.value)) setCourses(crsRes.value);
    } catch (e) {
      console.warn('Dashboard fetch issue:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const navItems = [
    { id: 'inquiries', label: 'Inquiries & Requests', icon: <MessageSquare className="w-5 h-5"/>, count: contacts.length + serviceRequests.length + enrollments.length },
    { id: 'courses', label: 'Courses List', icon: <BookOpen className="w-5 h-5"/>, count: courses.length },
    { id: 'settings', label: 'Site Settings', icon: <Settings className="w-5 h-5"/> },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col md:flex-row text-[#344054]">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-[#14213D] text-white flex flex-col border-r border-slate-800 shrink-0">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
            <div className="w-7 h-7 bg-[#155EEF] rounded-lg flex items-center justify-center font-black text-sm">S</div>
            Sanjivani Computer
          </h2>
          <p className="text-slate-400 text-xs mt-1">Management Portal</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all font-semibold text-xs
                ${activeTab === item.id 
                  ? 'bg-[#155EEF] text-white shadow-xs' 
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.count !== undefined && item.count > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-slate-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all font-medium text-xs"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <div className="h-16 bg-white border-b border-[#E4E7EC] flex items-center justify-between px-6 sm:px-8 shadow-xs">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-[#14213D] capitalize">
              {activeTab === 'inquiries' ? 'Customer Inquiries & Service Requests' : activeTab === 'courses' ? 'Courses Catalog' : 'Global Site Settings'}
            </h1>
            <button 
              onClick={loadData}
              title="Refresh Data"
              className="p-1.5 rounded-lg text-slate-400 hover:text-[#155EEF] hover:bg-slate-100 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-[#14213D]">Administrator</p>
              <p className="text-[10px] text-[#667085]">Kurkumbh Center</p>
            </div>
            <div className="w-9 h-9 bg-[#EFF4FF] text-[#155EEF] rounded-full flex items-center justify-center font-bold text-xs border border-[#D1E0FF]">
              SC
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            <div className="bg-white p-5 rounded-2xl border border-[#E4E7EC] shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#155EEF] flex items-center justify-center">
                <Users className="w-6 h-6"/>
              </div>
              <div>
                <p className="text-xs font-medium text-[#667085]">Course Admissions</p>
                <p className="text-xl font-bold text-[#14213D]">{enrollments.length}</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E4E7EC] shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Wrench className="w-6 h-6"/>
              </div>
              <div>
                <p className="text-xs font-medium text-[#667085]">Service / AMC Requests</p>
                <p className="text-xl font-bold text-[#14213D]">{serviceRequests.length}</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E4E7EC] shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center">
                <MessageSquare className="w-6 h-6"/>
              </div>
              <div>
                <p className="text-xs font-medium text-[#667085]">Contact Messages</p>
                <p className="text-xl font-bold text-[#14213D]">{contacts.length}</p>
              </div>
            </div>
          </div>

          {activeTab === 'settings' ? (
            <SettingsPanel />
          ) : activeTab === 'courses' ? (
            <div className="bg-white rounded-2xl border border-[#E4E7EC] p-6 shadow-xs">
              <h3 className="text-base font-bold text-[#14213D] mb-4">Current Active Courses</h3>
              <div className="divide-y divide-[#E4E7EC]">
                {courses.map((crs) => (
                  <div key={crs.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-[#14213D]">{crs.title}</h4>
                      <p className="text-xs text-[#667085] mt-0.5">{crs.duration} • {crs.eligibility}</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded bg-[#EFF4FF] text-[#155EEF] font-semibold self-start sm:self-auto">
                      {crs.fees || 'Active'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Inquiries Tab with Sub-navigation */
            <div className="bg-white rounded-2xl border border-[#E4E7EC] shadow-xs overflow-hidden">
              <div className="border-b border-[#E4E7EC] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setInquirySubTab('contacts')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      inquirySubTab === 'contacts' ? 'bg-[#155EEF] text-white' : 'text-[#667085] hover:bg-slate-100'
                    }`}
                  >
                    Contact Inquiries ({contacts.length})
                  </button>
                  <button
                    onClick={() => setInquirySubTab('serviceRequests')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      inquirySubTab === 'serviceRequests' ? 'bg-[#155EEF] text-white' : 'text-[#667085] hover:bg-slate-100'
                    }`}
                  >
                    Service & AMC Requests ({serviceRequests.length})
                  </button>
                  <button
                    onClick={() => setInquirySubTab('enrollments')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      inquirySubTab === 'enrollments' ? 'bg-[#155EEF] text-white' : 'text-[#667085] hover:bg-slate-100'
                    }`}
                  >
                    Course Admissions ({enrollments.length})
                  </button>
                </div>
              </div>

              <div className="p-6">
                {inquirySubTab === 'contacts' && (
                  <div className="space-y-4">
                    {contacts.length === 0 ? (
                      <p className="text-xs text-slate-500 py-6 text-center">No contact inquiries yet.</p>
                    ) : (
                      contacts.map((c) => (
                        <div key={c.id} className="p-4 rounded-xl border border-[#E4E7EC] bg-[#F7F9FC]">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <span className="font-bold text-sm text-[#14213D]">{c.name}</span>
                            <span className="text-[11px] text-[#667085]">
                              {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'Recent'}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-[#344054] mb-2">
                            <span className="flex items-center gap-1 font-semibold text-[#155EEF]">
                              <Phone className="w-3.5 h-3.5" /> {c.phone}
                            </span>
                            {c.email && (
                              <span className="flex items-center gap-1 text-[#667085]">
                                <Mail className="w-3.5 h-3.5" /> {c.email}
                              </span>
                            )}
                            {c.subject && (
                              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                                {c.subject}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#344054] bg-white p-3 rounded-lg border border-[#E4E7EC]">
                            {c.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {inquirySubTab === 'serviceRequests' && (
                  <div className="space-y-4">
                    {serviceRequests.length === 0 ? (
                      <p className="text-xs text-slate-500 py-6 text-center">No service or AMC requests yet.</p>
                    ) : (
                      serviceRequests.map((s) => (
                        <div key={s.id} className="p-4 rounded-xl border border-[#E4E7EC] bg-[#F7F9FC]">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <div>
                              <span className="font-bold text-sm text-[#14213D]">{s.name}</span>
                              {s.organization && (
                                <span className="text-xs text-[#155EEF] font-semibold ml-2">
                                  ({s.organization})
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-[#667085]">
                              {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : 'Recent'}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-[#344054] mb-2">
                            <span className="flex items-center gap-1 font-semibold text-[#155EEF]">
                              <Phone className="w-3.5 h-3.5" /> {s.phone}
                            </span>
                            {s.email && (
                              <span className="flex items-center gap-1 text-[#667085]">
                                <Mail className="w-3.5 h-3.5" /> {s.email}
                              </span>
                            )}
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              {s.serviceRequired || s.serviceType || 'IT Service'}
                            </span>
                            {s.hardwareScope && (
                              <span className="text-xs text-slate-500">Scope: {s.hardwareScope}</span>
                            )}
                          </div>
                          <p className="text-xs text-[#344054] bg-white p-3 rounded-lg border border-[#E4E7EC]">
                            {s.description || s.issue}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {inquirySubTab === 'enrollments' && (
                  <div className="space-y-4">
                    {enrollments.length === 0 ? (
                      <p className="text-xs text-slate-500 py-6 text-center">No course admission inquiries yet.</p>
                    ) : (
                      enrollments.map((enr) => (
                        <div key={enr.id} className="p-4 rounded-xl border border-[#E4E7EC] bg-[#F7F9FC]">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <div>
                              <span className="font-bold text-sm text-[#14213D]">{enr.name}</span>
                              <span className="text-xs text-[#155EEF] font-semibold ml-2">
                                Interested in: {enr.courseTitle}
                              </span>
                            </div>
                            <span className="text-[11px] text-[#667085]">
                              {enr.createdAt ? new Date(enr.createdAt).toLocaleDateString() : 'Recent'}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-[#344054] mb-2">
                            <span className="flex items-center gap-1 font-semibold text-[#155EEF]">
                              <Phone className="w-3.5 h-3.5" /> {enr.phone}
                            </span>
                            {enr.email && (
                              <span className="flex items-center gap-1 text-[#667085]">
                                <Mail className="w-3.5 h-3.5" /> {enr.email}
                              </span>
                            )}
                            {enr.preferredBatch && (
                              <span className="text-xs text-slate-500">Batch: {enr.preferredBatch}</span>
                            )}
                          </div>
                          {enr.notes && (
                            <p className="text-xs text-[#344054] bg-white p-3 rounded-lg border border-[#E4E7EC]">
                              {enr.notes}
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;

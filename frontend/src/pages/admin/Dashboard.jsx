import { useState } from 'react';
import { BookOpen, Wrench, ShoppingCart, MessageSquare, LogOut, Users, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement standard sign out
    navigate('/admin/login');
  };

  const navItems = [
    { id: 'courses', label: 'Manage Courses', icon: <BookOpen className="w-5 h-5"/> },
    { id: 'services', label: 'Manage Services', icon: <Wrench className="w-5 h-5"/> },
    { id: 'products', label: 'Manage Shop', icon: <ShoppingCart className="w-5 h-5"/> },
    { id: 'inquiries', label: 'Inquiries & Requests', icon: <MessageSquare className="w-5 h-5"/> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-slate-900 border-r border-slate-800 text-white flex flex-col transition-all">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">S</div>
            SANJIVANI
          </h2>
          <p className="text-slate-400 text-sm mt-1">Admin Control Panel</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
                ${activeTab === item.id 
                  ? 'bg-primary-600 text-white shadow-md' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all font-medium text-sm">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight capitalize">{activeTab.replace('_', ' ')} Management</h1>
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-primary-600 transition-colors">
              <Bell className="w-6 h-6" />
            </button>
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold border border-primary-200">
              AD
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-8 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
               <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><Users className="w-8 h-8"/></div>
               <div><p className="text-sm font-medium text-slate-500">Total Enrolled</p><p className="text-2xl font-bold text-slate-900">128</p></div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
               <div className="w-14 h-14 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center"><Wrench className="w-8 h-8"/></div>
               <div><p className="text-sm font-medium text-slate-500">Service Requests</p><p className="text-2xl font-bold text-slate-900">45</p></div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
               <div className="w-14 h-14 rounded-xl bg-green-50 text-green-600 flex items-center justify-center"><ShoppingCart className="w-8 h-8"/></div>
               <div><p className="text-sm font-medium text-slate-500">Orders Processed</p><p className="text-2xl font-bold text-slate-900">312</p></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
               <BookOpen className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">CRUD Table Prototype</h3>
            <p className="text-slate-500 max-w-sm">This is where the data table for {activeTab} will be displayed, connected to the Express backend APIs.</p>
            <button className="mt-6 px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">Add New Entry</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;

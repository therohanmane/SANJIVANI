import { useState, useEffect } from 'react';
import { useSiteContext } from '../../context/SiteContext';
import { Save, AlertCircle, CheckCircle2 } from 'lucide-react';

const SettingsPanel = () => {
  const { settings, updateSettings, loading } = useSiteContext();
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState('idle'); // idle, saving, success, error

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading settings...</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('saving');
    const success = await updateSettings(formData);
    if (success) {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E4E7EC] shadow-xs p-6 sm:p-8">
      <div className="mb-8 border-b border-[#E4E7EC] pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#14213D]">Site Settings Editor</h2>
          <p className="text-[#667085] text-xs mt-0.5">Update global site content and contact details instantly across all pages.</p>
        </div>
        {status === 'success' && (
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-xs px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Changes Saved!
          </div>
        )}
        {status === 'error' && (
          <div className="flex items-center gap-1.5 text-red-700 font-semibold text-xs px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-600" /> Error Saving Changes
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Brand & Hero */}
        <div>
          <h3 className="text-sm font-bold text-[#14213D] mb-3 border-l-4 border-[#155EEF] pl-2.5">
            Brand & Hero Headlines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#344054] mb-1">Brand Name</label>
              <input type="text" name="brandName" value={formData.brandName || ''} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E4E7EC] bg-white text-[#344054] focus:border-[#155EEF]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#344054] mb-1">Trust Line (Badge)</label>
              <input type="text" name="trustLine" value={formData.trustLine || ''} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E4E7EC] bg-white text-[#344054] focus:border-[#155EEF]" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#344054] mb-1">Hero Supporting Subtitle</label>
              <textarea rows="2" name="heroSubtitle" value={formData.heroSubtitle || ''} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E4E7EC] bg-white text-[#344054] focus:border-[#155EEF]"></textarea>
            </div>
          </div>
        </div>

        {/* Founder Details */}
        <div>
          <h3 className="text-sm font-bold text-[#14213D] mb-3 border-l-4 border-[#14213D] pl-2.5">
            Founder Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#344054] mb-1">Founder Name</label>
              <input type="text" name="founderName" value={formData.founderName || ''} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E4E7EC] bg-white text-[#344054] focus:border-[#155EEF]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#344054] mb-1">Founder Role</label>
              <input type="text" name="founderRole" value={formData.founderRole || ''} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E4E7EC] bg-white text-[#344054] focus:border-[#155EEF]" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#344054] mb-1">Founder Description</label>
              <textarea rows="4" name="founderDescription" value={formData.founderDescription || ''} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E4E7EC] bg-white text-[#344054] focus:border-[#155EEF]"></textarea>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-sm font-bold text-[#14213D] mb-3 border-l-4 border-emerald-600 pl-2.5">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#344054] mb-1">Phone Number</label>
              <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E4E7EC] bg-white text-[#344054] focus:border-[#155EEF]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#344054] mb-1">WhatsApp Number</label>
              <input type="text" name="whatsapp" value={formData.whatsapp || ''} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E4E7EC] bg-white text-[#344054] focus:border-[#155EEF]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#344054] mb-1">Email Address</label>
              <input type="email" name="email" value={formData.email || ''} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E4E7EC] bg-white text-[#344054] focus:border-[#155EEF]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#344054] mb-1">Working Hours</label>
              <input type="text" name="workingHours" value={formData.workingHours || ''} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E4E7EC] bg-white text-[#344054] focus:border-[#155EEF]" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#344054] mb-1">Physical Address</label>
              <input type="text" name="address" value={formData.address || ''} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E4E7EC] bg-white text-[#344054] focus:border-[#155EEF]" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#344054] mb-1">Google Maps URL</label>
              <input type="text" name="mapUrl" value={formData.mapUrl || ''} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E4E7EC] bg-white text-[#344054] focus:border-[#155EEF]" />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E4E7EC] flex justify-end">
          <button 
            type="submit" 
            disabled={status === 'saving'} 
            className="flex items-center gap-2 px-6 py-2.5 bg-[#155EEF] hover:bg-[#004EEB] text-white font-bold text-xs rounded-xl shadow-xs transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {status === 'saving' ? 'Saving Settings...' : 'Save Site Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPanel;

import { useState, useEffect } from 'react';
import { useSiteContext } from '../../context/SiteContext';
import { Save, Loader2 } from 'lucide-react';

const SiteSettingsPanel = () => {
  const { siteSettings, updateSettings } = useSiteContext();
  const [formData, setFormData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (siteSettings) {
      // Deep clone to avoid mutating context directly
      setFormData(JSON.parse(JSON.stringify(siteSettings)));
    }
  }, [siteSettings]);

  if (!formData) return <div className="p-8 text-center text-slate-500">Loading settings...</div>;

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');
    try {
      await updateSettings(formData);
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const InputField = ({ section, field, label, type = "text", rows = 1 }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
      {type === 'textarea' ? (
        <textarea
          rows={rows}
          value={formData[section][field] || ''}
          onChange={(e) => handleChange(section, field, e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none transition-all"
        />
      ) : (
        <input
          type={type}
          value={formData[section][field] || ''}
          onChange={(e) => handleChange(section, field, e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none transition-all"
        />
      )}
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-8 space-y-8 sm:space-y-12">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Site Components & Settings</h2>
          <p className="text-slate-500 text-sm mt-1">Update text, images, and contact information across the website instantly.</p>
        </div>
        <div className="flex flex-col-reverse sm:flex-row items-center gap-4">
          {message && <span className={`text-sm font-medium ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>{message}</span>}
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold tracking-wide transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Save Web Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12">
        {/* Home Page Section */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/50">
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight text-violet-600 dark:text-violet-400">
             Home Page Hero Unit
          </h3>
          <div className="space-y-2">
            <InputField section="home" field="heroTagline" label="Hero Tagline Hub Text" />
            <InputField section="home" field="heroTitlePrefix" label="Main Title (Before Highlight)" />
            <InputField section="home" field="heroTitleHighlight" label="Main Title (Highlight Gradient)" />
            <InputField section="home" field="heroSubtitle" label="Hero Subtitle / Description" type="textarea" rows={2} />
          </div>
        </div>

        {/* Founder Section */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/50">
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight text-cyan-600 dark:text-cyan-400">
             Founder / Bio Section
          </h3>
          <div className="space-y-2">
            <InputField section="home" field="founderName" label="Founder Name" />
            <InputField section="home" field="founderRole" label="Founder Role / Title" />
            <InputField section="home" field="founderBio" label="Founder Extended Biography" type="textarea" rows={4} />
            <InputField section="home" field="founderImage" label="Founder Portrait Image URL (http://...)" />
            <InputField section="home" field="officeImage" label="Office Background Image URL" />
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/50">
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight text-pink-600 dark:text-pink-400">
             Contact Information (Public)
          </h3>
          <div className="space-y-2">
            <InputField section="contact" field="address" label="Physical Street Address" type="textarea" rows={2} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              <InputField section="contact" field="phone1" label="Primary Phone (+91...)" />
              <InputField section="contact" field="whatsapp" label="WhatsApp Number" />
              <InputField section="contact" field="email1" label="Primary Email" />
              <InputField section="contact" field="email2" label="Secondary Email (Optional)" />
            </div>
            <InputField section="contact" field="hours1" label="Working Hours (Line 1)" />
            <InputField section="contact" field="hours2" label="Working Hours (Line 2)" />
            <InputField section="contact" field="mapUrl" label="Google Maps Embed URL (src=...)" />
          </div>
        </div>

        {/* Global Branding Section */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/50">
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight text-emerald-600 dark:text-emerald-400">
             Global Site Branding
          </h3>
          <div className="space-y-2">
            <InputField section="global" field="siteName" label="Site Name / Brand (Header & Footer)" />
            <InputField section="global" field="facebookUrl" label="Facebook Social Link URL" />
            <InputField section="global" field="twitterUrl" label="Twitter/X Social Link URL" />
            <InputField section="global" field="instagramUrl" label="Instagram Social Link URL" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteSettingsPanel;

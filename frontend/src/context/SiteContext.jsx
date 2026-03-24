import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const SiteContext = createContext();

export const useSiteContext = () => useContext(SiteContext);

export const SiteProvider = ({ children }) => {
  const [siteSettings, setSiteSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/settings');
      setSiteSettings(res.data);
    } catch (err) {
      console.error('Failed to load site settings', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateSettings = async (newSettings) => {
    try {
      const res = await axios.put('http://localhost:5000/api/settings', newSettings);
      setSiteSettings(res.data);
      return res.data;
    } catch (err) {
      console.error('Failed to update site settings', err);
      throw err;
    }
  };

  return (
    <SiteContext.Provider value={{ siteSettings, loading, updateSettings, refreshSettings: fetchSettings }}>
      {children}
    </SiteContext.Provider>
  );
};

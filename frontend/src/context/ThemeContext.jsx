import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'system';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const root = window.document.documentElement;
    
    const applyTheme = (currentTheme) => {
      root.classList.remove('light', 'dark');
      
      if (currentTheme === 'system') {
        // Auto on time (Day: 6 AM to 6 PM) or system preference
        const hour = new Date().getHours();
        const isNightTime = hour < 6 || hour >= 18;
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // We can blend both, but standard is system pref. Since user asked "auto on time for day night", we use time + fallback
        if (isNightTime || systemPrefersDark) {
           root.classList.add('dark');
        } else {
           root.classList.add('light');
        }
      } else {
        root.classList.add(currentTheme);
      }
    };

    applyTheme(theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, TerminalSquare, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const themeMenuRef = useRef(null);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Services', path: '/services' },
    { name: 'Shop', path: '/shop' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target)) {
        setShowThemeMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const ThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 py-2 shadow-sm dark:shadow-none' : 'bg-white dark:bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]">
               <TerminalSquare className="w-6 h-6" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white">
              SANJIVANI <span className="text-violet-500 dark:text-cyan-400">Computer</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                  location.pathname === link.path ? 'text-violet-600 bg-violet-50 dark:text-white dark:bg-white/10 dark:shadow-[inset_0_1px_rgba(255,255,255,0.1)]' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Theme Toggle Dropdown */}
            <div className="relative ml-2" ref={themeMenuRef}>
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center justify-center"
                title="Toggle Theme"
              >
                <ThemeIcon className="w-5 h-5" />
              </button>
              
              {showThemeMenu && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg dark:shadow-none py-1 overflow-hidden">
                  <button onClick={() => { setTheme('light'); setShowThemeMenu(false); }} className={`w-full px-4 py-2 text-left text-sm font-semibold flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition ${theme === 'light' ? 'text-violet-600 dark:text-violet-400' : 'text-slate-700 dark:text-slate-300'}`}>
                    <Sun className="w-4 h-4" /> Light
                  </button>
                  <button onClick={() => { setTheme('dark'); setShowThemeMenu(false); }} className={`w-full px-4 py-2 text-left text-sm font-semibold flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition ${theme === 'dark' ? 'text-violet-600 dark:text-violet-400' : 'text-slate-700 dark:text-slate-300'}`}>
                    <Moon className="w-4 h-4" /> Dark
                  </button>
                  <button onClick={() => { setTheme('system'); setShowThemeMenu(false); }} className={`w-full px-4 py-2 text-left text-sm font-semibold flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition ${theme === 'system' ? 'text-violet-600 dark:text-violet-400' : 'text-slate-700 dark:text-slate-300'}`}>
                    <Monitor className="w-4 h-4" /> Auto (Time)
                  </button>
                </div>
              )}
            </div>

            <Link to="/admin/login" className="ml-4 px-5 py-2 rounded-lg text-sm font-bold text-white dark:text-slate-950 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors shadow-[0_4px_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
               Portal
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => {
                const newTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
                setTheme(newTheme);
              }}
              className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300"
            >
              <ThemeIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-900 dark:text-white focus:outline-none p-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-transparent dark:border-white/10"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl border-b border-slate-200 dark:border-white/10 absolute w-full left-0 top-full">
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                  location.pathname === link.path
                    ? 'text-violet-600 bg-violet-50 dark:text-white dark:bg-white/10'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/admin/login" onClick={() => setIsOpen(false)} className="block px-4 py-3 mt-4 text-center rounded-xl text-base font-bold text-white dark:text-slate-900 bg-slate-900 dark:bg-white">
               Admin Portal
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

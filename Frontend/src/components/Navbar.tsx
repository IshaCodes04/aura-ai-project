import { Link, useLocation } from 'react-router-dom';
import { Menu, Moon, Sun, X, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import AuraAILogo from './AuraAILogo';

const THEME_STORAGE_KEY = 'aura-theme';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
    return isDark ? 'dark' : 'light';
  });

  const navLinks = useMemo(() => [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ], []);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  // Track scroll to change navbar opacity
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const setThemeAndPersist = (next: 'light' | 'dark') => {
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // no-op
    }
  };

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    const next: 'light' | 'dark' = isDark ? 'light' : 'dark';
    setThemeAndPersist(next);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 md:px-8 py-3">
      {/* Liquid glow behind navbar */}
      <div
        className="absolute inset-0 -z-10 transition-opacity duration-500"
        style={{ opacity: scrolled ? 1 : 0, background: 'linear-gradient(to bottom, rgba(255,122,0,0.04) 0%, transparent 100%)' }}
      />

      <div className="max-w-7xl mx-auto">
        <div
          className="flex items-center justify-between gap-3 md:gap-6 rounded-2xl border backdrop-blur-2xl transition-all duration-500"
          style={{
            background: scrolled
              ? theme === 'dark' ? 'rgba(10,10,15,0.92)' : 'rgba(255,255,255,0.92)'
              : theme === 'dark' ? 'rgba(10,10,15,0.6)' : 'rgba(255,255,255,0.6)',
            borderColor: scrolled
              ? theme === 'dark' ? 'rgba(255,122,0,0.15)' : 'rgba(255,122,0,0.12)'
              : theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.9)',
            boxShadow: scrolled
              ? theme === 'dark'
                ? '0 8px 40px -10px rgba(255,122,0,0.2), 0 0 0 1px rgba(255,122,0,0.08)'
                : '0 8px 40px -10px rgba(255,122,0,0.15), 0 0 0 1px rgba(255,122,0,0.06)'
              : 'none',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center pl-4 pr-2 py-1 group transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <AuraAILogo size="sm" showText={true} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="inline-flex items-center gap-1 rounded-full px-1.5 py-1 border"
              style={{
                background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)',
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.9)',
              }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative px-4 py-2 rounded-full text-sm font-medium tracking-tight transition-all duration-200"
                  style={isActive(link.path) ? {
                    background: 'linear-gradient(135deg, #FF7A00, #FF0066)',
                    color: 'white',
                    boxShadow: '0 4px 15px -3px rgba(255,122,0,0.4)',
                  } : {
                    color: theme === 'dark' ? 'rgba(255,255,255,0.75)' : 'rgba(30,30,30,0.75)',
                  }}
                  onMouseEnter={e => {
                    if (!isActive(link.path)) {
                      (e.currentTarget as HTMLElement).style.color = theme === 'dark' ? 'white' : '#111';
                      (e.currentTarget as HTMLElement).style.background = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.9)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive(link.path)) {
                      (e.currentTarget as HTMLElement).style.color = theme === 'dark' ? 'rgba(255,255,255,0.75)' : 'rgba(30,30,30,0.75)';
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                    }
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Auth / Theme */}
          <div className="hidden md:flex items-center gap-2 pr-4">
            <button
              type="button"
              onClick={toggleTheme}
              className="group inline-flex items-center justify-center h-9 w-9 rounded-full border transition-all duration-200 hover:scale-110"
              style={{
                background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)',
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(200,200,200,0.6)',
                color: theme === 'dark' ? 'white' : '#333',
              }}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-orange-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link
              to="/login"
              className="inline-flex items-center justify-center h-9 px-4 rounded-full text-sm font-medium transition-all duration-200 border"
              style={{
                background: 'transparent',
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(200,200,200,0.6)',
                color: theme === 'dark' ? 'rgba(255,255,255,0.85)' : '#333',
              }}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-1.5 h-9 px-5 rounded-full text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)', boxShadow: '0 4px 15px -3px rgba(255,122,0,0.5)' }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Get started
            </Link>
          </div>

          {/* Mobile right side */}
          <div className="flex items-center gap-2 pr-3 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center justify-center h-9 w-9 rounded-full border transition-all"
              style={{
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(200,200,200,0.6)',
                background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)',
                color: theme === 'dark' ? 'white' : '#333',
              }}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-orange-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              className="inline-flex items-center justify-center h-9 w-9 rounded-full border transition-all"
              style={{
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(200,200,200,0.6)',
                background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)',
                color: theme === 'dark' ? 'white' : '#333',
              }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden absolute inset-x-4 top-[4.5rem] mt-2 rounded-2xl border p-4 shadow-2xl backdrop-blur-2xl"
          style={{
            background: theme === 'dark' ? 'rgba(10,10,15,0.97)' : 'rgba(255,255,255,0.97)',
            borderColor: theme === 'dark' ? 'rgba(255,122,0,0.15)' : 'rgba(255,122,0,0.1)',
            boxShadow: '0 20px 60px -15px rgba(255,122,0,0.2)',
          }}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200"
                style={isActive(link.path) ? {
                  background: 'linear-gradient(135deg, #FF7A00, #FF0066)',
                  color: 'white',
                } : {
                  color: theme === 'dark' ? 'rgba(255,255,255,0.85)' : '#111',
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4 mt-2 border-t" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}>
              <Link
                to="/signup"
                className="text-center py-3 rounded-xl font-bold text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)', boxShadow: '0 4px 20px -5px rgba(255,122,0,0.5)' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Start Chatting Free ✨
              </Link>
              <Link
                to="/login"
                className="text-center py-3 rounded-xl font-semibold border transition-all"
                style={{
                  borderColor: theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(200,200,200,0.8)',
                  color: theme === 'dark' ? 'rgba(255,255,255,0.85)' : '#333',
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

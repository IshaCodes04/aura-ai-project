import { Link, useLocation } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import AuraAILogo from './AuraAILogo';

const THEME_STORAGE_KEY = 'aura-theme';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto">
        <div className={`flex items-center justify-between gap-3 md:gap-6 rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
          theme === 'dark' 
            ? 'bg-zinc-900/90 border-white/10 shadow-2xl shadow-black/20' 
            : 'bg-white/90 border-slate-200 shadow-xl shadow-slate-200/50'
        }`}>
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center pl-4 pr-2 py-1 group transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
          >
            <AuraAILogo size="sm" showText={true} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="inline-flex items-center gap-1 rounded-full bg-white/70 dark:bg-zinc-800/80 px-1.5 py-1 border border-white/80 dark:border-white/10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium tracking-tight transition-all duration-200 ${
                    location.pathname === link.path
                      ? 'bg-white text-slate-900 dark:bg-white text-slate-900'
                      : 'text-slate-600 dark:text-zinc-200 hover:text-slate-900 dark:hover:text-white hover:bg-white/70 dark:hover:bg-white/10'
                  }`}
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
              className="group inline-flex items-center justify-center h-9 w-9 rounded-full border border-white/70 dark:border-white/15 bg-white/50 dark:bg-transparent text-slate-800 dark:text-white hover:bg-white dark:hover:bg-white/10 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <Link
              to="/login"
              className="inline-flex items-center justify-center h-9 px-4 rounded-full border border-white/70 bg-white/40 text-sm font-medium text-slate-800 hover:bg-white/80 hover:text-slate-900 transition-colors dark:border-white/25 dark:bg-transparent dark:text-white/85 dark:hover:bg-white/10"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center h-9 px-5 rounded-full bg-orange-500 text-sm font-semibold text-white hover:bg-orange-600 transition-colors shadow-[0_18px_40px_-22px_rgba(249,115,22,0.9)]"
            >
              Get started
            </Link>
          </div>

          {/* Mobile right side */}
          <div className="flex items-center gap-2 pr-3 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className={`inline-flex items-center justify-center h-9 w-9 rounded-full border transition-all ${
                theme === 'dark'
                  ? 'border-white/15 bg-white/5 text-white hover:bg-white/15'
                  : 'border-slate-200 bg-slate-100 text-slate-800 hover:bg-white'
              }`}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-white/70 dark:border-white/15 bg-white/60 dark:bg-transparent text-slate-800 dark:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden absolute inset-x-4 top-[4.5rem] mt-2 rounded-2xl border p-4 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200 ${
          theme === 'dark' 
            ? 'bg-zinc-900/95 border-white/10' 
            : 'bg-white border-slate-200'
        }`}>
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-orange-500 text-white shadow-lg'
                    : theme === 'dark' 
                      ? 'text-white hover:bg-white/10' 
                      : 'text-slate-900 hover:bg-slate-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-border/70 dark:border-white/10">
              <button
                type="button"
                onClick={toggleTheme}
                className={`flex items-center justify-center gap-3 h-12 rounded-xl border transition-all duration-200 shadow-sm ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                    : 'bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100'
                }`}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-5 h-5 text-orange-400" />
                    <span className="font-semibold">Light mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold">Dark mode</span>
                  </>
                )}
              </button>
              <Link 
                to="/signup" 
                className={`text-center py-3 rounded-xl font-semibold border transition-all ${
                  theme === 'dark'
                    ? 'border-white/20 text-white hover:bg-white/10'
                    : 'border-slate-300 text-slate-900 hover:bg-slate-100'
                }`}
              >
                Sign up
              </Link>
              <Link to="/login" className="btn-primary text-center">
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

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
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 h-16 bg-background/92 dark:bg-[#06070b]/70 supports-[backdrop-filter]:bg-background/75 supports-[backdrop-filter]:dark:bg-[#06070b]/55 backdrop-blur-xl border-b border-border/70 dark:border-white/10 shadow-[0_10px_24px_-24px_rgba(0,0,0,0.18)] dark:shadow-[0_18px_55px_-40px_rgba(0,0,0,0.95)]">
      {/* Premium glow + accent line (dark mode) */}
      <div className="pointer-events-none absolute inset-0 dark:bg-[radial-gradient(900px_240px_at_50%_0%,rgba(249,115,22,0.16),transparent_62%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 dark:opacity-100" />

      <div className="relative max-w-7xl mx-auto h-full grid grid-cols-[auto_1fr_auto] items-center gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center group transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
        >
          <AuraAILogo size="sm" showText={true} />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center">
          {/* Gradient-border glass pill */}
          <div className="rounded-2xl p-[1px] bg-gradient-to-r from-orange-500/35 via-black/10 to-blue-500/25 dark:from-orange-500/40 dark:via-white/10 dark:to-blue-500/30">
            <div className="flex items-center gap-1 rounded-2xl px-1 py-1 bg-background/70 dark:bg-white/5 backdrop-blur-xl">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    location.pathname === link.path 
                      ? 'bg-background text-foreground dark:bg-white/10 dark:text-white shadow-sm dark:shadow-none'
                      : 'text-foreground/70 dark:text-white/75 hover:text-foreground dark:hover:text-white hover:bg-background/60 dark:hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="group inline-flex items-center justify-center h-10 w-10 rounded-xl border border-border/70 dark:border-white/10 bg-background/70 dark:bg-white/5 text-foreground dark:text-white hover:bg-background dark:hover:bg-white/10 transition shadow-sm dark:shadow-none"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-orange-300 group-hover:text-orange-200 transition-colors" />
            ) : (
              <Moon className="w-5 h-5 text-foreground/80 group-hover:text-foreground transition-colors" />
            )}
          </button>
          <Link
            to="/signup"
            className="btn-outline dark:border-white/12 dark:text-white/90 dark:hover:bg-white/10 dark:hover:text-white dark:hover:border-white/15"
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className="btn-primary dark:shadow-[0_18px_55px_-28px_rgba(249,115,22,0.9)] dark:hover:shadow-[0_26px_70px_-34px_rgba(249,115,22,0.95)]"
          >
            Log in
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl border border-border/70 dark:border-white/10 bg-background/70 dark:bg-white/5 text-foreground dark:text-white hover:bg-background dark:hover:bg-white/10 transition shadow-sm dark:shadow-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-4 right-4 mt-3 bg-background/95 dark:bg-background/85 border border-border/70 dark:border-white/10 rounded-2xl p-4 shadow-lg dark:shadow-[0_30px_60px_-40px_rgba(0,0,0,0.95)] backdrop-blur-xl">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  location.pathname === link.path
                    ? 'bg-background text-foreground dark:bg-white/10 dark:text-white ring-1 ring-border/70 dark:ring-white/10'
                    : 'text-foreground/80 dark:text-white/80 hover:bg-background/70 dark:hover:bg-white/5 hover:text-foreground dark:hover:text-white'
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
                className="inline-flex items-center justify-center gap-2 h-11 rounded-xl border border-border/70 dark:border-white/10 bg-background/70 dark:bg-white/5 text-foreground dark:text-white hover:bg-background dark:hover:bg-white/10 transition shadow-sm dark:shadow-none"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
              </button>
              <Link to="/signup" className="btn-outline text-center">
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

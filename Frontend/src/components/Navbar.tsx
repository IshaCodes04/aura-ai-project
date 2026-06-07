import { Link, useLocation } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import AuraAILogo from './AuraAILogo';

const THEME_STORAGE_KEY = 'aura-theme';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
    setThemeAndPersist(isDark ? 'light' : 'dark');
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinkClass = (path: string) =>
    `px-5 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 ${
      isActive(path)
        ? 'text-white shadow-sm'
        : 'text-black dark:text-foreground/80 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
    }`;

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 px-4 md:px-8 py-4 ${
        isVisible ? 'translate-y-0' : '-translate-y-32 opacity-0'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex items-center justify-between gap-3 px-3 md:px-4 py-2.5 rounded-full border transition-all duration-500 ${
            scrolled
              ? 'shadow-[0_8px_32px_-12px_rgba(26,26,46,0.12)]'
              : 'shadow-[0_4px_24px_-8px_rgba(26,26,46,0.06)]'
          }`}
          style={{
            background:
              theme === 'dark'
                ? `rgba(15, 15, 22, ${scrolled ? '0.92' : '0.78'})`
                : `rgba(255, 255, 255, ${scrolled ? '0.92' : '0.82'})`,
            backdropFilter: 'blur(16px)',
            borderColor:
              theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(122, 140, 94, 0.12)',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center shrink-0 pl-1 md:pl-2 transition-opacity duration-300 hover:opacity-90"
          >
            <AuraAILogo size="sm" showText textBlack />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="inline-flex items-center gap-1 p-1 rounded-full border border-border/50 bg-background/40 dark:bg-white/[0.03]">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={navLinkClass(link.path)}
                  style={
                    isActive(link.path)
                      ? {
                          background: 'hsl(var(--primary))',
                          boxShadow: '0 4px 14px -4px rgba(122, 140, 94, 0.45)',
                        }
                      : undefined
                  }
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3 shrink-0 pr-1">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-center h-9 w-9 rounded-full border border-border/50 bg-background/30 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-secondary" />
              ) : (
                <Moon className="w-4 h-4" style={{ color: 'hsl(var(--navy-blue))' }} />
              )}
            </button>

            <div className="h-6 w-px bg-border/60" />

            <Link
              to="/login"
              className="text-[11px] font-semibold uppercase tracking-[0.12em] px-2 transition-colors hover:opacity-80"
              style={{ color: 'hsl(var(--navy-blue))' }}
            >
              Sign In
            </Link>

            <Link
              to="/signup"
              className="inline-flex items-center justify-center h-10 px-6 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
              style={{
                background: 'hsl(var(--secondary))',
                color: 'hsl(var(--navy-blue))',
                boxShadow: '0 6px 20px -6px rgba(232, 197, 71, 0.55)',
              }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden pr-1">
            <button
              type="button"
              onClick={toggleTheme}
              className="h-9 w-9 flex items-center justify-center rounded-full border border-border/50 bg-background/30"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-secondary" />
              ) : (
                <Moon className="w-4 h-4" style={{ color: 'hsl(var(--navy-blue))' }} />
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-9 w-9 flex items-center justify-center rounded-full border border-border/50 transition-colors"
              style={{ background: 'hsl(var(--primary))', color: 'white' }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden absolute inset-x-4 top-[5rem] rounded-3xl border p-5 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-top-4 duration-300"
          style={{
            background: theme === 'dark' ? 'rgba(15, 15, 22, 0.96)' : 'rgba(255, 255, 255, 0.96)',
            borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(122, 140, 94, 0.15)',
          }}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-5 py-3.5 rounded-2xl text-[11px] font-semibold uppercase tracking-[0.12em] transition-all ${
                  isActive(link.path)
                    ? 'text-white'
                    : 'text-black dark:text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
                style={
                  isActive(link.path)
                    ? { background: 'hsl(var(--primary))' }
                    : undefined
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="h-px bg-border/50 my-3" />

            <Link
              to="/signup"
              className="text-center py-3.5 rounded-2xl text-[11px] font-semibold uppercase tracking-[0.12em] transition-all active:scale-[0.98]"
              style={{
                background: 'hsl(var(--secondary))',
                color: 'hsl(var(--navy-blue))',
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="text-center py-3.5 rounded-2xl text-[11px] font-semibold uppercase tracking-[0.12em] border border-border/50 text-[hsl(var(--navy-blue))] dark:text-foreground/80 hover:bg-foreground/5 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

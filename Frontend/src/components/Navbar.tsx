import { Link, useLocation } from 'react-router-dom';
import { Menu, Moon, Sun, X, Sparkles } from 'lucide-react';
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

  // Track scroll to change navbar opacity and visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Change opacity/background
      setScrolled(currentScrollY > 20);

      // Hide on scroll down, show on scroll up
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
    const next: 'light' | 'dark' = isDark ? 'light' : 'dark';
    setThemeAndPersist(next);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 px-4 md:px-8 py-4 ${isVisible ? 'translate-y-0' : '-translate-y-32 opacity-0'}`}>
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid grid-cols-2 md:grid-cols-3 items-center gap-4 p-2 rounded-[2.5rem] border transition-all duration-700 ${
            scrolled 
              ? "shadow-[0_20px_50px_-20px_rgba(255,122,0,0.2)]" 
              : "shadow-none"
          }`}
          style={{
            background: theme === 'dark' 
              ? `rgba(10,10,15, ${scrolled ? '0.8' : '0.4'})` 
              : `rgba(255,255,255, ${scrolled ? '0.8' : '0.4'})`,
            backdropFilter: 'blur(20px)',
            borderColor: theme === 'dark' 
              ? 'rgba(255,255,255,0.08)'
              : 'rgba(0,0,0,0.05)',
          }}
        >
          {/* Logo Section */}
          <div className="flex justify-start pl-4">
            <Link
              to="/"
              className="flex items-center group transition-transform duration-300 hover:scale-[1.02]"
            >
              <AuraAILogo size="sm" showText={true} />
            </Link>
          </div>

          {/* Center Navigation - Floating Pill Style */}
          <div className="hidden md:flex justify-center">
            <div className="inline-flex items-center gap-1 p-1.5 rounded-full border border-border/40 bg-background/20 backdrop-blur-xl shadow-inner">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${
                    isActive(link.path) 
                      ? 'text-white' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  style={isActive(link.path) ? {
                    background: 'linear-gradient(135deg, #FF7A00, #FF0066)',
                    boxShadow: '0 8px 20px -6px rgba(255,0,102,0.5)',
                  } : {}}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section - Auth & Utils */}
          <div className="hidden md:flex items-center justify-end gap-4 pr-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-center h-10 w-10 rounded-full border border-border/40 bg-background/20 hover:bg-orange-500/10 hover:border-orange-500/30 transition-all duration-300 group"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4.5 h-4.5 text-orange-400 group-hover:rotate-45 transition-transform duration-500" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-slate-700" />
              )}
            </button>
            
            <div className="h-8 w-[1px] bg-border/40 mx-1" />

            <Link
              to="/login"
              className="text-[10px] font-bold uppercase tracking-[0.2em] px-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              Sync
            </Link>
            
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 h-11 px-7 rounded-[1.25rem] text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-orange-500/20 active:scale-95"
              style={{ 
                background: 'linear-gradient(135deg, #FF7A00, #FF0066)',
                boxShadow: '0 10px 25px -8px rgba(255,0,102,0.4)'
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Join Aura
            </Link>
          </div>

          {/* Mobile UI */}
          <div className="flex items-center justify-end gap-3 pr-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="h-10 w-10 flex items-center justify-center rounded-full border border-border/40 bg-background/20 text-foreground"
            >
              {theme === 'dark' ? <Sun className="w-4.5 h-4.5 text-orange-400" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-10 w-10 flex items-center justify-center rounded-2xl bg-foreground text-background transition-transform active:scale-90"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden absolute inset-x-4 top-[5.5rem] rounded-[2.5rem] border p-6 shadow-2xl backdrop-blur-3xl animate-in slide-in-from-top-5 duration-500 overflow-hidden"
          style={{
            background: theme === 'dark' ? 'rgba(15,15,22,0.95)' : 'rgba(255,255,255,0.95)',
            borderColor: theme === 'dark' ? 'rgba(255,122,0,0.15)' : 'rgba(255,122,0,0.1)',
          }}
        >
          {/* Background Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="relative flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 ${
                  isActive(link.path) 
                    ? 'text-white shadow-lg' 
                    : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
                }`}
                style={isActive(link.path) ? {
                  background: 'linear-gradient(135deg, #FF7A00, #FF0066)',
                  boxShadow: '0 8px 20px -6px rgba(255,0,102,0.4)',
                } : {}}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-px bg-border/40 my-4 mx-4" />
            
            <div className="flex flex-col gap-3">
              <Link
                to="/signup"
                className="flex items-center justify-center gap-2 py-4.5 rounded-2xl font-bold text-[10px] uppercase tracking-[0.3em] text-white transition-all shadow-xl active:scale-95"
                style={{ 
                  background: 'linear-gradient(135deg, #FF7A00, #FF0066)',
                  boxShadow: '0 10px 25px -8px rgba(255,0,102,0.4)'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Join Aura
              </Link>
              <Link
                to="/login"
                className="text-center py-4.5 rounded-2xl font-bold text-[10px] uppercase tracking-[0.3em] border border-border/50 text-foreground/70 transition-all hover:bg-foreground/5 active:scale-95"
                onClick={() => setIsMenuOpen(false)}
              >
                Sync Access
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

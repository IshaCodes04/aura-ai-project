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
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 px-4 md:px-8 py-4 ${scrolled ? 'translate-y-0' : 'translate-y-1'}`}>
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex items-center justify-between gap-4 p-2 rounded-[2rem] border transition-all duration-700 ${
            scrolled 
              ? "shadow-[0_20px_50px_-20px_rgba(255,122,0,0.15)]" 
              : "shadow-none"
          }`}
          style={{
            background: theme === 'dark' 
              ? `rgba(10,10,15, ${scrolled ? '0.85' : '0.4'})` 
              : `rgba(255,255,255, ${scrolled ? '0.85' : '0.4'})`,
            backdropFilter: 'blur(20px)',
            borderColor: theme === 'dark' 
              ? scrolled ? 'rgba(255,122,0,0.2)' : 'rgba(255,255,255,0.05)'
              : scrolled ? 'rgba(255,122,0,0.1)' : 'rgba(0,0,0,0.05)',
          }}
        >
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center pl-4 group transition-transform duration-300 hover:scale-[1.02]"
          >
            <AuraAILogo size="sm" showText={true} />
          </Link>

          {/* Center Navigation - Floating Pill Style */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="inline-flex items-center gap-1 p-1.5 rounded-full border border-border/40 bg-background/20 backdrop-blur-md">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.15em] transition-all duration-500 ${
                    isActive(link.path) 
                      ? 'text-white shadow-lg' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  style={isActive(link.path) ? {
                    background: 'linear-gradient(135deg, #FF7A00, #FF0066)',
                    boxShadow: '0 4px 15px -3px rgba(255,122,0,0.4)',
                  } : {}}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section - Auth & Utils */}
          <div className="hidden md:flex items-center gap-3 pr-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-center h-10 w-10 rounded-full border border-border/50 bg-card/40 hover:bg-orange-500/10 hover:border-orange-500/30 transition-all duration-300 group"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4.5 h-4.5 text-orange-400 group-hover:rotate-45 transition-transform duration-500" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
            
            <div className="h-6 w-[1px] bg-border/50 mx-1" />

            <Link
              to="/login"
              className="text-xs font-black uppercase tracking-[0.2em] px-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              Sync
            </Link>
            
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-xl transition-all duration-500 hover:-translate-y-1 active:scale-95"
              style={{ 
                background: 'linear-gradient(135deg, #FF7A00, #FF0066)',
                boxShadow: '0 10px 30px -10px rgba(255,0,102,0.4)'
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Join Aura
            </Link>
          </div>

          {/* Mobile UI */}
          <div className="flex items-center gap-2 pr-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="h-10 w-10 flex items-center justify-center rounded-full border border-border/50 bg-card/40 text-foreground"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-orange-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-10 w-10 flex items-center justify-center rounded-xl bg-foreground text-background"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden absolute inset-x-4 top-[5.5rem] rounded-[2rem] border p-5 shadow-2xl backdrop-blur-3xl animate-in slide-in-from-top-5 duration-500"
          style={{
            background: theme === 'dark' ? 'rgba(15,15,20,0.95)' : 'rgba(255,255,255,0.95)',
            borderColor: theme === 'dark' ? 'rgba(255,122,0,0.2)' : 'rgba(255,122,0,0.1)',
            boxShadow: '0 30px 60px -15px rgba(0,0,0,0.4)',
          }}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                  isActive(link.path) 
                    ? 'text-white shadow-lg' 
                    : 'text-foreground/70 hover:text-foreground'
                }`}
                style={isActive(link.path) ? {
                  background: 'linear-gradient(135deg, #FF7A00, #FF0066)',
                } : {}}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-border/50 my-4" />
            <div className="flex flex-col gap-3">
              <Link
                to="/signup"
                className="text-center py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] text-white transition-all shadow-xl active:scale-95"
                style={{ 
                  background: 'linear-gradient(135deg, #FF7A00, #FF0066)',
                  boxShadow: '0 10px 20px -5px rgba(255,122,0,0.4)'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Join Aura ✨
              </Link>
              <Link
                to="/login"
                className="text-center py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] border border-border/50 text-foreground/80 transition-all hover:bg-card active:scale-95"
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

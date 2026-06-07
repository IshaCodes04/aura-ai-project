import { Link } from 'react-router-dom';
import { Github, Twitter, Mail } from 'lucide-react';
import AuraAILogo from './AuraAILogo';

const Footer = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy', path: '#' },
    { name: 'Terms', path: '#' },
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Mail, href: 'mailto:hello@aura-ai.app', label: 'Email' },
  ];

  return (
    <footer className="relative z-10 border-t border-border/50 bg-white/20 dark:bg-white/[0.02] backdrop-blur-xl mt-20">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
              <AuraAILogo size="sm" showText={false} />
              <span className="text-xl font-black tracking-tight text-black dark:text-white">
                Aura AI
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm font-medium opacity-80">
              Your personal AI assistant for coding, research, writing, and planning — with memory that grows with you.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary mb-5">Navigate</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm font-semibold text-muted-foreground hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started */}
          <div className="md:col-span-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary mb-5">Get Started</h4>
            <ul className="space-y-3 mb-6">
              <li>
                <Link to="/signup" className="text-sm font-semibold text-muted-foreground hover:text-secondary transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm font-semibold text-muted-foreground hover:text-secondary transition-colors">
                  Sign In
                </Link>
              </li>
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.path} className="text-sm font-semibold text-muted-foreground hover:text-secondary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl border border-border/50 bg-white/40 dark:bg-white/5 flex items-center justify-center text-muted-foreground hover:text-secondary hover:border-secondary/30 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[11px] font-bold text-muted-foreground opacity-50">
            © {new Date().getFullYear()} Aura AI. All rights reserved.
          </p>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground opacity-30">
            Your Personal AI Assistant
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

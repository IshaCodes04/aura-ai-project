import { ReactNode } from 'react';
import Navbar from './Navbar';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  supportingText?: string;
  titleHighlight?: string;
}

const AuthLayout = ({ children, title, subtitle, supportingText, titleHighlight }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
      <Navbar />

      {/* ─── LIQUID BACKGROUND ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="liquid-blob absolute opacity-20 dark:opacity-30" style={{ width: '60vw', height: '60vw', top: '-10%', left: '-10%', background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 100%)' }} />
        <div className="liquid-blob absolute opacity-10 dark:opacity-20" style={{ width: '40vw', height: '40vw', bottom: '-10%', right: '-5%', animationDelay: '-7s', background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)' }} />
      </div>

      <div className="relative z-10 min-h-screen flex items-center px-6 md:px-12 pt-28 pb-12">
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Content */}
          <div className="text-left aura-fade-1">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-foreground leading-[1.1] tracking-tight">
              {title}<br />
              <span className="shimmer-text">
                {titleHighlight}
              </span>
            </h1>
            <p className="mt-8 text-xl text-muted-foreground max-w-md font-medium leading-relaxed">
              {subtitle}
            </p>
            <div className="mt-8 flex items-center gap-3 text-orange-500 font-bold">
              <div className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse"></div>
              <span className="text-sm uppercase tracking-widest">{supportingText}</span>
            </div>
          </div>

          {/* Right Side - Auth Card (Glassmorphism) */}
          <div className="aura-fade-2 flex justify-center lg:justify-end">
            <div className="w-full max-w-md p-8 md:p-10 rounded-[2.5rem] border border-white/20 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

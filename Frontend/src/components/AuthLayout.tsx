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
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden selection:bg-orange-100 selection:text-orange-900" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* ─── LIQUID BACKGROUND BLOBS ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-20">
        <div className="liquid-blob absolute" style={{ width: '60vw', height: '60vw', top: '-10%', left: '-10%', background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 50%, #9333ea 100%)', opacity: 0.15 }} />
        <div className="liquid-blob absolute" style={{ width: '40vw', height: '40vw', bottom: '-5%', right: '-5%', animationDelay: '-7s', background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #ec4899 100%)', opacity: 0.1 }} />
      </div>

      <div className="relative z-10 min-h-screen flex items-center px-6 md:px-12 pt-28 pb-12">
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Content */}
          <div className="text-left aura-fade-1">
            <h1 className="text-5xl md:text-7xl font-black text-foreground leading-[1] tracking-tighter">
              {title}<br />
              <span className="shimmer-text">
                {titleHighlight}
              </span>
            </h1>
            <p className="mt-8 text-xl text-muted-foreground max-w-md font-medium leading-relaxed opacity-80">
              {subtitle}
            </p>
            <div className="mt-10 flex items-center gap-3">
              <div className="px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">{supportingText}</span>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Card (Glassmorphism) */}
          <div className="aura-fade-2 flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-md p-8 md:p-12 rounded-[3rem] border border-border/50 bg-white/40 dark:bg-white/5 backdrop-blur-3xl shadow-2xl shadow-black/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl -mr-16 -mt-16 pointer-events-none" />
              <div className="relative z-10">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

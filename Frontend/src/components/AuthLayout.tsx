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
    <div className="h-screen overflow-hidden bg-background text-foreground relative selection:bg-secondary/10 selection:text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* ─── LIQUID BACKGROUND BLOBS ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-20">
        <div className="liquid-blob absolute" style={{ width: '60vw', height: '60vw', top: '-10%', left: '-10%', background: 'transparent', opacity: 0.15 }} />
        <div className="liquid-blob absolute" style={{ width: '40vw', height: '40vw', bottom: '-5%', right: '-5%', animationDelay: '-7s', background: 'transparent', opacity: 0.1 }} />
      </div>

      <div className="relative z-10 h-full flex items-center px-6 md:px-12 pt-16">
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side - Content (centered) */}
          <div className="text-center lg:text-left aura-fade-1 flex flex-col items-center lg:items-start">
            <h1 className="text-4xl md:text-6xl font-black leading-[1.05] tracking-tighter" style={{ color: 'hsl(var(--navy-blue))' }}>
              {title}<br />
              <span className="text-black dark:text-white">
                {titleHighlight}
              </span>
            </h1>
            <p className="mt-5 text-base text-muted-foreground max-w-sm font-medium leading-relaxed opacity-80">
              {subtitle}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="px-4 py-1.5 bg-secondary/10 border border-secondary/20 rounded-full flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/90">{supportingText}</span>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Card (Compact Glassmorphism) */}
          <div className="aura-fade-2 flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-md p-6 md:p-8 rounded-[2.5rem] border border-border/50 bg-white/40 dark:bg-white/5 backdrop-blur-3xl shadow-2xl shadow-black/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-transparent -mr-16 -mt-16 pointer-events-none" />
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

import { ReactNode } from 'react';
import Navbar from './Navbar';
import FloatingElements from './FloatingElements';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  supportingText?: string;
  titleHighlight?: string;
}

const AuthLayout = ({ children, title, subtitle, supportingText, titleHighlight }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElements />
      </div>

      <div className="relative z-10 min-h-screen flex items-center px-6 md:px-12 pt-24 pb-12">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Hero Content */}
          <div className="text-left order-2 lg:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {title}<br />
              <span className="text-orange-500">
                {titleHighlight}
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-md font-medium">
              {subtitle}
            </p>
            <p className="mt-3 text-sm md:text-base text-muted-foreground/80">
              {supportingText}
            </p>
          </div>

          {/* Right Side - Auth Card */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="auth-card w-full max-w-md">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

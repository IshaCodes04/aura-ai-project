import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 40 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 60 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`drop-shadow-md hover:drop-shadow-xl transition-all duration-300 ${className}`}
    >
      <defs>
        <linearGradient id="auraGradientLogo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF7A00" />
          <stop offset="100%" stopColor="#FF0066" />
        </linearGradient>
      </defs>
      
      {/* Rounded Icon Container */}
      <rect width="60" height="60" rx="16" fill="url(#auraGradientLogo)" />
      
      {/* The AI Typography */}
      <text 
        x="50%" 
        y="52%" 
        dominantBaseline="middle" 
        textAnchor="middle" 
        fill="white" 
        style={{ 
          fontFamily: "'Inter', sans-serif", 
          fontWeight: '900', 
          fontSize: '24px',
          letterSpacing: '-0.02em'
        }}
      >
        AI
      </text>
    </svg>
  );
};

export default Logo;

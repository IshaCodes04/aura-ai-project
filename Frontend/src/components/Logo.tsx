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
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`drop-shadow-lg transition-all duration-300 ${className}`}
    >
      {/* Rounded Icon Container - flat palette */}
      <rect width="64" height="64" rx="16" fill="#7A8C5E" />
      
      {/* The AI Typography - Exact Match */}
      <text 
        x="32" 
        y="42" 
        fill="white" 
        style={{ 
          fontFamily: "system-ui, -apple-system, sans-serif", 
          fontWeight: '800', 
          fontSize: '28px',
          letterSpacing: '-0.04em',
          textAnchor: 'middle'
        }}
      >
        AI
      </text>
    </svg>
  );
};

export default Logo;

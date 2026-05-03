import React from 'react';

interface AuraAILogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

const AuraAILogo: React.FC<AuraAILogoProps> = ({ size = 'md', showText = true }) => {
  const sizeConfig = {
    sm: { container: 'w-8 h-8', icon: 24, text: 'text-sm', gap: 'gap-2' },
    md: { container: 'w-10 h-10', icon: 32, text: 'text-base', gap: 'gap-3' },
    lg: { container: 'w-12 h-12', icon: 40, text: 'text-lg', gap: 'gap-3' },
    xl: { container: 'w-16 h-16', icon: 56, text: 'text-2xl', gap: 'gap-4' },
  };

  const config = sizeConfig[size];
  const iconSize = config.icon;

  return (
    <div className={`flex items-center ${config.gap}`} style={{ fontFamily: "'Inter', 'Poppins', 'SF Pro Display', sans-serif" }}>
      {/* Logo Icon */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm"
      >
        <defs>
          <linearGradient id="auraGradientFinal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7A00" />
            <stop offset="100%" stopColor="#FF0066" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="url(#auraGradientFinal)" />
        <text 
          x="50%" 
          y="52%" 
          dominantBaseline="middle" 
          textAnchor="middle" 
          fill="white" 
          style={{ 
            fontFamily: "'Inter', sans-serif", 
            fontWeight: '900', 
            fontSize: '26px',
            letterSpacing: '-0.02em'
          }}
        >
          AI
        </text>
      </svg>

      {/* Logo Text */}
      {showText && (
        <span
          className={`${config.text} font-black text-foreground tracking-tighter whitespace-nowrap`}
        >
          Aura <span className="shimmer-text">AI</span>
        </span>
      )}
    </div>
  );
};

export default AuraAILogo;

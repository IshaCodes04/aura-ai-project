import React from 'react';

interface AuraAILogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

const AuraAILogo: React.FC<AuraAILogoProps> = ({ size = 'md', showText = true }) => {
  const sizeConfig = {
    sm: { container: 'w-8 h-8', icon: 28, text: 'text-sm', gap: 'gap-2' },
    md: { container: 'w-10 h-10', icon: 36, text: 'text-base', gap: 'gap-3' },
    lg: { container: 'w-12 h-12', icon: 44, text: 'text-lg', gap: 'gap-3' },
    xl: { container: 'w-16 h-16', icon: 60, text: 'text-2xl', gap: 'gap-4' },
  };

  const config = sizeConfig[size];
  const iconSize = config.icon;

  return (
    <div className={`flex items-center ${config.gap}`} style={{ fontFamily: "'Inter', sans-serif" }}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-md"
      >
        <defs>
          <linearGradient id="auraGradientComp" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FF7A00" />
            <stop offset="1" stopColor="#FF0066" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="url(#auraGradientComp)" />
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

      {showText && (
        <span className={`${config.text} font-black text-foreground tracking-tighter whitespace-nowrap`}>
          Aura <span className="shimmer-text">AI</span>
        </span>
      )}
    </div>
  );
};

export default AuraAILogo;

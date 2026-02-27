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
        className="shrink-0"
      >
        {/* Rounded Square Background */}
        <rect
          x="0"
          y="0"
          width="64"
          height="64"
          rx="14"
          ry="14"
          fill="#F97316"
        />

        {/* "AI" Text */}
        <text
          x="32"
          y="42"
          fontSize="28"
          fontWeight="700"
          fill="white"
          textAnchor="middle"
          fontFamily="'Inter', 'Poppins', 'SF Pro Display', sans-serif"
          letterSpacing="-0.5"
        >
          AI
        </text>
      </svg>

      {/* Logo Text */}
      {showText && (
        <span
          className={`${config.text} font-semibold text-foreground whitespace-nowrap`}
          style={{ fontFamily: "'Inter', 'Poppins', 'SF Pro Display', sans-serif" }}
        >
          Aura AI
        </span>
      )}
    </div>
  );
};

export default AuraAILogo;

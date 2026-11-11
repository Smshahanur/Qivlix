import React from 'react';

interface BrandProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

/**
 * Qivlix Midnight Arcade - Standalone Symbol
 * A bold geometric monogram 'Q' integrated with an arcade crosshair & vivid orange power core.
 * Recognizable at 16px up to 120px.
 */
export const QivlixSymbol: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
      aria-label="Qivlix Symbol"
    >
      {/* Background Frame Plate */}
      <rect width="48" height="48" rx="10" fill="#0c1222" />
      <rect x="1" y="1" width="46" height="46" rx="9" stroke="#1e293b" strokeWidth="1.5" />
      
      {/* Corner Ticks (Arcade Reticle) */}
      <path d="M5 11V5H11" stroke="#ccff00" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M43 11V5H37" stroke="#ccff00" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 37V43H11" stroke="#ccff00" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M43 37V43H37" stroke="#ccff00" strokeWidth="1.5" strokeLinecap="round" />

      {/* Main Bold Geometric Q Ring */}
      <path
        d="M24 10C16.268 10 10 16.268 10 24C10 31.732 16.268 38 24 38C27.35 38 30.43 36.82 32.86 34.84L37 38.98L39.83 36.15L35.69 32.01C37.13 29.7 38 26.96 38 24C38 16.268 31.732 10 24 10ZM24 16C28.418 16 32 19.582 32 24C32 28.418 28.418 32 24 32C19.582 32 16 28.418 16 24C16 19.582 19.582 16 24 16Z"
        fill="#ccff00"
      />

      {/* Vivid Orange Diamond Power Spark */}
      <path
        d="M24 19L27 24L24 29L21 24L24 19Z"
        fill="#ff5500"
      />
    </svg>
  );
};

/**
 * Qivlix Wordmark + Symbol Brand Lockup
 */
export const QivlixWordmark: React.FC<BrandProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
}) => {
  const iconSize = size === 'sm' ? 28 : size === 'lg' ? 44 : size === 'xl' ? 52 : 36;

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group cursor-pointer ${className}`}>
      <QivlixSymbol size={iconSize} />

      <div className="flex flex-col items-start leading-none">
        <div className="flex items-center tracking-tight font-display font-black text-slate-50 group-hover:text-white transition-colors">
          <span className={`${size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : size === 'xl' ? 'text-3xl' : 'text-xl sm:text-2xl'} tracking-[0.14em] uppercase text-[#fbfaf6]`}>
            QIVLIX
          </span>
          {/* Signature Electric Lime Pixel Dot */}
          <span className="inline-block w-1.5 h-1.5 bg-[#ccff00] ml-1 rounded-[1px] animate-pulse" />
        </div>

        {showTagline && (
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#a3e635] mt-1 font-semibold flex items-center gap-1">
            <span className="text-[#ff5500] font-bold">›</span> PLAY BEYOND LIMITS.
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * Editorial Arcade Seal Badge
 */
export const QivlixArcadeBadge: React.FC<{ label?: string }> = ({
  label = 'MIDNIGHT ARCADE // SHAHANUR MOLLAH',
}) => {
  return (
    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#0c1222] border border-[#1f2945] text-[10px] font-mono tracking-wider uppercase text-slate-300">
      <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
      <span className="text-[#fbfaf6] font-semibold">{label}</span>
      <span className="text-[#ff5500] font-bold">EST. 2026</span>
    </div>
  );
};

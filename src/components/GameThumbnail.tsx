import React, { useState, useEffect } from 'react';
import { QivlixSymbol } from './BrandLogo';

interface GameThumbnailProps {
  src: string;
  alt: string;
  title: string;
  category?: string;
  className?: string;
  compact?: boolean;
}

export const GameThumbnail: React.FC<GameThumbnailProps> = ({
  src,
  alt,
  title,
  category,
  className = 'w-full h-full object-cover',
  compact = false,
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full bg-[#060810] arcade-grid-backdrop flex flex-col items-center justify-center p-3 text-center select-none relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#ccff00]/5 via-transparent to-[#ff5500]/10 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <QivlixSymbol size={compact ? 26 : 40} />
          {!compact && (
            <>
              {category && (
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#ccff00] font-bold">
                  {category}
                </span>
              )}
              <span className="font-display font-black text-xs sm:text-sm text-[#fbfaf6] tracking-tight">
                {title}
              </span>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      className={className}
      onError={() => setHasError(true)}
    />
  );
};

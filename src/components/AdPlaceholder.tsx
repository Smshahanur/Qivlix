import React from 'react';

interface AdPlaceholderProps {
  format?: 'leaderboard' | 'rectangle' | 'banner';
  className?: string;
  slotId?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  format = 'leaderboard',
  className = '',
  slotId = '0000000000'
}) => {
  const getFormatDetails = () => {
    switch (format) {
      case 'rectangle':
        return {
          dimensions: '300 × 250 / 336 × 280',
          label: 'Medium / Large Rectangle Ad Unit',
          minHeight: 'min-h-[250px]',
          maxWidth: 'max-w-[340px]'
        };
      case 'banner':
        return {
          dimensions: 'Responsive In-Feed / Banner',
          label: 'Responsive Content Ad Unit',
          minHeight: 'min-h-[100px]',
          maxWidth: 'max-w-4xl'
        };
      case 'leaderboard':
      default:
        return {
          dimensions: '728 × 90 / 970 × 90 (Mobile 320 × 50)',
          label: 'Leaderboard Header / Footer Ad Unit',
          minHeight: 'min-h-[90px]',
          maxWidth: 'max-w-5xl'
        };
    }
  };

  const details = getFormatDetails();

  return (
    <aside
      aria-label="Advertisement placeholder"
      className={`mx-auto w-full my-6 flex flex-col items-center justify-center ${details.maxWidth} ${className}`}
    >
      <div className="w-full flex items-center justify-between px-2 mb-1 text-[11px] font-mono tracking-wider text-slate-500 uppercase">
        <span>Advertisement</span>
        <span className="text-[10px] text-slate-600">Google AdSense Ready</span>
      </div>
      <div
        className={`w-full ${details.minHeight} rounded-xl border border-dashed border-slate-800 bg-[#0a0f1d]/70 flex flex-col items-center justify-center p-4 text-center transition-colors hover:border-slate-700`}
      >
        <div className="flex items-center gap-2 mb-1.5 text-xs font-medium text-slate-400">
          <svg className="w-4 h-4 text-cyan-400/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          <span>{details.label}</span>
        </div>
        <p className="text-[11px] text-slate-500 font-mono">
          Size: {details.dimensions} · Slot: {slotId}
        </p>
        <span className="mt-2 text-[10px] text-slate-600 max-w-sm">
          Placeholder slot. Replace with your verified Google AdSense client &amp; slot tag once approved.
        </span>
      </div>
    </aside>
  );
};

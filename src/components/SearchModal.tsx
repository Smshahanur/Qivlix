import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Gamepad2, ArrowRight, Zap, Brain, Eye, HelpCircle, Compass, BookOpen } from 'lucide-react';
import { GAMES } from '../data/games';
import { GUIDES } from '../data/guides';
import { DISCOVERIES_VAULT } from '../data/playgroundContent';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

interface SearchResult {
  id: string;
  title: string;
  category: string;
  description: string;
  path: string;
  type: 'game' | 'activity' | 'guide' | 'discovery';
}

const ALL_SEARCHABLE: SearchResult[] = [
  ...GAMES.map((g) => ({
    id: g.id,
    title: g.title,
    category: g.category,
    description: g.shortDescription,
    path: `/game/${g.slug}`,
    type: 'game' as const,
  })),
  ...GUIDES.map((guide) => ({
    id: guide.id,
    title: guide.title,
    category: `${guide.category} Guide`,
    description: guide.summary,
    path: `/guides/${guide.slug}`,
    type: 'guide' as const,
  })),
  {
    id: 'reaction-rush',
    title: 'Reaction Rush',
    category: 'Reflex Speed',
    description: 'Precision millisecond sensory reflex measurement.',
    path: '/activity/reaction-rush',
    type: 'activity',
  },
  {
    id: 'memory-grid',
    title: 'Memory Grid',
    category: 'Working Memory',
    description: 'Acoustic-visual harmonic node sequence repetition.',
    path: '/activity/memory-grid',
    type: 'activity',
  },
  {
    id: 'odd-one-out',
    title: 'Odd One Out',
    category: 'Visual Logic',
    description: 'Rapid cognitive categorization against a 15-second timer.',
    path: '/activity/odd-one-out',
    type: 'activity',
  },
  {
    id: 'mystery-picture',
    title: 'Mystery Picture',
    category: 'Investigation',
    description: 'Declassify enigmatic science & history subjects using progressive clues.',
    path: '/activity/mystery-picture',
    type: 'activity',
  },
  {
    id: 'daily-riddle',
    title: 'Daily Riddle',
    category: 'Enigma Vault',
    description: 'Lateral logic thought experiments for cognitive sharpening.',
    path: '/activity/daily-riddle',
    type: 'activity',
  },
  ...DISCOVERIES_VAULT.map((d) => ({
    id: d.id,
    title: d.title,
    category: d.topic,
    description: d.summary,
    path: '/discover',
    type: 'discovery' as const,
  })),
];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? ALL_SEARCHABLE.filter(
        (item) =>
          item.title.toLowerCase().includes(trimmed) ||
          item.category.toLowerCase().includes(trimmed) ||
          item.description.toLowerCase().includes(trimmed)
      ).slice(0, 8)
    : ALL_SEARCHABLE.slice(0, 6);

  const handleSelect = (path: string) => {
    onNavigate(path);
    onClose();
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'game':
        return <Gamepad2 className="w-4 h-4 text-[#ccff00]" />;
      case 'guide':
        return <BookOpen className="w-4 h-4 text-[#a3e635]" />;
      case 'activity':
        return <Zap className="w-4 h-4 text-[#ff5500]" />;
      case 'discovery':
        return <Compass className="w-4 h-4 text-[#ccff00]" />;
      default:
        return <Search className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 bg-[#060810]/85 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-xl rounded-2xl bg-[#0a0e1a] border border-[#1b243b] shadow-2xl overflow-hidden relative arcade-corner-ticks">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#1b243b] bg-[#060810]">
          <Search className="w-4 h-4 text-[#ccff00] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search games, strategy guides, or discoveries..."
            className="w-full bg-transparent text-sm text-[#fbfaf6] placeholder-slate-500 focus:outline-none font-mono"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0a0e1a] border border-[#1b243b] text-slate-400">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-[#1b243b]/40">
          {results.length > 0 ? (
            results.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.path)}
                className="w-full text-left p-3 rounded-lg hover:bg-[#060810] transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0c1222] border border-[#1b243b] flex items-center justify-center shrink-0">
                    {getIcon(item.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-sm text-[#fbfaf6] group-hover:text-[#ccff00] transition-colors">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-mono uppercase text-[#a3e635]">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-[#ccff00] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </button>
            ))
          ) : (
            <div className="py-12 text-center text-xs font-mono text-slate-500">
              No matching games or guides found for &quot;{query}&quot;.
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2 bg-[#060810] border-t border-[#1b243b] text-[10px] font-mono text-slate-500 flex items-center justify-between">
          <span>{ALL_SEARCHABLE.length} TOTAL INDEXED ITEMS</span>
          <span>QIVLIX MIDNIGHT ARCADE</span>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Gamepad2, ArrowRight, Zap, Brain, Eye, HelpCircle, Compass } from 'lucide-react';
import { GAMES } from '../data/games';
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
  type: 'game' | 'activity' | 'discovery';
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
    category: 'Lateral Logic',
    description: 'Solve philosophical and scientific word enigmas with hints.',
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
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Global shortcut to trigger search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = ALL_SEARCHABLE.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  });

  const handleSelect = (path: string) => {
    onClose();
    onNavigate(path);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'activity': return <Zap className="w-4 h-4 text-amber-400" />;
      case 'discovery': return <Compass className="w-4 h-4 text-purple-400" />;
      default: return <Gamepad2 className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-xl rounded-2xl bg-[#0b101e] border border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-slate-800 px-4 py-3 bg-slate-900/60">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search mini-games, activities, enigmas, or discoveries..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-0 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 hover:text-slate-200 text-slate-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-800 rounded border border-slate-700">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-800/40">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No activities or games match "{query}".
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.path)}
                className="w-full p-3 rounded-xl flex items-center justify-between text-left hover:bg-slate-850/80 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3 pr-2">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                    {getIcon(item.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">· {item.category}</span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{item.description}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

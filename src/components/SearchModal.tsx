import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Gamepad2, ArrowRight } from 'lucide-react';
import { GAMES } from '../data/games';
import { GameInfo } from '../types/game';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGame: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectGame }) => {
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

  const filtered = GAMES.filter((game) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      game.title.toLowerCase().includes(q) ||
      game.category.toLowerCase().includes(q) ||
      game.shortDescription.toLowerCase().includes(q) ||
      game.tagline.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-xl rounded-2xl bg-[#0b101e] border border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800/80 gap-3">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search games by name or category (e.g., snake, puzzle, AI)..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-slate-800/50">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">
              No games found matching "{query}". Try "Puzzle", "Arcade", or "Snake".
            </div>
          ) : (
            filtered.map((game) => (
              <button
                key={game.id}
                onClick={() => {
                  onSelectGame(game.slug);
                  onClose();
                }}
                className="w-full px-3 py-3 rounded-xl hover:bg-slate-800/60 transition-colors flex items-center justify-between group text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={game.thumbnail}
                      alt={game.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <Gamepad2 className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">
                        {game.title}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {game.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {game.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-medium text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Play</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 py-2 bg-[#090d18] border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
          <span>{filtered.length} games available</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Play, Trophy, Clock, ArrowRight } from 'lucide-react';
import { GameInfo } from '../types/game';

interface GameCardProps {
  game: GameInfo;
  onPlay: (slug: string) => void;
  featured?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onPlay, featured = false }) => {
  const [highScore, setHighScore] = useState<number | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`qivlix_highscore_${game.id}`);
      if (saved) {
        setHighScore(parseInt(saved, 10));
      }
    } catch {}
  }, [game.id]);

  return (
    <div
      onClick={() => onPlay(game.slug)}
      className={`group relative rounded-xl bg-[#0a0e1a] border border-[#1b243b] hover:border-[#ccff00] p-4 sm:p-5 transition-all duration-200 flex flex-col justify-between cursor-pointer ${
        featured ? 'md:col-span-2 bg-gradient-to-br from-[#0c1222] to-[#0a0e1a]' : ''
      }`}
    >
      <div>
        {/* Thumbnail Viewport with Arcade Bezel Frame */}
        <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-[#060810] border border-[#1b243b] mb-4">
          <img
            src={game.thumbnail}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.classList.add('bg-[#0f1527]');
              }
            }}
          />

          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060810] via-transparent to-transparent opacity-80" />

          {/* Quick Play Floating Action */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#060810]/60">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ccff00] text-[#060810] font-black text-xs shadow-md tracking-wider uppercase transform scale-95 group-hover:scale-100 transition-transform">
              <Play className="w-3.5 h-3.5 fill-current" />
              Launch Game
            </span>
          </div>

          {/* High Score Stamp */}
          {highScore !== null && highScore > 0 && (
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#060810]/90 border border-[#ff5500]/60 text-[11px] font-mono text-[#ff6600] font-bold">
              <Trophy className="w-3 h-3 text-[#ff5500]" />
              <span>{highScore.toLocaleString()}</span>
            </div>
          )}

          {/* Category Chip */}
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#060810]/90 border border-[#1b243b] text-[10px] font-mono uppercase text-[#ccff00] font-bold tracking-wider">
            {game.category}
          </div>
        </div>

        {/* Unboxed Metadata (Zero Pill Rule) */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5 font-mono">
          <span className="text-[#a3e635] font-semibold">{game.difficulty}</span>
          <span aria-hidden="true" className="text-slate-700">·</span>
          <span className="flex items-center gap-1 text-slate-300">
            <Clock className="w-3 h-3 text-slate-500" /> {game.estimatedPlayTime}
          </span>
          {game.badge && (
            <>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span className="text-[#ff6600] font-semibold">{game.badge}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-lg text-[#fbfaf6] group-hover:text-[#ccff00] transition-colors">
          {game.title}
        </h3>

        {/* Short Description */}
        <p className="mt-1 text-xs text-slate-300 line-clamp-2 leading-relaxed">
          {game.shortDescription}
        </p>
      </div>

      {/* Card Footer with Technical Action */}
      <div className="mt-4 pt-3 border-t border-[#1b243b] flex items-center justify-between text-xs">
        <span className="font-mono text-[11px] text-slate-400">Zero Install</span>
        <span className="font-bold text-[#ccff00] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
          <span>Play Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};

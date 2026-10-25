import React, { useState, useEffect } from 'react';
import { Play, Trophy, Sparkles } from 'lucide-react';
import { GameInfo } from '../types/game';

interface GameCardProps {
  game: GameInfo;
  onPlay: (slug: string) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onPlay }) => {
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
      className="group relative rounded-2xl bg-[#0d1322] border border-slate-800/80 hover:border-cyan-500/50 p-4 transition-all duration-300 hover:-translate-y-1 glow-card flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Thumbnail Viewport */}
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-slate-800/60 mb-4">
          <img
            src={game.thumbnail}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // Graceful styled fallback container
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.classList.add('bg-gradient-to-br', 'from-slate-900', 'via-purple-950/40', 'to-cyan-950/40');
              }
            }}
          />

          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

          {/* Quick Play Floating Action */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/30 transform scale-90 group-hover:scale-100 transition-transform">
              <Play className="w-3.5 h-3.5 fill-current" />
              Play Now
            </span>
          </div>

          {/* High Score Stamp if exists */}
          {highScore !== null && highScore > 0 && (
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-amber-400">
              <Trophy className="w-3 h-3 text-amber-400" />
              <span>{highScore.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Unboxed Metadata (Zero Pill Rule) */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5 font-medium">
          <span className="text-cyan-400">{game.category}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Instant Play</span>
          {game.badge && (
            <>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-purple-400">{game.badge}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-lg text-slate-100 group-hover:text-cyan-300 transition-colors">
          {game.title}
        </h3>

        {/* Short Description */}
        <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {game.shortDescription}
        </p>
      </div>

      {/* Card Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
        <span className="font-mono text-[11px]">Free · HTML5</span>
        <span className="font-semibold text-cyan-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
          Launch →
        </span>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { getStoredProfile } from '../utils/progression';
import { Zap, Play, Trophy, Sparkles, Filter } from 'lucide-react';

interface QuickPlayPageProps {
  onNavigate: (path: string) => void;
}

interface QuickGameItem {
  id: string;
  title: string;
  tagline: string;
  category: 'Reflex' | 'Arcade' | 'Spatial';
  duration: string;
  targetPath: string;
  color: string;
  isNew?: boolean;
}

const QUICK_GAMES: QuickGameItem[] = [
  {
    id: 'reaction-rush',
    title: 'Reaction Rush',
    tagline: 'Measure your reaction speed in milliseconds with high-precision sensory triggers.',
    category: 'Reflex',
    duration: '1 min',
    targetPath: '/activity/reaction-rush',
    color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
    isNew: true,
  },
  {
    id: 'odd-one-out',
    title: 'Odd One Out',
    tagline: 'Rapid-fire visual categorization against a ticking 15-second clock.',
    category: 'Reflex',
    duration: '2 min',
    targetPath: '/activity/odd-one-out',
    color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/30',
    isNew: true,
  },
  {
    id: 'snake',
    title: 'Cyber Snake',
    tagline: 'Glide through the neon matrix, collect power orbs, and grow without colliding.',
    category: 'Arcade',
    duration: '3 min',
    targetPath: '/game/snake',
    color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30',
  },
  {
    id: 'block-puzzle',
    title: 'Block Puzzle',
    tagline: 'Fit polyomino neon shapes onto the 10x10 cyber grid to blast line clears.',
    category: 'Spatial',
    duration: '3 min',
    targetPath: '/game/block-puzzle',
    color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30',
  },
  {
    id: 'neon-breakout',
    title: 'Neon Breakout',
    tagline: 'Paddle-deflect supersonic energy orbs to shatter defensive cyber barriers.',
    category: 'Arcade',
    duration: '2 min',
    targetPath: '/game/neon-breakout',
    color: 'from-rose-500/20 to-pink-500/20 border-rose-500/30',
  },
  {
    id: 'cyber-flap',
    title: 'Cyber Flap',
    tagline: 'Navigate a photonic drone through narrow high-voltage data conduits.',
    category: 'Arcade',
    duration: '1 min',
    targetPath: '/game/cyber-flap',
    color: 'from-violet-500/20 to-fuchsia-500/20 border-violet-500/30',
  },
];

export const QuickPlayPage: React.FC<QuickPlayPageProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<'All' | 'Reflex' | 'Arcade' | 'Spatial'>('All');
  const profile = getStoredProfile();

  const filteredGames = QUICK_GAMES.filter((g) => filter === 'All' || g.category === filter);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-1">
            <Zap className="w-4 h-4" />
            <span>Instant Entertainment</span>
            <span aria-hidden="true">·</span>
            <span>Zero Loading Delay</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Quick Play Arena</h1>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            High-energy arcade, reflex, and spatial games built for instant fun. Play in quick 1-to-3 minute sessions on any phone or desktop.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl self-start md:self-auto">
          {(['All', 'Reflex', 'Arcade', 'Spatial'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Games */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game) => {
          const pb = profile.personalBests[game.id];
          return (
            <div
              key={game.id}
              className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-lg hover:shadow-cyan-500/10"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-medium">{game.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{game.duration}</span>
                  </div>
                  {game.isNew && (
                    <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">New</span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  {game.title}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{game.tagline}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  {pb !== undefined ? (
                    <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" /> Best: {pb} {game.id.includes('reaction') ? 'ms' : 'pts'}
                    </div>
                  ) : (
                    <span className="text-[11px] text-slate-500">Unplayed</span>
                  )}
                </div>

                <button
                  onClick={() => onNavigate(game.targetPath)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Play Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

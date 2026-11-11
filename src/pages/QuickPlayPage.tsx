import React, { useState } from 'react';
import { getStoredProfile } from '../utils/progression';
import { GAMES } from '../data/games';
import { Zap, Play, Trophy, Sparkles, Filter, Clock } from 'lucide-react';
import { AdPlaceholder } from '../components/AdPlaceholder';

interface QuickPlayPageProps {
  onNavigate: (path: string) => void;
}

export const QuickPlayPage: React.FC<QuickPlayPageProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<string>('All');
  const profile = getStoredProfile();

  const categories = ['All', 'Puzzle', 'Arcade', 'Reflex', 'Strategy', 'Memory', 'Word'];

  // Add the quick activities alongside the full games library
  const quickActivities = [
    {
      id: 'reaction-rush',
      slug: 'reaction-rush',
      title: 'Reaction Rush',
      category: 'Reflex' as const,
      tagline: 'Measure your reaction speed in milliseconds with high-precision sensory triggers.',
      estimatedPlayTime: '1 min',
      difficulty: 'Casual' as const,
      targetPath: '/activity/reaction-rush',
      badge: 'Quick Test'
    },
    {
      id: 'odd-one-out',
      slug: 'odd-one-out',
      title: 'Odd One Out',
      category: 'Reflex' as const,
      tagline: 'Rapid-fire visual categorization against a ticking 15-second clock.',
      estimatedPlayTime: '2 min',
      difficulty: 'Intermediate' as const,
      targetPath: '/activity/odd-one-out',
      badge: 'Speed Logic'
    },
    {
      id: 'memory-grid',
      slug: 'memory-grid',
      title: 'Memory Grid',
      category: 'Memory' as const,
      tagline: 'Ascending audio-visual sequence repetition to test working memory span.',
      estimatedPlayTime: '2 min',
      difficulty: 'Intermediate' as const,
      targetPath: '/activity/memory-grid',
      badge: 'Sequence'
    }
  ];

  // Combined catalog
  const fullCatalog = [
    ...quickActivities,
    ...GAMES.map((g) => ({
      id: g.id,
      slug: g.slug,
      title: g.title,
      category: g.category,
      tagline: g.tagline,
      estimatedPlayTime: g.estimatedPlayTime,
      difficulty: g.difficulty,
      targetPath: `/game/${g.slug}`,
      badge: g.badge
    }))
  ];

  const filteredGames = fullCatalog.filter(
    (g) => filter === 'All' || g.category === filter
  );

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
            <span aria-hidden="true">·</span>
            <span className="text-cyan-400">Play Beyond Limits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Quick Play Arena</h1>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            High-energy arcade, reflex, and spatial games built for instant fun. Play in quick 1-to-5 minute sessions on any phone or desktop with persistent browser scoring.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl self-start md:self-auto overflow-x-auto no-scrollbar max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredGames.map((game) => {
          const pb = profile.personalBests[game.id];
          return (
            <div
              key={game.id}
              className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-lg hover:shadow-cyan-500/10"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-medium">{game.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Clock className="w-3 h-3 text-slate-500" /> {game.estimatedPlayTime}
                    </span>
                  </div>
                  {game.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 font-mono">
                      {game.badge}
                    </span>
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
                    <span className="text-[11px] text-slate-500 font-mono">Unplayed</span>
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

      <AdPlaceholder format="banner" slotId="quickplay-bottom-banner" />
    </div>
  );
};

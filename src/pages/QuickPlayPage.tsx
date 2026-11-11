import React, { useState } from 'react';
import { getStoredProfile } from '../utils/progression';
import { GAMES } from '../data/games';
import { Zap, Play, Trophy, Clock, ArrowRight } from 'lucide-react';
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
      badge: 'Benchmark'
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
      badge: 'Visual Logic'
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
      badge: 'Working Memory'
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
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1b243b]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#ccff00] font-bold mb-1 uppercase tracking-wider">
            <Zap className="w-4 h-4 text-[#ccff00]" />
            <span>Instant Entertainment</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-[#ff6600]">Zero Loading Delay</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-slate-300">Play Beyond Limits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#fbfaf6] tracking-tight">Quick Play Arena</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            High-energy arcade, reflex, and spatial games built for instant fun. Play in quick 1-to-5 minute sessions on any phone or desktop with persistent browser scoring.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-[#0a0e1a] border border-[#1b243b] rounded-xl self-start md:self-auto overflow-x-auto no-scrollbar max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase whitespace-nowrap transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-[#ccff00] text-[#060810] shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Games */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredGames.map((game) => {
          const pb = profile.personalBests[game.id];
          return (
            <div
              key={game.id}
              className="p-5 sm:p-6 rounded-xl bg-[#0a0e1a] border border-[#1b243b] hover:border-[#ccff00] transition-colors flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-[#a3e635] font-semibold">{game.category}</span>
                    <span aria-hidden="true" className="text-slate-700">·</span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3 text-slate-500" /> {game.estimatedPlayTime}
                    </span>
                  </div>
                  {game.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#060810] text-[#ff6600] border border-[#ff5500]/40 font-bold">
                      {game.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-[#fbfaf6] group-hover:text-[#ccff00] transition-colors">
                  {game.title}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{game.tagline}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#1b243b] flex items-center justify-between">
                <div>
                  {pb !== undefined ? (
                    <div className="text-[11px] font-mono text-[#ff6600] font-bold flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5 text-[#ff5500]" /> Best: {pb} {game.id.includes('reaction') ? 'ms' : 'pts'}
                    </div>
                  ) : (
                    <span className="text-[11px] text-slate-500 font-mono">Unplayed</span>
                  )}
                </div>

                <button
                  onClick={() => onNavigate(game.targetPath)}
                  className="px-4 py-2 rounded-lg bg-[#ccff00] hover:bg-[#d9ff33] text-[#060810] font-black font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
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

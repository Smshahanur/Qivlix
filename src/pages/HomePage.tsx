import React, { useState } from 'react';
import { Gamepad2, Sparkles, Zap, Shield, Trophy, Smartphone, ArrowRight, Search, Play } from 'lucide-react';
import { GAMES, CATEGORIES } from '../data/games';
import { GameCard } from '../components/GameCard';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { GameCategory } from '../types/game';

interface HomePageProps {
  onSelectGame: (slug: string) => void;
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectGame, onOpenSearch }) => {
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = GAMES.filter((game) => {
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-14 border-b border-slate-800/80 bg-gradient-to-b from-[#090e1c] via-[#070a12] to-[#070a12]">
        {/* Glow ambient backdrops */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Hero Text Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Creator Kicker (Zero Pill Rule: clean unboxed text) */}
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-medium tracking-wide">
                <span>Qivlix Gaming</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Crafted by Shahanur Mollah</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-purple-400">Instant HTML5</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display font-black text-4xl sm:text-6xl text-slate-100 tracking-tight leading-[1.08] text-balance">
                Play Beyond Limits.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                Experience high-performance browser games with zero downloads, zero loading screens, and silky 60fps responsiveness across mobile, tablet, and PC.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onSelectGame('block-puzzle')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Play Featured: Block Puzzle</span>
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('games-grid');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Gamepad2 className="w-4 h-4 text-purple-400" />
                  <span>Browse All {GAMES.length} Games</span>
                </button>
              </div>

              {/* Key Platform Stats (Zero Pill Rule: unboxed typography) */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-md text-left">
                <div>
                  <div className="text-2xl font-black font-mono text-cyan-400 tabular-nums">{GAMES.length}</div>
                  <div className="text-xs text-slate-400">Playable Games</div>
                </div>
                <div>
                  <div className="text-2xl font-black font-mono text-purple-400 tabular-nums">0</div>
                  <div className="text-xs text-slate-400">Downloads Req.</div>
                </div>
                <div>
                  <div className="text-2xl font-black font-mono text-amber-400 tabular-nums">100%</div>
                  <div className="text-xs text-slate-400">Free to Play</div>
                </div>
              </div>
            </div>

            {/* Hero Image Showcase Column */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800/90 bg-[#0d1424] shadow-2xl group">
                <img
                  src="/src/assets/images/qivlix_hero_banner_1792937338560.jpg"
                  alt="Qivlix Cyber Gaming Arena"
                  className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Overlay Floating Card */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#090f1d]/90 backdrop-blur-md border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">Featured Arcade</span>
                    <span className="font-display font-bold text-sm text-slate-100">Cyber Snake &amp; Block Puzzle</span>
                  </div>
                  <button
                    onClick={() => onSelectGame('snake')}
                    className="px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Launch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Leaderboard Ad Placeholder */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <AdPlaceholder format="leaderboard" slotId="top-home-leaderboard" />
      </div>

      {/* Games Catalog Section */}
      <section id="games-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
              Arcade &amp; Logic Catalog
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-100">
              Choose Your Game
            </h2>
          </div>

          {/* Search bar inside section */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Functional Category Filter Tabs (Interactive Segmented Control) */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/80 border border-slate-800/80 mb-8 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 font-semibold border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Grid of Game Cards */}
        {filteredGames.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-slate-900/30 border border-slate-800">
            <p className="text-sm text-slate-400 mb-3">No games found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-cyan-400 text-slate-950 font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} onPlay={onSelectGame} />
            ))}
          </div>
        )}
      </section>

      {/* Mid-Page Banner Ad Placement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <AdPlaceholder format="banner" slotId="mid-home-banner" />
      </div>

      {/* Why Qivlix Section */}
      <section className="border-t border-slate-800/80 bg-[#060912] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-purple-400">
              The Qivlix Standard
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-100 mt-1 mb-3">
              Engineered for Modern Web Gaming
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              No bloated app stores, no 500MB downloads, no mandatory accounts. Just pristine games running locally in your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-slate-100 mb-2">
                Sub-Millisecond Response
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Lightweight HTML5 Canvas and React state machines guarantee zero input lag and consistent 60 FPS gameplay on any device.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-slate-100 mb-2">
                Mobile Touch &amp; Keyboard
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every game includes custom swipe gestures and on-screen D-pads for Android and iPhone, plus keyboard shortcuts for desktop players.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-slate-100 mb-2">
                Privacy-First Gaming
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                High scores and preferences are saved strictly in your local browser storage. No intrusive tracking, tracking cookies, or mandatory signups.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

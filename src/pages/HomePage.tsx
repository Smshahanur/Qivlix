import React, { useState, useEffect } from 'react';
import { getDailyChallenge, getTodayDateStr } from '../utils/dailySystem';
import { getStoredProfile, onProfileChange } from '../utils/progression';
import { DISCOVERIES_VAULT } from '../data/playgroundContent';
import { GAMES, CATEGORIES } from '../data/games';
import { GUIDES } from '../data/guides';
import { UserProfile, DailyChallengeData } from '../types/playground';
import { GameCategory } from '../types/game';
import { GameCard } from '../components/GameCard';
import { QivlixSymbol, QivlixArcadeBadge } from '../components/BrandLogo';
import {
  Play,
  ArrowRight,
  Flame,
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  Gamepad2,
  Compass,
  Trophy,
  Dices,
  Sparkles,
  Search,
  Target,
  Cpu,
  Layers,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { AdPlaceholder } from '../components/AdPlaceholder';

interface HomePageProps {
  onSelectGame: (slug: string) => void;
  onNavigate: (path: string) => void;
  onOpenSurprise: () => void;
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectGame,
  onNavigate,
  onOpenSurprise,
  onOpenSearch,
}) => {
  const [profile, setProfile] = useState<UserProfile>(getStoredProfile);
  const [dailyData] = useState<DailyChallengeData>(() => getDailyChallenge());
  const [activeCategory, setActiveCategory] = useState<GameCategory>('All');

  useEffect(() => {
    return onProfileChange((updated) => setProfile(updated));
  }, []);

  const todayStr = getTodayDateStr();
  const todayProgress = profile.dailyCompletions[todayStr] || {
    completedActivityIds: [],
    mysteryCompleted: false,
    allCompleted: false,
  };
  const completedCount = todayProgress.completedActivityIds.length;

  // Filtered games
  const filteredGames = GAMES.filter(
    (g) => activeCategory === 'All' || g.category === activeCategory
  );

  // Spotlight game (Block Puzzle or first game)
  const spotlightGame = GAMES[0];

  // Daily Discovery highlight (deterministic by date)
  const discIndex =
    Math.abs(todayStr.split('-').reduce((acc, part) => acc + parseInt(part, 10), 0)) %
    DISCOVERIES_VAULT.length;
  const discoveryOfTheDay = DISCOVERIES_VAULT[discIndex];

  return (
    <div className="w-full space-y-12 sm:space-y-16 pb-20">
      {/* Hero Section: Midnight Arcade Masthead */}
      <section className="relative overflow-hidden pt-8 sm:pt-12 pb-12 sm:pb-16 border-b border-[#1b243b] bg-[#060810] arcade-grid-backdrop">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Bold Editorial Typography */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Creator & Sub-brand metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#a3e635]">
                <QivlixArcadeBadge label="QIVLIX // INDEPENDENT ARCADE" />
                <span className="text-slate-600 hidden sm:inline">·</span>
                <span className="text-slate-300 hidden sm:inline">BY SHAHANUR MOLLAH</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="font-display font-black text-[clamp(2.1rem,7vw,4.2rem)] text-[#fbfaf6] tracking-tight leading-[1.04] text-balance">
                  ARCADE WITHOUT <br />
                  <span className="text-[#ccff00] underline decoration-[#ff5500] decoration-4 underline-offset-8">
                    LIMITS.
                  </span>
                </h1>
                <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-[#ff6600] font-bold pt-1">
                  PLAY BEYOND LIMITS · ZERO DOWNLOADS · 60FPS NATIVE
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Step into a distinctive browser entertainment laboratory engineered for pure tactical skill. High-precision polyomino puzzles, 2048 algorithmic merges, retro speed runs, and cognitive challenges.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-1 w-full sm:w-auto">
                <button
                  onClick={() => onNavigate('/#games')}
                  className="px-6 py-3.5 rounded-lg bg-[#ccff00] hover:bg-[#d9ff33] text-[#060810] font-black text-xs sm:text-sm tracking-wider uppercase shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Play All 10 Games</span>
                </button>

                <button
                  onClick={() => onNavigate('/daily')}
                  className="px-5 py-3.5 rounded-lg bg-[#0c1222] hover:bg-[#12192e] border border-[#ff5500]/70 text-[#ff6600] hover:text-[#ff7722] font-bold text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                >
                  <span>Daily Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenSurprise}
                  className="px-4 py-3.5 rounded-lg bg-[#0c1222] hover:bg-[#12192e] border border-[#1b243b] hover:border-[#2a375a] text-slate-200 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto"
                  title="Random Game Roulette"
                >
                  <Dices className="w-4 h-4 text-[#ccff00]" />
                  <span>Surprise Me</span>
                </button>
              </div>

              {/* Technical Profile Status Strip (Real User LocalStorage Data) */}
              <div className="pt-2">
                <div className="inline-flex flex-col sm:flex-row items-stretch sm:items-center p-3 rounded-xl bg-[#0a0e1a] border border-[#1b243b] text-xs gap-3 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#1b243b] font-mono">
                  <div className="flex items-center gap-2 text-[#ff6600] font-bold">
                    <Flame className="w-4 h-4 shrink-0 text-[#ff5500]" />
                    <span>{profile.streak} DAY STREAK</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#ccff00] pt-2 sm:pt-0 sm:pl-6 font-semibold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{completedCount} / 3 DAILY TASKS DONE</span>
                  </div>
                  <div className="text-slate-300 pt-2 sm:pt-0 sm:pl-6">
                    <span className="text-[#a3e635] font-bold">{profile.points}</span> TOTAL XP
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Arcade Spotlight Feature (Asymmetrical Cabinet Dossier) */}
            <div className="lg:col-span-5">
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0a0e1a] border border-[#1b243b] hover:border-[#ccff00] transition-colors relative overflow-hidden shadow-2xl arcade-corner-ticks">
                {/* Header Tag */}
                <div className="flex items-center justify-between text-xs mb-3 font-mono">
                  <div className="flex items-center gap-2 text-[#ccff00] font-bold uppercase tracking-wider">
                    <Target className="w-3.5 h-3.5 text-[#ccff00]" />
                    <span>Arcade Spotlight of the Day</span>
                  </div>
                  <span className="text-[#ff6600] font-bold">{spotlightGame.category}</span>
                </div>

                {/* Spotlight Artwork */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#060810] border border-[#1b243b] mb-4">
                  <img
                    src={spotlightGame.thumbnail}
                    alt={spotlightGame.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060810] via-transparent to-transparent opacity-70" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#060810]/90 border border-[#1b243b] text-[10px] font-mono text-[#ccff00] font-bold uppercase">
                      {spotlightGame.badge || 'Popular'}
                    </span>
                    <span className="text-xs font-mono text-slate-300">
                      {spotlightGame.estimatedPlayTime}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#fbfaf6]">
                  {spotlightGame.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {spotlightGame.tagline}
                </p>

                {/* Technical Specs Grid */}
                <div className="grid grid-cols-2 gap-2 my-4 p-3 rounded-lg bg-[#060810] border border-[#1b243b] text-[11px] font-mono text-slate-400">
                  <div>
                    <span className="text-slate-500 block text-[10px]">DIFFICULTY</span>
                    <span className="text-[#a3e635] font-semibold">{spotlightGame.difficulty}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">ENGINE</span>
                    <span className="text-slate-200">HTML5 Canvas 60FPS</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">WIN CONDITION</span>
                    <span className="text-slate-200">Continuous Polyomino Clears</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">STRATEGY GUIDE</span>
                    <button
                      onClick={() => onNavigate('/guides/block-puzzle-polyomino-strategy')}
                      className="text-[#ccff00] hover:underline"
                    >
                      Read Guide →
                    </button>
                  </div>
                </div>

                {/* Launch Button */}
                <button
                  onClick={() => onSelectGame(spotlightGame.slug)}
                  className="w-full py-3 rounded-lg bg-[#ccff00] hover:bg-[#d9ff33] text-[#060810] font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Launch {spotlightGame.title} Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section 1: Playable Browser Games Catalog (#games) */}
        <section id="games" className="space-y-8 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1b243b] pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ccff00]">
                <Gamepad2 className="w-4 h-4" />
                <span>The Complete Catalog · All 10 Games Functional</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#fbfaf6] tracking-tight mt-1">
                Instant Playable Arcade
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Tested and calibrated for desktop mechanical keyboards and mobile touchscreens. Choose a category below or explore all titles.
              </p>
            </div>

            {/* Category Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-[#0a0e1a] border border-[#1b243b] rounded-xl overflow-x-auto no-scrollbar max-w-full">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#ccff00] text-[#060810] shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Games Grid (Distinctive layout: first 2 as featured dual cards, remaining 8 in balanced grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game, idx) => (
              <GameCard
                key={game.id}
                game={game}
                onPlay={onSelectGame}
                featured={activeCategory === 'All' && idx === 0}
              />
            ))}
          </div>
        </section>

        {/* Mid-Page AdSense Placeholder */}
        <AdPlaceholder format="banner" slotId="home-mid-banner" />

        {/* Section 2: Strategy Dispatch & Editorial Guides */}
        <section className="p-6 sm:p-8 rounded-2xl bg-[#0a0e1a] border border-[#1b243b] space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1b243b] pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#a3e635]">
                <BookOpen className="w-4 h-4" />
                <span>Qivlix Strategy Dispatch</span>
              </div>
              <h2 className="text-2xl font-black text-[#fbfaf6] tracking-tight mt-1">
                Game Guides &amp; Tactical Walkthroughs
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
                In-depth mathematical breakdowns, polyomino geometry, and corner-lock execution authored by founder <strong className="text-white">Shahanur Mollah</strong>.
              </p>
            </div>

            <button
              onClick={() => onNavigate('/guides')}
              className="px-4 py-2.5 rounded-lg bg-[#0c1222] border border-[#ccff00]/60 hover:border-[#ccff00] text-[#ccff00] font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
            >
              <span>Explore All Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {GUIDES.slice(0, 3).map((guide) => (
              <article
                key={guide.id}
                className="p-5 rounded-xl bg-[#060810] border border-[#1b243b] hover:border-[#ccff00] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                    <span className="text-[#a3e635] font-semibold">{guide.category}</span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3 text-slate-500" /> {guide.readTime}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-[#fbfaf6] group-hover:text-[#ccff00] transition-colors leading-snug">
                    {guide.title}
                  </h3>

                  <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                    {guide.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#1b243b] flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-slate-400">By {guide.author}</span>
                  <button
                    onClick={() => onNavigate(`/guides/${guide.slug}`)}
                    className="font-bold text-[#ccff00] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 3: Daily Enigma Terminal (Deterministic Challenge Suite) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1b243b] pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#ccff00] uppercase tracking-wider font-semibold">
                <span>The Daily Portal</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-300">{dailyData.formattedDate}</span>
              </div>
              <h2 className="text-2xl font-black text-[#fbfaf6] tracking-tight mt-0.5">
                Today's Three Synchronized Tasks
              </h2>
            </div>

            <button
              onClick={() => onNavigate('/daily')}
              className="text-xs font-mono font-bold text-[#ccff00] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Full Daily Terminal →</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {dailyData.activities.map((act, idx) => {
              const isDone = todayProgress.completedActivityIds.includes(act.id);
              return (
                <div
                  key={act.id}
                  className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
                    isDone
                      ? 'bg-[#0a1410] border-[#a3e635]/40'
                      : 'bg-[#0a0e1a] border-[#1b243b] hover:border-[#2a375a]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2 font-mono text-xs">
                      <span className="text-slate-500">TASK #{idx + 1}</span>
                      {isDone ? (
                        <span className="flex items-center gap-1 text-[#a3e635] font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> DONE
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-slate-500">
                          <Circle className="w-3.5 h-3.5" /> PENDING
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-mono text-[#ff6600] font-semibold">{act.category}</div>
                    <h3 className="text-base font-bold text-[#fbfaf6] mt-0.5">{act.title}</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{act.subtitle}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#1b243b] flex items-center justify-between font-mono text-xs">
                    <span className="text-[#ccff00] font-bold">+{act.pointsReward} XP</span>
                    <button
                      onClick={() => onNavigate(act.targetPath)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isDone
                          ? 'bg-[#151c33] text-slate-300 hover:text-white'
                          : 'bg-[#ccff00] text-[#060810] hover:bg-[#d9ff33]'
                      }`}
                    >
                      {isDone ? 'Replay' : 'Play Now'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 4: Discovery of the Day & Brand Philosophy */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Discovery Card (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#0a0e1a] border border-[#1b243b] flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ccff00]">
                <Compass className="w-4 h-4" />
                <span>Discovery of the Day · Scientific Curiosity</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#fbfaf6]">{discoveryOfTheDay.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {discoveryOfTheDay.summary}
              </p>
              <div className="text-xs font-mono text-slate-400 pt-1">
                TOPIC: <span className="text-[#a3e635]">{discoveryOfTheDay.topic}</span> · READ TIME: {discoveryOfTheDay.readTime}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#1b243b] flex justify-end">
              <button
                onClick={() => onNavigate('/discover')}
                className="px-5 py-2.5 rounded-lg bg-[#0c1222] border border-[#1b243b] hover:border-[#ccff00] text-[#ccff00] font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Enter Discovery Vault</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Platform Identity Card (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#0a0e1a] border border-[#1b243b] flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ff6600]">
                <ShieldCheck className="w-4 h-4" />
                <span>Midnight Arcade Architecture</span>
              </div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-[#fbfaf6]">
                Built for Players, Not Ad Algorithms
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Founded by <strong className="text-white">Shahanur Mollah</strong> with one mission: <em className="text-[#ccff00] not-italic font-semibold">Play Beyond Limits.</em> Every game is free forever, rendered natively in your browser with zero intrusive overlays.
              </p>
            </div>

            <div className="pt-4 border-t border-[#1b243b] flex items-center justify-between">
              <button
                onClick={() => onNavigate('/about')}
                className="text-xs font-mono font-bold text-[#ccff00] hover:underline cursor-pointer"
              >
                About Shahanur Mollah →
              </button>
              <button
                onClick={() => onNavigate('/contact')}
                className="text-xs font-mono font-bold text-slate-300 hover:text-white cursor-pointer"
              >
                Send Feedback
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

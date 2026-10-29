import React, { useState, useEffect } from 'react';
import { getDailyChallenge, getTodayDateStr } from '../utils/dailySystem';
import { getStoredProfile, onProfileChange } from '../utils/progression';
import { DISCOVERIES_VAULT } from '../data/playgroundContent';
import { GAMES } from '../data/games';
import { UserProfile, DailyChallengeData } from '../types/playground';
import { Sparkles, Dices, Flame, Trophy, Play, ArrowRight, Brain, Zap, Search, HelpCircle, Compass, CheckCircle2, Circle, Clock } from 'lucide-react';

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
  const [dailyData, setDailyData] = useState<DailyChallengeData>(() => getDailyChallenge());

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

  // Curated featured games & activities
  const featuredQuick = [
    { id: 'reaction-rush', title: 'Reaction Rush', category: 'Reflex Speed', desc: 'Millisecond reflex benchmark with sensory cues.', path: '/activity/reaction-rush', color: 'from-amber-500/20 to-orange-500/20' },
    { id: 'memory-grid', title: 'Memory Grid', category: 'Working Memory', desc: 'Ascending audio-visual sequence repetition.', path: '/activity/memory-grid', color: 'from-cyan-500/20 to-blue-500/20' },
    { id: 'odd-one-out', title: 'Odd One Out', category: 'Visual Logic', desc: 'Spot the anomalous classification against the clock.', path: '/activity/odd-one-out', color: 'from-purple-500/20 to-indigo-500/20' },
    { id: 'block-puzzle', title: 'Block Puzzle', category: 'Spatial Matrix', desc: '10x10 polyomino line clear strategy.', path: '/game/block-puzzle', color: 'from-emerald-500/20 to-teal-500/20' },
  ];

  // Daily Discovery highlight (deterministic by date)
  const discIndex = Math.abs(todayStr.split('-').reduce((acc, part) => acc + parseInt(part, 10), 0)) % DISCOVERIES_VAULT.length;
  const discoveryOfTheDay = DISCOVERIES_VAULT[discIndex];

  return (
    <div className="w-full space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 border-b border-slate-800/80 bg-gradient-to-b from-[#090e1c] via-[#070a12] to-[#070a12]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Hero Main Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Creator & Sub-brand metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs font-mono text-cyan-400 font-medium tracking-wide">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Qivlix Playground</span>
                </div>
                <span aria-hidden="true" className="hidden sm:inline text-slate-600">·</span>
                <span className="text-slate-300">The Daily Discovery Playground</span>
                <span aria-hidden="true" className="hidden sm:inline text-slate-600">·</span>
                <span className="text-purple-400">All-Ages Browser Entertainment</span>
              </div>

              <h1 className="font-display font-black text-[clamp(1.85rem,6.8vw,3.75rem)] text-slate-100 tracking-tight leading-[1.08] text-balance">
                Play. Deduce. <br />
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                  Discover Everyday.
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl leading-relaxed">
                Step into a distinctive browser playground of quick games, daily mysteries, cognitive workouts, and fascinating scientific curiosities.
              </p>

              {/* CTAs */}
              <div className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-2.5 sm:gap-3 pt-2 w-full xs:w-auto">
                <button
                  onClick={() => onNavigate('/daily')}
                  className="px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Enter Daily Portal <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenSurprise}
                  className="px-4 sm:px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Dices className="w-4 h-4 text-amber-400" /> Surprise Me
                </button>

                <button
                  onClick={onOpenSearch}
                  className="px-4 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-slate-200 text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" /> Search
                </button>
              </div>

              {/* Daily Completion Indicator Pill Bar */}
              <div className="pt-2">
                <div className="w-full sm:w-auto inline-flex flex-col sm:flex-row items-start sm:items-center p-2.5 sm:p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs gap-2 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <Flame className="w-4 h-4 shrink-0" /> {profile.streak} Day Streak
                  </div>
                  <div className="flex items-center gap-1.5 text-cyan-400 font-medium pt-2 sm:pt-0 sm:pl-4">
                    <CheckCircle2 className="w-4 h-4 shrink-0" /> {completedCount} of 3 Daily Portal Tasks Done
                  </div>
                  <div className="text-slate-300 font-mono pt-2 sm:pt-0 sm:pl-4">
                    {profile.points} Total XP
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Right Column: Today's Featured Mystery */}
            <div className="lg:col-span-5">
              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden group hover:border-amber-500/40 transition-all">
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-3.5 sm:space-y-4 relative z-10">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" /> Today's Featured Mystery
                    </div>
                    <span className="text-slate-400 font-mono">+{dailyData.featuredMystery.points} XP</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                    {dailyData.featuredMystery.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {dailyData.featuredMystery.tagline}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
                    <span>Weekly Theme: {dailyData.weeklyTheme.title}</span>
                    <span className="text-amber-400">Deterministic</span>
                  </div>

                  <button
                    onClick={() => onNavigate(`/activity/${dailyData.featuredMystery.activitySlug}`)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Solve Today's Mystery <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Daily Portal Preview Row */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                <span>The Daily Portal</span>
                <span aria-hidden="true">·</span>
                <span>{dailyData.formattedDate}</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight mt-0.5">Today's Three Activities</h2>
            </div>

            <button
              onClick={() => onNavigate('/daily')}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
            >
              View Full Portal <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dailyData.activities.map((act, idx) => {
              const isDone = todayProgress.completedActivityIds.includes(act.id);
              return (
                <div
                  key={act.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                    isDone
                      ? 'bg-emerald-950/20 border-emerald-500/30'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-slate-400">Task #{idx + 1}</span>
                      {isDone ? (
                        <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Circle className="w-3.5 h-3.5" /> Pending
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-cyan-400 font-medium">{act.category}</div>
                    <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">{act.title}</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{act.subtitle}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-400 font-semibold">+{act.pointsReward} XP</span>
                    <button
                      onClick={() => onNavigate(act.targetPath)}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      {isDone ? 'Replay' : 'Play'} <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Featured Mini-Games and Brain Puzzles */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-purple-400 font-semibold uppercase tracking-wider">
                Instant Play Library
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight mt-0.5">
                Featured Mini-Games & Brain Puzzles
              </h2>
            </div>

            <button
              onClick={() => onNavigate('/quick-play')}
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer"
            >
              Browse All Quick Games <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredQuick.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-md"
              >
                <div>
                  <div className="text-xs text-amber-400 font-medium mb-1">{item.category}</div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{item.desc}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => onNavigate(item.path)}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> Play Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* New Discoveries & Interesting Facts Preview */}
        <section className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-900/80 border border-purple-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-purple-400 font-bold uppercase tracking-wider">
              <Compass className="w-4 h-4" /> Discovery of the Day
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">{discoveryOfTheDay.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {discoveryOfTheDay.summary}
            </p>
            <div className="text-xs text-slate-400 font-medium pt-1">
              Topic: {discoveryOfTheDay.topic} · {discoveryOfTheDay.readTime}
            </div>
          </div>

          <button
            onClick={() => onNavigate('/discover')}
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/25 transition-all flex items-center gap-2 shrink-0 cursor-pointer w-full sm:w-auto justify-center"
          >
            Explore Discovery Vault <ArrowRight className="w-4 h-4" />
          </button>
        </section>

        {/* Personal Best & Progression Snapshot */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold mb-2">
                <Trophy className="w-4 h-4" /> Personal Best Records
              </div>
              <h3 className="text-lg font-bold text-white">Your High Score Showcase</h3>
              <p className="text-xs text-slate-300 mt-1">
                {Object.keys(profile.personalBests).length} recorded bests across reaction speed, memory levels, and arcade games.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-800">
              <button
                onClick={() => onNavigate('/collection')}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                View Records in My Collection <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-2">
                <Sparkles className="w-4 h-4" /> Virtual Badges
              </div>
              <h3 className="text-lg font-bold text-white">Achievement Vault</h3>
              <p className="text-xs text-slate-300 mt-1">
                Unlocked {profile.unlockedBadges.length} of 12 badges. Maintain streaks and crack daily enigmas to unlock cosmetic archon titles.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-800">
              <button
                onClick={() => onNavigate('/collection')}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
              >
                Inspect Badges <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-rose-400 font-semibold mb-2">
                <Clock className="w-4 h-4" /> Recently Played
              </div>
              <h3 className="text-lg font-bold text-white">Quick Jump Back</h3>
              {profile.recentActivities.length > 0 ? (
                <div className="space-y-1.5 mt-2">
                  {profile.recentActivities.slice(0, 2).map((rec) => (
                    <div key={rec.id} className="text-xs text-slate-300 flex justify-between items-center py-0.5">
                      <span className="truncate max-w-[150px]">{rec.title}</span>
                      <button
                        onClick={() => onNavigate(rec.path)}
                        className="text-[11px] text-cyan-400 hover:underline cursor-pointer"
                      >
                        Launch
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 mt-1">
                  Play any activity to log recent history for fast resume.
                </p>
              )}
            </div>
            <div className="pt-4 mt-4 border-t border-slate-800">
              <button
                onClick={() => onNavigate('/favorites')}
                className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
              >
                View Saved Favorites <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

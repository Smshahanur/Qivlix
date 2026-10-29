import React, { useState, useEffect } from 'react';
import { getStoredProfile, resetStoredProgress, onProfileChange } from '../utils/progression';
import { ALL_BADGES, COSMIC_TITLES } from '../data/playgroundContent';
import { UserProfile, AchievementBadge } from '../types/playground';
import { Trophy, Award, Flame, RotateCcw, AlertTriangle, ShieldCheck, CheckCircle2, Lock, Sparkles, BookOpen, Clock, Zap } from 'lucide-react';

interface CollectionPageProps {
  onNavigate?: (path: string) => void;
}

export const CollectionPage: React.FC<CollectionPageProps> = () => {
  const [profile, setProfile] = useState<UserProfile>(getStoredProfile);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'badges' | 'scores' | 'titles'>('badges');

  useEffect(() => {
    return onProfileChange((updated) => setProfile(updated));
  }, []);

  const unlockedCount = profile.unlockedBadges.length;
  const currentTitle = COSMIC_TITLES.slice().reverse().find((t) => profile.points >= t.minPoints) || COSMIC_TITLES[0];
  const nextTitle = COSMIC_TITLES.find((t) => profile.points < t.minPoints);

  const handleReset = () => {
    resetStoredProgress();
    setShowResetConfirm(false);
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-orange-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'Timer': return <Clock className="w-5 h-5 text-cyan-400" />;
      case 'Brain': return <Award className="w-5 h-5 text-purple-400" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-teal-400" />;
      case 'Trophy': return <Trophy className="w-5 h-5 text-amber-300" />;
      default: return <Award className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Profile Header Hero */}
      <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950/30 to-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-purple-400 font-semibold tracking-wider uppercase">
              <span>Virtual Identity & Progress</span>
              <span aria-hidden="true">·</span>
              <span className={currentTitle.color}>{currentTitle.title}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">My Vault & Badges</h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Track your cognitive milestones, unlocked cosmic rankings, personal bests, and daily streak archives.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 sm:flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-950/80 border border-slate-800 text-center min-w-0 flex-1 sm:min-w-[90px]">
              <div className="text-[10px] sm:text-xs text-slate-400">Total Points</div>
              <div className="text-base sm:text-2xl font-bold font-mono text-cyan-400 truncate">{profile.points} XP</div>
            </div>

            <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-950/80 border border-slate-800 text-center min-w-0 flex-1 sm:min-w-[90px]">
              <div className="text-[10px] sm:text-xs text-slate-400">Daily Streak</div>
              <div className="text-base sm:text-2xl font-bold font-mono text-amber-400 truncate">{profile.streak} d</div>
            </div>

            <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-950/80 border border-slate-800 text-center min-w-0 flex-1 sm:min-w-[90px]">
              <div className="text-[10px] sm:text-xs text-slate-400">Badges</div>
              <div className="text-base sm:text-2xl font-bold font-mono text-purple-400 truncate">{unlockedCount} / {ALL_BADGES.length}</div>
            </div>
          </div>
        </div>

        {/* Next Tier Progress Bar */}
        {nextTitle && (
          <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Current Rank: <strong className="text-white">{currentTitle.title}</strong></span>
              <span>Next: <strong className="text-cyan-400">{nextTitle.title}</strong> ({nextTitle.minPoints} XP)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, Math.round((profile.points / nextTitle.minPoints) * 100))}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar max-w-full pb-1 sm:pb-0">
          {(['badges', 'scores', 'titles'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'badges' && 'Achievement Badges'}
              {tab === 'scores' && 'Personal Best Records'}
              {tab === 'titles' && 'Cosmic Titles'}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowResetConfirm(true)}
          className="text-xs text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1.5 transition-colors cursor-pointer self-end sm:self-auto shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Data
        </button>
      </div>

      {/* Badges Grid */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_BADGES.map((badge) => {
            const isUnlocked = profile.unlockedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                  isUnlocked
                    ? 'bg-slate-900/90 border-slate-800 shadow-md'
                    : 'bg-slate-950/60 border-slate-900 opacity-60'
                }`}
              >
                <div
                  className={`p-3 rounded-xl shrink-0 ${
                    isUnlocked
                      ? 'bg-purple-500/20 border border-purple-500/30'
                      : 'bg-slate-900 border border-slate-800 text-slate-600'
                  }`}
                >
                  {isUnlocked ? getBadgeIcon(badge.icon) : <Lock className="w-5 h-5" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-bold text-sm ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                      {badge.title}
                    </h3>
                    <span className="text-[11px] font-mono text-amber-400 font-semibold">+{badge.xpReward} XP</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Personal Records Table */}
      {activeTab === 'scores' && (
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" /> Recorded High Scores
          </h3>
          {Object.keys(profile.personalBests).length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No recorded high scores yet. Complete activities in Quick Play or Brain Lab to log records!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-3 px-4 font-semibold">Activity</th>
                    <th className="py-3 px-4 font-semibold">Type</th>
                    <th className="py-3 px-4 font-semibold text-right">Personal Best</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {Object.entries(profile.personalBests).map(([key, score]) => (
                    <tr key={key} className="hover:bg-slate-850/50">
                      <td className="py-3 px-4 text-white capitalize">{key.replace(/-/g, ' ')}</td>
                      <td className="py-3 px-4 text-slate-400">
                        {key.includes('reaction') ? 'Reflex' : 'High Score'}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-cyan-400">
                        {score} {key.includes('reaction') ? 'ms' : 'pts'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Cosmic Titles */}
      {activeTab === 'titles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COSMIC_TITLES.map((title) => {
            const isEarned = profile.points >= title.minPoints;
            return (
              <div
                key={title.id}
                className={`p-5 rounded-2xl border transition-all flex items-center justify-between ${
                  isEarned
                    ? 'bg-slate-900/90 border-slate-800'
                    : 'bg-slate-950/60 border-slate-900 opacity-60'
                }`}
              >
                <div>
                  <h4 className={`font-bold text-base ${title.color}`}>{title.title}</h4>
                  <div className="text-xs text-slate-400 mt-0.5">Required: {title.minPoints} XP</div>
                </div>

                {isEarned ? (
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Unlocked
                  </span>
                ) : (
                  <span className="text-xs text-slate-600 flex items-center gap-1">
                    <Lock className="w-4 h-4" /> Locked
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Honest Local Data Disclosure */}
      <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-xs text-slate-400 space-y-2">
        <div className="flex items-center gap-2 text-slate-200 font-semibold">
          <ShieldCheck className="w-4 h-4 text-cyan-400" /> Local Browser Storage Disclosure
        </div>
        <p className="leading-relaxed">
          Qivlix stores your points, achievements, personal bests, and daily streaks inside your browser’s local storage (sandboxed to your device). No remote account or password is required. Please note: clearing browser site data, browsing in Incognito mode, or switching to another device will not sync your progress.
        </p>
      </div>

      {/* Confirmation Reset Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
          <div className="max-w-sm w-full p-6 rounded-3xl bg-slate-900 border border-rose-500/40 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Reset All Progress?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              This will clear your points, unlocked badges, streaks, and personal best scores from this browser. This action cannot be undone.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white cursor-pointer"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

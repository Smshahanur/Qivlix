import React, { useState, useEffect } from 'react';
import { getStoredProfile, resetStoredProgress, onProfileChange } from '../utils/progression';
import { ALL_BADGES, COSMIC_TITLES } from '../data/playgroundContent';
import { UserProfile, AchievementBadge } from '../types/playground';
import { Trophy, Award, Flame, RotateCcw, AlertTriangle, ShieldCheck, CheckCircle2, Lock, Sparkles, BookOpen, Clock, Zap } from 'lucide-react';
import { AdPlaceholder } from '../components/AdPlaceholder';

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
      case 'Flame': return <Flame className="w-5 h-5 text-[#ff5500]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[#ccff00]" />;
      case 'Timer': return <Clock className="w-5 h-5 text-[#a3e635]" />;
      case 'Trophy': return <Trophy className="w-5 h-5 text-[#ccff00]" />;
      default: return <Award className="w-5 h-5 text-[#a3e635]" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Profile Header Hero */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0a0e1a] border border-[#1b243b] relative overflow-hidden shadow-2xl arcade-corner-ticks">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-mono text-[#ccff00] font-bold tracking-wider uppercase">
              <span>PLAYER ARCHON PROFILE // LOCAL METRICS</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#fbfaf6] tracking-tight">{currentTitle.title}</h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">Active rank title unlocked with {currentTitle.minPoints}+ cumulative XP in the Qivlix arcade.</p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0 font-mono">
            <div className="text-right">
              <div className="text-2xl sm:text-3xl font-black text-[#ccff00]">{profile.points}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">TOTAL XP ACCUMULATED</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#060810] border border-[#1b243b] flex items-center justify-center text-[#ff5500]">
              <Trophy className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Level Progression Progress Bar */}
        {nextTitle && (
          <div className="mt-6 pt-6 border-t border-[#1b243b] space-y-2 font-mono text-xs">
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>NEXT RANK: <strong className="text-white">{nextTitle.title}</strong></span>
              <span className="text-[#ccff00]">{profile.points} / {nextTitle.minPoints} XP</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#060810] overflow-hidden border border-[#1b243b]">
              <div
                className="h-full bg-gradient-to-r from-[#ccff00] to-[#ff5500] transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(5, (profile.points / nextTitle.minPoints) * 100))}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Segmented Nav Tabs */}
      <div className="flex items-center gap-1 p-1 bg-[#0a0e1a] border border-[#1b243b] rounded-xl font-mono text-xs max-w-md">
        <button
          onClick={() => setActiveTab('badges')}
          className={`flex-1 py-2 rounded-lg font-bold uppercase transition-all cursor-pointer ${
            activeTab === 'badges'
              ? 'bg-[#ccff00] text-[#060810] shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Badges ({unlockedCount}/{ALL_BADGES.length})
        </button>
        <button
          onClick={() => setActiveTab('scores')}
          className={`flex-1 py-2 rounded-lg font-bold uppercase transition-all cursor-pointer ${
            activeTab === 'scores'
              ? 'bg-[#ccff00] text-[#060810] shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Personal Bests
        </button>
        <button
          onClick={() => setActiveTab('titles')}
          className={`flex-1 py-2 rounded-lg font-bold uppercase transition-all cursor-pointer ${
            activeTab === 'titles'
              ? 'bg-[#ccff00] text-[#060810] shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Tiers ({COSMIC_TITLES.length})
        </button>
      </div>

      {/* Tab: Badges */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_BADGES.map((b) => {
            const isUnlocked = profile.unlockedBadges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`p-5 rounded-xl border transition-all flex items-start gap-4 ${
                  isUnlocked
                    ? 'bg-[#0a0e1a] border-[#a3e635]/50'
                    : 'bg-[#060810] border-[#1b243b] opacity-60'
                }`}
              >
                <div className={`p-3 rounded-lg border shrink-0 ${
                  isUnlocked
                    ? 'bg-[#060810] border-[#ccff00]/40'
                    : 'bg-[#0a0e1a] border-[#1b243b] text-slate-600'
                }`}>
                  {isUnlocked ? getBadgeIcon(b.icon) : <Lock className="w-5 h-5 text-slate-600" />}
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#ff6600] font-bold text-[10px]">{b.category}</span>
                    {isUnlocked && <span className="text-[#a3e635] text-[10px] font-bold">UNLOCKED</span>}
                  </div>
                  <h3 className="font-bold text-sm text-[#fbfaf6]">{b.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{b.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab: Scores */}
      {activeTab === 'scores' && (
        <div className="p-6 rounded-xl bg-[#0a0e1a] border border-[#1b243b] space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[#1b243b] pb-3 text-slate-400">
            <span>ACTIVITY OR GAME</span>
            <span>VERIFIED RECORD</span>
          </div>

          {Object.keys(profile.personalBests).length > 0 ? (
            <div className="divide-y divide-[#1b243b]/60">
              {Object.entries(profile.personalBests).map(([key, val]) => (
                <div key={key} className="py-3 flex items-center justify-between">
                  <span className="text-[#fbfaf6] uppercase font-bold">{key.replace('game-', '').replace('act-', '')}</span>
                  <span className="text-[#ccff00] font-bold">{val} {key.includes('reaction') ? 'ms' : 'pts'}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-slate-500">
              No records registered yet. Play games to log your high scores!
            </div>
          )}
        </div>
      )}

      {/* Tab: Titles */}
      {activeTab === 'titles' && (
        <div className="space-y-3 font-mono text-xs">
          {COSMIC_TITLES.map((t, idx) => {
            const hasPassed = profile.points >= t.minPoints;
            return (
              <div
                key={t.id}
                className={`p-4 rounded-xl border flex items-center justify-between ${
                  hasPassed
                    ? 'bg-[#0a0e1a] border-[#ccff00]/40'
                    : 'bg-[#060810] border-[#1b243b] opacity-50'
                }`}
              >
                <div>
                  <div className="text-[10px] text-slate-500">TIER {idx + 1} // REQUIRES {t.minPoints} XP</div>
                  <div className="text-sm font-bold text-white mt-0.5">{t.title}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Threshold: {t.minPoints} lifetime points</div>
                </div>
                {hasPassed ? (
                  <span className="px-2 py-1 rounded bg-[#ccff00]/10 text-[#ccff00] font-bold text-[10px] border border-[#ccff00]/30">
                    ACHIEVED
                  </span>
                ) : (
                  <span className="text-slate-600 font-bold text-[10px]">
                    LOCKED
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Reset Progress Section */}
      <div className="p-5 rounded-xl bg-[#060810] border border-[#1b243b] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div>
          <span className="text-slate-400 block font-bold">LOCAL PROFILE MANAGEMENT</span>
          <span className="text-slate-500 text-[11px]">All game records and unlocked titles are saved exclusively in this browser.</span>
        </div>

        {showResetConfirm ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3.5 py-1.5 rounded-lg bg-[#ff5500] hover:bg-[#ff6600] text-white font-bold cursor-pointer"
            >
              Confirm Clear
            </button>
            <button
              onClick={() => setShowResetConfirm(false)}
              className="px-3.5 py-1.5 rounded-lg bg-[#151c33] text-slate-300 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-3.5 py-1.5 rounded-lg bg-[#0a0e1a] border border-[#1b243b] hover:border-[#ff5500] text-slate-400 hover:text-[#ff5500] cursor-pointer"
          >
            Reset Progress
          </button>
        )}
      </div>

      <AdPlaceholder format="banner" slotId="collection-bottom-banner" />
    </div>
  );
};

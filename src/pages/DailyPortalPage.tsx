import React, { useState, useEffect } from 'react';
import { getDailyChallenge, getTodayDateStr } from '../utils/dailySystem';
import { getStoredProfile, onProfileChange } from '../utils/progression';
import { DailyChallengeData, UserProfile } from '../types/playground';
import { Calendar, Flame, CheckCircle2, Circle, ArrowRight, Sparkles, Orbit, Cpu, Waves, Key, Brain } from 'lucide-react';

interface DailyPortalPageProps {
  onNavigate: (path: string) => void;
}

export const DailyPortalPage: React.FC<DailyPortalPageProps> = ({ onNavigate }) => {
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateStr());
  const [dailyData, setDailyData] = useState<DailyChallengeData>(() => getDailyChallenge(getTodayDateStr()));
  const [profile, setProfile] = useState<UserProfile>(getStoredProfile);

  useEffect(() => {
    return onProfileChange((updated) => setProfile(updated));
  }, []);

  useEffect(() => {
    setDailyData(getDailyChallenge(selectedDate));
  }, [selectedDate]);

  const todayStr = getTodayDateStr();

  // Check for midnight date rollover every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const currentToday = getTodayDateStr();
      if (selectedDate === todayStr && currentToday !== todayStr) {
        setSelectedDate(currentToday);
      }
    }, 30000);
    return () => clearInterval(timer);
  }, [selectedDate, todayStr]);

  const dayProgress = profile.dailyCompletions[selectedDate] || {
    completedActivityIds: [],
    mysteryCompleted: false,
    allCompleted: false,
  };

  const completedCount = dayProgress.completedActivityIds.length;
  const isMysteryDone = dayProgress.mysteryCompleted;

  // Icon selector helper
  const getThemeIcon = (name: string) => {
    switch (name) {
      case 'Orbit': return <Orbit className="w-5 h-5 text-cyan-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'Waves': return <Waves className="w-5 h-5 text-teal-400" />;
      case 'Key': return <Key className="w-5 h-5 text-amber-400" />;
      default: return <Brain className="w-5 h-5 text-rose-400" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header with Title and Streak */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium mb-1">
            <Calendar className="w-4 h-4" />
            <span>Deterministic Portal</span>
            <span aria-hidden="true">·</span>
            <span>{dailyData.formattedDate}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Local Timezone (Midnight Rollover)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">The Daily Portal</h1>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Synchronized daily challenges refreshed every midnight in your local timezone. Refreshing never alters today's activities. Complete all three to preserve your streak!
          </p>
        </div>

        {/* Streak & Completion Badge */}
        <div className="flex items-center gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Current Streak</div>
              <div className="text-lg font-bold font-mono text-white">{profile.streak} Days</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Today's Progress</div>
              <div className="text-lg font-bold font-mono text-cyan-400">{completedCount} / 3</div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Theme Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-cyan-950/30 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 shrink-0">
            {getThemeIcon(dailyData.weeklyTheme.badgeIcon)}
          </div>
          <div>
            <div className="text-xs text-purple-400 font-semibold uppercase tracking-wider">Weekly Theme</div>
            <h2 className="text-lg font-bold text-white mt-0.5">{dailyData.weeklyTheme.title}</h2>
            <p className="text-xs text-slate-300 mt-1">{dailyData.weeklyTheme.description}</p>
          </div>
        </div>

        {dayProgress.allCompleted && (
          <div className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 shrink-0">
            <Sparkles className="w-4 h-4" /> Daily Triad Completed!
          </div>
        )}
      </div>

      {/* Featured Mystery Card */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
              <span>Today's Featured Mystery Challenge</span>
              <span aria-hidden="true">·</span>
              <span>+{dailyData.featuredMystery.points} XP Reward</span>
            </div>
            <h2 className="text-2xl font-bold text-white">{dailyData.featuredMystery.title}</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">{dailyData.featuredMystery.tagline}</p>
          </div>

          <button
            onClick={() => onNavigate(`/activity/${dailyData.featuredMystery.activitySlug}`)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            {isMysteryDone ? (
              <>
                <CheckCircle2 className="w-4 h-4" /> Solved Today · Replay
              </>
            ) : (
              <>
                Investigate Mystery <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3 Deterministic Activities */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Daily Triad Challenges</h2>
          <span className="text-xs text-slate-400">Complete all three for bonus XP</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dailyData.activities.map((act, index) => {
            const isCompleted = dayProgress.completedActivityIds.includes(act.id);
            return (
              <div
                key={act.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-emerald-950/20 border-emerald-500/30'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-slate-400 font-mono">Task #{index + 1}</span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-4 h-4" /> Done
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Circle className="w-4 h-4" /> Pending
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-cyan-400 font-medium">{act.category}</div>
                  <h3 className="text-lg font-bold text-white mt-0.5">{act.title}</h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{act.subtitle}</p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-400 font-semibold">+{act.pointsReward} XP</span>
                  <button
                    onClick={() => onNavigate(act.targetPath)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {isCompleted ? 'Play Again' : 'Start Task'} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Date Navigator / Archive Selector */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-slate-200">Date Archive Navigator</div>
          <div className="text-xs text-slate-400 mt-0.5">
            Missed a day? You can view and play challenges from previous dates.
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="date"
            value={selectedDate}
            max={todayStr}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
          {selectedDate !== todayStr && (
            <button
              onClick={() => setSelectedDate(todayStr)}
              className="px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 text-xs font-semibold"
            >
              Back to Today
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

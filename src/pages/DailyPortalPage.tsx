import React, { useState, useEffect } from 'react';
import { getDailyChallenge, getTodayDateStr } from '../utils/dailySystem';
import { getStoredProfile, onProfileChange } from '../utils/progression';
import { DailyChallengeData, UserProfile } from '../types/playground';
import { Calendar, Flame, CheckCircle2, Circle, ArrowRight, Sparkles, Orbit, Cpu, Waves, Key, Brain } from 'lucide-react';
import { AdPlaceholder } from '../components/AdPlaceholder';

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
      case 'Orbit': return <Orbit className="w-5 h-5 text-[#ccff00]" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#ff5500]" />;
      case 'Waves': return <Waves className="w-5 h-5 text-[#a3e635]" />;
      case 'Key': return <Key className="w-5 h-5 text-[#ff6600]" />;
      default: return <Brain className="w-5 h-5 text-[#ccff00]" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Header with Title and Streak */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1b243b]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-mono text-[#ccff00] mb-1 font-bold">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 shrink-0" /> DETERMINISTIC PORTAL</span>
            <span aria-hidden="true" className="text-slate-700 hidden sm:inline">·</span>
            <span className="text-slate-300">{dailyData.formattedDate}</span>
            <span aria-hidden="true" className="text-slate-700 hidden sm:inline">·</span>
            <span className="text-slate-500">LOCAL TIMEZONE</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#fbfaf6] tracking-tight">The Daily Portal</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
            Synchronized daily challenges refreshed every midnight in your local timezone. Refreshing never alters today&apos;s activities. Complete all three to preserve your streak!
          </p>
        </div>

        {/* Streak & Completion Badge */}
        <div className="grid grid-cols-2 sm:flex items-center gap-2 sm:gap-3 w-full sm:w-auto font-mono">
          <div className="p-3 rounded-xl bg-[#0a0e1a] border border-[#1b243b] flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#060810] border border-[#ff5500]/50 flex items-center justify-center text-[#ff5500] shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div className="min-w-0 truncate">
              <div className="text-[10px] text-slate-400 truncate">STREAK</div>
              <div className="text-sm sm:text-base font-bold text-white truncate">{profile.streak} DAYS</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0a0e1a] border border-[#1b243b] flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#060810] border border-[#ccff00]/50 flex items-center justify-center text-[#ccff00] shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="min-w-0 truncate">
              <div className="text-[10px] text-slate-400 truncate">TASKS</div>
              <div className="text-sm sm:text-base font-bold text-[#ccff00] truncate">{completedCount} / 3</div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Theme Banner */}
      <div className="p-4 sm:p-6 rounded-xl bg-[#0a0e1a] border border-[#1b243b] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3 sm:gap-4 min-w-0">
          <div className="p-2.5 sm:p-3 rounded-lg bg-[#060810] border border-[#1b243b] shrink-0">
            {getThemeIcon(dailyData.weeklyTheme.badgeIcon)}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-mono text-[#a3e635] uppercase font-semibold">WEEKLY THEME</div>
            <h2 className="text-base sm:text-lg font-bold text-[#fbfaf6] mt-0.5">{dailyData.weeklyTheme.title}</h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{dailyData.weeklyTheme.description}</p>
          </div>
        </div>

        {dayProgress.allCompleted && (
          <div className="px-3.5 py-1.5 rounded-lg bg-[#060810] border border-[#ccff00] text-[#ccff00] font-mono text-xs font-bold flex items-center gap-1.5 shrink-0">
            <Sparkles className="w-4 h-4" /> DAILY TRIAD COMPLETED
          </div>
        )}
      </div>

      {/* Featured Mystery Card */}
      <div className="p-5 sm:p-7 rounded-xl bg-[#0a0e1a] border border-[#1b243b] relative overflow-hidden arcade-corner-ticks">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-2 min-w-0 max-w-full">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#ff6600] font-bold">
              <span>TODAY&apos;S FEATURED MYSTERY</span>
              <span aria-hidden="true" className="text-slate-700 hidden sm:inline">·</span>
              <span className="text-[#ccff00]">+{dailyData.featuredMystery.points} XP REWARD</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#fbfaf6] break-words">{dailyData.featuredMystery.title}</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">{dailyData.featuredMystery.tagline}</p>
          </div>

          <button
            onClick={() => onNavigate(`/activity/${dailyData.featuredMystery.activitySlug}`)}
            className="w-full sm:w-auto justify-center px-6 py-3 rounded-lg bg-[#ccff00] hover:bg-[#d9ff33] text-[#060810] font-black font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            {isMysteryDone ? (
              <>
                <CheckCircle2 className="w-4 h-4" /> Solved Today · Replay
              </>
            ) : (
              <>
                Solve Mystery <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* The Three Daily Activities Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-mono text-[#fbfaf6]">
            TODAY&apos;S THREE ACTIVITIES
          </h2>
          <span className="text-xs font-mono text-slate-500">
            {completedCount} OF 3 COMPLETED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {dailyData.activities.map((activity, idx) => {
            const isCompleted = dayProgress.completedActivityIds.includes(activity.id);
            return (
              <div
                key={activity.id}
                className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-[#060810] border-[#a3e635]/40'
                    : 'bg-[#0a0e1a] border-[#1b243b] hover:border-[#ccff00]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <span className="text-slate-500 font-bold">TASK #{idx + 1}</span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[#a3e635] font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> DONE
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-500">
                        <Circle className="w-3.5 h-3.5" /> PENDING
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-mono uppercase text-[#ccff00] font-bold">
                    {activity.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#fbfaf6] mt-1">{activity.title}</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{activity.subtitle}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#1b243b] flex items-center justify-between font-mono text-xs">
                  <span className="text-[#a3e635] font-bold">+{activity.pointsReward} XP</span>
                  <button
                    onClick={() => onNavigate(activity.targetPath)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono uppercase transition-all cursor-pointer ${
                      isCompleted
                        ? 'bg-[#151c33] text-slate-300 hover:text-white'
                        : 'bg-[#ccff00] text-[#060810] hover:bg-[#d9ff33]'
                    }`}
                  >
                    {isCompleted ? 'Replay' : 'Play Now'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AdPlaceholder format="banner" slotId="daily-portal-banner" />
    </div>
  );
};

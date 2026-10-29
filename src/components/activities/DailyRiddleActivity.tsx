import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../../utils/audio';
import { RIDDLES } from '../../data/playgroundContent';
import { recordActivityCompletion, getStoredProfile } from '../../utils/progression';
import { getDailyRiddleIndex } from '../../utils/dailySystem';
import { HelpCircle, RotateCcw, ArrowLeft, CheckCircle2, Sparkles, Lightbulb, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DailyRiddleProps {
  onBack?: () => void;
  isDaily?: boolean;
}

export const DailyRiddleActivity: React.FC<DailyRiddleProps> = ({ onBack, isDaily }) => {
  const [riddleIdx, setRiddleIdx] = useState<number>(() => getDailyRiddleIndex());
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [hintLevel, setHintLevel] = useState<number>(0);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [awardedXp, setAwardedXp] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ isError: boolean; message: string } | null>(null);
  const hasSubmittedRef = useRef<boolean>(false);

  const currentRiddle = RIDDLES[riddleIdx % RIDDLES.length];

  // Check if current riddle was previously solved
  useEffect(() => {
    const profile = getStoredProfile();
    if (profile.personalBests[currentRiddle.id] !== undefined) {
      setIsSolved(true);
      setAwardedXp(0);
    } else {
      setIsSolved(false);
      setAwardedXp(null);
    }
    hasSubmittedRef.current = false;
  }, [currentRiddle.id]);

  const handleCheckAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSolved || isRevealed || hasSubmittedRef.current) return;

    const cleaned = userAnswer.trim().toLowerCase();
    if (!cleaned) return;

    const isMatch = currentRiddle.answers.some((ans) => {
      const target = ans.toLowerCase();
      return cleaned === target || cleaned.includes(target) || target.includes(cleaned);
    });

    if (isMatch) {
      hasSubmittedRef.current = true;
      setIsSolved(true);
      setFeedback(null);
      sound.playVictory();
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });

      const points = hintLevel === 0 ? currentRiddle.points : Math.max(15, currentRiddle.points - hintLevel * 10);
      const res = recordActivityCompletion({
        activityId: currentRiddle.id,
        activityTitle: `Riddle: ${currentRiddle.title}`,
        type: 'riddle',
        targetPath: '/activity/daily-riddle',
        pointsEarned: points,
        score: points,
        isDailyPortal: isDaily,
        isMystery: true,
      });
      setAwardedXp(res.pointsAwarded);
    } else {
      sound.playGameOver();
      setFeedback({
        isError: true,
        message: 'Not quite. Think about the metaphors or request a hint below!',
      });
    }
  };

  const handleRequestHint = () => {
    if (hintLevel < currentRiddle.hints.length) {
      setHintLevel((prev) => prev + 1);
      sound.playMove();
    }
  };

  const handleRevealSolution = () => {
    setIsRevealed(true);
    sound.playMove();
  };

  const handleNextRiddle = () => {
    setRiddleIdx((prev) => prev + 1);
    setUserAnswer('');
    setHintLevel(0);
    setIsSolved(false);
    setIsRevealed(false);
    setFeedback(null);
    sound.playMove();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
              aria-label="Go Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <span>Lateral Logic & Enigmas</span>
              <span aria-hidden="true">·</span>
              <span>{currentRiddle.category}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Daily Riddle</h1>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-400">Reward</div>
          <div className="text-base font-mono font-bold text-amber-400">+{currentRiddle.points} XP</div>
        </div>
      </div>

      {/* Main Riddle Scroll Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-amber-300 pointer-events-none">
          <HelpCircle className="w-36 h-36" />
        </div>

        <div className="relative z-10 space-y-3">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
            Enigma #{((riddleIdx % RIDDLES.length) + 1).toString().padStart(2, '0')} · {currentRiddle.title}
          </div>
          <blockquote className="text-lg sm:text-xl font-medium text-slate-100 italic leading-relaxed">
            "{currentRiddle.riddle}"
          </blockquote>
        </div>

        {/* Hints Reveal */}
        {hintLevel > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            {currentRiddle.hints.slice(0, hintLevel).map((hint, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2 animate-fadeIn"
              >
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Hint #{i + 1}:</strong> {hint}</span>
              </div>
            ))}
          </div>
        )}

        {/* Input Form */}
        {!isSolved && !isRevealed ? (
          <form onSubmit={handleCheckAnswer} className="space-y-4 pt-2">
            <div>
              <label htmlFor="riddle-input" className="block text-xs font-semibold text-slate-300 mb-2">
                Enter your solution:
              </label>
              <div className="flex gap-2">
                <input
                  id="riddle-input"
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="e.g. shadow, mirror, silence..."
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 focus:outline-none text-white text-sm"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-sm transition-all cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </div>

            {feedback && (
              <div className="text-xs text-rose-400 flex items-center gap-1.5 animate-fadeIn">
                <span>✕</span> {feedback.message}
              </div>
            )}

            <div className="flex items-center justify-between pt-2 text-xs">
              {hintLevel < currentRiddle.hints.length ? (
                <button
                  type="button"
                  onClick={handleRequestHint}
                  className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5" /> Request Hint ({hintLevel + 1}/{currentRiddle.hints.length})
                </button>
              ) : (
                <span className="text-slate-500">All hints requested</span>
              )}

              <button
                type="button"
                onClick={handleRevealSolution}
                className="text-slate-400 hover:text-slate-300 font-medium flex items-center gap-1 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" /> Reveal Answer
              </button>
            </div>
          </form>
        ) : (
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-emerald-500/30 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-white">
                  Solution: <span className="text-emerald-300 capitalize">{currentRiddle.answers[0]}</span>
                </span>
              </div>
              {awardedXp !== null && (
                <span className="text-xs font-mono font-bold text-amber-400">
                  {awardedXp > 0 ? `+${awardedXp} XP Awarded` : 'Already Decrypted (+0 XP)'}
                </span>
              )}
            </div>

            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentRiddle.explanation}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNextRiddle}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Next Riddle
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Philosophy Footnote */}
      <div className="mt-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <span>Riddles in Qivlix are deterministic by date for the daily portal, but can be freely explored and solved anytime.</span>
      </div>
    </div>
  );
};

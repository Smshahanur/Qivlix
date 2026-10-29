import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../../utils/audio';
import { ODD_ONE_OUT_SETS } from '../../data/playgroundContent';
import { recordActivityCompletion, getStoredProfile } from '../../utils/progression';
import { Eye, RotateCcw, ArrowLeft, CheckCircle2, XCircle, Award, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OddOneOutProps {
  onBack?: () => void;
  isDaily?: boolean;
}

export const OddOneOutActivity: React.FC<OddOneOutProps> = ({ onBack, isDaily }) => {
  const [roundIdx, setRoundIdx] = useState<number>(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [isRoundFinished, setIsRoundFinished] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [bestScore, setBestScore] = useState<number>(0);
  const hasRecordedRef = useRef<boolean>(false);

  const totalRounds = Math.min(5, ODD_ONE_OUT_SETS.length);
  const currentSet = ODD_ONE_OUT_SETS[roundIdx % ODD_ONE_OUT_SETS.length];

  // Load personal best
  useEffect(() => {
    const profile = getStoredProfile();
    if (profile.personalBests['odd-one-out']) {
      setBestScore(profile.personalBests['odd-one-out']);
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    if (isRoundFinished || isGameOver) return;
    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isRoundFinished, isGameOver]);

  const handleTimeout = () => {
    setIsRoundFinished(true);
    sound.playGameOver();
  };

  const handleSelectOption = (idx: number) => {
    if (isRoundFinished || isGameOver) return;

    setSelectedIdx(idx);
    setIsRoundFinished(true);

    const isCorrect = currentSet.items[idx].isOdd;
    if (isCorrect) {
      sound.playMatch();
      const timeBonus = Math.max(5, timeLeft * 2);
      const points = 20 + timeBonus;
      setScore((prev) => prev + points);
      setCorrectCount((prev) => prev + 1);
      confetti({ particleCount: 20, spread: 45, origin: { y: 0.6 } });
    } else {
      sound.playGameOver();
    }
  };

  const handleNextRound = () => {
    if (roundIdx + 1 >= totalRounds) {
      // Game completed
      setIsGameOver(true);
      if (!hasRecordedRef.current) {
        hasRecordedRef.current = true;
        recordActivityCompletion({
          activityId: 'odd-one-out',
          activityTitle: 'Odd One Out',
          type: 'activity',
          targetPath: '/activity/odd-one-out',
          pointsEarned: Math.max(30, score),
          score: correctCount,
          isDailyPortal: isDaily,
        });
      }
      if (score > bestScore) {
        setBestScore(score);
      }
    } else {
      setRoundIdx((prev) => prev + 1);
      setSelectedIdx(null);
      setIsRoundFinished(false);
      setTimeLeft(15);
      sound.playMove();
    }
  };

  const restartGame = () => {
    hasRecordedRef.current = false;
    setRoundIdx(0);
    setSelectedIdx(null);
    setScore(0);
    setCorrectCount(0);
    setTimeLeft(15);
    setIsRoundFinished(false);
    setIsGameOver(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
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
            <div className="flex items-center gap-2 text-xs text-purple-400 font-medium">
              <span>Cognitive Categorization</span>
              <span aria-hidden="true">·</span>
              <span>Round {Math.min(roundIdx + 1, totalRounds)} of {totalRounds}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Odd One Out</h1>
          </div>
        </div>

        <div className="flex items-center gap-4 text-right">
          <div>
            <div className="text-xs text-slate-400">Score</div>
            <div className="text-base font-mono font-bold text-purple-400">{score} XP</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Timer</div>
            <div className={`text-base font-mono font-bold ${timeLeft <= 5 ? 'text-rose-400 animate-pulse' : 'text-slate-200'}`}>
              {timeLeft}s
            </div>
          </div>
        </div>
      </div>

      {isGameOver ? (
        <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <div className="text-xs text-purple-400 font-semibold uppercase tracking-wider">Session Concluded</div>
            <h2 className="text-3xl font-black text-white mt-1">Classification Results</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-xs text-slate-400">Accuracy</div>
              <div className="text-2xl font-bold font-mono text-cyan-400">{correctCount} / {totalRounds}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-xs text-slate-400">Total XP</div>
              <div className="text-2xl font-bold font-mono text-purple-400">+{score}</div>
            </div>
          </div>

          <button
            onClick={restartGame}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg transition-all flex items-center gap-2 mx-auto cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> Play Another Round
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Question / Category Card */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>Category: {currentSet.category}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">{currentSet.title}</h2>
            <p className="text-xs text-slate-300 mt-1">
              Select the option that does NOT fit the fundamental pattern or classification of the others.
            </p>
          </div>

          {/* 4 Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentSet.items.map((item, idx) => {
              const isSelected = selectedIdx === idx;
              let itemStyle = 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-850';

              if (isRoundFinished) {
                if (item.isOdd) {
                  itemStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.3)]';
                } else if (isSelected && !item.isOdd) {
                  itemStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                } else {
                  itemStyle = 'bg-slate-950/60 border-slate-850 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isRoundFinished}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[96px] ${itemStyle}`}
                >
                  <div className="flex items-start justify-between w-full">
                    <span className="font-bold text-base text-white">{item.label}</span>
                    {isRoundFinished && item.isOdd && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                    )}
                    {isRoundFinished && isSelected && !item.isOdd && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-2" />
                    )}
                  </div>
                  <span className="text-xs text-slate-400 mt-2">{item.subtext}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation reveal when round finished */}
          {isRoundFinished && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/30 space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                <HelpCircle className="w-4 h-4" /> Explanation & Scientific Rationale:
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">{currentSet.explanation}</p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextRound}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs transition-all cursor-pointer"
                >
                  {roundIdx + 1 >= totalRounds ? 'View Final Results' : 'Next Challenge →'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../../utils/audio';
import { recordActivityCompletion, getStoredProfile } from '../../utils/progression';
import { Zap, RotateCcw, Award, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReactionRushProps {
  onBack?: () => void;
  isDaily?: boolean;
}

type GameState = 'idle' | 'waiting' | 'ready' | 'result' | 'early';

export const ReactionRushActivity: React.FC<ReactionRushProps> = ({ onBack, isDaily }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<number[]>([]);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [earnedPoints, setEarnedPoints] = useState<number>(0);
  const [justCompleted, setJustCompleted] = useState<boolean>(false);

  const startTimeRef = useRef<number>(0);
  const timerTimeoutRef = useRef<number | null>(null);
  const sessionCompletedRef = useRef<boolean>(false);

  // Load personal best
  useEffect(() => {
    const profile = getStoredProfile();
    if (profile.personalBests['reaction-rush']) {
      setBestTime(profile.personalBests['reaction-rush']);
    }
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timerTimeoutRef.current) {
        window.clearTimeout(timerTimeoutRef.current);
      }
    };
  }, []);

  const startRound = () => {
    setGameState('waiting');
    setReactionTime(null);
    setJustCompleted(false);

    sound.playMove();

    // Random delay between 1.8s and 4.2s
    const randomDelay = Math.floor(Math.random() * 2400) + 1800;

    if (timerTimeoutRef.current) {
      window.clearTimeout(timerTimeoutRef.current);
    }

    timerTimeoutRef.current = window.setTimeout(() => {
      startTimeRef.current = performance.now();
      setGameState('ready');
      sound.playReactionAlert();
    }, randomDelay);
  };

  const handleTrigger = () => {
    if (gameState === 'idle') {
      startRound();
      return;
    }

    if (gameState === 'waiting') {
      // Too early!
      if (timerTimeoutRef.current) {
        window.clearTimeout(timerTimeoutRef.current);
      }
      setGameState('early');
      sound.playGameOver();
      return;
    }

    if (gameState === 'ready') {
      const now = performance.now();
      const elapsed = Math.round(now - startTimeRef.current);
      setReactionTime(elapsed);
      setGameState('result');
      sound.playMatch();

      const newAttempts = [elapsed, ...attempts].slice(0, 5);
      setAttempts(newAttempts);

      // Best time check and anti-spam XP calculation
      let points = 0;
      const isRecordBeaten = !bestTime || elapsed < bestTime;

      if (isRecordBeaten) {
        setBestTime(elapsed);
        points = bestTime ? 30 : 50; // New record bonus, or first time record
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
      } else if (!sessionCompletedRef.current) {
        points = 25; // First completion in session
        sessionCompletedRef.current = true;
      }

      // Save progression
      const res = recordActivityCompletion({
        activityId: 'reaction-rush',
        activityTitle: 'Reaction Rush',
        type: 'activity',
        targetPath: '/activity/reaction-rush',
        pointsEarned: points,
        score: elapsed,
        isDailyPortal: isDaily,
      });

      setEarnedPoints(res.pointsAwarded);
      setJustCompleted(true);
    }

    if (gameState === 'early' || gameState === 'result') {
      startRound();
    }
  };

  // Keyboard Space listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleTrigger();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const getRating = (ms: number) => {
    if (ms < 200) return { label: 'Cyber Synapse (Godspeed)', color: 'text-amber-400' };
    if (ms < 240) return { label: 'Lightning Reflex', color: 'text-cyan-400' };
    if (ms < 300) return { label: 'Pro Gamer Speed', color: 'text-purple-400' };
    if (ms < 380) return { label: 'Swift Human Reflex', color: 'text-emerald-400' };
    return { label: 'Steady Focus', color: 'text-slate-300' };
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
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <span>Reflex Speed Challenge</span>
              <span aria-hidden="true">·</span>
              <span>Millisecond Precision</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Reaction Rush</h1>
          </div>
        </div>

        {bestTime && (
          <div className="text-right">
            <div className="text-xs text-slate-400">Personal Best</div>
            <div className="text-lg font-mono font-bold text-amber-400">{bestTime} ms</div>
          </div>
        )}
      </div>

      {/* Main Interactive Board */}
      <div
        onClick={handleTrigger}
        role="button"
        tabIndex={0}
        aria-label="Reaction test target area"
        className={`relative w-full aspect-4/3 sm:aspect-16/9 rounded-2xl flex flex-col items-center justify-center p-6 text-center select-none cursor-pointer transition-all duration-200 border shadow-2xl ${
          gameState === 'idle'
            ? 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850'
            : gameState === 'waiting'
            ? 'bg-rose-950/80 border-rose-600/60 shadow-[0_0_40px_rgba(225,29,72,0.25)]'
            : gameState === 'ready'
            ? 'bg-emerald-600 border-emerald-400 shadow-[0_0_60px_rgba(16,185,129,0.5)] scale-[1.01]'
            : gameState === 'early'
            ? 'bg-amber-950/90 border-amber-600/70'
            : 'bg-slate-900/95 border-cyan-500/50'
        }`}
      >
        {gameState === 'idle' && (
          <div className="space-y-4 max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
              <Zap className="w-8 h-8 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-white">Tap or Press Space to Begin</h2>
            <p className="text-sm text-slate-300">
              The screen will turn <span className="text-rose-400 font-semibold">red</span>. Wait until it flashes <span className="text-emerald-400 font-semibold">bright green</span>, then click or tap as fast as humanly possible!
            </p>
            <div className="text-xs text-slate-400">Works on touchscreens, mice, or Spacebar</div>
          </div>
        )}

        {gameState === 'waiting' && (
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full border-4 border-rose-400/40 border-t-rose-400 animate-spin mx-auto" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Wait for GREEN...</h2>
            <p className="text-xs text-rose-300">Do not click yet or you will trigger an early fault.</p>
          </div>
        )}

        {gameState === 'ready' && (
          <div className="space-y-2 animate-bounce">
            <h2 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-wider">CLICK NOW!</h2>
            <p className="text-sm font-semibold text-slate-900">TAP SCREEN OR PRESS SPACE</p>
          </div>
        )}

        {gameState === 'early' && (
          <div className="space-y-4 max-w-sm">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-amber-200">Too Early!</h2>
            <p className="text-sm text-slate-300">You clicked before the green flash appeared. Maintain patience!</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 text-sm font-medium">
              <RotateCcw className="w-4 h-4" /> Tap anywhere to try again
            </div>
          </div>
        )}

        {gameState === 'result' && reactionTime !== null && (
          <div className="space-y-4 max-w-md">
            <div className="text-xs text-cyan-400 uppercase tracking-widest font-semibold">Reaction Recorded</div>
            <div className="text-5xl sm:text-7xl font-black font-mono text-white tracking-tight">
              {reactionTime} <span className="text-2xl sm:text-3xl text-cyan-400 font-sans font-bold">ms</span>
            </div>
            <div className={`text-base sm:text-lg font-bold ${getRating(reactionTime).color}`}>
              {getRating(reactionTime).label}
            </div>

            {justCompleted && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {earnedPoints > 0
                    ? `+${earnedPoints} XP recorded to your vault!`
                    : `Attempt logged! Beat your ${bestTime} ms best for bonus XP.`}
                </span>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  startRound();
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 mx-auto cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Play Again (Space)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Benchmarks & Attempt History */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" /> Reaction Tier Benchmarks
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-slate-800">
              <span className="text-amber-400 font-semibold">&lt; 200 ms</span>
              <span className="text-slate-300">Cyber Reflex (+100 XP)</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800">
              <span className="text-cyan-400 font-semibold">200 – 240 ms</span>
              <span className="text-slate-300">Lightning Reflex (+80 XP)</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800">
              <span className="text-purple-400 font-semibold">240 – 300 ms</span>
              <span className="text-slate-300">Pro Gamer Speed (+60 XP)</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-400 font-semibold">&gt; 300 ms</span>
              <span className="text-slate-400">Swift Human (+40 XP)</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" /> Recent Session Attempts
          </h3>
          {attempts.length === 0 ? (
            <div className="text-xs text-slate-500 py-4 text-center">Complete your first round to log attempts.</div>
          ) : (
            <div className="space-y-1.5 text-xs font-mono">
              {attempts.map((att, i) => (
                <div key={i} className="flex justify-between items-center py-1 border-b border-slate-800/60 last:border-0">
                  <span className="text-slate-400">Attempt #{attempts.length - i}</span>
                  <span className={`font-bold ${att === bestTime ? 'text-amber-400' : 'text-slate-200'}`}>
                    {att} ms {att === bestTime && '★ Best'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

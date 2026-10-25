import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Zap, Trophy, RotateCcw, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { sound } from '../../utils/audio';

type TestState = 'IDLE' | 'WAITING' | 'READY' | 'TOO_SOON' | 'RESULT' | 'SUMMARY';

interface RoundResult {
  round: number;
  timeMs: number;
}

export const ReactionTestGame: React.FC = () => {
  const [state, setState] = useState<TestState>('IDLE');
  const [currentMs, setCurrentMs] = useState<number | null>(null);
  const [rounds, setRounds] = useState<RoundResult[]>([]);
  const [personalBest, setPersonalBest] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('qivlix_highscore_reaction-test') || '0', 10);
    } catch {
      return 0;
    }
  });

  const timerIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const clearTimer = () => {
    if (timerIdRef.current) {
      window.clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
  };

  const startTest = useCallback(() => {
    clearTimer();
    setState('WAITING');
    setCurrentMs(null);

    // Random delay between 1500ms and 4500ms
    const randomDelay = Math.floor(Math.random() * 3000) + 1500;

    timerIdRef.current = window.setTimeout(() => {
      startTimeRef.current = performance.now();
      setState('READY');
      sound.playReactionAlert();
    }, randomDelay);
  }, []);

  const handleClick = useCallback(() => {
    if (state === 'IDLE') {
      startTest();
    } else if (state === 'WAITING') {
      clearTimer();
      setState('TOO_SOON');
      sound.playGameOver();
    } else if (state === 'READY') {
      const elapsed = Math.round(performance.now() - startTimeRef.current);
      setCurrentMs(elapsed);
      sound.playMatch();

      const newRounds = [...rounds, { round: rounds.length + 1, timeMs: elapsed }];
      setRounds(newRounds);

      if (personalBest === 0 || elapsed < personalBest) {
        setPersonalBest(elapsed);
        try {
          localStorage.setItem('qivlix_highscore_reaction-test', String(elapsed));
        } catch {}
      }

      if (newRounds.length >= 5) {
        setState('SUMMARY');
        sound.playVictory();
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } else {
        setState('RESULT');
      }
    } else if (state === 'TOO_SOON' || state === 'RESULT') {
      startTest();
    } else if (state === 'SUMMARY') {
      setRounds([]);
      startTest();
    }
  }, [state, rounds, personalBest, startTest]);

  // Keyboard shortcut Spacebar / Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClick]);

  const resetAll = () => {
    clearTimer();
    setRounds([]);
    setCurrentMs(null);
    setState('IDLE');
  };

  // Rank calculator based on reaction time
  const getRank = (ms: number) => {
    if (ms < 190) return { title: 'Godlike Cybernetic', color: 'text-amber-400', desc: 'Faster than 99% of competitive gamers!' };
    if (ms < 230) return { title: 'Pro Esports Grade', color: 'text-cyan-400', desc: 'Elite tournament level reflexes.' };
    if (ms < 275) return { title: 'Fast Reflexes', color: 'text-purple-400', desc: 'Sharper than typical human baseline.' };
    if (ms < 340) return { title: 'Average Human', color: 'text-slate-300', desc: 'Standard biological motor response.' };
    return { title: 'Sluggish Turtle', color: 'text-rose-400', desc: 'Needs energy or higher screen refresh rate.' };
  };

  const averageMs =
    rounds.length > 0 ? Math.round(rounds.reduce((acc, r) => acc + r.timeMs, 0) / rounds.length) : 0;

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto select-none">
      {/* HUD Header */}
      <div className="w-full flex items-center justify-between p-3.5 mb-4 rounded-xl bg-slate-900/90 border border-slate-800">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Trophy className="w-3 h-3 text-amber-400" /> Best
            </div>
            <div className="text-xl font-bold font-mono text-amber-400 tabular-nums">
              {personalBest > 0 ? `${personalBest} ms` : '—'}
            </div>
          </div>
          <div className="border-l border-slate-800 pl-4">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Round</div>
            <div className="text-xl font-bold font-mono text-cyan-400 tabular-nums">
              {rounds.length} / 5
            </div>
          </div>
          {rounds.length > 0 && (
            <div className="border-l border-slate-800 pl-4">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Average</div>
              <div className="text-xl font-bold font-mono text-purple-400 tabular-nums">
                {averageMs} ms
              </div>
            </div>
          )}
        </div>

        <button
          onClick={resetAll}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
          title="Restart benchmark"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Main Interactive Screen Area */}
      <div
        onClick={handleClick}
        className={`relative w-full aspect-[4/3] max-w-[460px] rounded-2xl border-2 transition-all duration-150 flex flex-col items-center justify-center p-6 text-center cursor-pointer shadow-2xl ${
          state === 'IDLE'
            ? 'bg-[#0b1020] border-cyan-500/40 hover:border-cyan-400'
            : state === 'WAITING'
            ? 'bg-rose-950/70 border-rose-600/80'
            : state === 'READY'
            ? 'bg-emerald-500 border-white text-slate-950 animate-pulse'
            : state === 'TOO_SOON'
            ? 'bg-amber-950/80 border-amber-600/80'
            : state === 'RESULT'
            ? 'bg-[#0d1428] border-purple-500/60'
            : 'bg-[#080d1a] border-cyan-500/60'
        }`}
      >
        {state === 'IDLE' && (
          <div className="space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-slate-100">
              Reaction Speed Test
            </h3>
            <p className="text-xs text-slate-400 max-w-xs">
              When the screen turns green, click as fast as you can.
            </p>
            <div className="pt-2 text-xs font-mono text-cyan-400">
              Click anywhere or press Spacebar to start
            </div>
          </div>
        )}

        {state === 'WAITING' && (
          <div className="space-y-3">
            <div className="w-4 h-4 mx-auto rounded-full bg-rose-500 animate-ping" />
            <h3 className="font-display font-black text-3xl text-rose-300">
              Wait for Green...
            </h3>
            <p className="text-xs text-rose-200/80">
              Do not click yet! Clicking early counts as a false start.
            </p>
          </div>
        )}

        {state === 'READY' && (
          <div className="space-y-2">
            <h3 className="font-display font-black text-4xl sm:text-5xl text-slate-950 tracking-tight">
              CLICK NOW!
            </h3>
            <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Tap screen or strike Spacebar
            </p>
          </div>
        )}

        {state === 'TOO_SOON' && (
          <div className="space-y-3">
            <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto" />
            <h3 className="font-display font-extrabold text-2xl text-amber-300">
              Too Soon!
            </h3>
            <p className="text-xs text-slate-300 max-w-xs">
              You clicked before the green signal appeared.
            </p>
            <div className="text-xs font-mono text-amber-400 pt-2">
              Click to try this round again
            </div>
          </div>
        )}

        {state === 'RESULT' && currentMs !== null && (
          <div className="space-y-2">
            <Clock className="w-8 h-8 text-cyan-400 mx-auto" />
            <div className="text-4xl sm:text-5xl font-black font-mono text-slate-100 tabular-nums">
              {currentMs} <span className="text-lg text-slate-400">ms</span>
            </div>
            <div className={`text-sm font-bold ${getRank(currentMs).color}`}>
              {getRank(currentMs).title}
            </div>
            <p className="text-xs text-slate-400">
              {getRank(currentMs).desc}
            </p>
            <div className="text-xs font-mono text-cyan-400 pt-3">
              Click or press Spacebar for Round {rounds.length + 1}
            </div>
          </div>
        )}

        {state === 'SUMMARY' && (
          <div className="space-y-3 p-2">
            <CheckCircle2 className="w-12 h-12 text-cyan-400 mx-auto" />
            <h3 className="font-display font-extrabold text-2xl text-slate-100">
              5-Round Benchmark Complete
            </h3>
            <div className="text-3xl font-black font-mono text-cyan-400 tabular-nums">
              {averageMs} ms <span className="text-xs text-slate-400 font-sans">average</span>
            </div>
            <div className={`text-sm font-bold ${getRank(averageMs).color}`}>
              Grade: {getRank(averageMs).title}
            </div>
            <p className="text-xs text-slate-400 max-w-xs">
              {getRank(averageMs).desc}
            </p>
            <div className="pt-2">
              <span className="px-5 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs inline-block">
                Start New Benchmark
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Round History Strip */}
      {rounds.length > 0 && (
        <div className="w-full mt-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400 mb-2 flex items-center justify-between">
            <span>Attempts History</span>
            <span>Target: 5 Rounds</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[0, 1, 2, 3, 4].map((idx) => {
              const res = rounds[idx];
              return (
                <div
                  key={idx}
                  className={`p-2 rounded-lg border text-center text-xs font-mono ${
                    res
                      ? 'bg-slate-800/80 border-slate-700 text-slate-200'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-600'
                  }`}
                >
                  <div className="text-[9px] text-slate-500">R{idx + 1}</div>
                  <div className="font-semibold">{res ? `${res.timeMs}` : '—'}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

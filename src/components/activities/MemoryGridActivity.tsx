import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../../utils/audio';
import { recordActivityCompletion, getStoredProfile } from '../../utils/progression';
import { Brain, RotateCcw, Heart, ArrowLeft, CheckCircle2, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MemoryGridProps {
  onBack?: () => void;
  isDaily?: boolean;
}

const FREQUENCIES = [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88, 523.25, 587.33];
const NODE_COLORS = [
  'from-cyan-500 to-blue-600',
  'from-purple-500 to-indigo-600',
  'from-pink-500 to-rose-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-violet-500 to-fuchsia-600',
  'from-sky-400 to-cyan-500',
  'from-lime-400 to-emerald-500',
  'from-yellow-400 to-amber-500',
];

export const MemoryGridActivity: React.FC<MemoryGridProps> = ({ onBack, isDaily }) => {
  const [level, setLevel] = useState<number>(1);
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerStep, setPlayerStep] = useState<number>(0);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [isShowingSequence, setIsShowingSequence] = useState<boolean>(false);
  const [lives, setLives] = useState<number>(3);
  const [score, setScore] = useState<number>(0);
  const [bestLevel, setBestLevel] = useState<number>(1);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  const timeoutRef = useRef<number | null>(null);
  const hasRecordedRef = useRef<boolean>(false);

  // Load personal best
  useEffect(() => {
    const profile = getStoredProfile();
    if (profile.personalBests['memory-grid']) {
      setBestLevel(profile.personalBests['memory-grid']);
    }
  }, []);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  // Light up a node and play tone
  const pulseNode = (nodeIdx: number, duration: number = 350) => {
    setActiveNode(nodeIdx);
    const freq = FREQUENCIES[nodeIdx % FREQUENCIES.length];
    sound.playTone(freq, 'sine', duration / 1000, 0.2);

    window.setTimeout(() => {
      setActiveNode((cur) => (cur === nodeIdx ? null : cur));
    }, duration);
  };

  // Play sequence to the player
  const playSequence = (seq: number[]) => {
    setIsShowingSequence(true);
    setPlayerStep(0);

    const speed = Math.max(300, 600 - seq.length * 25);
    seq.forEach((node, index) => {
      window.setTimeout(() => {
        pulseNode(node, speed * 0.7);
        if (index === seq.length - 1) {
          window.setTimeout(() => {
            setIsShowingSequence(false);
          }, speed);
        }
      }, (index + 1) * speed);
    });
  };

  // Start fresh game
  const startGame = () => {
    hasRecordedRef.current = false;
    setHasStarted(true);
    setIsGameOver(false);
    setLevel(1);
    setScore(0);
    setLives(3);
    const initialSeq = [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)];
    setSequence(initialSeq);
    playSequence(initialSeq);
  };

  // Advance to next level
  const advanceLevel = (currentScore: number, currentLevel: number, curSeq: number[]) => {
    const nextLevel = currentLevel + 1;
    const newSeq = [...curSeq, Math.floor(Math.random() * 9)];
    setLevel(nextLevel);
    setSequence(newSeq);
    sound.playMatch();

    if (nextLevel > bestLevel) {
      setBestLevel(nextLevel);
    }

    window.setTimeout(() => {
      playSequence(newSeq);
    }, 800);
  };

  // Handle player clicking a grid node
  const handleNodeClick = (nodeIdx: number) => {
    if (!hasStarted || isShowingSequence || isGameOver) return;

    pulseNode(nodeIdx, 250);

    // Verify step
    if (nodeIdx === sequence[playerStep]) {
      const nextStep = playerStep + 1;
      setPlayerStep(nextStep);

      // Successfully finished sequence
      if (nextStep === sequence.length) {
        const roundPoints = level * 20;
        const newScore = score + roundPoints;
        setScore(newScore);

        if (level >= 5) {
          confetti({ particleCount: 25, spread: 50, origin: { y: 0.6 } });
        }

        advanceLevel(newScore, level, sequence);
      }
    } else {
      // Wrong node!
      sound.playGameOver();
      const newLives = lives - 1;
      setLives(newLives);

      if (newLives <= 0) {
        setIsGameOver(true);
        // Record final score & level
        if (!hasRecordedRef.current) {
          hasRecordedRef.current = true;
          const totalPointsEarned = Math.max(25, level * 15);
          recordActivityCompletion({
            activityId: 'memory-grid',
            activityTitle: 'Memory Grid',
            type: 'activity',
            targetPath: '/activity/memory-grid',
            pointsEarned: totalPointsEarned,
            score: level,
            isDailyPortal: isDaily,
          });
        }
      } else {
        // Replay sequence for current level
        setPlayerStep(0);
        window.setTimeout(() => {
          playSequence(sequence);
        }, 1000);
      }
    }
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
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium">
              <span>Working Memory</span>
              <span aria-hidden="true">·</span>
              <span>Sequence Retention</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Memory Grid</h1>
          </div>
        </div>

        <div className="flex items-center gap-4 text-right">
          <div>
            <div className="text-xs text-slate-400">Best Level</div>
            <div className="text-base font-mono font-bold text-cyan-400">Lv {bestLevel}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Score</div>
            <div className="text-base font-mono font-bold text-white">{score}</div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 mb-6">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-400" />
          <span className="text-sm font-semibold text-slate-200">
            {hasStarted ? `Level ${level} (${sequence.length} Nodes)` : 'Ready to train'}
          </span>
        </div>

        <div className="flex items-center gap-1.5" aria-label={`Lives: ${lives}`}>
          {[1, 2, 3].map((heart) => (
            <Heart
              key={heart}
              className={`w-5 h-5 transition-colors ${
                heart <= lives ? 'text-rose-500 fill-rose-500' : 'text-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Grid Area */}
      <div className="relative max-w-sm mx-auto aspect-square p-4 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-col justify-center">
        {!hasStarted ? (
          <div className="text-center p-6 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
              <Brain className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Memorize the Sequence</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Watch the cyber nodes illuminate in sequence with harmonic tones. Once the sequence ends, tap the nodes in the exact same order!
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
            >
              Start Level 1
            </button>
          </div>
        ) : isGameOver ? (
          <div className="text-center p-6 space-y-4">
            <div className="text-xs text-rose-400 font-bold uppercase tracking-widest">Simulation Concluded</div>
            <h3 className="text-2xl font-black text-white">Sequence Limit Reached</h3>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Reached Level</div>
              <div className="text-3xl font-mono font-bold text-cyan-400">Level {level}</div>
              <div className="text-xs text-slate-300 pt-1">Total Score: {score} XP</div>
            </div>
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg transition-all flex items-center gap-2 mx-auto cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 w-full h-full p-2">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => {
              const isActive = activeNode === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleNodeClick(idx)}
                  disabled={isShowingSequence}
                  aria-label={`Node ${idx + 1}`}
                  className={`relative rounded-2xl border transition-all duration-150 cursor-pointer flex items-center justify-center overflow-hidden ${
                    isActive
                      ? `bg-gradient-to-br ${NODE_COLORS[idx]} border-white scale-95 shadow-[0_0_30px_rgba(6,182,212,0.8)]`
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900 active:scale-95'
                  }`}
                >
                  <span
                    className={`w-3 h-3 rounded-full transition-all ${
                      isActive ? 'bg-white shadow-[0_0_15px_white]' : 'bg-slate-700'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Helper Footer */}
      {hasStarted && !isGameOver && (
        <div className="mt-4 text-center">
          <div className="text-xs text-slate-400">
            {isShowingSequence ? (
              <span className="text-cyan-400 font-medium animate-pulse">Observing Sequence...</span>
            ) : (
              <span className="text-emerald-400 font-medium">Your Turn: Node {playerStep + 1} of {sequence.length}</span>
            )}
          </div>
        </div>
      )}

      {/* Instructions & Progression Tip */}
      <div className="mt-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1">
        <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
          <Award className="w-4 h-4 text-amber-400" /> Progression Reward:
        </div>
        <p>Reach Level 6 to unlock the <span className="text-cyan-400 font-medium">Memory Overclock</span> achievement badge and earn +90 bonus XP.</p>
      </div>
    </div>
  );
};

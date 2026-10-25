import React, { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Trophy,
  Timer,
  Sparkles,
  Zap,
  Shield,
  Cpu,
  Flame,
  Target,
  Compass,
  Radio,
  Eye,
  Key,
  Anchor,
  Atom,
  Binary,
  Layers,
  Hexagon,
  Boxes,
  Activity
} from 'lucide-react';
import { sound } from '../../utils/audio';

const ICONS = [
  { id: 'zap', icon: Zap, color: '#facc15' },
  { id: 'shield', icon: Shield, color: '#06b6d4' },
  { id: 'cpu', icon: Cpu, color: '#a855f7' },
  { id: 'flame', icon: Flame, color: '#f43f5e' },
  { id: 'target', icon: Target, color: '#22c55e' },
  { id: 'compass', icon: Compass, color: '#38bdf8' },
  { id: 'radio', icon: Radio, color: '#c084fc' },
  { id: 'sparkles', icon: Sparkles, color: '#e879f9' },
  { id: 'eye', icon: Eye, color: '#14b8a6' },
  { id: 'key', icon: Key, color: '#fb923c' },
  { id: 'anchor', icon: Anchor, color: '#6366f1' },
  { id: 'atom', icon: Atom, color: '#0ea5e9' },
  { id: 'binary', icon: Binary, color: '#10b981' },
  { id: 'layers', icon: Layers, color: '#ec4899' },
  { id: 'hexagon', icon: Hexagon, color: '#f59e0b' },
  { id: 'boxes', icon: Boxes, color: '#8b5cf6' },
  { id: 'activity', icon: Activity, color: '#06b6d4' },
  { id: 'gem', icon: Trophy, color: '#eab308' }
];

interface CardItem {
  instanceId: string;
  iconId: string;
  matched: boolean;
  color: string;
}

export const MemoryMatchGame: React.FC = () => {
  const [gridSize, setGridSize] = useState<16 | 20 | 36>(16);
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [bestMoves, setBestMoves] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('qivlix_highscore_memory-match') || '0', 10);
    } catch {
      return 0;
    }
  });

  const timerRef = useRef<number | null>(null);

  // Initialize deck based on grid size
  const initializeGame = useCallback(() => {
    const pairCount = gridSize / 2;
    const selectedIcons = ICONS.slice(0, pairCount);
    const deck: CardItem[] = [];

    selectedIcons.forEach((item) => {
      // Create pair
      deck.push({
        instanceId: `${item.id}-1`,
        iconId: item.id,
        matched: false,
        color: item.color
      });
      deck.push({
        instanceId: `${item.id}-2`,
        iconId: item.id,
        matched: false,
        color: item.color
      });
    });

    // Shuffle deck
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
    setFlippedIndices([]);
    setMoves(0);
    setCombo(0);
    setIsWon(false);
    setTimeElapsed(0);
    setIsTimerRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [gridSize]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Timer counter
  useEffect(() => {
    if (isTimerRunning && !isWon) {
      timerRef.current = window.setInterval(() => {
        setTimeElapsed((t) => t + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, isWon]);

  // Handle card click
  const handleCardClick = (idx: number) => {
    if (flippedIndices.length >= 2 || cards[idx].matched || flippedIndices.includes(idx) || isWon) {
      return;
    }

    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }

    sound.playMove();

    const nextFlipped = [...flippedIndices, idx];
    setFlippedIndices(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = nextFlipped;
      const firstCard = cards[firstIdx];
      const secondCard = cards[secondIdx];

      if (firstCard.iconId === secondCard.iconId) {
        // Matched
        sound.playMatch();
        setCombo((c) => c + 1);

        setTimeout(() => {
          setCards((prev) =>
            prev.map((card, i) =>
              i === firstIdx || i === secondIdx ? { ...card, matched: true } : card
            )
          );
          setFlippedIndices([]);

          // Check if all matched
          const remainingUnmatched = cards.filter(
            (c, i) => !c.matched && i !== firstIdx && i !== secondIdx
          ).length;

          if (remainingUnmatched === 0) {
            setIsWon(true);
            setIsTimerRunning(false);
            sound.playVictory();
            confetti({
              particleCount: 70,
              spread: 70,
              origin: { y: 0.6 }
            });

            // Update best moves
            const finalMoves = moves + 1;
            if (bestMoves === 0 || finalMoves < bestMoves) {
              setBestMoves(finalMoves);
              try {
                localStorage.setItem('qivlix_highscore_memory-match', String(finalMoves));
              } catch {}
            }
          }
        }, 350);
      } else {
        // Mismatch
        setCombo(0);
        setTimeout(() => {
          setFlippedIndices([]);
        }, 850);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto select-none">
      {/* Header Info */}
      <div className="w-full flex items-center justify-between p-3.5 mb-4 rounded-xl bg-slate-900/90 border border-slate-800">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Timer className="w-3 h-3 text-cyan-400" /> Time
            </div>
            <div className="text-xl font-bold font-mono text-cyan-400 tabular-nums">
              {formatTime(timeElapsed)}
            </div>
          </div>
          <div className="border-l border-slate-800 pl-4">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Moves</div>
            <div className="text-xl font-bold font-mono text-purple-400 tabular-nums">
              {moves}
            </div>
          </div>
          {bestMoves > 0 && (
            <div className="border-l border-slate-800 pl-4 hidden sm:block">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Trophy className="w-3 h-3 text-amber-400" /> Best
              </div>
              <div className="text-xl font-bold font-mono text-amber-400 tabular-nums">
                {bestMoves}
              </div>
            </div>
          )}
          {combo > 1 && (
            <div className="border-l border-slate-800 pl-4 animate-pulse">
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Streak</div>
              <div className="text-xl font-bold font-mono text-emerald-400">
                {combo}x
              </div>
            </div>
          )}
        </div>

        {/* Difficulty Buttons */}
        <div className="flex items-center gap-1.5">
          <div className="hidden sm:flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setGridSize(16)}
              className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                gridSize === 16 ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              4x4
            </button>
            <button
              onClick={() => setGridSize(20)}
              className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                gridSize === 20 ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              4x5
            </button>
            <button
              onClick={() => setGridSize(36)}
              className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                gridSize === 36 ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              6x6
            </button>
          </div>

          <button
            onClick={initializeGame}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
            title="Reset cards"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid Container */}
      <div
        className={`relative w-full p-3 sm:p-4 rounded-2xl bg-[#090e1c] border-2 border-slate-800 shadow-2xl grid gap-2 sm:gap-2.5 ${
          gridSize === 16
            ? 'grid-cols-4 max-w-[420px]'
            : gridSize === 20
            ? 'grid-cols-4 sm:grid-cols-5 max-w-[480px]'
            : 'grid-cols-6 max-w-[540px]'
        }`}
      >
        {cards.map((card, idx) => {
          const isFlipped = flippedIndices.includes(idx) || card.matched;
          const matched = card.matched;
          const iconEntry = ICONS.find((i) => i.id === card.iconId);
          const IconComp = iconEntry ? iconEntry.icon : Sparkles;

          return (
            <button
              key={card.instanceId}
              type="button"
              onClick={() => handleCardClick(idx)}
              className={`aspect-square rounded-xl border transition-all duration-300 flex items-center justify-center cursor-pointer relative group [perspective:1000px] ${
                matched
                  ? 'bg-cyan-950/20 border-cyan-500/40 opacity-75'
                  : isFlipped
                  ? 'bg-slate-800 border-purple-500 shadow-lg shadow-purple-500/20'
                  : 'bg-[#101729] hover:bg-slate-800/90 border-slate-800/90 hover:border-slate-700'
              }`}
              aria-label={`Memory card ${idx + 1}`}
            >
              {isFlipped ? (
                <div className="animate-in zoom-in-75 duration-200 flex items-center justify-center">
                  <IconComp
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    style={{ color: card.color }}
                  />
                </div>
              ) : (
                <div className="w-3 h-3 rounded-full bg-slate-800 group-hover:bg-cyan-400/40 transition-colors" />
              )}
            </button>
          );
        })}

        {/* Victory Screen Modal */}
        {isWon && (
          <div className="absolute inset-0 rounded-2xl bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-3 text-cyan-400">
              <Trophy className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="font-display font-black text-2xl text-slate-100 mb-1">
              Matrix Cleared!
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              All memory relics synchronized with flawless recall.
            </p>
            <div className="flex gap-4 mb-6">
              <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-mono">Moves</span>
                <div className="text-xl font-bold font-mono text-purple-400 tabular-nums">{moves}</div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-mono">Time</span>
                <div className="text-xl font-bold font-mono text-cyan-400 tabular-nums">
                  {formatTime(timeElapsed)}
                </div>
              </div>
            </div>
            <button
              onClick={initializeGame}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 hover:opacity-90 cursor-pointer"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

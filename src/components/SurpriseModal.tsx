import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { Dices, X, ArrowRight, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SurpriseOption {
  id: string;
  title: string;
  category: string;
  tagline: string;
  type: 'game' | 'activity' | 'discovery';
  path: string;
}

const SURPRISE_POOL: SurpriseOption[] = [
  { id: 'act-reaction-rush', title: 'Reaction Rush', category: 'Reflex Speed', tagline: 'Test your reaction speed down to the millisecond.', type: 'activity', path: '/activity/reaction-rush' },
  { id: 'act-memory-grid', title: 'Memory Grid', category: 'Working Memory', tagline: 'Memorize and repeat escalating harmonic sequences.', type: 'activity', path: '/activity/memory-grid' },
  { id: 'act-odd-one-out', title: 'Odd One Out', category: 'Visual Logic', tagline: 'Spot subtle anomalies across science and nature sets.', type: 'activity', path: '/activity/odd-one-out' },
  { id: 'act-mystery-picture', title: 'Mystery Picture', category: 'Deduction', tagline: 'Uncover progressive clues to decrypt classified subjects.', type: 'activity', path: '/activity/mystery-picture' },
  { id: 'act-daily-riddle', title: 'Daily Riddle', category: 'Lateral Logic', tagline: 'Decipher today\'s poetic and philosophical riddle.', type: 'activity', path: '/activity/daily-riddle' },
  { id: 'game-block-puzzle', title: 'Block Puzzle', category: 'Spatial Puzzle', tagline: 'Place neon polyominos and blast combo lines on the 10x10 matrix.', type: 'game', path: '/game/block-puzzle' },
  { id: 'game-snake', title: 'Cyber Snake', category: 'Arcade Classic', tagline: 'Glide through the neon matrix, collect power cores, and grow.', type: 'game', path: '/game/snake' },
  { id: 'game-wordle', title: 'Cyber Wordle', category: 'Word Crypt', tagline: 'Crack the 5-letter access code within 6 tactical attempts.', type: 'game', path: '/game/cyber-wordle' },
  { id: 'game-number-merge', title: 'Quantum 2048', category: 'Strategy', tagline: 'Slide tiles and synthesize high-energy 2048 quantum elements.', type: 'game', path: '/game/number-merge' },
  { id: 'game-breakout', title: 'Neon Breakout', category: 'Reflex Arcade', tagline: 'Deflect photonic spheres to shatter defensive cyber barriers.', type: 'game', path: '/game/neon-breakout' },
  { id: 'disc-vault', title: 'Discovery Vault', category: 'Mind Exploration', tagline: 'Explore time dilation, acoustic ocean anomalies, and illusions.', type: 'discovery', path: '/discover' },
];

let lastSurpriseId: string | null = null;

interface SurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const SurpriseModal: React.FC<SurpriseModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selected, setSelected] = useState<SurpriseOption | null>(null);

  if (!isOpen) return null;

  const spin = () => {
    setIsSpinning(true);
    sound.playMove();

    const pool = SURPRISE_POOL.filter((item) => item.id !== lastSurpriseId);
    const chosen = pool[Math.floor(Math.random() * pool.length)];

    let currentStep = 0;
    const totalSteps = 12;
    const interval = setInterval(() => {
      const tempPick = pool[Math.floor(Math.random() * pool.length)];
      setSelected(tempPick);
      sound.playTone(300 + currentStep * 30, 'sine', 0.05, 0.05);
      currentStep++;

      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setSelected(chosen);
        lastSurpriseId = chosen.id;
        setIsSpinning(false);
        sound.playVictory();

        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#ccff00', '#ff5500', '#fbfaf6'],
          });
        } catch {}
      }
    }, 80);
  };

  const handleLaunch = () => {
    if (selected) {
      onNavigate(selected.path);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060810]/85 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md rounded-2xl bg-[#0a0e1a] border border-[#1b243b] p-6 shadow-2xl relative arcade-corner-ticks">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#060810] border border-[#1b243b] text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#ccff00] font-bold">
            <Dices className="w-4 h-4 text-[#ccff00]" />
            <span>Random Activity Roulette</span>
          </div>
          <h2 className="font-display font-black text-2xl text-[#fbfaf6]">
            Surprise Me
          </h2>
          <p className="text-xs text-slate-300">
            Uncertain what to play? Let the Qivlix engine select a randomized challenge.
          </p>
        </div>

        {/* Result Showcase */}
        {selected ? (
          <div className="p-5 rounded-xl bg-[#060810] border border-[#1b243b] text-center space-y-3 mb-6">
            <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-[#0a0e1a] border border-[#ccff00]/40 text-[#ccff00] font-bold">
              {selected.category}
            </span>
            <h3 className="font-display font-bold text-xl text-[#fbfaf6]">
              {selected.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
              {selected.tagline}
            </p>
          </div>
        ) : (
          <div className="p-8 rounded-xl bg-[#060810] border border-dashed border-[#1b243b] text-center space-y-2 mb-6">
            <Dices className="w-8 h-8 text-[#ccff00] mx-auto animate-bounce" />
            <p className="text-xs font-mono text-slate-400">
              Roll the die to select an instant challenge.
            </p>
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-3">
          <button
            onClick={spin}
            disabled={isSpinning}
            className="flex-1 py-3 rounded-lg bg-[#060810] border border-[#1b243b] hover:border-[#ccff00] text-slate-200 hover:text-[#ccff00] font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Dices className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? 'Rolling...' : selected ? 'Reroll' : 'Roll Challenge'}</span>
          </button>

          {selected && !isSpinning && (
            <button
              onClick={handleLaunch}
              className="flex-1 py-3 rounded-lg bg-[#ccff00] hover:bg-[#d9ff33] text-[#060810] font-mono font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Launch Now</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

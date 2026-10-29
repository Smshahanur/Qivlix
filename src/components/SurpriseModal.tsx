import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { Dices, Sparkles, X, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SurpriseOption {
  id: string;
  title: string;
  category: string;
  tagline: string;
  type: 'game' | 'activity' | 'discovery';
  path: string;
  color: string;
}

const SURPRISE_POOL: SurpriseOption[] = [
  { id: 'act-reaction-rush', title: 'Reaction Rush', category: 'Reflex Speed', tagline: 'Test your reaction speed down to the millisecond.', type: 'activity', path: '/activity/reaction-rush', color: 'from-amber-500 to-orange-600' },
  { id: 'act-memory-grid', title: 'Memory Grid', category: 'Working Memory', tagline: 'Memorize and repeat escalating cyber harmonic sequences.', type: 'activity', path: '/activity/memory-grid', color: 'from-cyan-500 to-blue-600' },
  { id: 'act-odd-one-out', title: 'Odd One Out', category: 'Visual Logic', tagline: 'Spot subtle anomalies across science and nature sets.', type: 'activity', path: '/activity/odd-one-out', color: 'from-purple-500 to-indigo-600' },
  { id: 'act-mystery-picture', title: 'Mystery Picture', category: 'Deduction', tagline: 'Uncover progressive clues to decrypt classified subjects.', type: 'activity', path: '/activity/mystery-picture', color: 'from-emerald-500 to-teal-600' },
  { id: 'act-daily-riddle', title: 'Daily Riddle', category: 'Lateral Logic', tagline: 'Decipher today\'s poetic and philosophical riddle.', type: 'activity', path: '/activity/daily-riddle', color: 'from-amber-400 to-yellow-600' },
  { id: 'game-block-puzzle', title: 'Block Puzzle', category: 'Spatial Puzzle', tagline: 'Place neon polyominos and blast combo lines on the 10x10 matrix.', type: 'game', path: '/game/block-puzzle', color: 'from-cyan-400 to-blue-500' },
  { id: 'game-snake', title: 'Cyber Snake', category: 'Arcade Classic', tagline: 'Glide through the neon matrix, collect power cores, and grow.', type: 'game', path: '/game/snake', color: 'from-purple-400 to-fuchsia-600' },
  { id: 'game-wordle', title: 'Cyber Wordle', category: 'Word Crypt', tagline: 'Crack the 5-letter access code within 6 tactical attempts.', type: 'game', path: '/game/cyber-wordle', color: 'from-emerald-400 to-teal-500' },
  { id: 'game-number-merge', title: 'Quantum 2048', category: 'Strategy', tagline: 'Slide tiles and synthesize high-energy 2048 quantum elements.', type: 'game', path: '/game/number-merge', color: 'from-orange-500 to-amber-600' },
  { id: 'game-breakout', title: 'Neon Breakout', category: 'Reflex Arcade', tagline: 'Deflect photonic spheres to shatter defensive cyber barriers.', type: 'game', path: '/game/neon-breakout', color: 'from-rose-500 to-pink-600' },
  { id: 'disc-vault', title: 'Discovery Vault', category: 'Mind Exploration', tagline: 'Explore time dilation, acoustic ocean anomalies, and illusions.', type: 'discovery', path: '/discover', color: 'from-violet-500 to-purple-700' },
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

    // Filter out the one just rolled
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
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
      }
    }, 70);
  };

  const handleLaunch = () => {
    if (selected) {
      onClose();
      onNavigate(selected.path);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-6 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-purple-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
            <Dices className={`w-8 h-8 ${isSpinning ? 'animate-spin' : ''}`} />
          </div>

          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Surprise Portal</h2>
            <p className="text-xs text-slate-400 mt-1">
              Roll the quantum dice to discover an activity or puzzle at random.
            </p>
          </div>

          {/* Selected Option Display */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 min-h-[140px] flex flex-col justify-center items-center text-center">
            {selected ? (
              <div className="space-y-2 animate-fadeIn">
                <div className="text-xs text-cyan-400 font-semibold tracking-wider uppercase">
                  {selected.category}
                </div>
                <h3 className="text-xl font-bold text-white">{selected.title}</h3>
                <p className="text-xs text-slate-400 max-w-xs">{selected.tagline}</p>
              </div>
            ) : (
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-slate-600" /> Tap "Roll Surprise" to spin
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={spin}
              disabled={isSpinning}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Dices className="w-4 h-4 text-amber-400" /> {selected ? 'Roll Again' : 'Roll Surprise'}
            </button>

            {selected && !isSpinning && (
              <button
                onClick={handleLaunch}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Launch Now <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

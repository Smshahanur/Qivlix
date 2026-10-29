import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../../utils/audio';
import { MYSTERY_PICTURES } from '../../data/playgroundContent';
import { recordActivityCompletion, getStoredProfile } from '../../utils/progression';
import { getDailyMysteryPictureIndex } from '../../utils/dailySystem';
import { Search, RotateCcw, ArrowLeft, CheckCircle2, AlertCircle, HelpCircle, Sparkles, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MysteryPictureProps {
  onBack?: () => void;
  isDaily?: boolean;
}

export const MysteryPictureActivity: React.FC<MysteryPictureProps> = ({ onBack, isDaily }) => {
  const [mysteryIdx, setMysteryIdx] = useState<number>(() => getDailyMysteryPictureIndex());
  const [cluesRevealed, setCluesRevealed] = useState<number>(1);
  const [selectedGuess, setSelectedGuess] = useState<string | null>(null);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [pointsAwarded, setPointsAwarded] = useState<number>(0);
  const hasSolvedRef = useRef<boolean>(false);

  const currentMystery = MYSTERY_PICTURES[mysteryIdx % MYSTERY_PICTURES.length];

  // Calculate current available points based on revealed clues
  const currentMaxPoints = Math.max(25, 125 - cluesRevealed * 25);

  // Check if this mystery was previously solved
  useEffect(() => {
    const profile = getStoredProfile();
    const isAlreadyDecrypted = profile.personalBests[currentMystery.id] !== undefined;
    if (isAlreadyDecrypted) {
      setIsSolved(true);
      setCluesRevealed(4);
      setPointsAwarded(0);
    } else {
      setIsSolved(false);
      setCluesRevealed(1);
      setPointsAwarded(0);
    }
    hasSolvedRef.current = false;
  }, [currentMystery.id]);

  const handleRevealClue = () => {
    if (cluesRevealed < 4) {
      setCluesRevealed((prev) => prev + 1);
      sound.playMove();
    }
  };

  const handleGuess = (choice: string) => {
    if (isSolved || isFailed || hasSolvedRef.current) return;

    setSelectedGuess(choice);

    if (choice === currentMystery.correctAnswer) {
      // Solved!
      hasSolvedRef.current = true;
      setIsSolved(true);
      setCluesRevealed(4);
      sound.playVictory();
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });

      const res = recordActivityCompletion({
        activityId: currentMystery.id,
        activityTitle: `Mystery: ${currentMystery.title}`,
        type: 'activity',
        targetPath: '/activity/mystery-picture',
        pointsEarned: currentMaxPoints,
        score: currentMaxPoints,
        isDailyPortal: isDaily,
        isMystery: true,
      });
      setPointsAwarded(res.pointsAwarded);
    } else {
      sound.playGameOver();
      if (cluesRevealed < 4) {
        setCluesRevealed((prev) => Math.min(4, prev + 1));
      } else {
        setIsFailed(true);
      }
    }
  };

  const nextMystery = () => {
    setMysteryIdx((prev) => prev + 1);
    setCluesRevealed(1);
    setSelectedGuess(null);
    setIsSolved(false);
    setIsFailed(false);
    setPointsAwarded(0);
    sound.playMove();
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
              <span>Investigation & Deduction</span>
              <span aria-hidden="true">·</span>
              <span>{currentMystery.category}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Mystery Picture</h1>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-400">Available Reward</div>
          <div className="text-base font-mono font-bold text-amber-400">+{currentMaxPoints} XP</div>
        </div>
      </div>

      {/* Main Investigation Canvas & Mystery Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Left: The Visual Scanner Field */}
        <div className="relative aspect-square rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col items-center justify-center p-6 shadow-2xl">
          {/* Cyber matrix background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950 pointer-events-none" />

          {/* Center Graphic */}
          <div className="relative z-0 text-center space-y-3">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-300">
              <Search className="w-12 h-12" />
            </div>
            <div className="font-mono text-xs tracking-wider text-slate-400 uppercase">
              {isSolved ? currentMystery.correctAnswer : 'Classified Subject File'}
            </div>
          </div>

          {/* 16 Obscuring Shroud Tiles */}
          {!isSolved && (
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 p-2 gap-1.5 z-10 pointer-events-none">
              {Array.from({ length: 16 }).map((_, i) => {
                // Dissolve 4 tiles per clue revealed
                const isTileOpen = i < cluesRevealed * 4;
                return (
                  <div
                    key={i}
                    className={`rounded-lg transition-all duration-700 flex items-center justify-center font-mono text-[10px] ${
                      isTileOpen
                        ? 'opacity-0 scale-75'
                        : 'bg-slate-900/95 border border-slate-800 text-slate-600 shadow-inner'
                    }`}
                  >
                    {!isTileOpen && '#'}
                  </div>
                );
              })}
            </div>
          )}

          {/* Solved Overlay celebration */}
          {isSolved && (
            <div className="absolute inset-0 bg-emerald-950/70 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-20 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="text-xs text-emerald-300 uppercase tracking-widest font-semibold">Decrypted!</div>
              <h3 className="text-xl font-black text-white mt-1">{currentMystery.correctAnswer}</h3>
              <div className="text-xs font-mono text-amber-400 mt-2">+{pointsAwarded} XP Earned</div>
            </div>
          )}
        </div>

        {/* Right: Progressive Clues & Investigation Control */}
        <div className="flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Evidence Clues ({cluesRevealed} of 4)</span>
              {cluesRevealed < 4 && !isSolved && (
                <button
                  onClick={handleRevealClue}
                  className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" /> Reveal Next Clue (-25 XP)
                </button>
              )}
            </div>

            {/* List of active revealed clues */}
            <div className="space-y-2">
              {currentMystery.clues.slice(0, cluesRevealed).map((clue, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed animate-fadeIn"
                >
                  {clue}
                </div>
              ))}
            </div>
          </div>

          {/* Deduce Options */}
          {!isSolved && !isFailed && (
            <div className="space-y-2 pt-2">
              <div className="text-xs text-slate-400 font-medium">Select your deduction:</div>
              <div className="grid grid-cols-1 gap-2">
                {currentMystery.choices.map((choice, i) => (
                  <button
                    key={i}
                    onClick={() => handleGuess(choice)}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-850 text-left text-xs sm:text-sm font-medium text-slate-200 transition-all cursor-pointer"
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isFailed && (
            <div className="p-4 rounded-xl bg-rose-950/70 border border-rose-600/50 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
              <h4 className="text-base font-bold text-white">Investigation Inconclusive</h4>
              <p className="text-xs text-rose-200">
                The correct mystery subject was: <span className="font-bold">{currentMystery.correctAnswer}</span>.
              </p>
              <button
                onClick={nextMystery}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs cursor-pointer"
              >
                Next Mystery
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Discovery Detail & Scientific Context when solved */}
      {isSolved && (
        <div className="mt-8 p-6 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-4 animate-fadeIn">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <Sparkles className="w-4 h-4" /> Declassified Intel & Historical Context
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">{currentMystery.explanation}</p>
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span><strong className="text-slate-200">Curious Fact:</strong> {currentMystery.funFact}</span>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={nextMystery}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Next Mystery Challenge
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

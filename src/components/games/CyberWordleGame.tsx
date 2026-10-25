import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Trophy, Sparkles, Delete, Check, HelpCircle, BarChart2 } from 'lucide-react';
import { sound } from '../../utils/audio';

const WORDS = [
  'CYBER', 'PIXEL', 'GAMES', 'LOGIC', 'ROBOT', 'LASER', 'QUEST', 'POWER',
  'SERVO', 'DRONE', 'RADAR', 'CIRCUIT', 'SOLAR', 'GIGA', 'BYTES', 'SONIC',
  'VIRUS', 'MODEM', 'CLOUD', 'FIBER', 'PULSE', 'SHOCK', 'NEONS', 'FLASH',
  'SHARD', 'AUDIO', 'BLAST', 'CHIPS', 'PROXY', 'TOKEN', 'ARRAY', 'STACK',
  'CODER', 'DEBUG', 'PHISH', 'CACHE', 'FORCE', 'SPEED', 'MOTOR', 'GLYPH',
  'LEVEL', 'SCORE', 'TURBO', 'MATCH', 'CLICK', 'BOARD', 'SHAPE', 'BLOCK',
  'SNAKE', 'ALPHA', 'BRAVO', 'OMEGA', 'TITAN', 'VORTX', 'VAULT', 'ARMOR'
].map(w => w.slice(0, 5).toUpperCase()).filter(w => w.length === 5);

type LetterState = 'correct' | 'present' | 'absent' | 'empty';

interface GuessRow {
  letters: string[];
  states: LetterState[];
}

export const CyberWordleGame: React.FC = () => {
  const [targetWord, setTargetWord] = useState<string>(() => {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  });

  const [guesses, setGuesses] = useState<GuessRow[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [shake, setShake] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [stats, setStats] = useState<{ played: number; won: number; streak: number; maxStreak: number }>(() => {
    try {
      const saved = localStorage.getItem('qivlix_wordle_stats');
      return saved ? JSON.parse(saved) : { played: 0, won: 0, streak: 0, maxStreak: 0 };
    } catch {
      return { played: 0, won: 0, streak: 0, maxStreak: 0 };
    }
  });

  // Pick a fresh word
  const resetGame = () => {
    const newWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setTargetWord(newWord);
    setGuesses([]);
    setCurrentGuess('');
    setGameStatus('playing');
    setMessage(null);
    sound.playMove();
  };

  // Keyboard letter states
  const keyStates: Record<string, LetterState> = {};
  guesses.forEach((g) => {
    g.letters.forEach((l, idx) => {
      const state = g.states[idx];
      const prev = keyStates[l];
      if (state === 'correct') {
        keyStates[l] = 'correct';
      } else if (state === 'present' && prev !== 'correct') {
        keyStates[l] = 'present';
      } else if (state === 'absent' && !prev) {
        keyStates[l] = 'absent';
      }
    });
  });

  // Submit current 5-letter guess
  const submitGuess = useCallback(() => {
    if (gameStatus !== 'playing') return;

    if (currentGuess.length < 5) {
      setShake(true);
      setMessage('Must be 5 letters');
      setTimeout(() => {
        setShake(false);
        setMessage(null);
      }, 1500);
      sound.playTone(200, 'sawtooth', 0.15, 0.1);
      return;
    }

    const targetArr = targetWord.split('');
    const guessArr = currentGuess.split('');
    const states: LetterState[] = Array(5).fill('absent');
    const targetLetterCounts: Record<string, number> = {};

    targetArr.forEach((c) => {
      targetLetterCounts[c] = (targetLetterCounts[c] || 0) + 1;
    });

    // Pass 1: find correct letters
    guessArr.forEach((c, i) => {
      if (c === targetArr[i]) {
        states[i] = 'correct';
        targetLetterCounts[c]--;
      }
    });

    // Pass 2: find present letters
    guessArr.forEach((c, i) => {
      if (states[i] !== 'correct') {
        if (targetLetterCounts[c] && targetLetterCounts[c] > 0) {
          states[i] = 'present';
          targetLetterCounts[c]--;
        }
      }
    });

    const newGuesses = [...guesses, { letters: guessArr, states }];
    setGuesses(newGuesses);
    setCurrentGuess('');

    // Check Win
    if (currentGuess === targetWord) {
      setGameStatus('won');
      sound.playVictory();
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      setStats((prev) => {
        const next = {
          played: prev.played + 1,
          won: prev.won + 1,
          streak: prev.streak + 1,
          maxStreak: Math.max(prev.maxStreak, prev.streak + 1)
        };
        try {
          localStorage.setItem('qivlix_wordle_stats', JSON.stringify(next));
        } catch {}
        return next;
      });
    } else if (newGuesses.length >= 6) {
      // Lost
      setGameStatus('lost');
      sound.playGameOver();
      setStats((prev) => {
        const next = {
          played: prev.played + 1,
          won: prev.won,
          streak: 0,
          maxStreak: prev.maxStreak
        };
        try {
          localStorage.setItem('qivlix_wordle_stats', JSON.stringify(next));
        } catch {}
        return next;
      });
    } else {
      sound.playMatch();
    }
  }, [currentGuess, gameStatus, guesses, targetWord]);

  // Key press handler
  const handleKey = useCallback(
    (key: string) => {
      if (gameStatus !== 'playing') return;

      if (key === 'ENTER') {
        submitGuess();
      } else if (key === 'BACKSPACE' || key === 'DEL') {
        setCurrentGuess((prev) => prev.slice(0, -1));
        sound.playTone(320, 'sine', 0.04, 0.08);
      } else if (/^[A-Z]$/.test(key)) {
        if (currentGuess.length < 5) {
          setCurrentGuess((prev) => prev + key);
          sound.playTone(440, 'triangle', 0.04, 0.08);
        }
      }
    },
    [currentGuess, gameStatus, submitGuess]
  );

  // Physical Keyboard Listener
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      const key = e.key.toUpperCase();
      if (key === 'ENTER') {
        handleKey('ENTER');
      } else if (key === 'BACKSPACE') {
        handleKey('BACKSPACE');
      } else if (/^[A-Z]$/.test(key)) {
        handleKey(key);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKey]);

  // Keyboard Rows
  const KEY_ROWS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto p-4 sm:p-6 select-none">
      {/* Top Header / Stats Bar */}
      <div className="w-full flex items-center justify-between gap-4 mb-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Streak</div>
            <div className="text-xl font-display font-black text-cyan-400">
              {stats.streak}
            </div>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Win Rate</div>
            <div className="text-base font-mono font-bold text-slate-200">
              {stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0}%
            </div>
          </div>
        </div>

        <button
          onClick={resetGame}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>New Word</span>
        </button>
      </div>

      {/* Message Toast */}
      {message && (
        <div className="mb-3 px-4 py-1.5 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-300 text-xs font-mono font-bold animate-bounce">
          {message}
        </div>
      )}

      {/* 6x5 Letter Grid */}
      <div className="space-y-1.5 mb-6">
        {Array.from({ length: 6 }).map((_, rowIdx) => {
          const guess = guesses[rowIdx];
          const isCurrent = rowIdx === guesses.length;
          const letters = guess
            ? guess.letters
            : isCurrent
            ? currentGuess.padEnd(5, ' ').split('').slice(0, 5)
            : Array(5).fill(' ');

          return (
            <div
              key={rowIdx}
              className={`flex gap-1.5 ${isCurrent && shake ? 'animate-shake' : ''}`}
            >
              {letters.map((char, colIdx) => {
                const state = guess ? guess.states[colIdx] : 'empty';
                const hasChar = char.trim().length > 0;

                let tileBg = 'bg-slate-900/60 border-slate-800 text-slate-100';
                if (state === 'correct') {
                  tileBg = 'bg-gradient-to-tr from-emerald-600 to-teal-500 border-emerald-400 text-slate-950 font-black shadow-lg shadow-emerald-500/20';
                } else if (state === 'present') {
                  tileBg = 'bg-gradient-to-tr from-amber-600 to-yellow-500 border-amber-400 text-slate-950 font-black shadow-lg shadow-amber-500/20';
                } else if (state === 'absent') {
                  tileBg = 'bg-slate-950 border-slate-800/80 text-slate-500';
                } else if (hasChar) {
                  tileBg = 'bg-slate-900 border-cyan-400/80 text-cyan-300 scale-105';
                }

                return (
                  <div
                    key={colIdx}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 flex items-center justify-center font-display font-black text-xl sm:text-2xl transition-all duration-300 ${tileBg}`}
                  >
                    {char.trim()}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Game End Status Card */}
      {gameStatus !== 'playing' && (
        <div className="w-full mb-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-2 animate-in fade-in">
          {gameStatus === 'won' ? (
            <div>
              <span className="text-emerald-400 font-display font-bold text-lg">Cipher Cracked!</span>
              <p className="text-xs text-slate-300">Target was <strong className="text-cyan-300 font-mono">{targetWord}</strong> in {guesses.length} attempts.</p>
            </div>
          ) : (
            <div>
              <span className="text-rose-400 font-display font-bold text-lg">Access Denied!</span>
              <p className="text-xs text-slate-300">The hidden password was <strong className="text-cyan-300 font-mono">{targetWord}</strong>.</p>
            </div>
          )}
          <button
            onClick={resetGame}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950 font-bold text-xs shadow-md cursor-pointer hover:scale-105 transition-transform"
          >
            Play Next Word
          </button>
        </div>
      )}

      {/* Neon Virtual Keyboard */}
      <div className="w-full space-y-1.5 max-w-md">
        {KEY_ROWS.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center gap-1">
            {row.map((k) => {
              const state = keyStates[k];
              const isWide = k === 'ENTER' || k === 'DEL';

              let keyBg = 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700';
              if (state === 'correct') {
                keyBg = 'bg-emerald-500 text-slate-950 font-black border-emerald-400 shadow-md shadow-emerald-500/20';
              } else if (state === 'present') {
                keyBg = 'bg-amber-500 text-slate-950 font-black border-amber-400';
              } else if (state === 'absent') {
                keyBg = 'bg-slate-950 text-slate-600 border-slate-800';
              }

              return (
                <button
                  key={k}
                  onClick={() => handleKey(k)}
                  className={`h-11 sm:h-12 rounded-lg border font-mono font-bold text-xs sm:text-sm flex items-center justify-center transition-all active:scale-95 cursor-pointer ${
                    isWide ? 'px-3 sm:px-4 text-[11px]' : 'w-8 sm:w-10'
                  } ${keyBg}`}
                >
                  {k === 'DEL' ? <Delete className="w-4 h-4" /> : k}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

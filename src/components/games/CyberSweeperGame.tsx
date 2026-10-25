import React, { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Flag, Bomb, Trophy, Sparkles, Clock, HelpCircle, ShieldAlert } from 'lucide-react';
import { sound } from '../../utils/audio';

type Difficulty = 'novice' | 'hacker' | 'master';

interface DifficultyConfig {
  rows: number;
  cols: number;
  mines: number;
  label: string;
}

const CONFIGS: Record<Difficulty, DifficultyConfig> = {
  novice: { rows: 9, cols: 9, mines: 10, label: 'Novice (9x9)' },
  hacker: { rows: 16, cols: 16, mines: 40, label: 'Hacker (16x16)' },
  master: { rows: 16, cols: 30, mines: 99, label: 'Master (16x30)' }
};

interface Cell {
  r: number;
  c: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

const NUMBER_COLORS = [
  '',
  'text-cyan-400 font-bold',
  'text-emerald-400 font-bold',
  'text-rose-400 font-bold',
  'text-purple-400 font-bold',
  'text-amber-400 font-bold',
  'text-teal-400 font-bold',
  'text-fuchsia-400 font-bold',
  'text-slate-100 font-black'
];

export const CyberSweeperGame: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('novice');
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle');
  const [isFlagMode, setIsFlagMode] = useState(false);
  const [flagsRemaining, setFlagsRemaining] = useState(CONFIGS.novice.mines);
  const [time, setTime] = useState(0);
  const [bestTimes, setBestTimes] = useState<Record<Difficulty, number | null>>(() => {
    try {
      const saved = localStorage.getItem('qivlix_sweeper_best_times');
      return saved ? JSON.parse(saved) : { novice: null, hacker: null, master: null };
    } catch {
      return { novice: null, hacker: null, master: null };
    }
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize empty grid
  const initEmptyGrid = useCallback((diff: Difficulty) => {
    const config = CONFIGS[diff];
    const newGrid: Cell[][] = [];
    for (let r = 0; r < config.rows; r++) {
      const row: Cell[] = [];
      for (let c = 0; c < config.cols; c++) {
        row.push({
          r,
          c,
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborMines: 0
        });
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
    setGameState('idle');
    setFlagsRemaining(config.mines);
    setTime(0);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    initEmptyGrid(difficulty);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [difficulty, initEmptyGrid]);

  // Start timer
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };

  // Populate mines safely around first clicked cell
  const populateMines = (firstR: number, firstC: number, currentGrid: Cell[][], diff: Difficulty) => {
    const config = CONFIGS[diff];
    const newGrid = currentGrid.map((row) => row.map((cell) => ({ ...cell })));
    let placed = 0;

    while (placed < config.mines) {
      const randR = Math.floor(Math.random() * config.rows);
      const randC = Math.floor(Math.random() * config.cols);

      // Keep first cell and 8 adjacent neighbors mine-free for clean opening
      const isTooClose = Math.abs(randR - firstR) <= 1 && Math.abs(randC - firstC) <= 1;

      if (!newGrid[randR][randC].isMine && !isTooClose) {
        newGrid[randR][randC].isMine = true;
        placed++;
      }
    }

    // Calculate neighbor counts
    for (let r = 0; r < config.rows; r++) {
      for (let c = 0; c < config.cols; c++) {
        if (!newGrid[r][c].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < config.rows && nc >= 0 && nc < config.cols) {
                if (newGrid[nr][nc].isMine) count++;
              }
            }
          }
          newGrid[r][c].neighborMines = count;
        }
      }
    }

    return newGrid;
  };

  // Check victory
  const checkWin = (currentGrid: Cell[][], diff: Difficulty) => {
    const config = CONFIGS[diff];
    let revealedCount = 0;
    for (let r = 0; r < config.rows; r++) {
      for (let c = 0; c < config.cols; c++) {
        if (currentGrid[r][c].isRevealed && !currentGrid[r][c].isMine) {
          revealedCount++;
        }
      }
    }

    const safeCellsNeeded = config.rows * config.cols - config.mines;
    if (revealedCount === safeCellsNeeded) {
      setGameState('won');
      if (timerRef.current) clearInterval(timerRef.current);
      sound.playVictory();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22d3ee', '#a855f7', '#34d399', '#38bdf8']
      });

      // Save best time
      const finalTime = time;
      setBestTimes((prev) => {
        const currentBest = prev[diff];
        if (currentBest === null || finalTime < currentBest) {
          const next = { ...prev, [diff]: finalTime };
          try {
            localStorage.setItem('qivlix_sweeper_best_times', JSON.stringify(next));
          } catch {}
          return next;
        }
        return prev;
      });
    }
  };

  // Reveal cell with flood fill
  const revealCell = (r: number, c: number, activeGrid?: Cell[][]) => {
    let currentGrid = activeGrid || grid;
    const config = CONFIGS[difficulty];

    if (gameState === 'idle') {
      currentGrid = populateMines(r, c, currentGrid, difficulty);
      setGameState('playing');
      startTimer();
    }

    const cell = currentGrid[r][c];
    if (cell.isRevealed || cell.isFlagged || gameState === 'won' || gameState === 'lost') {
      return;
    }

    const newGrid = currentGrid.map((row) => row.map((item) => ({ ...item })));

    if (cell.isMine) {
      // Hit a mine - Game Over
      newGrid[r][c].isRevealed = true;
      // Reveal all other mines
      for (let i = 0; i < config.rows; i++) {
        for (let j = 0; j < config.cols; j++) {
          if (newGrid[i][j].isMine) {
            newGrid[i][j].isRevealed = true;
          }
        }
      }
      setGrid(newGrid);
      setGameState('lost');
      if (timerRef.current) clearInterval(timerRef.current);
      sound.playGameOver();
      return;
    }

    // Flood fill algorithm
    const queue: [number, number][] = [[r, c]];
    newGrid[r][c].isRevealed = true;

    while (queue.length > 0) {
      const [currR, currC] = queue.shift()!;
      const currCell = newGrid[currR][currC];

      if (currCell.neighborMines === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = currR + dr;
            const nc = currC + dc;
            if (nr >= 0 && nr < config.rows && nc >= 0 && nc < config.cols) {
              const neighbor = newGrid[nr][nc];
              if (!neighbor.isRevealed && !neighbor.isFlagged && !neighbor.isMine) {
                neighbor.isRevealed = true;
                if (neighbor.neighborMines === 0) {
                  queue.push([nr, nc]);
                }
              }
            }
          }
        }
      }
    }

    sound.playMove();
    setGrid(newGrid);
    checkWin(newGrid, difficulty);
  };

  // Toggle flag on a cell
  const toggleFlag = (r: number, c: number, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (gameState === 'won' || gameState === 'lost') return;

    const cell = grid[r][c];
    if (cell.isRevealed) return;

    const newGrid = grid.map((row) => row.map((item) => ({ ...item })));
    const willFlag = !cell.isFlagged;

    if (willFlag && flagsRemaining <= 0) {
      return; // Cannot flag more than available mines
    }

    newGrid[r][c].isFlagged = willFlag;
    setFlagsRemaining((prev) => (willFlag ? prev - 1 : prev + 1));
    setGrid(newGrid);
    sound.playTone(willFlag ? 660 : 440, 'sine', 0.05, 0.1);
  };

  // Handle cell click (depending on Flag Mode)
  const handleCellClick = (r: number, c: number) => {
    if (isFlagMode) {
      toggleFlag(r, c);
    } else {
      revealCell(r, c);
    }
  };

  // Chording: quick reveal surrounding unflagged cells if neighbor flags match count
  const handleCellDoubleClick = (r: number, c: number) => {
    const cell = grid[r][c];
    if (!cell.isRevealed || cell.neighborMines === 0 || gameState !== 'playing') return;

    const config = CONFIGS[difficulty];
    let flagCount = 0;
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < config.rows && nc >= 0 && nc < config.cols) {
          if (grid[nr][nc].isFlagged) flagCount++;
        }
      }
    }

    if (flagCount === cell.neighborMines) {
      const newGrid = grid.map((row) => row.map((item) => ({ ...item })));
      let hitMine = false;

      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < config.rows && nc >= 0 && nc < config.cols) {
            const neighbor = newGrid[nr][nc];
            if (!neighbor.isRevealed && !neighbor.isFlagged) {
              neighbor.isRevealed = true;
              if (neighbor.isMine) {
                hitMine = true;
              }
            }
          }
        }
      }

      if (hitMine) {
        setGrid(newGrid);
        setGameState('lost');
        if (timerRef.current) clearInterval(timerRef.current);
        sound.playGameOver();
      } else {
        setGrid(newGrid);
        sound.playMatch();
        checkWin(newGrid, difficulty);
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 sm:p-6 select-none">
      {/* Top Controls Bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-4 mb-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
        {/* Difficulty Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800/80">
          {(Object.keys(CONFIGS) as Difficulty[]).map((key) => (
            <button
              key={key}
              onClick={() => {
                setDifficulty(key);
                initEmptyGrid(key);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                difficulty === key
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {CONFIGS[key].label.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-4 font-mono text-sm">
          {/* Flags remaining */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-rose-400">
            <Bomb className="w-4 h-4" />
            <span className="font-bold">{String(flagsRemaining).padStart(2, '0')}</span>
          </div>

          {/* Reset / Mood Face */}
          <button
            onClick={() => initEmptyGrid(difficulty)}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-900/40 to-cyan-900/40 hover:from-purple-900/60 hover:to-cyan-900/60 border border-cyan-500/40 flex items-center justify-center text-lg shadow-md hover:scale-105 transition-all cursor-pointer"
            title="Restart current board"
          >
            {gameState === 'won' ? '😎' : gameState === 'lost' ? '💀' : '🤖'}
          </button>

          {/* Timer */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400">
            <Clock className="w-4 h-4" />
            <span className="font-bold">{String(Math.min(time, 999)).padStart(3, '0')}s</span>
          </div>
        </div>

        {/* Touch Flag Mode Toggle Button */}
        <button
          onClick={() => setIsFlagMode((prev) => !prev)}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
            isFlagMode
              ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 shadow-md shadow-rose-500/20'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-cyan-300'
          }`}
          title="Toggle Flagging Mode (Essential on Mobile Touch)"
        >
          <Flag className={`w-3.5 h-3.5 ${isFlagMode ? 'text-rose-400 fill-rose-400' : ''}`} />
          <span>{isFlagMode ? 'Flag Mode: ON' : 'Dig Mode: ON'}</span>
        </button>
      </div>

      {/* Sweeper Board Grid Viewport */}
      <div className="w-full overflow-x-auto pb-4 flex justify-center">
        <div
          className="inline-grid gap-1 p-3 rounded-2xl bg-[#070b16] border-2 border-slate-800 shadow-2xl"
          style={{
            gridTemplateColumns: `repeat(${CONFIGS[difficulty].cols}, minmax(0, 1fr))`
          }}
          onContextMenu={(e) => e.preventDefault()}
        >
          {grid.map((row, r) =>
            row.map((cell, c) => {
              const isRevealed = cell.isRevealed;
              const isFlagged = cell.isFlagged;
              const isMine = cell.isMine;

              let cellBg = 'bg-slate-900/90 hover:bg-slate-800/90 border-slate-800';
              if (isRevealed) {
                cellBg = isMine
                  ? 'bg-rose-950/80 border-rose-600/60 shadow-inner'
                  : 'bg-[#0f172a]/70 border-slate-800/60';
              } else if (isFlagged) {
                cellBg = 'bg-rose-950/30 border-rose-500/40';
              }

              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  onContextMenu={(e) => toggleFlag(r, c, e)}
                  onDoubleClick={() => handleCellDoubleClick(r, c)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg border text-xs sm:text-sm font-mono flex items-center justify-center transition-all cursor-pointer ${cellBg} ${
                    !isRevealed ? 'shadow-sm active:scale-95' : ''
                  }`}
                  aria-label={`Row ${r + 1}, Column ${c + 1}`}
                >
                  {isRevealed ? (
                    isMine ? (
                      <Bomb className="w-4 h-4 text-rose-400 fill-rose-500/20 animate-pulse" />
                    ) : cell.neighborMines > 0 ? (
                      <span className={NUMBER_COLORS[cell.neighborMines]}>
                        {cell.neighborMines}
                      </span>
                    ) : null
                  ) : isFlagged ? (
                    <Flag className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                  ) : null}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Best Times Record Display */}
      <div className="w-full max-w-md mt-6 grid grid-cols-3 gap-3 text-center">
        {(Object.keys(CONFIGS) as Difficulty[]).map((key) => (
          <div
            key={key}
            className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-1"
          >
            <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
              {key}
            </div>
            <div className="text-xs font-mono font-bold text-cyan-400">
              {bestTimes[key] ? `${bestTimes[key]}s` : '—'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

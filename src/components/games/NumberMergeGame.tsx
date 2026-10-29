import React, { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Undo2, Trophy, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Award } from 'lucide-react';
import { sound } from '../../utils/audio';
import { recordActivityCompletion } from '../../utils/progression';

type BoardGrid = number[][];

const BOARD_SIZE = 4;

const TILE_STYLES: Record<number, { bg: string; text: string; glow: string }> = {
  2: { bg: 'bg-slate-800/90 border-slate-700/80', text: 'text-slate-200', glow: '' },
  4: { bg: 'bg-slate-700/90 border-slate-600/80', text: 'text-cyan-200', glow: '' },
  8: { bg: 'bg-cyan-950/80 border-cyan-500/50', text: 'text-cyan-300 font-bold', glow: 'shadow-md shadow-cyan-500/20' },
  16: { bg: 'bg-cyan-900/80 border-cyan-400/60', text: 'text-cyan-200 font-bold', glow: 'shadow-md shadow-cyan-400/30' },
  32: { bg: 'bg-indigo-950/80 border-indigo-500/50', text: 'text-indigo-200 font-bold', glow: 'shadow-md shadow-indigo-500/20' },
  64: { bg: 'bg-purple-950/80 border-purple-500/60', text: 'text-purple-300 font-bold', glow: 'shadow-md shadow-purple-500/25' },
  128: { bg: 'bg-purple-900/90 border-purple-400/70', text: 'text-purple-200 font-extrabold', glow: 'shadow-lg shadow-purple-400/35' },
  256: { bg: 'bg-fuchsia-950/90 border-fuchsia-400/70', text: 'text-fuchsia-200 font-extrabold', glow: 'shadow-lg shadow-fuchsia-400/35' },
  512: { bg: 'bg-pink-950/90 border-pink-400/70', text: 'text-pink-200 font-extrabold', glow: 'shadow-lg shadow-pink-400/40' },
  1024: { bg: 'bg-amber-950/90 border-amber-400/70', text: 'text-amber-200 font-extrabold', glow: 'shadow-xl shadow-amber-400/40' },
  2048: { bg: 'bg-gradient-to-br from-amber-400 to-yellow-500 border-yellow-200', text: 'text-slate-950 font-black', glow: 'shadow-2xl shadow-yellow-400/60' },
  4096: { bg: 'bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 border-white', text: 'text-white font-black', glow: 'shadow-2xl shadow-cyan-400/70' }
};

export const NumberMergeGame: React.FC = () => {
  const [board, setBoard] = useState<BoardGrid>(() =>
    Array(BOARD_SIZE).fill(0).map(() => Array(BOARD_SIZE).fill(0))
  );
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('qivlix_highscore_number-merge') || '0', 10);
    } catch {
      return 0;
    }
  });
  const [prevBoard, setPrevBoard] = useState<BoardGrid | null>(null);
  const [prevScore, setPrevScore] = useState<number>(0);
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [keepPlaying, setKeepPlaying] = useState<boolean>(false);

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const hasRecordedRef = useRef<boolean>(false);

  // Spawn random 2 or 4 in empty cell
  const addRandomTile = useCallback((grid: BoardGrid): BoardGrid => {
    const emptyCells: { r: number; c: number }[] = [];
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (grid[r][c] === 0) emptyCells.push({ r, c });
      }
    }
    if (emptyCells.length === 0) return grid;
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newGrid = grid.map((row) => [...row]);
    newGrid[randomCell.r][randomCell.c] = Math.random() < 0.9 ? 2 : 4;
    return newGrid;
  }, []);

  // Initialize game
  const initGame = useCallback(() => {
    hasRecordedRef.current = false;
    let newGrid: BoardGrid = Array(BOARD_SIZE).fill(0).map(() => Array(BOARD_SIZE).fill(0));
    newGrid = addRandomTile(newGrid);
    newGrid = addRandomTile(newGrid);
    setBoard(newGrid);
    setScore(0);
    setPrevBoard(null);
    setCanUndo(false);
    setGameOver(false);
    setGameWon(false);
    setKeepPlaying(false);
  }, [addRandomTile]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // Check if moves are possible
  const canMove = (grid: BoardGrid): boolean => {
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (grid[r][c] === 0) return true;
        if (c < BOARD_SIZE - 1 && grid[r][c] === grid[r][c + 1]) return true;
        if (r < BOARD_SIZE - 1 && grid[r][c] === grid[r + 1][c]) return true;
      }
    }
    return false;
  };

  // Slide and merge one row to the left
  const slideRowLeft = (row: number[]): { newRow: number[]; earned: number } => {
    const filtered = row.filter((val) => val !== 0);
    const newRow: number[] = [];
    let earned = 0;

    for (let i = 0; i < filtered.length; i++) {
      if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
        const mergedVal = filtered[i] * 2;
        newRow.push(mergedVal);
        earned += mergedVal;
        i++; // skip next since merged
      } else {
        newRow.push(filtered[i]);
      }
    }
    while (newRow.length < BOARD_SIZE) {
      newRow.push(0);
    }
    return { newRow, earned };
  };

  const move = useCallback(
    (direction: 'LEFT' | 'RIGHT' | 'UP' | 'DOWN') => {
      if (gameOver) return;

      const currentBoard = board.map((r) => [...r]);
      let transformed: BoardGrid = Array(BOARD_SIZE).fill(0).map(() => Array(BOARD_SIZE).fill(0));
      let pointsEarned = 0;

      if (direction === 'LEFT') {
        for (let r = 0; r < BOARD_SIZE; r++) {
          const { newRow, earned } = slideRowLeft(currentBoard[r]);
          transformed[r] = newRow;
          pointsEarned += earned;
        }
      } else if (direction === 'RIGHT') {
        for (let r = 0; r < BOARD_SIZE; r++) {
          const reversed = [...currentBoard[r]].reverse();
          const { newRow, earned } = slideRowLeft(reversed);
          transformed[r] = newRow.reverse();
          pointsEarned += earned;
        }
      } else if (direction === 'UP') {
        for (let c = 0; c < BOARD_SIZE; c++) {
          const col = [currentBoard[0][c], currentBoard[1][c], currentBoard[2][c], currentBoard[3][c]];
          const { newRow, earned } = slideRowLeft(col);
          for (let r = 0; r < BOARD_SIZE; r++) {
            transformed[r][c] = newRow[r];
          }
          pointsEarned += earned;
        }
      } else if (direction === 'DOWN') {
        for (let c = 0; c < BOARD_SIZE; c++) {
          const col = [currentBoard[3][c], currentBoard[2][c], currentBoard[1][c], currentBoard[0][c]];
          const { newRow, earned } = slideRowLeft(col);
          const reversed = newRow.reverse();
          for (let r = 0; r < BOARD_SIZE; r++) {
            transformed[r][c] = reversed[r];
          }
          pointsEarned += earned;
        }
      }

      // Check if board changed
      const changed = transformed.some((row, r) => row.some((val, c) => val !== currentBoard[r][c]));
      if (!changed) return;

      // Save previous state for Undo
      setPrevBoard(currentBoard);
      setPrevScore(score);
      setCanUndo(true);

      if (pointsEarned > 0) {
        sound.playMatch();
      } else {
        sound.playMove();
      }

      const nextBoard = addRandomTile(transformed);
      const nextScore = score + pointsEarned;
      setBoard(nextBoard);
      setScore(nextScore);

      if (nextScore > highScore) {
        setHighScore(nextScore);
        try {
          localStorage.setItem('qivlix_highscore_number-merge', String(nextScore));
        } catch {}
      }

      // Check 2048 victory
      if (!gameWon && !keepPlaying) {
        const has2048 = nextBoard.some((row) => row.some((val) => val >= 2048));
        if (has2048) {
          setGameWon(true);
          sound.playVictory();
          confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
        }
      }

      // Check Game Over
      if (!canMove(nextBoard)) {
        setGameOver(true);
        sound.playGameOver();
        if (!hasRecordedRef.current && nextScore >= 50) {
          hasRecordedRef.current = true;
          const sessionXp = Math.min(50, Math.floor(nextScore / 50));
          recordActivityCompletion({
            activityId: 'number-merge',
            activityTitle: 'Quantum 2048 Merge',
            type: 'game',
            targetPath: '/game/number-merge',
            pointsEarned: sessionXp,
            score: nextScore,
          });
        }
      }
    },
    [board, gameOver, gameWon, keepPlaying, score, highScore, addRandomTile]
  );

  const handleUndo = () => {
    if (!canUndo || !prevBoard) return;
    setBoard(prevBoard);
    setScore(prevScore);
    setCanUndo(false);
    setGameOver(false);
    sound.playTone(260, 'sine', 0.08, 0.1);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault();
        move('LEFT');
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        move('RIGHT');
      } else if (['ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault();
        move('UP');
      } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        move('DOWN');
      } else if (['KeyZ'].includes(e.code)) {
        handleUndo();
      } else if (['KeyR'].includes(e.code)) {
        initGame();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move, handleUndo, initGame]);

  // Touch Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) > 25) {
      if (absDx > absDy) {
        move(dx > 0 ? 'RIGHT' : 'LEFT');
      } else {
        move(dy > 0 ? 'DOWN' : 'UP');
      }
    }
    touchStartRef.current = null;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto select-none">
      {/* HUD Header */}
      <div className="w-full flex items-center justify-between p-3.5 mb-4 rounded-xl bg-slate-900/90 border border-slate-800">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Score</div>
            <div className="text-xl font-bold font-mono text-cyan-400 tabular-nums">
              {score.toLocaleString()}
            </div>
          </div>
          <div className="border-l border-slate-800 pl-4">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Trophy className="w-3 h-3 text-amber-400" /> Best
            </div>
            <div className="text-xl font-bold font-mono text-amber-400 tabular-nums">
              {highScore.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            disabled={!canUndo}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              canUndo
                ? 'bg-slate-800 border-slate-700 text-cyan-300 hover:bg-slate-700'
                : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
            }`}
            title="Undo last move (Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={initGame}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
            title="Restart game (R)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4x4 Grid Board */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full aspect-square max-w-[380px] p-3 rounded-2xl bg-[#090e1c] border-2 border-slate-800 shadow-2xl grid grid-cols-4 gap-2.5 touch-none"
      >
        {board.map((row, r) =>
          row.map((val, c) => {
            const style = val > 0 ? TILE_STYLES[val] || TILE_STYLES[4096] : null;

            return (
              <div
                key={`${r}-${c}`}
                className={`rounded-xl border transition-all duration-150 flex items-center justify-center font-display font-black text-xl sm:text-2xl ${
                  val === 0
                    ? 'bg-[#101729] border-slate-800/80 text-transparent'
                    : `${style?.bg} ${style?.text} ${style?.glow} scale-100 animate-in zoom-in-75 duration-100`
                }`}
              >
                {val > 0 ? val : ''}
              </div>
            );
          })
        )}

        {/* 2048 Won Modal */}
        {gameWon && !keepPlaying && (
          <div className="absolute inset-0 rounded-2xl bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-150 z-20">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-3 text-amber-400">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="font-display font-black text-2xl text-amber-400 mb-1">
              2048 Quantum Achieved!
            </h3>
            <p className="text-xs text-slate-400 mb-5 max-w-xs">
              You fused the legendary 2048 tile. Will you push deeper into 4096?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setKeepPlaying(true)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 cursor-pointer"
              >
                Keep Going
              </button>
              <button
                onClick={initGame}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/25 hover:opacity-90 cursor-pointer"
              >
                New Game
              </button>
            </div>
          </div>
        )}

        {/* Game Over Screen */}
        {gameOver && (
          <div className="absolute inset-0 rounded-2xl bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-150 z-20">
            <h3 className="font-display font-extrabold text-2xl text-rose-400 mb-1">
              Matrix Overload!
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              No further moves or merges possible on the board.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 mb-5 w-44">
              <span className="text-[10px] text-slate-400 font-mono">Final Score</span>
              <div className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">
                {score.toLocaleString()}
              </div>
            </div>
            <button
              onClick={initGame}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 hover:opacity-90 cursor-pointer"
            >
              Try Again (R)
            </button>
          </div>
        )}
      </div>

      {/* On-screen mobile direction buttons */}
      <div className="mt-4 flex flex-col items-center gap-1 sm:hidden">
        <button
          onTouchStart={(e) => { e.preventDefault(); move('UP'); }}
          onClick={() => move('UP')}
          className="w-14 h-12 rounded-xl bg-slate-800/90 active:bg-cyan-500 active:text-slate-950 border border-slate-700 flex items-center justify-center text-slate-200 cursor-pointer"
          aria-label="Slide Up"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <button
            onTouchStart={(e) => { e.preventDefault(); move('LEFT'); }}
            onClick={() => move('LEFT')}
            className="w-14 h-12 rounded-xl bg-slate-800/90 active:bg-cyan-500 active:text-slate-950 border border-slate-700 flex items-center justify-center text-slate-200 cursor-pointer"
            aria-label="Slide Left"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onTouchStart={(e) => { e.preventDefault(); move('DOWN'); }}
            onClick={() => move('DOWN')}
            className="w-14 h-12 rounded-xl bg-slate-800/90 active:bg-cyan-500 active:text-slate-950 border border-slate-700 flex items-center justify-center text-slate-200 cursor-pointer"
            aria-label="Slide Down"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
          <button
            onTouchStart={(e) => { e.preventDefault(); move('RIGHT'); }}
            onClick={() => move('RIGHT')}
            className="w-14 h-12 rounded-xl bg-slate-800/90 active:bg-cyan-500 active:text-slate-950 border border-slate-700 flex items-center justify-center text-slate-200 cursor-pointer"
            aria-label="Slide Right"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

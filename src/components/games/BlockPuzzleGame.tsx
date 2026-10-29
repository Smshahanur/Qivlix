import React, { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Trophy, Sparkles, Volume2, HelpCircle } from 'lucide-react';
import { sound } from '../../utils/audio';
import { recordActivityCompletion } from '../../utils/progression';

// Shape matrix definitions
interface Shape {
  id: string;
  matrix: number[][];
  color: string;
}

const SHAPE_PRESETS: { matrix: number[][]; color: string }[] = [
  // 1x1
  { matrix: [[1]], color: '#22d3ee' },
  // 1x2 and 2x1
  { matrix: [[1, 1]], color: '#38bdf8' },
  { matrix: [[1], [1]], color: '#38bdf8' },
  // 1x3 and 3x1
  { matrix: [[1, 1, 1]], color: '#818cf8' },
  { matrix: [[1], [1], [1]], color: '#818cf8' },
  // 1x4 and 4x1
  { matrix: [[1, 1, 1, 1]], color: '#a855f7' },
  { matrix: [[1], [1], [1], [1]], color: '#a855f7' },
  // 2x2 Square
  { matrix: [[1, 1], [1, 1]], color: '#c084fc' },
  // 3x3 Square
  { matrix: [[1, 1, 1], [1, 1, 1], [1, 1, 1]], color: '#e879f9' },
  // L-shapes
  { matrix: [[1, 0], [1, 0], [1, 1]], color: '#06b6d4' },
  { matrix: [[0, 1], [0, 1], [1, 1]], color: '#06b6d4' },
  { matrix: [[1, 1, 1], [1, 0, 0]], color: '#06b6d4' },
  { matrix: [[1, 1, 1], [0, 0, 1]], color: '#06b6d4' },
  // Corner 2x2
  { matrix: [[1, 1], [1, 0]], color: '#2dd4bf' },
  { matrix: [[1, 1], [0, 1]], color: '#2dd4bf' },
  // T-shapes
  { matrix: [[1, 1, 1], [0, 1, 0]], color: '#f43f5e' },
  { matrix: [[0, 1, 0], [1, 1, 1]], color: '#f43f5e' },
  // Plus
  { matrix: [[0, 1, 0], [1, 1, 1], [0, 1, 0]], color: '#fbbf24' }
];

const BOARD_SIZE = 10;

export const BlockPuzzleGame: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[][]>(() =>
    Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null))
  );
  const [currentShapes, setCurrentShapes] = useState<(Shape | null)[]>([]);
  const [selectedShapeIdx, setSelectedShapeIdx] = useState<number | null>(null);
  const [hoverRow, setHoverRow] = useState<number | null>(null);
  const [hoverCol, setHoverCol] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('qivlix_highscore_block-puzzle') || '0', 10);
    } catch {
      return 0;
    }
  });
  const [comboStreak, setComboStreak] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [clearingLines, setClearingLines] = useState<{ rows: number[]; cols: number[] }>({ rows: [], cols: [] });
  const hasRecordedRef = useRef<boolean>(false);

  const getRandomShape = useCallback((): Shape => {
    const preset = SHAPE_PRESETS[Math.floor(Math.random() * SHAPE_PRESETS.length)];
    return {
      id: Math.random().toString(36).substring(2, 9),
      matrix: preset.matrix,
      color: preset.color
    };
  }, []);

  // Spawn initial 3 shapes
  const spawnShapes = useCallback(() => {
    setCurrentShapes([getRandomShape(), getRandomShape(), getRandomShape()]);
    setSelectedShapeIdx(null);
  }, [getRandomShape]);

  // Check if shape can be placed at (r, c)
  const canPlaceShape = useCallback(
    (shape: Shape, startR: number, startC: number, currentBoard: (string | null)[][]): boolean => {
      const rows = shape.matrix.length;
      const cols = shape.matrix[0].length;

      if (startR + rows > BOARD_SIZE || startC + cols > BOARD_SIZE || startR < 0 || startC < 0) {
        return false;
      }

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (shape.matrix[r][c] === 1) {
            if (currentBoard[startR + r][startC + c] !== null) {
              return false;
            }
          }
        }
      }
      return true;
    },
    []
  );

  // Check if any placement is valid on board for a shape
  const canPlaceAnywhere = useCallback(
    (shape: Shape, currentBoard: (string | null)[][]): boolean => {
      for (let r = 0; r <= BOARD_SIZE - shape.matrix.length; r++) {
        for (let c = 0; c <= BOARD_SIZE - shape.matrix[0].length; c++) {
          if (canPlaceShape(shape, r, c, currentBoard)) {
            return true;
          }
        }
      }
      return false;
    },
    [canPlaceShape]
  );

  // Check Game Over condition
  const checkGameOver = useCallback(
    (shapes: (Shape | null)[], currentBoard: (string | null)[][]): boolean => {
      const remainingShapes = shapes.filter((s): s is Shape => s !== null);
      if (remainingShapes.length === 0) return false;
      for (const shape of remainingShapes) {
        if (canPlaceAnywhere(shape, currentBoard)) {
          return false;
        }
      }
      return true;
    },
    [canPlaceAnywhere]
  );

  // Start new game
  const restartGame = useCallback(() => {
    hasRecordedRef.current = false;
    const emptyBoard = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
    setBoard(emptyBoard);
    setScore(0);
    setComboStreak(0);
    setGameOver(false);
    setClearingLines({ rows: [], cols: [] });
    spawnShapes();
  }, [spawnShapes]);

  // Initial mount
  useEffect(() => {
    restartGame();
  }, [restartGame]);

  // Place shape onto board
  const placeShapeAt = (startR: number, startC: number) => {
    if (selectedShapeIdx === null || !currentShapes[selectedShapeIdx] || gameOver) return;

    const shape = currentShapes[selectedShapeIdx]!;
    if (!canPlaceShape(shape, startR, startC, board)) {
      sound.playTone(180, 'sawtooth', 0.1, 0.1);
      return;
    }

    // Place blocks
    const newBoard = board.map((row) => [...row]);
    let blockCount = 0;
    for (let r = 0; r < shape.matrix.length; r++) {
      for (let c = 0; c < shape.matrix[0].length; c++) {
        if (shape.matrix[r][c] === 1) {
          newBoard[startR + r][startC + c] = shape.color;
          blockCount++;
        }
      }
    }

    sound.playMove();

    // Check for full rows and columns
    const fullRows: number[] = [];
    const fullCols: number[] = [];

    for (let r = 0; r < BOARD_SIZE; r++) {
      if (newBoard[r].every((cell) => cell !== null)) {
        fullRows.push(r);
      }
    }

    for (let c = 0; c < BOARD_SIZE; c++) {
      let isColFull = true;
      for (let r = 0; r < BOARD_SIZE; r++) {
        if (newBoard[r][c] === null) {
          isColFull = false;
          break;
        }
      }
      if (isColFull) fullCols.push(c);
    }

    const totalLines = fullRows.length + fullCols.length;
    let earnedPoints = blockCount * 10;

    if (totalLines > 0) {
      // Clear lines visually
      setClearingLines({ rows: fullRows, cols: fullCols });
      fullRows.forEach((r) => {
        for (let c = 0; c < BOARD_SIZE; c++) newBoard[r][c] = null;
      });
      fullCols.forEach((c) => {
        for (let r = 0; r < BOARD_SIZE; r++) newBoard[r][c] = null;
      });

      const nextStreak = comboStreak + 1;
      setComboStreak(nextStreak);

      const linePoints = totalLines * 100 * totalLines * nextStreak;
      earnedPoints += linePoints;

      sound.playLineClear(totalLines);

      if (totalLines >= 3) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      }

      setTimeout(() => {
        setClearingLines({ rows: [], cols: [] });
      }, 300);
    } else {
      setComboStreak(0);
    }

    const updatedScore = score + earnedPoints;
    setScore(updatedScore);
    if (updatedScore > highScore) {
      setHighScore(updatedScore);
      try {
        localStorage.setItem('qivlix_highscore_block-puzzle', String(updatedScore));
      } catch {}
    }

    // Consume piece
    const updatedShapes = [...currentShapes];
    updatedShapes[selectedShapeIdx] = null;
    setSelectedShapeIdx(null);
    setBoard(newBoard);

    // If all 3 used, refresh tray
    const remainingCount = updatedShapes.filter((s) => s !== null).length;
    let nextShapes = updatedShapes;
    if (remainingCount === 0) {
      nextShapes = [getRandomShape(), getRandomShape(), getRandomShape()];
      setCurrentShapes(nextShapes);
    } else {
      setCurrentShapes(updatedShapes);
    }

    // Check game over
    if (checkGameOver(nextShapes, newBoard)) {
      setGameOver(true);
      sound.playGameOver();
      if (!hasRecordedRef.current && updatedScore >= 40) {
        hasRecordedRef.current = true;
        const sessionXp = Math.min(50, Math.floor(updatedScore / 50));
        recordActivityCompletion({
          activityId: 'block-puzzle',
          activityTitle: 'Neon Block Puzzle',
          type: 'game',
          targetPath: '/game/block-puzzle',
          pointsEarned: sessionXp,
          score: updatedScore,
        });
      }
    }
  };

  // Keyboard shortcut support (1, 2, 3 to select piece, R to restart)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1' && currentShapes[0]) setSelectedShapeIdx(0);
      if (e.key === '2' && currentShapes[1]) setSelectedShapeIdx(1);
      if (e.key === '3' && currentShapes[2]) setSelectedShapeIdx(2);
      if (e.key === 'r' || e.key === 'R') restartGame();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentShapes, restartGame]);

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto select-none">
      {/* Game Header Bar */}
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
          {comboStreak > 1 && (
            <div className="border-l border-slate-800 pl-4 animate-bounce">
              <div className="text-[10px] font-mono text-purple-400 uppercase tracking-wider">Combo</div>
              <div className="text-xl font-bold font-mono text-purple-400">
                {comboStreak}x
              </div>
            </div>
          )}
        </div>

        <button
          onClick={restartGame}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* 10x10 Board Grid */}
      <div
        className="relative p-1.5 sm:p-2.5 rounded-2xl bg-[#090e1c] border-2 border-slate-800 shadow-2xl touch-none max-w-full overflow-hidden"
        onMouseLeave={() => {
          setHoverRow(null);
          setHoverCol(null);
        }}
      >
        <div className="grid grid-cols-10 gap-0.5 sm:gap-1.5">
          {board.map((row, rIdx) =>
            row.map((cell, cIdx) => {
              // Check if cell is hovered by valid placement
              let isPreview = false;
              let isValidPreview = false;
              if (selectedShapeIdx !== null && currentShapes[selectedShapeIdx] && hoverRow !== null && hoverCol !== null) {
                const shape = currentShapes[selectedShapeIdx]!;
                const relR = rIdx - hoverRow;
                const relC = cIdx - hoverCol;
                if (
                  relR >= 0 &&
                  relR < shape.matrix.length &&
                  relC >= 0 &&
                  relC < shape.matrix[0].length &&
                  shape.matrix[relR][relC] === 1
                ) {
                  isPreview = true;
                  isValidPreview = canPlaceShape(shape, hoverRow, hoverCol, board);
                }
              }

              const isClearing =
                clearingLines.rows.includes(rIdx) || clearingLines.cols.includes(cIdx);

              return (
                <button
                  key={`${rIdx}-${cIdx}`}
                  type="button"
                  onMouseEnter={() => {
                    setHoverRow(rIdx);
                    setHoverCol(cIdx);
                  }}
                  onClick={() => placeShapeAt(rIdx, cIdx)}
                  style={{
                    backgroundColor: cell ? cell : isPreview ? (isValidPreview ? '#06b6d4' : '#ef4444') : undefined
                  }}
                  className={`w-[clamp(24px,7vw,36px)] h-[clamp(24px,7vw,36px)] rounded-xs sm:rounded-md transition-all duration-100 flex items-center justify-center cursor-pointer ${
                    cell
                      ? 'shadow-md shadow-cyan-500/10 border border-white/20'
                      : isPreview
                      ? isValidPreview
                        ? 'opacity-80 border border-cyan-400'
                        : 'opacity-50 border border-rose-500'
                      : 'bg-[#101729] hover:bg-slate-800/80 border border-slate-800/60'
                  } ${isClearing ? 'animate-pulse scale-90 duration-75' : ''}`}
                  aria-label={`Cell ${rIdx + 1}, ${cIdx + 1}`}
                />
              );
            })
          )}
        </div>

        {/* Game Over Screen Overlay */}
        {gameOver && (
          <div className="absolute inset-0 rounded-2xl bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
            <h3 className="font-display font-extrabold text-2xl text-slate-100 mb-1">
              No More Moves!
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              None of the available blocks can fit into the remaining matrix space.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 mb-5 w-48 text-center">
              <span className="text-[11px] text-slate-400 font-mono">Final Score</span>
              <div className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">
                {score.toLocaleString()}
              </div>
            </div>
            <button
              onClick={restartGame}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 hover:from-cyan-300 hover:to-cyan-200 cursor-pointer"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* Piece Selection Tray (3 slots) */}
      <div className="w-full mt-4 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="text-center text-xs font-medium text-slate-400 mb-2">
          {selectedShapeIdx !== null
            ? '✓ Shape selected — Tap grid above to place'
            : 'Select a shape below, then tap the grid'}
        </div>
        <div className="grid grid-cols-3 gap-3 items-center min-h-[96px]">
          {currentShapes.map((shape, idx) => {
            if (!shape) {
              return (
                <div
                  key={`empty-${idx}`}
                  className="h-20 rounded-xl border border-dashed border-slate-800/80 flex items-center justify-center text-slate-600 text-xs"
                >
                  Used
                </div>
              );
            }

            const isSelected = selectedShapeIdx === idx;
            const canFit = canPlaceAnywhere(shape, board);

            return (
              <button
                key={shape.id}
                onClick={() => {
                  sound.playTone(320, 'sine', 0.05, 0.08);
                  setSelectedShapeIdx(isSelected ? null : idx);
                }}
                className={`relative h-20 p-2 rounded-xl border transition-all flex items-center justify-center cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-500/20 scale-105'
                    : canFit
                    ? 'bg-slate-800/50 border-slate-700/60 hover:border-slate-600 hover:bg-slate-800'
                    : 'bg-slate-900/30 border-slate-800 opacity-40 cursor-not-allowed'
                }`}
                aria-label={`Shape option ${idx + 1}`}
              >
                <div
                  className="grid gap-1"
                  style={{
                    gridTemplateColumns: `repeat(${shape.matrix[0].length}, minmax(0, 1fr))`
                  }}
                >
                  {shape.matrix.map((row, rIdx) =>
                    row.map((val, cIdx) => (
                      <div
                        key={`${rIdx}-${cIdx}`}
                        style={{
                          backgroundColor: val === 1 ? shape.color : 'transparent'
                        }}
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-sm ${
                          val === 1 ? 'border border-white/20' : ''
                        }`}
                      />
                    ))
                  )}
                </div>
                {/* Keyboard shortcut label */}
                <span className="absolute top-1 left-2 text-[10px] font-mono text-slate-500">
                  [{idx + 1}]
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

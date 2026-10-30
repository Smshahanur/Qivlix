import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Trophy, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Shield, Zap } from 'lucide-react';
import { sound } from '../../utils/audio';
import { recordActivityCompletion } from '../../utils/progression';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
interface Point {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const INITIAL_SPEED = 140; // ms per tick

export const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Point[]>([
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 }
  ]);
  const [direction, setDirection] = useState<Direction>('UP');
  const [nextDirection, setNextDirection] = useState<Direction>('UP');
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [bonusFood, setBonusFood] = useState<Point | null>(null);
  const [bonusTimer, setBonusTimer] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [wrapMode, setWrapMode] = useState<boolean>(true); // Wrap around vs Wall death
  const [speed, setSpeed] = useState<number>(INITIAL_SPEED);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('qivlix_highscore_snake') || '0', 10);
    } catch {
      return 0;
    }
  });

  const nextDirRef = useRef(nextDirection);
  nextDirRef.current = nextDirection;
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const hasRecordedRef = useRef<boolean>(false);

  // Spawn random food not overlapping snake
  const spawnFood = useCallback((currentSnake: Point[]): Point => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      const collision = currentSnake.some((seg) => seg.x === newFood.x && seg.y === newFood.y);
      if (!collision) break;
    }
    return newFood;
  }, []);

  const handleGameOver = useCallback((finalScore: number) => {
    setIsGameOver(true);
    setIsPlaying(false);
    sound.playGameOver();
    if (!hasRecordedRef.current && finalScore >= 10) {
      hasRecordedRef.current = true;
      const sessionXp = Math.min(50, Math.floor(finalScore / 5));
      recordActivityCompletion({
        activityId: 'snake',
        activityTitle: 'Cyber Snake',
        type: 'game',
        targetPath: '/game/snake',
        pointsEarned: sessionXp,
        score: finalScore,
      });
    }
  }, []);

  // Reset Game
  const resetGame = useCallback(() => {
    hasRecordedRef.current = false;
    const initialSnake = [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 }
    ];
    setSnake(initialSnake);
    setDirection('UP');
    setNextDirection('UP');
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsGameOver(false);
    setIsPlaying(true);
    setBonusFood(null);
    setBonusTimer(0);
    setFood(spawnFood(initialSnake));
  }, [spawnFood]);

  // Handle direction changes safely
  const changeDirection = useCallback(
    (newDir: Direction) => {
      const current = nextDirRef.current;
      if (newDir === 'UP' && current !== 'DOWN') setNextDirection('UP');
      if (newDir === 'DOWN' && current !== 'UP') setNextDirection('DOWN');
      if (newDir === 'LEFT' && current !== 'RIGHT') setNextDirection('LEFT');
      if (newDir === 'RIGHT' && current !== 'LEFT') setNextDirection('RIGHT');
    },
    []
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault();
        changeDirection('UP');
      } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        changeDirection('DOWN');
      } else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault();
        changeDirection('LEFT');
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        changeDirection('RIGHT');
      } else if (e.code === 'Space' || e.code === 'KeyP') {
        e.preventDefault();
        if (isGameOver) {
          resetGame();
        } else {
          setIsPlaying((prev) => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [changeDirection, isGameOver, resetGame]);

  // Touch Swipe gestures
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

    if (Math.max(absDx, absDy) > 20) {
      if (absDx > absDy) {
        changeDirection(dx > 0 ? 'RIGHT' : 'LEFT');
      } else {
        changeDirection(dy > 0 ? 'DOWN' : 'UP');
      }
    }
    touchStartRef.current = null;
  };

  // Main Tick Game Loop
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };
        const currentDir = nextDirRef.current;
        setDirection(currentDir);

        if (currentDir === 'UP') head.y -= 1;
        if (currentDir === 'DOWN') head.y += 1;
        if (currentDir === 'LEFT') head.x -= 1;
        if (currentDir === 'RIGHT') head.x += 1;

        // Wall collisions
        if (wrapMode) {
          if (head.x < 0) head.x = GRID_SIZE - 1;
          if (head.x >= GRID_SIZE) head.x = 0;
          if (head.y < 0) head.y = GRID_SIZE - 1;
          if (head.y >= GRID_SIZE) head.y = 0;
        } else {
          if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
            handleGameOver(score);
            return prevSnake;
          }
        }

        // Self collision check
        const selfHit = prevSnake.some((seg) => seg.x === head.x && seg.y === head.y);
        if (selfHit) {
          handleGameOver(score);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Check normal food
        if (head.x === food.x && head.y === food.y) {
          sound.playMatch();
          const nextScore = score + 10;
          setScore(nextScore);
          if (nextScore > highScore) {
            setHighScore(nextScore);
            try {
              localStorage.setItem('qivlix_highscore_snake', String(nextScore));
            } catch {}
          }
          setFood(spawnFood(newSnake));
          // Speed scale
          setSpeed((prev) => Math.max(70, prev - 2));

          // 25% chance to spawn bonus gold orb
          if (!bonusFood && Math.random() < 0.25) {
            setBonusFood(spawnFood(newSnake));
            setBonusTimer(40);
          }
        } else if (bonusFood && head.x === bonusFood.x && head.y === bonusFood.y) {
          sound.playLineClear(2);
          const nextScore = score + 50;
          setScore(nextScore);
          if (nextScore > highScore) {
            setHighScore(nextScore);
            try {
              localStorage.setItem('qivlix_highscore_snake', String(nextScore));
            } catch {}
          }
          setBonusFood(null);
          setBonusTimer(0);
        } else {
          newSnake.pop(); // Remove tail
        }

        return newSnake;
      });

      // Bonus food countdown
      if (bonusFood) {
        setBonusTimer((prev) => {
          if (prev <= 1) {
            setBonusFood(null);
            return 0;
          }
          return prev - 1;
        });
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isPlaying, isGameOver, food, bonusFood, speed, wrapMode, score, highScore, spawnFood]);

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto select-none">
      {/* HUD Header */}
      <div className="w-full flex items-center justify-between p-2.5 sm:p-3.5 mb-4 rounded-xl bg-slate-900/90 border border-slate-800 gap-2">
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          <div>
            <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase tracking-wider">Score</div>
            <div className="text-lg sm:text-xl font-bold font-mono text-purple-400 tabular-nums">
              {score}
            </div>
          </div>
          <div className="border-l border-slate-800 pl-2.5 sm:pl-4">
            <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Trophy className="w-3 h-3 text-amber-400" /> Best
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono text-amber-400 tabular-nums">
              {highScore}
            </div>
          </div>
          <div className="border-l border-slate-800 pl-4 hidden md:block">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Length</div>
            <div className="text-xl font-bold font-mono text-cyan-400 tabular-nums">
              {snake.length}
            </div>
          </div>
        </div>

        {/* Options & Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Wrap mode toggle */}
          <button
            onClick={() => setWrapMode(!wrapMode)}
            className={`px-2 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-mono border transition-colors cursor-pointer ${
              wrapMode
                ? 'bg-purple-950/50 border-purple-500/40 text-purple-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title="Toggle Barrier Mode (Walls will crash snake vs wrap around)"
          >
            {wrapMode ? 'Wrap: ON' : 'Wrap: OFF'}
          </button>

          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="p-1.5 sm:p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={resetGame}
            className="p-1.5 sm:p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Snake Canvas Area */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full aspect-square max-w-[420px] rounded-2xl bg-[#080d19] border-2 border-slate-800 shadow-2xl p-1 overflow-hidden"
      >
        {/* Subtle grid background */}
        <div
          className="w-full h-full relative"
          style={{
            backgroundImage: `radial-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 0)`,
            backgroundSize: `${100 / GRID_SIZE}% ${100 / GRID_SIZE}%`
          }}
        >
          {/* Snake segments */}
          {snake.map((segment, idx) => {
            const isHead = idx === 0;
            return (
              <div
                key={idx}
                className={`absolute rounded-sm transition-all duration-75 ${
                  isHead
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-400 z-20 shadow-lg shadow-cyan-500/50 border border-white/60'
                    : 'bg-purple-500/90 z-10 border border-purple-400/40'
                }`}
                style={{
                  width: `${100 / GRID_SIZE}%`,
                  height: `${100 / GRID_SIZE}%`,
                  left: `${(segment.x * 100) / GRID_SIZE}%`,
                  top: `${(segment.y * 100) / GRID_SIZE}%`
                }}
              />
            );
          })}

          {/* Regular Food Orb */}
          <div
            className="absolute rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-400/80 border border-white"
            style={{
              width: `${100 / GRID_SIZE}%`,
              height: `${100 / GRID_SIZE}%`,
              left: `${(food.x * 100) / GRID_SIZE}%`,
              top: `${(food.y * 100) / GRID_SIZE}%`
            }}
          />

          {/* Bonus Golden Energy Core */}
          {bonusFood && (
            <div
              className="absolute rounded-full bg-amber-400 animate-bounce shadow-xl shadow-amber-400/80 border-2 border-white flex items-center justify-center text-[8px] font-black text-slate-950 font-mono"
              style={{
                width: `${100 / GRID_SIZE}%`,
                height: `${100 / GRID_SIZE}%`,
                left: `${(bonusFood.x * 100) / GRID_SIZE}%`,
                top: `${(bonusFood.y * 100) / GRID_SIZE}%`
              }}
            >
              50
            </div>
          )}
        </div>

        {/* Start / Paused / Game Over Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            {isGameOver ? (
              <>
                <h3 className="font-display font-extrabold text-2xl text-rose-400 mb-1">
                  System Crash!
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  The serpent collided with an obstacle.
                </p>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 mb-5 w-44">
                  <span className="text-[10px] text-slate-400 font-mono">Final Score</span>
                  <div className="text-2xl font-bold font-mono text-purple-400 tabular-nums">
                    {score}
                  </div>
                </div>
                <button
                  onClick={resetGame}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-500/25 hover:from-purple-400 hover:to-indigo-400 cursor-pointer"
                >
                  Restart Game (Space)
                </button>
              </>
            ) : (
              <>
                <h3 className="font-display font-black text-2xl text-slate-100 mb-1">
                  Cyber Snake
                </h3>
                <p className="text-xs text-slate-400 max-w-xs mb-5">
                  Use Arrow keys, WASD, on-screen controls, or swipe on touchscreen to navigate.
                </p>
                <button
                  onClick={() => setIsPlaying(true)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 hover:opacity-90 cursor-pointer"
                >
                  Start Gliding
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* On-Screen Mobile Touch D-Pad */}
      <div className="mt-4 flex flex-col items-center gap-1 sm:hidden">
        <button
          onTouchStart={(e) => { e.preventDefault(); changeDirection('UP'); }}
          onClick={() => changeDirection('UP')}
          className="w-14 h-12 rounded-xl bg-slate-800/90 active:bg-cyan-500 active:text-slate-950 border border-slate-700 flex items-center justify-center text-slate-200 cursor-pointer"
          aria-label="Up"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <button
            onTouchStart={(e) => { e.preventDefault(); changeDirection('LEFT'); }}
            onClick={() => changeDirection('LEFT')}
            className="w-14 h-12 rounded-xl bg-slate-800/90 active:bg-cyan-500 active:text-slate-950 border border-slate-700 flex items-center justify-center text-slate-200 cursor-pointer"
            aria-label="Left"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onTouchStart={(e) => { e.preventDefault(); changeDirection('DOWN'); }}
            onClick={() => changeDirection('DOWN')}
            className="w-14 h-12 rounded-xl bg-slate-800/90 active:bg-cyan-500 active:text-slate-950 border border-slate-700 flex items-center justify-center text-slate-200 cursor-pointer"
            aria-label="Down"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
          <button
            onTouchStart={(e) => { e.preventDefault(); changeDirection('RIGHT'); }}
            onClick={() => changeDirection('RIGHT')}
            className="w-14 h-12 rounded-xl bg-slate-800/90 active:bg-cyan-500 active:text-slate-950 border border-slate-700 flex items-center justify-center text-slate-200 cursor-pointer"
            aria-label="Right"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

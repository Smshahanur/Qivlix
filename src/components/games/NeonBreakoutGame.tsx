import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Play, Pause, Trophy, Zap, Shield, Heart, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface Brick {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  durability: number;
  maxDurability: number;
  points: number;
  powerUp?: 'multiball' | 'wide' | 'laser' | 'life';
}

interface PowerUp {
  x: number;
  y: number;
  vy: number;
  type: 'multiball' | 'wide' | 'laser' | 'life';
  color: string;
}

interface Laser {
  x: number;
  y: number;
  vy: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  life: number;
}

export const NeonBreakoutGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'paused' | 'gameover' | 'won'>('idle');
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('qivlix_highscore_neon-breakout');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Game internal state stored in refs for 60fps loop
  const paddleRef = useRef({
    x: 200,
    y: 460,
    width: 90,
    height: 12,
    baseWidth: 90,
    wideTimer: 0,
    hasLaser: false,
    laserTimer: 0
  });

  const ballsRef = useRef<Ball[]>([]);
  const bricksRef = useRef<Brick[]>([]);
  const powerUpsRef = useRef<PowerUp[]>([]);
  const lasersRef = useRef<Laser[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const keysRef = useRef<{ left: boolean; right: boolean; fire: boolean }>({ left: false, right: false, fire: false });
  const animFrameId = useRef<number | null>(null);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const levelRef = useRef(1);

  // Initialize Level Bricks
  const initLevel = useCallback((lvl: number) => {
    const canvasWidth = 480;
    const cols = 8;
    const rows = 4 + lvl;
    const padding = 6;
    const offsetTop = 40;
    const brickWidth = Math.floor((canvasWidth - (cols + 1) * padding) / cols);
    const brickHeight = 18;

    const colors = ['#22d3ee', '#c084fc', '#f472b6', '#34d399', '#fbbf24'];
    const newBricks: Brick[] = [];

    for (let r = 0; r < rows; r++) {
      const color = colors[r % colors.length];
      const isDurable = r === 0 && lvl > 1;
      const durability = isDurable ? 2 : 1;

      for (let c = 0; c < cols; c++) {
        // Random chance of power-up
        let powerUp: Brick['powerUp'] | undefined;
        const roll = Math.random();
        if (roll < 0.08) powerUp = 'multiball';
        else if (roll < 0.16) powerUp = 'wide';
        else if (roll < 0.22) powerUp = 'laser';
        else if (roll < 0.26) powerUp = 'life';

        newBricks.push({
          x: padding + c * (brickWidth + padding),
          y: offsetTop + r * (brickHeight + padding),
          width: brickWidth,
          height: brickHeight,
          color,
          durability,
          maxDurability: durability,
          points: (rows - r) * 50,
          powerUp
        });
      }
    }

    bricksRef.current = newBricks;
    powerUpsRef.current = [];
    lasersRef.current = [];

    // Reset paddle & ball
    paddleRef.current.x = (canvasWidth - paddleRef.current.baseWidth) / 2;
    paddleRef.current.width = paddleRef.current.baseWidth;
    paddleRef.current.wideTimer = 0;
    paddleRef.current.hasLaser = false;

    ballsRef.current = [
      {
        x: canvasWidth / 2,
        y: 440,
        vx: 3 * (Math.random() > 0.5 ? 1 : -1),
        vy: -4.5,
        radius: 5,
        color: '#22d3ee'
      }
    ];
  }, []);

  const spawnParticles = (x: number, y: number, color: string, count: number = 8) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        alpha: 1,
        life: 0.03 + Math.random() * 0.02
      });
    }
  };

  // Start / Reset Game
  const startGame = () => {
    scoreRef.current = 0;
    livesRef.current = 3;
    levelRef.current = 1;
    setScore(0);
    setLives(3);
    setLevel(1);
    initLevel(1);
    setGameState('playing');
    sound.playMove();
  };

  // Keyboard Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = true;
      }
      if (e.key === ' ' || e.key === 'ArrowUp') {
        keysRef.current.fire = true;
        if (paddleRef.current.hasLaser && gameState === 'playing') {
          // Fire twin lasers
          const p = paddleRef.current;
          lasersRef.current.push(
            { x: p.x + 8, y: p.y - 4, vy: -7 },
            { x: p.x + p.width - 8, y: p.y - 4, vy: -7 }
          );
          sound.playTone(800, 'square', 0.05, 0.1);
        }
      }
      if (e.key === 'p' || e.key === 'P') {
        setGameState((prev) => (prev === 'playing' ? 'paused' : prev === 'paused' ? 'playing' : prev));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = false;
      }
      if (e.key === ' ' || e.key === 'ArrowUp') {
        keysRef.current.fire = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Main 60fps Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const updateAndRender = () => {
      if (gameState === 'playing') {
        const paddle = paddleRef.current;

        // Move paddle via keys
        const paddleSpeed = 6.5;
        if (keysRef.current.left) {
          paddle.x = Math.max(0, paddle.x - paddleSpeed);
        }
        if (keysRef.current.right) {
          paddle.x = Math.min(width - paddle.width, paddle.x + paddleSpeed);
        }

        // Handle power-up timers
        if (paddle.wideTimer > 0) {
          paddle.wideTimer--;
          if (paddle.wideTimer <= 0) {
            paddle.width = paddle.baseWidth;
          }
        }
        if (paddle.laserTimer > 0) {
          paddle.laserTimer--;
          if (paddle.laserTimer <= 0) {
            paddle.hasLaser = false;
          }
        }

        // Update Lasers
        for (let i = lasersRef.current.length - 1; i >= 0; i--) {
          const laser = lasersRef.current[i];
          laser.y += laser.vy;

          // Check brick collision
          let laserHit = false;
          for (let b = bricksRef.current.length - 1; b >= 0; b--) {
            const brick = bricksRef.current[b];
            if (
              laser.x >= brick.x &&
              laser.x <= brick.x + brick.width &&
              laser.y >= brick.y &&
              laser.y <= brick.y + brick.height
            ) {
              laserHit = true;
              brick.durability--;
              spawnParticles(laser.x, laser.y, brick.color, 6);
              if (brick.durability <= 0) {
                bricksRef.current.splice(b, 1);
                scoreRef.current += brick.points;
                setScore(scoreRef.current);
                sound.playTone(550, 'triangle', 0.08, 0.12);
              }
              break;
            }
          }

          if (laserHit || laser.y < 0) {
            lasersRef.current.splice(i, 1);
          }
        }

        // Update Power-ups
        for (let i = powerUpsRef.current.length - 1; i >= 0; i--) {
          const pup = powerUpsRef.current[i];
          pup.y += pup.vy;

          // Check paddle collision
          if (
            pup.y + 8 >= paddle.y &&
            pup.y <= paddle.y + paddle.height &&
            pup.x >= paddle.x &&
            pup.x <= paddle.x + paddle.width
          ) {
            sound.playMatch();
            if (pup.type === 'multiball') {
              // Spawn 2 extra balls
              const baseBall = ballsRef.current[0] || { x: paddle.x + paddle.width / 2, y: paddle.y - 10 };
              ballsRef.current.push(
                { x: baseBall.x, y: baseBall.y, vx: -3.5, vy: -4, radius: 5, color: '#f472b6' },
                { x: baseBall.x, y: baseBall.y, vx: 3.5, vy: -4, radius: 5, color: '#a855f7' }
              );
            } else if (pup.type === 'wide') {
              paddle.width = paddle.baseWidth * 1.5;
              paddle.wideTimer = 600; // 10 seconds
            } else if (pup.type === 'laser') {
              paddle.hasLaser = true;
              paddle.laserTimer = 500;
            } else if (pup.type === 'life') {
              livesRef.current = Math.min(5, livesRef.current + 1);
              setLives(livesRef.current);
            }
            powerUpsRef.current.splice(i, 1);
            continue;
          }

          // Off screen
          if (pup.y > height) {
            powerUpsRef.current.splice(i, 1);
          }
        }

        // Update Balls
        for (let i = ballsRef.current.length - 1; i >= 0; i--) {
          const ball = ballsRef.current[i];
          ball.x += ball.vx;
          ball.y += ball.vy;

          // Wall collisions
          if (ball.x - ball.radius <= 0) {
            ball.x = ball.radius;
            ball.vx = Math.abs(ball.vx);
            sound.playTone(300, 'sine', 0.04, 0.08);
          } else if (ball.x + ball.radius >= width) {
            ball.x = width - ball.radius;
            ball.vx = -Math.abs(ball.vx);
            sound.playTone(300, 'sine', 0.04, 0.08);
          }

          if (ball.y - ball.radius <= 0) {
            ball.y = ball.radius;
            ball.vy = Math.abs(ball.vy);
            sound.playTone(350, 'sine', 0.04, 0.08);
          }

          // Paddle collision
          if (
            ball.y + ball.radius >= paddle.y &&
            ball.y - ball.radius <= paddle.y + paddle.height &&
            ball.x >= paddle.x &&
            ball.x <= paddle.x + paddle.width
          ) {
            // Calculate rebound angle based on impact point
            const hitPoint = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
            const maxAngle = Math.PI * 0.4; // 72 degrees
            const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
            const angle = hitPoint * maxAngle;

            ball.vx = speed * Math.sin(angle);
            ball.vy = -Math.abs(speed * Math.cos(angle));
            ball.y = paddle.y - ball.radius;
            sound.playTone(450, 'triangle', 0.06, 0.12);
          }

          // Brick collisions
          for (let b = bricksRef.current.length - 1; b >= 0; b--) {
            const brick = bricksRef.current[b];
            if (
              ball.x + ball.radius >= brick.x &&
              ball.x - ball.radius <= brick.x + brick.width &&
              ball.y + ball.radius >= brick.y &&
              ball.y - ball.radius <= brick.y + brick.height
            ) {
              // Rebound ball
              ball.vy = -ball.vy;
              brick.durability--;
              spawnParticles(ball.x, ball.y, brick.color, 8);

              if (brick.durability <= 0) {
                // Drop power-up if attached
                if (brick.powerUp) {
                  powerUpsRef.current.push({
                    x: brick.x + brick.width / 2,
                    y: brick.y + brick.height,
                    vy: 1.8,
                    type: brick.powerUp,
                    color: brick.powerUp === 'life' ? '#f43f5e' : brick.powerUp === 'laser' ? '#fbbf24' : '#22d3ee'
                  });
                }
                bricksRef.current.splice(b, 1);
                scoreRef.current += brick.points;
                setScore(scoreRef.current);
                sound.playMatch();
              } else {
                sound.playTone(280, 'square', 0.05, 0.1);
              }
              break;
            }
          }

          // Ball fallen below bottom
          if (ball.y - ball.radius > height) {
            ballsRef.current.splice(i, 1);
          }
        }

        // If all balls lost
        if (ballsRef.current.length === 0) {
          livesRef.current--;
          setLives(livesRef.current);
          if (livesRef.current <= 0) {
            setGameState('gameover');
            sound.playGameOver();
            if (scoreRef.current > highScore) {
              setHighScore(scoreRef.current);
              try {
                localStorage.setItem('qivlix_highscore_neon-breakout', String(scoreRef.current));
              } catch {}
            }
          } else {
            // Respawn single ball
            sound.playTone(220, 'sawtooth', 0.2, 0.15);
            ballsRef.current = [
              {
                x: paddle.x + paddle.width / 2,
                y: 440,
                vx: 3 * (Math.random() > 0.5 ? 1 : -1),
                vy: -4.5,
                radius: 5,
                color: '#22d3ee'
              }
            ];
          }
        }

        // If all bricks cleared: Next Level or Victory
        if (bricksRef.current.length === 0) {
          if (levelRef.current < 3) {
            levelRef.current++;
            setLevel(levelRef.current);
            sound.playVictory();
            initLevel(levelRef.current);
          } else {
            setGameState('won');
            sound.playVictory();
            confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
            if (scoreRef.current > highScore) {
              setHighScore(scoreRef.current);
              try {
                localStorage.setItem('qivlix_highscore_neon-breakout', String(scoreRef.current));
              } catch {}
            }
          }
        }

        // Update Particles
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.life;
          if (p.alpha <= 0) {
            particlesRef.current.splice(i, 1);
          }
        }
      }

      // --- RENDER PASS ---
      ctx.fillStyle = '#070b16';
      ctx.fillRect(0, 0, width, height);

      // Render subtle matrix grid lines
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw Bricks
      bricksRef.current.forEach((brick) => {
        ctx.fillStyle = brick.color;
        ctx.shadowColor = brick.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.roundRect(brick.x, brick.y, brick.width, brick.height, 4);
        ctx.fill();

        // If cracked
        if (brick.durability < brick.maxDurability) {
          ctx.strokeStyle = 'rgba(0,0,0,0.6)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(brick.x + 4, brick.y + 4);
          ctx.lineTo(brick.x + brick.width - 4, brick.y + brick.height - 4);
          ctx.stroke();
        }
      });
      ctx.shadowBlur = 0;

      // Draw Lasers
      lasersRef.current.forEach((laser) => {
        ctx.fillStyle = '#fde047';
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 6;
        ctx.fillRect(laser.x - 2, laser.y - 8, 4, 10);
      });
      ctx.shadowBlur = 0;

      // Draw Power-ups
      powerUpsRef.current.forEach((pup) => {
        ctx.fillStyle = pup.color;
        ctx.shadowColor = pup.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(pup.x, pup.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0f172a';
        ctx.font = '8px monospace';
        ctx.fillText(pup.type[0].toUpperCase(), pup.x - 3, pup.y + 3);
      });
      ctx.shadowBlur = 0;

      // Draw Paddle
      const paddle = paddleRef.current;
      const paddleGradient = ctx.createLinearGradient(paddle.x, paddle.y, paddle.x + paddle.width, paddle.y);
      paddleGradient.addColorStop(0, '#22d3ee');
      paddleGradient.addColorStop(0.5, '#c084fc');
      paddleGradient.addColorStop(1, '#38bdf8');
      ctx.fillStyle = paddleGradient;
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.roundRect(paddle.x, paddle.y, paddle.width, paddle.height, 6);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Balls
      ballsRef.current.forEach((ball) => {
        ctx.fillStyle = ball.color;
        ctx.shadowColor = ball.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      // Draw Particles
      particlesRef.current.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillRect(p.x, p.y, 2.5, 2.5);
      });
      ctx.globalAlpha = 1;

      animFrameId.current = requestAnimationFrame(updateAndRender);
    };

    animFrameId.current = requestAnimationFrame(updateAndRender);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [gameState, initLevel, highScore]);

  // Touch / Mouse Tracking on Canvas
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const clientX = e.clientX - rect.left;
    const canvasX = clientX * scaleX;

    const paddle = paddleRef.current;
    paddle.x = Math.max(0, Math.min(canvas.width - paddle.width, canvasX - paddle.width / 2));
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4 sm:p-6 select-none">
      {/* Top Header / Score Bar */}
      <div className="w-full flex items-center justify-between gap-4 mb-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Score</div>
            <div className="text-xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              {score.toLocaleString()}
            </div>
          </div>
          <div className="h-7 w-px bg-slate-800" />
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Level</div>
            <div className="text-lg font-mono font-bold text-slate-200">{level} / 3</div>
          </div>
        </div>

        {/* Lives Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
          {Array.from({ length: 5 }).map((_, i) => (
            <Heart
              key={i}
              className={`w-4 h-4 transition-colors ${
                i < lives ? 'text-rose-500 fill-rose-500' : 'text-slate-800'
              }`}
            />
          ))}
        </div>

        {/* High Score */}
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono font-bold text-amber-300">
            {highScore.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div className="relative w-full max-w-[480px] aspect-[480/500] rounded-2xl overflow-hidden border-2 border-slate-800 bg-[#070b16] shadow-2xl">
        <canvas
          ref={canvasRef}
          width={480}
          height={500}
          onPointerMove={handlePointerMove}
          className="w-full h-full touch-none cursor-ew-resize"
        />

        {/* Overlays for Idle / GameOver / Won / Paused */}
        {gameState !== 'playing' && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
            {gameState === 'idle' && (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-xl shadow-cyan-500/10">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-display font-black text-2xl text-slate-100">Neon Breakout</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Deflect high-voltage balls to shatter cybernetic bricks. Catch multi-ball and laser power-ups to clear all 3 stages!
                </p>
                <button
                  onClick={startGame}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 hover:scale-105 transition-all cursor-pointer"
                >
                  Start Mission
                </button>
              </div>
            )}

            {gameState === 'gameover' && (
              <div className="space-y-4">
                <div className="text-3xl font-display font-black text-rose-500">System Overload</div>
                <p className="text-sm text-slate-400">All energy cores lost. Final Score: {score}</p>
                <button
                  onClick={startGame}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-semibold text-xs border border-slate-700 cursor-pointer"
                >
                  Try Again
                </button>
              </div>
            )}

            {gameState === 'won' && (
              <div className="space-y-4">
                <div className="text-3xl font-display font-black text-emerald-400">Sector Cleared!</div>
                <p className="text-sm text-slate-300">Outstanding deflection! You mastered all 3 sectors.</p>
                <div className="text-xl font-mono font-bold text-amber-400">Score: {score}</div>
                <button
                  onClick={startGame}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-bold text-xs shadow-lg cursor-pointer"
                >
                  Play Again
                </button>
              </div>
            )}

            {gameState === 'paused' && (
              <div className="space-y-4">
                <div className="text-2xl font-display font-bold text-slate-200">Simulation Paused</div>
                <button
                  onClick={() => setGameState('playing')}
                  className="px-6 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  Resume
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Touch Navigation Controls */}
      <div className="w-full max-w-[480px] mt-4 flex items-center justify-between gap-3">
        <button
          onPointerDown={() => (keysRef.current.left = true)}
          onPointerUp={() => (keysRef.current.left = false)}
          onPointerLeave={() => (keysRef.current.left = false)}
          className="flex-1 py-3 rounded-xl bg-slate-900 border border-slate-800 active:bg-cyan-500/20 active:border-cyan-500 flex items-center justify-center text-slate-300 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => {
            if (paddleRef.current.hasLaser && gameState === 'playing') {
              const p = paddleRef.current;
              lasersRef.current.push(
                { x: p.x + 8, y: p.y - 4, vy: -7 },
                { x: p.x + p.width - 8, y: p.y - 4, vy: -7 }
              );
              sound.playTone(800, 'square', 0.05, 0.1);
            }
          }}
          className={`px-4 py-3 rounded-xl border text-xs font-mono font-bold transition-all ${
            paddleRef.current.hasLaser
              ? 'bg-amber-500/20 border-amber-500 text-amber-300 animate-pulse'
              : 'bg-slate-900 border-slate-800 text-slate-600'
          }`}
        >
          <Zap className="w-5 h-5 inline-block mr-1" />
          Laser
        </button>

        <button
          onPointerDown={() => (keysRef.current.right = true)}
          onPointerUp={() => (keysRef.current.right = false)}
          onPointerLeave={() => (keysRef.current.right = false)}
          className="flex-1 py-3 rounded-xl bg-slate-900 border border-slate-800 active:bg-cyan-500/20 active:border-cyan-500 flex items-center justify-center text-slate-300 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

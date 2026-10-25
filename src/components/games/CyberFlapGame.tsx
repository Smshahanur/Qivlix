import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Trophy, Sparkles, Zap, Award } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Pipe {
  x: number;
  topHeight: number;
  bottomY: number;
  passed: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  size: number;
}

export const CyberFlapGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('qivlix_highscore_cyber-flap');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Game internal physics refs
  const droneRef = useRef({
    x: 80,
    y: 200,
    vy: 0,
    radius: 14,
    rotation: 0
  });

  const pipesRef = useRef<Pipe[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const frameCountRef = useRef(0);
  const animFrameId = useRef<number | null>(null);
  const scoreRef = useRef(0);

  // Jump / Thrust Action
  const jump = useCallback(() => {
    if (gameState === 'idle') {
      scoreRef.current = 0;
      setScore(0);
      pipesRef.current = [];
      particlesRef.current = [];
      droneRef.current.y = 200;
      droneRef.current.vy = -5.5;
      setGameState('playing');
      sound.playTone(520, 'triangle', 0.08, 0.15);
      return;
    }

    if (gameState === 'playing') {
      droneRef.current.vy = -6.2;
      sound.playTone(480, 'sine', 0.06, 0.12);

      // Spawn engine thruster particles
      for (let i = 0; i < 6; i++) {
        particlesRef.current.push({
          x: droneRef.current.x - 12,
          y: droneRef.current.y + (Math.random() * 8 - 4),
          vx: -(Math.random() * 3 + 2),
          vy: Math.random() * 2 - 1,
          color: Math.random() > 0.5 ? '#22d3ee' : '#c084fc',
          alpha: 1,
          size: Math.random() * 3 + 2
        });
      }
    } else if (gameState === 'gameover') {
      scoreRef.current = 0;
      setScore(0);
      pipesRef.current = [];
      particlesRef.current = [];
      droneRef.current.y = 200;
      droneRef.current.vy = -5.5;
      droneRef.current.rotation = 0;
      setGameState('playing');
      sound.playTone(520, 'triangle', 0.08, 0.15);
    }
  }, [gameState]);

  // Keyboard trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  // 60FPS Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const gravity = 0.28;
    const pipeWidth = 52;
    const pipeGap = 130;
    const pipeSpeed = 2.4;

    const updateAndRender = () => {
      frameCountRef.current++;

      if (gameState === 'playing') {
        const drone = droneRef.current;
        drone.vy += gravity;
        drone.y += drone.vy;
        drone.rotation = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, drone.vy * 0.08));

        // Spawn Pipes
        if (frameCountRef.current % 95 === 0) {
          const minHeight = 50;
          const maxHeight = height - pipeGap - minHeight;
          const topHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

          pipesRef.current.push({
            x: width,
            topHeight,
            bottomY: topHeight + pipeGap,
            passed: false
          });
        }

        // Update Pipes
        for (let i = pipesRef.current.length - 1; i >= 0; i--) {
          const pipe = pipesRef.current[i];
          pipe.x -= pipeSpeed;

          // Check Score
          if (!pipe.passed && pipe.x + pipeWidth < drone.x) {
            pipe.passed = true;
            scoreRef.current += 1;
            setScore(scoreRef.current);
            sound.playMatch();
          }

          // Check Collision with pipe
          const inPipeX = drone.x + drone.radius > pipe.x && drone.x - drone.radius < pipe.x + pipeWidth;
          const hitTop = inPipeX && drone.y - drone.radius < pipe.topHeight;
          const hitBottom = inPipeX && drone.y + drone.radius > pipe.bottomY;

          if (hitTop || hitBottom) {
            // Crash!
            handleCrash();
            break;
          }

          // Remove off-screen pipes
          if (pipe.x + pipeWidth < 0) {
            pipesRef.current.splice(i, 1);
          }
        }

        // Check Ceiling / Floor Collision
        if (drone.y + drone.radius >= height - 20 || drone.y - drone.radius <= 0) {
          handleCrash();
        }

        // Update Thrust Particles
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.03;
          if (p.alpha <= 0) {
            particlesRef.current.splice(i, 1);
          }
        }
      }

      function handleCrash() {
        setGameState('gameover');
        sound.playGameOver();
        if (scoreRef.current > highScore) {
          setHighScore(scoreRef.current);
          try {
            localStorage.setItem('qivlix_highscore_cyber-flap', String(scoreRef.current));
          } catch {}
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        }
      }

      // --- RENDER PASS ---
      ctx.fillStyle = '#070b16';
      ctx.fillRect(0, 0, width, height);

      // Cyber Grid Background Lines
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.35)';
      ctx.lineWidth = 1;
      const gridOffset = (frameCountRef.current * 0.5) % 30;
      for (let x = -gridOffset; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw Pipes (Neon Energy Pylons)
      pipesRef.current.forEach((pipe) => {
        // Top Pipe
        const topGrad = ctx.createLinearGradient(pipe.x, 0, pipe.x + pipeWidth, 0);
        topGrad.addColorStop(0, '#3b82f6');
        topGrad.addColorStop(0.5, '#22d3ee');
        topGrad.addColorStop(1, '#06b6d4');
        ctx.fillStyle = topGrad;
        ctx.shadowColor = '#22d3ee';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.roundRect(pipe.x, 0, pipeWidth, pipe.topHeight, [0, 0, 8, 8]);
        ctx.fill();

        // Bottom Pipe
        const botGrad = ctx.createLinearGradient(pipe.x, pipe.bottomY, pipe.x + pipeWidth, pipe.bottomY);
        botGrad.addColorStop(0, '#8b5cf6');
        botGrad.addColorStop(0.5, '#c084fc');
        botGrad.addColorStop(1, '#a855f7');
        ctx.fillStyle = botGrad;
        ctx.shadowColor = '#c084fc';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.roundRect(pipe.x, pipe.bottomY, pipeWidth, height - pipe.bottomY, [8, 8, 0, 0]);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Ground energy strip
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fillRect(0, height - 20, width, 20);
      ctx.fillStyle = '#22d3ee';
      ctx.shadowColor = '#22d3ee';
      ctx.shadowBlur = 8;
      ctx.fillRect(0, height - 22, width, 2);
      ctx.shadowBlur = 0;

      // Draw Particles
      particlesRef.current.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      // Draw Cyber Drone
      const drone = droneRef.current;
      ctx.save();
      ctx.translate(drone.x, drone.y);
      ctx.rotate(drone.rotation);

      // Drone Body
      ctx.shadowColor = '#22d3ee';
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#0ea5e9';
      ctx.beginPath();
      ctx.ellipse(0, 0, drone.radius + 2, drone.radius - 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Core cockpit visor
      ctx.fillStyle = '#e0f2fe';
      ctx.shadowColor = '#38bdf8';
      ctx.beginPath();
      ctx.ellipse(4, -1, 6, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Wing glow
      ctx.fillStyle = '#a855f7';
      ctx.fillRect(-8, -10, 8, 3);
      ctx.fillRect(-8, 7, 8, 3);

      ctx.restore();
      ctx.shadowBlur = 0;

      animFrameId.current = requestAnimationFrame(updateAndRender);
    };

    animFrameId.current = requestAnimationFrame(updateAndRender);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [gameState, highScore]);

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto p-4 sm:p-6 select-none">
      {/* Top Header / Score Bar */}
      <div className="w-full flex items-center justify-between gap-4 mb-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Pylons Passed</div>
          <div className="text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            {score}
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono font-bold text-amber-300">
            Best: {highScore}
          </span>
        </div>
      </div>

      {/* Main Game Screen */}
      <div
        onClick={jump}
        className="relative w-full max-w-[400px] aspect-[400/520] rounded-2xl overflow-hidden border-2 border-slate-800 bg-[#070b16] shadow-2xl cursor-pointer"
      >
        <canvas
          ref={canvasRef}
          width={400}
          height={520}
          className="w-full h-full touch-none"
        />

        {/* Live Score Overlay during gameplay */}
        {gameState === 'playing' && (
          <div className="absolute top-4 left-0 right-0 flex justify-center pointer-events-none">
            <span className="text-4xl font-display font-black text-slate-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {score}
            </span>
          </div>
        )}

        {/* Start / Gameover Overlays */}
        {gameState !== 'playing' && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
            {gameState === 'idle' ? (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-xl shadow-cyan-500/10 animate-bounce">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="font-display font-black text-2xl text-slate-100">Cyber Flap</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Tap or hit Spacebar to pulse engine thrust. Guide your cyber drone through the high-voltage neon pylons!
                </p>
                <button
                  onClick={jump}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 hover:scale-105 transition-all cursor-pointer"
                >
                  Tap to Launch
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-2xl font-display font-black text-rose-500">Hull Breach!</div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-xs text-slate-400">Score: <strong className="text-slate-100 text-lg">{score}</strong></div>
                  <div className="text-xs text-slate-400">Best: <strong className="text-amber-400 text-lg">{highScore}</strong></div>
                  {score >= 25 && (
                    <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-cyan-300">
                      <Award className="w-4 h-4 text-cyan-400" />
                      <span>{score >= 50 ? 'Gold Pilot' : 'Silver Pilot'}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={jump}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition-all cursor-pointer"
                >
                  Fly Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="text-center mt-3 text-xs text-slate-500 font-mono">
        Tap screen or press Spacebar / Up Arrow to thrust
      </div>
    </div>
  );
};

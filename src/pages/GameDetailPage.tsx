import React, { useState, useRef } from 'react';
import {
  Maximize2,
  Minimize2,
  Share2,
  Volume2,
  VolumeX,
  ChevronRight,
  BookOpen,
  Keyboard,
  Lightbulb,
  Check,
  Gamepad2,
  ArrowLeft
} from 'lucide-react';
import { GAMES } from '../data/games';
import { GameInfo } from '../types/game';
import { sound } from '../utils/audio';
import { AdPlaceholder } from '../components/AdPlaceholder';

// Individual games
import { BlockPuzzleGame } from '../components/games/BlockPuzzleGame';
import { SnakeGame } from '../components/games/SnakeGame';
import { MemoryMatchGame } from '../components/games/MemoryMatchGame';
import { TicTacToeGame } from '../components/games/TicTacToeGame';
import { NumberMergeGame } from '../components/games/NumberMergeGame';
import { ReactionTestGame } from '../components/games/ReactionTestGame';
import { CyberSweeperGame } from '../components/games/CyberSweeperGame';
import { NeonBreakoutGame } from '../components/games/NeonBreakoutGame';
import { CyberFlapGame } from '../components/games/CyberFlapGame';
import { CyberWordleGame } from '../components/games/CyberWordleGame';

interface GameDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const GameDetailPage: React.FC<GameDetailPageProps> = ({ slug, onNavigate }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.isMuted());
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const game = GAMES.find((g) => g.slug === slug) || GAMES[0];

  const toggleFullscreen = () => {
    if (!gameContainerRef.current) return;
    if (!document.fullscreenElement) {
      gameContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleSoundToggle = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
  };

  // Render game component based on slug
  const renderGame = () => {
    switch (game.slug) {
      case 'block-puzzle':
        return <BlockPuzzleGame />;
      case 'snake':
        return <SnakeGame />;
      case 'memory-match':
        return <MemoryMatchGame />;
      case 'tic-tac-toe':
        return <TicTacToeGame />;
      case 'number-merge':
        return <NumberMergeGame />;
      case 'reaction-test':
        return <ReactionTestGame />;
      case 'cyber-sweeper':
        return <CyberSweeperGame />;
      case 'neon-breakout':
        return <NeonBreakoutGame />;
      case 'cyber-flap':
        return <CyberFlapGame />;
      case 'cyber-wordle':
        return <CyberWordleGame />;
      default:
        return <BlockPuzzleGame />;
    }
  };

  const otherGames = GAMES.filter((g) => g.slug !== game.slug);

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 mb-4 sm:mb-6 font-medium">
        <button
          onClick={() => onNavigate('/')}
          className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <ChevronRight className="w-3 h-3 text-slate-600" />
        <button
          onClick={() => onNavigate('/#games')}
          className="hover:text-cyan-400 transition-colors cursor-pointer"
        >
          Games
        </button>
        <ChevronRight className="w-3 h-3 text-slate-600" />
        <span className="text-cyan-400">{game.title}</span>
      </nav>

      {/* Game Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 sm:mb-6">
        <div>
          {/* Zero Pill unboxed metadata */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-slate-400 font-medium mb-1">
            <span className="text-cyan-400">{game.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Qivlix Playground</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Browser Play</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-100">
            {game.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            {game.tagline}
          </p>
        </div>

        {/* Global Game Actions */}
        <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
          <button
            onClick={handleSoundToggle}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-cyan-400 transition-all cursor-pointer"
            title={isMuted ? 'Unmute game audio' : 'Mute game audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-cyan-400 transition-all cursor-pointer"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-300 hover:text-cyan-400 transition-all cursor-pointer"
            title="Share this game"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main Playable Arena */}
      <div
        ref={gameContainerRef}
        className="w-full rounded-2xl bg-[#080d1a] border border-slate-800/90 shadow-2xl p-2 sm:p-6 md:p-8 flex flex-col items-center justify-center min-h-[380px] sm:min-h-[460px] relative overflow-hidden"
      >
        {/* Playable Game Engine */}
        {renderGame()}
      </div>

      {/* Mid-Game AdSense Placement */}
      <AdPlaceholder format="banner" slotId="game-detail-banner" />

      {/* Game Details & Instructions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-10">
        {/* Column 1: How to Play */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-2 mb-4 text-cyan-400">
            <BookOpen className="w-5 h-5" />
            <h2 className="font-display font-bold text-base text-slate-100">
              How to Play
            </h2>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {game.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                <span className="font-mono text-cyan-400 text-xs font-bold mt-0.5">
                  0{idx + 1}.
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Controls Breakdown */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-2 mb-4 text-purple-400">
            <Keyboard className="w-5 h-5" />
            <h2 className="font-display font-bold text-base text-slate-100">
              Controls Breakdown
            </h2>
          </div>
          <div className="space-y-3">
            {game.controls.map((ctrl, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
                <div className="flex items-center justify-between font-mono text-[11px] text-slate-400 mb-1">
                  <span className="text-purple-300">{ctrl.device}</span>
                  <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-200 border border-slate-700">
                    {ctrl.keys}
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-tight">
                  {ctrl.action}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Pro Tips & Strategy */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-2 mb-4 text-amber-400">
            <Lightbulb className="w-5 h-5" />
            <h2 className="font-display font-bold text-base text-slate-100">
              Pro Tips &amp; Strategy
            </h2>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {game.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                <span className="text-amber-400 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* More Games Recommendation */}
      <section className="pt-8 border-t border-slate-800/80">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-400">Next Adventure</span>
            <h2 className="font-display font-bold text-xl text-slate-100">More Free Games on Qivlix</h2>
          </div>
          <button
            onClick={() => onNavigate('/#games')}
            className="text-xs font-medium text-cyan-400 hover:underline"
          >
            View All Games →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {otherGames.slice(0, 5).map((og) => (
            <button
              key={og.id}
              onClick={() => onNavigate(`/game/${og.slug}`)}
              className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 text-left transition-all hover:-translate-y-1 group cursor-pointer"
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-800 mb-2">
                <img
                  src={og.thumbnail}
                  alt={og.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="text-[11px] font-mono text-cyan-400">{og.category}</div>
              <div className="font-display font-semibold text-xs text-slate-100 group-hover:text-cyan-300 truncate">
                {og.title}
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

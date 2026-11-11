import React, { useState, useRef, useEffect } from 'react';
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
  ArrowLeft,
  Trophy,
  Target,
  Cpu,
  HelpCircle,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck
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
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const game = GAMES.find((g) => g.slug === slug) || GAMES[0];

  // Inject dynamic JSON-LD for VideoGame and FAQPage structured data
  useEffect(() => {
    const scriptId = 'game-json-ld';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'VideoGame',
          'name': `${game.title} — Qivlix Midnight Arcade`,
          'description': game.description,
          'gameItem': game.rules,
          'genre': [game.category, 'Browser Game', 'Casual Game'],
          'playMode': 'SinglePlayer',
          'applicationCategory': 'GameApplication',
          'operatingSystem': 'Any Web Browser, Mobile, Tablet, Desktop',
          'author': {
            '@type': 'Person',
            'name': 'Shahanur Mollah'
          },
          'publisher': {
            '@type': 'Organization',
            'name': 'Qivlix',
            'url': 'https://qivlix.vercel.app'
          },
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          }
        },
        {
          '@type': 'FAQPage',
          'mainEntity': game.faqs.map((faq) => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': faq.answer
            }
          }))
        }
      ]
    };

    scriptEl.textContent = JSON.stringify(structuredData);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [game]);

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
    } catch {}
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
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <button
          onClick={() => onNavigate('/')}
          className="hover:text-[#ccff00] transition-colors flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>HOME</span>
        </button>
        <ChevronRight className="w-3 h-3 text-slate-600" />
        <button
          onClick={() => onNavigate('/#games')}
          className="hover:text-[#ccff00] transition-colors cursor-pointer"
        >
          GAMES
        </button>
        <ChevronRight className="w-3 h-3 text-slate-600" />
        <span className="text-[#ccff00] font-bold uppercase">{game.title}</span>
      </nav>

      {/* Game Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1b243b] pb-5">
        <div>
          {/* Metadata String */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono mb-1">
            <span className="text-[#ccff00] font-bold uppercase">[{game.category}]</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-slate-300">DIFFICULTY: {game.difficulty.toUpperCase()}</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-[#ff6600] flex items-center gap-1">
              <Clock className="w-3 h-3 inline" /> {game.estimatedPlayTime}
            </span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-slate-400">QIVLIX MIDNIGHT ARCADE</span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-4xl text-[#fbfaf6]">
            {game.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            {game.tagline}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 self-start md:self-auto font-mono text-xs">
          <button
            onClick={handleSoundToggle}
            className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
              isMuted
                ? 'bg-[#0a0e1a] border-[#1b243b] text-slate-500'
                : 'bg-[#ccff00]/10 border-[#ccff00]/40 text-[#ccff00]'
            }`}
            title={isMuted ? 'Sound Muted (Click to Unmute)' : 'Sound Active (Click to Mute)'}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-lg bg-[#0a0e1a] border border-[#1b243b] hover:border-[#2a375a] text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Toggle Fullscreen"
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0a0e1a] border border-[#1b243b] hover:border-[#ccff00] text-xs font-semibold text-slate-300 hover:text-[#ccff00] transition-all cursor-pointer"
            title="Share game link"
            aria-label="Share game link"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#ccff00]" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'COPIED!' : 'SHARE'}</span>
          </button>
        </div>
      </div>

      {/* Main Playable Arena (Midnight Arcade Flight Deck with Corner Registration) */}
      <div
        ref={gameContainerRef}
        className="w-full rounded-2xl bg-[#060810] border border-[#1b243b] p-3 sm:p-6 md:p-8 flex flex-col items-center justify-center min-h-[380px] sm:min-h-[460px] relative overflow-hidden arcade-corner-ticks shadow-2xl"
      >
        {/* Top Status Bar inside cabinet */}
        <div className="w-full flex items-center justify-between text-[10px] font-mono text-slate-500 mb-2 border-b border-[#1b243b]/60 pb-1.5 px-1">
          <span className="flex items-center gap-1.5 text-[#ccff00]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
            <span>NATIVE 60FPS</span>
          </span>
          <span className="text-slate-400 uppercase">{game.title} // DEPLOYED</span>
          <span className="text-[#ff6600]">LOCAL PROFILE ACTIVE</span>
        </div>

        {/* Playable Game Engine */}
        {renderGame()}
      </div>

      {/* Non-intrusive Ad Placement Outside Gameplay Area */}
      <AdPlaceholder format="banner" slotId="game-detail-banner" />

      {/* Strategy Guide Direct Callout Banner if guide exists */}
      {game.guideSlug && (
        <aside aria-label="Strategy Guide" className="p-5 sm:p-6 rounded-xl bg-[#0a0e1a] border border-[#ccff00]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#ccff00] uppercase tracking-wider font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Official Masterclass Guide Available</span>
            </div>
            <h3 className="font-display font-bold text-base text-[#fbfaf6]">
              How to reach grandmaster scores in {game.title}
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Read our mathematical breakdown authored by founder Shahanur Mollah, covering algorithms, spatial positioning, and endgame execution.
            </p>
          </div>
          <button
            onClick={() => onNavigate(`/guides/${game.guideSlug}`)}
            className="px-4 py-2.5 rounded-lg bg-[#ccff00] hover:bg-[#d9ff33] text-[#060810] font-black font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>Read Strategy Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </aside>
      )}

      {/* Section 1: Objective & Tactical Briefing */}
      <section className="p-6 sm:p-8 rounded-xl bg-[#0a0e1a] border border-[#1b243b] space-y-4">
        <div className="flex items-center gap-2 text-[#ccff00]">
          <Target className="w-5 h-5" />
          <h2 className="font-display font-bold text-lg text-[#fbfaf6]">
            Tactical Briefing &amp; Mission Objective
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {game.description}
        </p>
        <div className="p-4 rounded-lg bg-[#060810] border border-[#1b243b] text-xs leading-relaxed">
          <strong className="text-[#ccff00] uppercase tracking-wider block mb-1 font-mono text-[11px]">Primary Win Condition:</strong>
          <span className="text-slate-200">{game.objective}</span>
        </div>
      </section>

      {/* Section 2: Instructions, Controls & Pro Tips Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: How to Play */}
        <section className="p-6 rounded-xl bg-[#0a0e1a] border border-[#1b243b] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 text-[#ccff00]">
              <BookOpen className="w-5 h-5" />
              <h2 className="font-display font-bold text-base text-[#fbfaf6]">
                Rules of Engagement
              </h2>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {game.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="font-mono text-[#ccff00] text-xs font-bold mt-0.5">
                    0{idx + 1}.
                  </span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 pt-4 border-t border-[#1b243b] text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#ccff00]" />
            <span>Deterministic HTML5 Game Engine</span>
          </div>
        </section>

        {/* Column 2: Controls Breakdown */}
        <section className="p-6 rounded-xl bg-[#0a0e1a] border border-[#1b243b]">
          <div className="flex items-center gap-2 mb-4 text-[#ff6600]">
            <Keyboard className="w-5 h-5" />
            <h2 className="font-display font-bold text-base text-[#fbfaf6]">
              Input Matrix &amp; Keybindings
            </h2>
          </div>
          <div className="space-y-3">
            {game.controls.map((ctrl, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-[#060810] border border-[#1b243b] text-xs">
                <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                  <span className="text-slate-300 font-semibold">{ctrl.device}</span>
                  <span className="bg-[#151c33] px-2 py-0.5 rounded text-[#ccff00] font-bold border border-[#2a375a]">
                    {ctrl.keys}
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] leading-tight mt-1">
                  {ctrl.action}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Column 3: Pro Tips & Strategies */}
        <section className="p-6 rounded-xl bg-[#0a0e1a] border border-[#1b243b]">
          <div className="flex items-center gap-2 mb-4 text-[#a3e635]">
            <Lightbulb className="w-5 h-5" />
            <h2 className="font-display font-bold text-base text-[#fbfaf6]">
              Pro Tips &amp; Strategies
            </h2>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {game.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                <span className="text-[#a3e635] font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
            {game.proStrategies.map((strat, idx) => (
              <li key={`ps-${idx}`} className="flex items-start gap-2.5 leading-relaxed">
                <span className="text-[#ff6600] font-bold">★</span>
                <span className="text-slate-200 font-medium">{strat}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Section 3: Scoring System Matrix & Mechanics Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scoring Table */}
        <section className="lg:col-span-6 p-6 sm:p-7 rounded-xl bg-[#0a0e1a] border border-[#1b243b] space-y-4">
          <div className="flex items-center gap-2 text-[#ff6600]">
            <Trophy className="w-5 h-5" />
            <h2 className="font-display font-bold text-base text-[#fbfaf6]">
              Scoring Matrix &amp; Multipliers
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#1b243b] text-slate-400 font-mono text-[11px]">
                  <th className="py-2 pr-3">Gameplay Event</th>
                  <th className="py-2 px-3 text-[#ccff00]">Points</th>
                  <th className="py-2 pl-3">Criteria</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1b243b]">
                {game.scoringSystem.map((scoreRule, idx) => (
                  <tr key={idx} className="hover:bg-[#060810]">
                    <td className="py-2.5 pr-3 text-slate-200 font-medium">{scoreRule.event}</td>
                    <td className="py-2.5 px-3 text-[#ccff00] font-mono font-bold whitespace-nowrap">{scoreRule.points}</td>
                    <td className="py-2.5 pl-3 text-slate-400 text-[11px]">{scoreRule.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Engine Mechanics Deep Dive */}
        <section className="lg:col-span-6 p-6 sm:p-7 rounded-xl bg-[#0a0e1a] border border-[#1b243b] space-y-4">
          <div className="flex items-center gap-2 text-[#ccff00]">
            <Cpu className="w-5 h-5" />
            <h2 className="font-display font-bold text-base text-[#fbfaf6]">
              Engine Architecture &amp; Mechanics
            </h2>
          </div>
          <div className="space-y-3 text-xs text-slate-300">
            {game.mechanics.map((mech, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-[#060810] border border-[#1b243b] leading-relaxed">
                <span className="text-[#a3e635] font-mono font-semibold block mb-0.5">
                  SPEC #{idx + 1}:
                </span>
                {mech}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Section 4: Interactive Frequently Asked Questions */}
      <section className="p-6 sm:p-8 rounded-xl bg-[#0a0e1a] border border-[#1b243b] space-y-4">
        <div className="flex items-center gap-2 text-[#fbfaf6]">
          <HelpCircle className="w-5 h-5 text-[#ccff00]" />
          <h2 className="font-display font-bold text-lg text-[#fbfaf6]">
            Frequently Asked Questions — {game.title}
          </h2>
        </div>
        <p className="text-xs text-slate-400">
          Clear answers to common gameplay questions, strategy tips, and engine mechanics.
        </p>

        <div className="space-y-3 pt-2">
          {game.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-lg bg-[#060810] border border-[#1b243b] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full px-4 py-3.5 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-slate-200 hover:text-[#ccff00] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${
                      isOpen ? 'rotate-180 text-[#ccff00]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-[#1b243b]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* More Games Recommendation */}
      <section className="pt-8 border-t border-[#1b243b]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-mono uppercase text-[#ccff00]">NEXT ADVENTURE</span>
            <h2 className="font-display font-bold text-xl text-[#fbfaf6]">More Free Games on Qivlix</h2>
          </div>
          <button
            onClick={() => onNavigate('/#games')}
            className="text-xs font-mono font-bold text-[#ccff00] hover:underline cursor-pointer"
          >
            VIEW ALL 10 GAMES →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {otherGames.slice(0, 5).map((og) => (
            <button
              key={og.id}
              onClick={() => onNavigate(`/game/${og.slug}`)}
              className="p-3 rounded-lg bg-[#0a0e1a] border border-[#1b243b] hover:border-[#ccff00] text-left transition-all group cursor-pointer"
            >
              <div className="aspect-[16/10] rounded overflow-hidden bg-[#060810] mb-2">
                <img
                  src={og.thumbnail}
                  alt={og.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="text-[10px] font-mono text-[#a3e635] uppercase">{og.category}</div>
              <div className="font-display font-bold text-xs text-[#fbfaf6] group-hover:text-[#ccff00] truncate">
                {og.title}
              </div>
              <p className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
                {og.difficulty} · {og.estimatedPlayTime}
              </p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

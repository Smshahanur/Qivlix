import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Search, Menu, X, Dices, Heart, Trophy, Compass, Zap, Brain, Calendar, Home, BookOpen, Gamepad2 } from 'lucide-react';
import { sound } from '../utils/audio';
import { QivlixWordmark } from './BrandLogo';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  onOpenSurprise: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
  onOpenSurprise,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(sound.isMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const newState = sound.toggleMute();
    setIsMuted(newState);
  };

  const navLinks = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Games', path: '/#games', icon: Gamepad2 },
    { label: 'Guides', path: '/guides', icon: BookOpen },
    { label: 'Daily Portal', path: '/daily', icon: Calendar },
    { label: 'Quick Play', path: '/quick-play', icon: Zap },
    { label: 'Brain Lab', path: '/brain-lab', icon: Brain },
    { label: 'Collection', path: '/collection', icon: Trophy },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
        scrolled
          ? 'bg-[#060810]/95 backdrop-blur-md border-[#1b243b] shadow-xl shadow-black/60'
          : 'bg-[#060810]/90 border-[#151c30]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-6">
        {/* Zone 1: Brand Wordmark & Monogram */}
        <button
          onClick={() => handleLinkClick('/')}
          className="focus:outline-none text-left cursor-pointer shrink-0"
          aria-label="Qivlix Home - Play Beyond Limits"
        >
          <QivlixWordmark size="md" showTagline={true} />
        </button>

        {/* Zone 2: Desktop Navigation (Single-line, clean typography, electric lime active marker) */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path || (link.path === '/#games' && currentPath.startsWith('/game/'));
            return (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`text-xs font-semibold tracking-wide transition-colors py-1 cursor-pointer whitespace-nowrap relative ${
                  isActive
                    ? 'text-[#ccff00] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#ccff00]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Utility Controls & Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Surprise Me Quick Trigger (Electric Lime & Midnight Arcade Style) */}
          <button
            onClick={onOpenSurprise}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#0f1527] hover:bg-[#151c33] border border-[#ff5500]/50 hover:border-[#ff5500] text-[#ff6600] hover:text-[#ff7722] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
            aria-label="Surprise Me (Random Game Roulette)"
            title="Roll random game"
          >
            <Dices className="w-3.5 h-3.5 text-[#ff5500] shrink-0" />
            <span className="hidden sm:inline">Surprise Me</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-lg bg-[#0f1527] border border-[#1b243b] text-slate-300 hover:text-white hover:border-[#2a375a] transition-colors cursor-pointer"
            aria-label="Search games and guides"
            title="Search (Command Palette)"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isMuted
                ? 'bg-[#0f1527] border-[#1b243b] text-slate-500 hover:text-slate-300'
                : 'bg-[#ccff00]/10 border-[#ccff00]/40 text-[#ccff00] hover:bg-[#ccff00]/20'
            }`}
            aria-label={isMuted ? 'Unmute procedural sound effects' : 'Mute procedural sound effects'}
            title={isMuted ? 'Sound: Muted' : 'Sound: Active'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#0f1527] border border-[#1b243b] text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Midnight Arcade Styling) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#1b243b] bg-[#060810]/98 backdrop-blur-xl px-4 py-5 space-y-1.5 animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/30'
                    : 'text-slate-300 hover:bg-[#0f1527] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </button>
            );
          })}

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSurprise();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#0f1527] border border-[#ff5500]/50 text-[#ff6600] font-bold text-xs cursor-pointer"
            >
              <Dices className="w-4 h-4 text-[#ff5500]" />
              <span>Surprise Me (Roll Random Game)</span>
            </button>
          </div>

          <div className="pt-3 border-t border-[#1b243b] flex items-center justify-between text-xs text-slate-400 px-2">
            <span className="font-mono text-[11px]">Procedural Audio FX:</span>
            <button
              onClick={toggleSound}
              className="text-[#ccff00] font-semibold cursor-pointer text-xs"
            >
              {isMuted ? 'Muted (Tap to enable)' : 'Active (Tap to mute)'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

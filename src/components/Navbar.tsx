import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Search, Menu, X, Dices, Heart, Trophy, Compass, Zap, Brain, Calendar, Home } from 'lucide-react';
import { sound } from '../utils/audio';

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
      setScrolled(window.scrollY > 20);
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
    { label: 'Daily Portal', path: '/daily', icon: Calendar },
    { label: 'Quick Play', path: '/quick-play', icon: Zap },
    { label: 'Brain Lab', path: '/brain-lab', icon: Brain },
    { label: 'Discover', path: '/discover', icon: Compass },
    { label: 'My Collection', path: '/collection', icon: Trophy },
    { label: 'Favorites', path: '/favorites', icon: Heart },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
        scrolled
          ? 'bg-[#070a12]/95 backdrop-blur-md border-slate-800/80 shadow-lg shadow-black/40'
          : 'bg-[#070a12]/80 backdrop-blur-sm border-slate-800/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Zone */}
        <button
          onClick={() => handleLinkClick('/')}
          className="flex flex-col items-start group focus:outline-none text-left cursor-pointer shrink-0"
          aria-label="Qivlix Home"
        >
          <div className="flex items-center gap-1.5">
            <span className="font-display font-black text-xl sm:text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400 group-hover:opacity-90 transition-opacity">
              QIVLIX
            </span>
          </div>
          <span className="text-[9px] font-mono tracking-tight text-slate-400 hidden sm:block">
            The Daily Discovery Playground
          </span>
        </button>

        {/* Desktop Navigation (Zero-Pill clean typography) */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`text-xs font-semibold tracking-wide transition-colors py-1 cursor-pointer relative ${
                  isActive
                    ? 'text-cyan-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyan-400'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Side Utility Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Surprise Me Quick Trigger */}
          <button
            onClick={onOpenSurprise}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            aria-label="Surprise Me"
          >
            <Dices className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="hidden sm:inline">Surprise Me</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
            aria-label="Search activities"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={toggleSound}
            className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl border transition-colors cursor-pointer ${
              isMuted
                ? 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20'
            }`}
            aria-label={isMuted ? 'Unmute procedural sound' : 'Mute procedural sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#070a12]/98 backdrop-blur-xl px-4 py-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
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
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-500/30 text-amber-300 font-bold text-xs cursor-pointer"
            >
              <Dices className="w-4 h-4 text-amber-400" />
              <span>Surprise Me (Roll Random Activity)</span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 px-2">
            <span>Audio Procedural FX:</span>
            <button
              onClick={toggleSound}
              className="text-cyan-400 font-semibold cursor-pointer"
            >
              {isMuted ? 'Muted (Tap to enable)' : 'Active (Tap to mute)'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

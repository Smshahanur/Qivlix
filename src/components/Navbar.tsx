import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Search, Menu, X, Sparkles, Gamepad2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onOpenSearch }) => {
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
    { label: 'Home', path: '/' },
    { label: 'Games', path: '/#games' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <button
          onClick={() => handleLinkClick('/')}
          className="flex flex-col items-start group focus:outline-none text-left"
          aria-label="Qivlix Home"
        >
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-500 group-hover:opacity-90 transition-opacity">
              QIVLIX
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono tracking-tight bg-purple-950/60 text-purple-300 border border-purple-500/30">
              PRO
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-400 -mt-1 group-hover:text-slate-300 transition-colors">
            by Shahanur Mollah
          </span>
        </button>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.path)}
                className={`transition-colors whitespace-nowrap cursor-pointer hover:text-cyan-400 ${
                  isActive ? 'text-cyan-400 font-semibold' : 'text-slate-300'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Zone */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-xs text-slate-400 hover:text-slate-200 transition-all focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
            aria-label="Search Games"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Search games...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 rounded border border-slate-700 text-slate-400">
              /
            </kbd>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              isMuted
                ? 'bg-slate-900/80 border-slate-800 text-slate-500 hover:text-slate-300'
                : 'bg-cyan-950/40 border-cyan-500/40 text-cyan-400 hover:bg-cyan-950/60'
            }`}
            title={isMuted ? 'Sound muted (Click to enable)' : 'Sound enabled (Click to mute)'}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Instant Play CTA (Desktop) */}
          <button
            onClick={() => handleLinkClick('/game/block-puzzle')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Play Now</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#090d18] px-4 pt-3 pb-5 space-y-2 animate-in fade-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.path)}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800/80 hover:text-cyan-400 transition-colors flex items-center justify-between"
            >
              <span>{link.label}</span>
              <span className="text-xs text-slate-600">→</span>
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs text-slate-400">Play Beyond Limits</span>
            <button
              onClick={() => handleLinkClick('/game/block-puzzle')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300"
            >
              Quick Launch
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

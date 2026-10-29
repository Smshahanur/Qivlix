import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { GAMES } from '../data/games';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#050810] border-t border-slate-800/80 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-3">
            <button
              onClick={() => onNavigate('/')}
              className="text-left group focus:outline-none cursor-pointer"
            >
              <div className="font-display font-black text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400">
                QIVLIX
              </div>
              <div className="text-xs font-medium text-slate-400 group-hover:text-slate-300">
                The Daily Discovery Playground
              </div>
            </button>
            <p className="text-xs text-slate-400 leading-relaxed">
              Play quick games, solve daily mysteries, explore unexpected discoveries, and earn virtual achievements with zero download delays.
            </p>
            <div className="pt-1 text-xs text-cyan-400/90 flex items-center gap-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>All-Ages Browser Entertainment</span>
            </div>
          </div>

          {/* Playground Sections */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Playground Hubs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/daily')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  Daily Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/quick-play')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  Quick Play Arena
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/brain-lab')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  The Brain Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/discover')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  Discovery Vault
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/collection')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  My Collection &amp; Badges
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/favorites')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  Saved Favorites
                </button>
              </li>
            </ul>
          </div>

          {/* Activities & Games */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Activities &amp; Games
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/activity/reaction-rush')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Reaction Rush
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/activity/memory-grid')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  Memory Grid
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/activity/odd-one-out')}
                  className="hover:text-purple-400 transition-colors cursor-pointer text-left"
                >
                  Odd One Out
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/activity/mystery-picture')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Mystery Picture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/activity/daily-riddle')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Daily Riddle
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/game/block-puzzle')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  Block Puzzle
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Legal Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Support &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/help')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Help &amp; FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  About Qivlix
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Contact &amp; Feedback
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/privacy-policy')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/terms-of-use')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Terms of Use
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/sitemap')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  HTML Sitemap
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Qivlix. The Daily Discovery Playground by Shahanur Mollah. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Deterministic Daily System</span>
            <span aria-hidden="true">·</span>
            <span>Zero Install</span>
            <span aria-hidden="true">·</span>
            <span>Local Browser Storage</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

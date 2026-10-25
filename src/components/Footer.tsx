import React from 'react';
import { Gamepad2, Shield, Heart, ExternalLink } from 'lucide-react';
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
              className="text-left group focus:outline-none"
            >
              <div className="font-display font-black text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-500">
                QIVLIX
              </div>
              <div className="text-xs font-medium text-slate-400 group-hover:text-slate-300">
                by Shahanur Mollah
              </div>
            </button>
            <p className="text-xs text-slate-400 leading-relaxed">
              Play Beyond Limits. Free, lightweight, instant browser gaming built for mobile and desktop players worldwide.
            </p>
            <div className="pt-1 text-xs text-cyan-400/90 flex items-center gap-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Zero Downloads · 100% Free</span>
            </div>
          </div>

          {/* Games Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Playable Games
            </h4>
            <ul className="space-y-2 text-xs">
              {GAMES.map((game) => (
                <li key={game.id}>
                  <button
                    onClick={() => onNavigate(`/game/${game.slug}`)}
                    className="hover:text-cyan-400 transition-colors cursor-pointer text-left"
                  >
                    {game.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Platform & Info
            </h4>
            <ul className="space-y-2 text-xs">
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

          {/* Creator & Compliance Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Creator &amp; Ad Standards
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Qivlix is engineered by developer <span className="text-slate-200 font-medium">Shahanur Mollah</span>. Prepared for high-performance responsive web gaming and modern monetization via Google AdSense.
            </p>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="text-slate-300 font-medium">AdSense Policy Notice:</div>
              <p className="text-[10px] text-slate-400 leading-tight">
                Advertisements are labeled clearly. Gameplay areas remain unobstructed at all times.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Qivlix. Created by Shahanur Mollah.</p>
          <p className="text-center sm:text-right text-slate-400 font-medium">
            Play Beyond Limits.
          </p>
        </div>
      </div>
    </footer>
  );
};

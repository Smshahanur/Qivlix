import React from 'react';
import { Gamepad2, FileText, Globe, ExternalLink } from 'lucide-react';
import { GAMES } from '../data/games';

interface SitemapPageProps {
  onNavigate: (path: string) => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center sm:text-left mb-10">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
          Directory
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-100 mt-1 mb-2">
          Qivlix HTML Sitemap
        </h1>
        <p className="text-xs text-slate-400">
          Complete index of games, informational hubs, and legal documents on Qivlix by Shahanur Mollah.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Playable Games Directory */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-2 mb-4 text-cyan-400">
            <Gamepad2 className="w-5 h-5" />
            <h2 className="font-display font-bold text-base text-slate-100">
              Browser Games ({GAMES.length})
            </h2>
          </div>
          <ul className="space-y-3 text-xs">
            {GAMES.map((game) => (
              <li key={game.id} className="border-b border-slate-800/60 pb-2">
                <button
                  onClick={() => onNavigate(`/game/${game.slug}`)}
                  className="font-semibold text-slate-200 hover:text-cyan-400 transition-colors block text-left"
                >
                  {game.title}
                </button>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Category: {game.category} · URL: /game/{game.slug}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Platform Hubs & Legal */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 mb-4 text-purple-400">
              <Globe className="w-5 h-5" />
              <h2 className="font-display font-bold text-base text-slate-100">
                General Pages
              </h2>
            </div>
            <ul className="space-y-3 text-xs">
              <li className="border-b border-slate-800/60 pb-2">
                <button
                  onClick={() => onNavigate('/')}
                  className="font-semibold text-slate-200 hover:text-purple-400 transition-colors block"
                >
                  Home &amp; Arcade Hub
                </button>
                <p className="text-[11px] text-slate-400">URL: /</p>
              </li>
              <li className="border-b border-slate-800/60 pb-2">
                <button
                  onClick={() => onNavigate('/about')}
                  className="font-semibold text-slate-200 hover:text-purple-400 transition-colors block"
                >
                  About Qivlix &amp; Shahanur Mollah
                </button>
                <p className="text-[11px] text-slate-400">URL: /about</p>
              </li>
              <li className="pb-1">
                <button
                  onClick={() => onNavigate('/contact')}
                  className="font-semibold text-slate-200 hover:text-purple-400 transition-colors block"
                >
                  Contact &amp; Game Feedback
                </button>
                <p className="text-[11px] text-slate-400">URL: /contact</p>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 mb-4 text-emerald-400">
              <FileText className="w-5 h-5" />
              <h2 className="font-display font-bold text-base text-slate-100">
                Compliance &amp; Legal
              </h2>
            </div>
            <ul className="space-y-3 text-xs">
              <li className="border-b border-slate-800/60 pb-2">
                <button
                  onClick={() => onNavigate('/privacy-policy')}
                  className="font-semibold text-slate-200 hover:text-emerald-400 transition-colors block"
                >
                  Privacy Policy (GDPR / CCPA / AdSense)
                </button>
                <p className="text-[11px] text-slate-400">URL: /privacy-policy</p>
              </li>
              <li className="pb-1">
                <button
                  onClick={() => onNavigate('/terms-of-use')}
                  className="font-semibold text-slate-200 hover:text-emerald-400 transition-colors block"
                >
                  Terms of Use
                </button>
                <p className="text-[11px] text-slate-400">URL: /terms-of-use</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

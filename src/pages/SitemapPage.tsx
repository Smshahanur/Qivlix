import React from 'react';
import { Gamepad2, FileText, Globe, BookOpen } from 'lucide-react';
import { GAMES } from '../data/games';
import { GUIDES } from '../data/guides';

interface SitemapPageProps {
  onNavigate: (path: string) => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <div className="border-b border-[#1b243b] pb-8 text-center sm:text-left">
        <span className="text-xs font-mono uppercase tracking-wider text-[#ccff00] font-bold">
          DIRECTORY // INDEX
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-[#fbfaf6] mt-2 mb-2">
          Qivlix HTML Sitemap
        </h1>
        <p className="text-xs text-slate-400 font-mono">
          Complete index of games, strategy walkthroughs, discovery portals, and compliance documents on Qivlix by Shahanur Mollah. Tagline: <span className="text-[#ccff00] font-bold">PLAY BEYOND LIMITS.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Playable Games Directory */}
        <div className="p-6 rounded-xl bg-[#0a0e1a] border border-[#1b243b]">
          <div className="flex items-center gap-2 mb-4 text-[#ccff00]">
            <Gamepad2 className="w-5 h-5" />
            <h2 className="font-display font-bold text-base text-[#fbfaf6]">
              Browser Games ({GAMES.length})
            </h2>
          </div>
          <ul className="space-y-3 text-xs">
            {GAMES.map((game) => (
              <li key={game.id} className="border-b border-[#1b243b]/60 pb-2">
                <button
                  onClick={() => onNavigate(`/game/${game.slug}`)}
                  className="font-semibold text-slate-200 hover:text-[#ccff00] transition-colors block text-left cursor-pointer"
                >
                  {game.title}
                </button>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                  [{game.category}] · /game/{game.slug}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Strategy Guides Directory */}
        <div className="p-6 rounded-xl bg-[#0a0e1a] border border-[#1b243b]">
          <div className="flex items-center gap-2 mb-4 text-[#a3e635]">
            <BookOpen className="w-5 h-5" />
            <h2 className="font-display font-bold text-base text-[#fbfaf6]">
              Strategy Guides ({GUIDES.length})
            </h2>
          </div>
          <ul className="space-y-3 text-xs">
            <li className="border-b border-[#1b243b]/60 pb-2">
              <button
                onClick={() => onNavigate('/guides')}
                className="font-semibold text-[#ccff00] hover:underline transition-colors block text-left cursor-pointer"
              >
                Guides Overview Hub
              </button>
              <p className="text-[11px] font-mono text-slate-400 mt-0.5">URL: /guides</p>
            </li>
            {GUIDES.map((guide) => (
              <li key={guide.id} className="border-b border-[#1b243b]/60 pb-2">
                <button
                  onClick={() => onNavigate(`/guides/${guide.slug}`)}
                  className="font-semibold text-slate-200 hover:text-[#ccff00] transition-colors block text-left cursor-pointer"
                >
                  {guide.gameTitle}: {guide.title.split(':')[0]}
                </button>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                  {guide.category} · /guides/{guide.slug}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Platform Hubs & Legal */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-[#0a0e1a] border border-[#1b243b]">
            <div className="flex items-center gap-2 mb-4 text-[#ff6600]">
              <Globe className="w-5 h-5" />
              <h2 className="font-display font-bold text-base text-[#fbfaf6]">
                Playground Portals
              </h2>
            </div>
            <ul className="space-y-3 text-xs">
              <li className="border-b border-[#1b243b]/60 pb-2">
                <button
                  onClick={() => onNavigate('/')}
                  className="font-semibold text-slate-200 hover:text-[#ccff00] transition-colors block cursor-pointer text-left"
                >
                  Home &amp; Arcade Hub
                </button>
                <p className="text-[11px] font-mono text-slate-400">URL: /</p>
              </li>
              <li className="border-b border-[#1b243b]/60 pb-2">
                <button
                  onClick={() => onNavigate('/daily')}
                  className="font-semibold text-slate-200 hover:text-[#ccff00] transition-colors block cursor-pointer text-left"
                >
                  Daily Portal
                </button>
                <p className="text-[11px] font-mono text-slate-400">URL: /daily</p>
              </li>
              <li className="border-b border-[#1b243b]/60 pb-2">
                <button
                  onClick={() => onNavigate('/quick-play')}
                  className="font-semibold text-slate-200 hover:text-[#ccff00] transition-colors block cursor-pointer text-left"
                >
                  Quick Play Arena
                </button>
                <p className="text-[11px] font-mono text-slate-400">URL: /quick-play</p>
              </li>
              <li className="border-b border-[#1b243b]/60 pb-2">
                <button
                  onClick={() => onNavigate('/brain-lab')}
                  className="font-semibold text-slate-200 hover:text-[#ccff00] transition-colors block cursor-pointer text-left"
                >
                  The Brain Lab
                </button>
                <p className="text-[11px] font-mono text-slate-400">URL: /brain-lab</p>
              </li>
              <li className="border-b border-[#1b243b]/60 pb-2">
                <button
                  onClick={() => onNavigate('/discover')}
                  className="font-semibold text-slate-200 hover:text-[#ccff00] transition-colors block cursor-pointer text-left"
                >
                  Discovery Vault
                </button>
                <p className="text-[11px] font-mono text-slate-400">URL: /discover</p>
              </li>
              <li className="border-b border-[#1b243b]/60 pb-2">
                <button
                  onClick={() => onNavigate('/about')}
                  className="font-semibold text-slate-200 hover:text-[#ccff00] transition-colors block cursor-pointer text-left"
                >
                  About Shahanur Mollah
                </button>
                <p className="text-[11px] font-mono text-slate-400">URL: /about</p>
              </li>
              <li className="pb-1">
                <button
                  onClick={() => onNavigate('/contact')}
                  className="font-semibold text-slate-200 hover:text-[#ccff00] transition-colors block cursor-pointer text-left"
                >
                  Contact &amp; Feedback
                </button>
                <p className="text-[11px] font-mono text-slate-400">URL: /contact</p>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-xl bg-[#0a0e1a] border border-[#1b243b]">
            <div className="flex items-center gap-2 mb-4 text-slate-400">
              <FileText className="w-5 h-5" />
              <h2 className="font-display font-bold text-base text-[#fbfaf6]">
                Compliance &amp; Legal
              </h2>
            </div>
            <ul className="space-y-3 text-xs">
              <li className="border-b border-[#1b243b]/60 pb-2">
                <button
                  onClick={() => onNavigate('/privacy-policy')}
                  className="font-semibold text-slate-200 hover:text-[#ccff00] transition-colors block cursor-pointer text-left"
                >
                  Privacy Policy (AdSense)
                </button>
                <p className="text-[11px] font-mono text-slate-400">URL: /privacy-policy</p>
              </li>
              <li className="pb-1">
                <button
                  onClick={() => onNavigate('/terms-of-use')}
                  className="font-semibold text-slate-200 hover:text-[#ccff00] transition-colors block cursor-pointer text-left"
                >
                  Terms of Use
                </button>
                <p className="text-[11px] font-mono text-slate-400">URL: /terms-of-use</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

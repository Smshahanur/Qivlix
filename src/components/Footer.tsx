import React from 'react';
import { Mail, Instagram, ExternalLink, Gamepad2, BookOpen, Shield, Heart } from 'lucide-react';
import { QivlixWordmark, QivlixArcadeBadge } from './BrandLogo';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#05070d] border-t border-[#1b243b] text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 mb-12">
          {/* Brand Column (Span 2) */}
          <div className="sm:col-span-2 space-y-4">
            <button
              onClick={() => onNavigate('/')}
              className="text-left focus:outline-none cursor-pointer"
            >
              <QivlixWordmark size="lg" showTagline={true} />
            </button>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Qivlix is an independent web gaming laboratory and editorial platform engineered by <strong className="text-[#fbfaf6]">Shahanur Mollah</strong>. Zero downloads, native 60FPS browser execution, and strict non-intrusive advertising standards.
            </p>

            <div className="pt-1">
              <QivlixArcadeBadge label="QIVLIX MIDNIGHT ARCADE" />
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <a
                href="mailto:shahanurmollah1@gmail.com"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-[#ccff00] transition-colors"
                title="Email Creator Shahanur Mollah"
              >
                <Mail className="w-3.5 h-3.5 text-[#ccff00]" />
                <span className="font-mono text-[11px]">shahanurmollah1@gmail.com</span>
              </a>

              <span className="text-slate-700">|</span>

              <a
                href="https://www.instagram.com/shahanurmollah__?exln=MTl6cTdzMmwyYWx3dA=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-slate-300 hover:text-[#ff5500] transition-colors font-mono text-[11px]"
              >
                <Instagram className="w-3.5 h-3.5 text-[#ff5500]" />
                <span>@shahanurmollah__</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-70" />
              </a>
            </div>
          </div>

          {/* Playground Portals */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#fbfaf6] mb-3 flex items-center gap-1.5">
              <span className="text-[#ccff00]">/</span> Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/#games')}
                  className="hover:text-[#ccff00] transition-colors cursor-pointer text-left"
                >
                  All 10 Games
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/daily')}
                  className="hover:text-[#ccff00] transition-colors cursor-pointer text-left"
                >
                  Daily Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/quick-play')}
                  className="hover:text-[#ccff00] transition-colors cursor-pointer text-left"
                >
                  Quick Play Arena
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/brain-lab')}
                  className="hover:text-[#ccff00] transition-colors cursor-pointer text-left"
                >
                  The Brain Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/discover')}
                  className="hover:text-[#ccff00] transition-colors cursor-pointer text-left"
                >
                  Discovery Vault
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/collection')}
                  className="hover:text-[#ccff00] transition-colors cursor-pointer text-left"
                >
                  My Collection &amp; Badges
                </button>
              </li>
            </ul>
          </div>

          {/* Strategy Guides Hub */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#fbfaf6] mb-3 flex items-center gap-1.5">
              <span className="text-[#ff5500]">/</span> Strategy Guides
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/guides')}
                  className="text-[#ccff00] hover:underline font-semibold cursor-pointer text-left"
                >
                  Guides Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/guides/block-puzzle-polyomino-strategy')}
                  className="hover:text-[#ccff00] transition-colors cursor-pointer text-left"
                >
                  Block Puzzle Strategy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/guides/quantum-2048-corner-lock')}
                  className="hover:text-[#ccff00] transition-colors cursor-pointer text-left"
                >
                  Quantum 2048 Corner Lock
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/guides/cyber-sweeper-deduction-patterns')}
                  className="hover:text-[#ccff00] transition-colors cursor-pointer text-left"
                >
                  Cyber Sweeper Tactics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/guides/cyber-snake-speed-management')}
                  className="hover:text-[#ccff00] transition-colors cursor-pointer text-left"
                >
                  Cyber Snake Velocity
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/guides/neon-breakout-deflection-physics')}
                  className="hover:text-[#ccff00] transition-colors cursor-pointer text-left"
                >
                  Neon Breakout Physics
                </button>
              </li>
            </ul>
          </div>

          {/* Transparency & Legal */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#fbfaf6] mb-3 flex items-center gap-1.5">
              <span className="text-slate-500">/</span> Trust &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-[#ccff00] transition-colors cursor-pointer"
                >
                  About Shahanur Mollah
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-[#ccff00] transition-colors cursor-pointer"
                >
                  Contact &amp; Feedback
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/help')}
                  className="hover:text-[#ccff00] transition-colors cursor-pointer"
                >
                  Help &amp; FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/privacy-policy')}
                  className="hover:text-[#ccff00] transition-colors cursor-pointer"
                >
                  Privacy Policy (AdSense)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/terms-of-use')}
                  className="hover:text-[#ccff00] transition-colors cursor-pointer"
                >
                  Terms of Use
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/sitemap')}
                  className="hover:text-[#ccff00] transition-colors cursor-pointer"
                >
                  HTML Sitemap
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1b243b] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center sm:text-left">
          <div className="font-mono text-[11px]">
            &copy; {new Date().getFullYear()} QIVLIX. All rights reserved. Created and operated by <strong className="text-slate-300">Shahanur Mollah</strong>.
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 sm:gap-3 text-[11px] font-mono text-slate-400">
            <span className="text-[#ccff00]">PLAY BEYOND LIMITS.</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>Zero Install</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>Local Browser Storage</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

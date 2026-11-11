import React, { useState } from 'react';
import { Gamepad2, Code2, Cpu, Sparkles, Shield, Heart, Instagram, ExternalLink, Mail, BookOpen, Award, CheckCircle, ShieldCheck } from 'lucide-react';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { QivlixSymbol, QivlixArcadeBadge } from '../components/BrandLogo';

const DEFAULT_AVATAR = '/assets/aistudio/20250326_100301_1__c7089703.jpg';
const INSTAGRAM_URL = 'https://www.instagram.com/shahanurmollah__?exln=MTl6cTdzMmwyYWx3dA==';

const CreatorProfileCard: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-[#0a0e1a] border border-[#1b243b] flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left relative overflow-hidden shadow-2xl arcade-corner-ticks">
      {/* Avatar Container */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-[#060810] border border-[#1b243b] p-1 shrink-0">
        <div className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center bg-[#0c1222]">
          {!imageError ? (
            <img
              src={DEFAULT_AVATAR}
              alt="Shahanur Mollah - Creator and Architect of Qivlix"
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="text-2xl font-black font-display text-[#ccff00]">
              SM
            </div>
          )}
        </div>
      </div>

      {/* Creator Info */}
      <div className="space-y-2 flex-1">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span className="text-[11px] font-mono text-[#ccff00] uppercase tracking-wider font-bold">
            FOUNDER &amp; GAME ARCHITECT
          </span>
          <span className="text-slate-700 font-mono">·</span>
          <span className="text-[11px] text-[#ff6600] font-mono font-bold">
            PLAY BEYOND LIMITS.
          </span>
        </div>

        <h3 className="font-display font-black text-2xl sm:text-3xl text-[#fbfaf6]">
          Shahanur Mollah
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg">
          Software engineer, game architect, and creator of Qivlix. Dedicated to crafting lightning-fast, accessible browser games with zero bloat, native 60FPS physics, and clean, transparent ad practices.
        </p>

        {/* Action Buttons: Email and Instagram Profile */}
        <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
          <a
            href="mailto:shahanurmollah1@gmail.com"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#060810] hover:bg-[#12192e] border border-[#1b243b] hover:border-[#ccff00] text-slate-200 hover:text-[#ccff00] text-xs font-mono font-semibold transition-all cursor-pointer group"
            title="Send email to Shahanur Mollah"
          >
            <Mail className="w-3.5 h-3.5 text-[#ccff00]" />
            <span>shahanurmollah1@gmail.com</span>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#060810] hover:bg-[#12192e] border border-[#1b243b] hover:border-[#ff5500] text-slate-200 hover:text-[#ff5500] text-xs font-mono font-semibold transition-all cursor-pointer group"
          >
            <Instagram className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>@shahanurmollah__</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
      </div>
    </div>
  );
};

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Page Header */}
      <div className="text-center sm:text-left border-b border-[#1b243b] pb-8">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono uppercase tracking-wider text-[#ccff00] mb-2 font-bold">
          <QivlixArcadeBadge label="QIVLIX // BRAND ARCHITECTURE" />
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-[#fbfaf6] tracking-tight">
          About Qivlix
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-2 leading-relaxed">
          The story behind Qivlix, founded and engineered by <strong className="text-white">Shahanur Mollah</strong> with a single driving mission: <em className="text-[#ccff00] not-italic font-bold">PLAY BEYOND LIMITS.</em>
        </p>
      </div>

      {/* Main Narrative Card */}
      <div className="space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <section className="p-6 sm:p-8 rounded-xl bg-[#0a0e1a] border border-[#1b243b] space-y-4">
          <h2 className="font-display font-bold text-xl text-[#fbfaf6] flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#ccff00]" />
            The Origin &amp; Vision of Qivlix
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Modern internet gaming had become overwhelmed by 2-gigabyte mobile downloads, invasive interstitial ad walls that hijack screens every 30 seconds, forced registration barriers, and battery-draining bloatware.
          </p>
          <p className="text-slate-300 leading-relaxed">
            <strong className="text-[#fbfaf6]">Shahanur Mollah</strong> engineered Qivlix as a clean antidote to bloated app stores. Designed from the ground up to run natively within modern web browsers, Qivlix restores the purest joy of browser gaming: click once, play instantly, master game mechanics, and compete against your own high scores.
          </p>
        </section>

        {/* Creator Profile Box */}
        <CreatorProfileCard />

        {/* Core Architectural Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-[#0a0e1a] border border-[#1b243b] space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[#060810] border border-[#ccff00]/40 flex items-center justify-center text-[#ccff00] mb-3">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-[#fbfaf6]">
              Zero Download Architecture
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every single game runs on lightweight, high-performance HTML5, React, and Canvas code. Assets load in milliseconds without taxing your device&apos;s memory or battery.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#0a0e1a] border border-[#1b243b] space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[#060810] border border-[#ff5500]/40 flex items-center justify-center text-[#ff5500] mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-[#fbfaf6]">
              Unobtrusive Gaming Standards
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We respect our players. Advertisements are placed cleanly outside active game viewports. You will never encounter unexpected pop-ups or deceptive click triggers that interrupt your gameplay.
            </p>
          </div>
        </div>

        {/* Editorial Standards & Game Design Philosophy */}
        <section className="p-6 sm:p-8 rounded-xl bg-[#0a0e1a] border border-[#1b243b] space-y-4">
          <h2 className="font-display font-bold text-xl text-[#fbfaf6] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#ccff00]" />
            Editorial Rigor &amp; Strategy Guides
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Qivlix is more than just game engines—it is an educational strategy hub. We believe players have more fun when they understand the mathematical algorithms, spatial logic, and cognitive reflexes underlying each title.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-lg bg-[#060810] border border-[#1b243b] text-xs">
              <div className="flex items-center gap-2 text-[#ccff00] font-mono font-bold mb-1">
                <CheckCircle className="w-4 h-4" /> ORIGINAL STRATEGY DISPATCHES
              </div>
              <p className="text-slate-400">
                Detailed editorial guides explaining polyomino geometry, corner locks, and deduction patterns.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[#060810] border border-[#1b243b] text-xs">
              <div className="flex items-center gap-2 text-[#ff6600] font-mono font-bold mb-1">
                <CheckCircle className="w-4 h-4" /> CLIENT-SIDE PRIVACY
              </div>
              <p className="text-slate-400">
                High scores and settings persist in your browser local storage without invasive tracking cookies.
              </p>
            </div>
          </div>
        </section>

        <AdPlaceholder format="banner" slotId="about-mid-banner" />

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onNavigate('/#games')}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#ccff00] hover:bg-[#d9ff33] text-[#060810] font-black font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            Explore All 10 Games
          </button>
          <button
            onClick={() => onNavigate('/guides')}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#0a0e1a] border border-[#1b243b] hover:border-[#ccff00] text-slate-200 hover:text-[#ccff00] font-bold font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            Read Strategy Guides
          </button>
        </div>
      </div>
    </div>
  );
};

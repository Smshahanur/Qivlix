import React, { useState } from 'react';
import { Gamepad2, Code2, Cpu, Sparkles, Shield, Heart, Instagram, ExternalLink, Mail } from 'lucide-react';
import { AdPlaceholder } from '../components/AdPlaceholder';

const DEFAULT_AVATAR = '/assets/aistudio/20250326_100301_1__c7089703.jpg';
const INSTAGRAM_URL = 'https://www.instagram.com/shahanurmollah__?exln=MTl6cTdzMmwyYWx3dA==';

const CreatorProfileCard: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900/90 to-cyan-950/40 border border-slate-800 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left relative overflow-hidden shadow-2xl">
      {/* Avatar Container with Glow */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-tr from-cyan-400 via-purple-500 to-fuchsia-500 p-0.5 shrink-0 shadow-xl shadow-purple-500/25">
        <div className="w-full h-full rounded-[14px] bg-[#0b101e] overflow-hidden flex items-center justify-center relative">
          {!imageError ? (
            <img
              src={DEFAULT_AVATAR}
              alt="Shahanur Mollah - Creator of Qivlix"
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="text-3xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              SM
            </div>
          )}
        </div>
      </div>

      {/* Creator Info */}
      <div className="space-y-2 flex-1">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
            Lead Creator &amp; Architect
          </span>
          <span className="text-[10px] text-slate-600 font-mono">·</span>
          <span className="text-[11px] text-purple-400 font-mono font-medium">
            Founder of Qivlix
          </span>
        </div>

        <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-100">
          Shahanur Mollah
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg">
          Passionate software engineer and game designer specializing in high-speed web interfaces, procedural algorithms, and modern interactive web graphics.
        </p>

        {/* Action Buttons: Email and Instagram Profile */}
        <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
          <a
            href="mailto:shahanurmollah1@gmail.com"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:text-cyan-200 text-xs font-semibold shadow-md shadow-cyan-500/10 transition-all cursor-pointer group"
            title="Send email to Shahanur Mollah"
          >
            <Mail className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>shahanurmollah1@gmail.com</span>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 hover:from-pink-500/30 hover:to-indigo-500/30 border border-pink-500/40 text-pink-300 hover:text-pink-200 text-xs font-semibold shadow-md shadow-pink-500/10 transition-all cursor-pointer group"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" />
            <span>@shahanurmollah__</span>
            <ExternalLink className="w-3 h-3 text-pink-400/80" />
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
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
          Behind The Platform
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-slate-100 mt-2 mb-4 tracking-tight">
          About Qivlix
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          The story behind Qivlix, founded and engineered by <span className="text-slate-200 font-semibold">Shahanur Mollah</span> with a single driving mission: <em className="text-cyan-300 not-italic">Play Beyond Limits.</em>
        </p>
      </div>

      {/* Main Narrative Card */}
      <div className="space-y-8 text-sm sm:text-base text-slate-300 leading-relaxed">
        <section className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h2 className="font-display font-bold text-xl text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            The Origin of Qivlix
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Modern internet gaming had become overwhelmed by 2-gigabyte mobile downloads, invasive ad walls that block gameplay every 30 seconds, forced registration screens, and stuttering web emulators.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            <strong className="text-slate-200">Shahanur Mollah</strong> created Qivlix as a clean antidote to bloated app stores. Designed from the ground up to run natively within modern web browsers, Qivlix brings back the purest joy of gaming: click once, play instantly, master the mechanics, and compete against your own high scores.
          </p>
        </section>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-slate-100">
              Zero Download Architecture
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every single game runs on lightweight, high-performance HTML5, React, and Canvas code. Assets load in milliseconds without taxing your device's memory or battery.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-slate-100">
              Unobtrusive Gaming Standards
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We respect our players. Advertisements are placed cleanly outside active game viewports. You will never encounter unexpected pop-ups that interrupt your reaction test or block placement.
            </p>
          </div>
        </div>

        {/* Creator Profile Box with Image Upload & Display */}
        <CreatorProfileCard />

        <AdPlaceholder format="banner" slotId="about-mid-banner" />

        {/* CTA to play */}
        <div className="text-center pt-6">
          <button
            onClick={() => onNavigate('/#games')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 hover:from-cyan-300 hover:to-cyan-200 transition-all cursor-pointer"
          >
            Explore All 10 Games Now
          </button>
        </div>
      </div>
    </div>
  );
};

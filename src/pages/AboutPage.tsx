import React from 'react';
import { Gamepad2, Code2, Cpu, Sparkles, Shield, Heart } from 'lucide-react';
import { AdPlaceholder } from '../components/AdPlaceholder';

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

        {/* Creator Profile Box */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-950/30 via-slate-900/80 to-cyan-950/30 border border-slate-800 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-400 to-purple-500 p-0.5 shrink-0 shadow-lg shadow-purple-500/20">
            <div className="w-full h-full rounded-[14px] bg-[#0b101e] flex items-center justify-center text-2xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              SM
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">Lead Creator &amp; Architect</span>
            <h3 className="font-display font-bold text-xl text-slate-100">
              Shahanur Mollah
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
              Passionate software engineer and game designer specializing in high-speed web interfaces, procedural algorithms, and modern interactive web graphics.
            </p>
          </div>
        </div>

        <AdPlaceholder format="banner" slotId="about-mid-banner" />

        {/* CTA to play */}
        <div className="text-center pt-6">
          <button
            onClick={() => onNavigate('/#games')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 hover:from-cyan-300 hover:to-cyan-200 transition-all cursor-pointer"
          >
            Explore All 6 Games Now
          </button>
        </div>
      </div>
    </div>
  );
};

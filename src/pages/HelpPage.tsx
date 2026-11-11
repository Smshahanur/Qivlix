import React from 'react';
import { HelpCircle, ArrowLeft, ArrowRight, Terminal } from 'lucide-react';

interface HelpPageProps {
  onNavigate: (path: string) => void;
}

export const HelpPage: React.FC<HelpPageProps> = ({ onNavigate }) => {
  const faqs = [
    {
      q: 'What is Qivlix — The Daily Discovery Playground?',
      a: 'Qivlix is an independent browser entertainment arcade created by Shahanur Mollah under the "Midnight Arcade" design system. It brings together instant zero-download web games, deterministic daily mysteries, and deep strategy guides in a high-contrast midnight environment.',
    },
    {
      q: 'How does the Daily Portal work?',
      a: 'Every calendar day (based on your local timezone), Qivlix generates three specific daily challenge activities and one featured mystery. The challenges rotate deterministically using a date seed, meaning every player worldwide gets the exact same tasks on that date. Complete all three to increase your streak and earn bonus progression XP.',
    },
    {
      q: 'Are my scores and badges saved without creating an account?',
      a: 'Yes! Your points, streaks, badges, and high scores are saved locally in your browser’s localStorage. There are no passwords, no forced popups, and no telemetry trackers. Keep in mind that clearing your browser site data will reset your local profile.',
    },
    {
      q: 'How does the "Surprise Me" button work?',
      a: 'The Surprise Me button triggers a random selector that picks a game, daily challenge, or scientific discovery from our catalog, automatically avoiding immediate consecutive repeats.',
    },
    {
      q: 'Do I need to download or install plugins?',
      a: 'Zero downloads, zero installs. Every game is custom built using modern HTML5 Canvas, Web Audio API, and high-performance React TypeScript running at smooth 60 FPS across desktop, tablet, and mobile browsers.',
    },
    {
      q: 'Where can I read in-depth game mechanics and scoring strategies?',
      a: 'Check our Strategy Guides section (/guides). Each game features an editorial breakdown of control inputs, scoring multipliers, hazard recognition, and high-score survival walkthroughs written by our team.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-[#0a0e1a] border border-[#1b243b] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ccff00]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex items-start gap-4">
          <button
            onClick={() => onNavigate('/')}
            className="p-2.5 rounded-lg bg-[#0f1527] border border-[#1b243b] hover:border-slate-500 text-slate-300 transition-colors shrink-0 cursor-pointer"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#ccff00] mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>ARCADE DIRECTORY</span>
              <span className="text-slate-600">/</span>
              <span>FAQ &amp; SUPPORT</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#fbfaf6] tracking-tight uppercase">
              Help &amp; Knowledge Base
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-xl">
              Everything you need to know about game mechanics, deterministic daily resets, browser storage, and scoring systems.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Grid */}
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="p-6 rounded-xl bg-[#0a0e1a] border border-[#1b243b] hover:border-slate-600 transition-colors space-y-2.5"
          >
            <div className="flex items-start gap-3">
              <span className="font-mono text-xs text-[#ccff00] font-bold mt-0.5 shrink-0">
                0{i + 1}
              </span>
              <h3 className="text-base font-bold text-[#fbfaf6] leading-snug">
                {faq.q}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-7">
              {faq.a}
            </p>
          </div>
        ))}
      </div>

      {/* Contact Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0a0e1a] border border-[#1b243b] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div>
          <div className="font-mono text-xs text-[#ff5500] uppercase tracking-wider font-semibold">
            DIRECT OPERATOR FEEDBACK
          </div>
          <h4 className="text-lg font-bold text-[#fbfaf6] mt-1">Have a bug report or feature proposal?</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-md">
            Reach out directly to creator Shahanur Mollah via our contact terminal or email at shahanurmollah1@gmail.com.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/contact')}
          className="px-5 py-2.5 rounded-lg bg-[#ccff00] text-[#060810] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#d8ff33] flex items-center gap-2 transition-colors shrink-0 cursor-pointer"
        >
          <span>Open Terminal</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

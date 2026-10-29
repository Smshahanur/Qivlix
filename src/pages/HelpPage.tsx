import React from 'react';
import { HelpCircle, ArrowLeft, ShieldCheck, Zap, Brain, Calendar, Dices, Award } from 'lucide-react';

interface HelpPageProps {
  onNavigate: (path: string) => void;
}

export const HelpPage: React.FC<HelpPageProps> = ({ onNavigate }) => {
  const faqs = [
    {
      q: 'What is Qivlix — The Daily Discovery Playground?',
      a: 'Qivlix is an all-ages browser entertainment platform featuring instant mini-games, daily deterministic mysteries, cognitive logic workouts in the Brain Lab, and scientific curiosities in the Discovery Vault.',
    },
    {
      q: 'How does the Daily Portal work?',
      a: 'Every calendar day (based on your local timezone), Qivlix generates three specific daily challenge activities and one featured mystery. The challenges rotate deterministically, meaning every player worldwide gets the exact same tasks on that date. Complete all three daily activities to increase your streak and earn bonus progression XP.',
    },
    {
      q: 'Are my scores and badges saved?',
      a: 'Yes. Your points, streaks, badges, and high scores are saved automatically in your browser’s local storage. There is no account registration required. Keep in mind that clearing your browser site data or switching devices will start a fresh local profile.',
    },
    {
      q: 'How does the "Surprise Me" button work?',
      a: 'The Surprise Me button triggers a quantum roll that picks a random game, activity, or discovery from our catalog. It intelligently avoids repeating the same activity consecutively.',
    },
    {
      q: 'Do I need to download or install anything?',
      a: 'No! All activities run natively in modern web browsers (Chrome, Safari, Firefox, Edge) on phones, tablets, and laptops at 60fps with zero download wait time.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
        <button
          onClick={() => onNavigate('/')}
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold uppercase tracking-wider">
            <span>Support &amp; Guidance</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Help &amp; Frequently Asked Questions</h1>
        </div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" /> {faq.q}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">{faq.a}</p>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-slate-200">Need direct feedback or have an inquiry?</div>
          <div className="text-xs text-slate-400 mt-0.5">Reach out via our contact page anytime.</div>
        </div>
        <button
          onClick={() => onNavigate('/contact')}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
        >
          Contact &amp; Feedback
        </button>
      </div>
    </div>
  );
};

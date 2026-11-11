import React, { useState } from 'react';
import { getStoredProfile } from '../utils/progression';
import { Brain, Play, Trophy, Sparkles, Lightbulb, Search, Key, Clock } from 'lucide-react';
import { AdPlaceholder } from '../components/AdPlaceholder';

interface BrainLabPageProps {
  onNavigate: (path: string) => void;
}

interface BrainItem {
  id: string;
  title: string;
  domain: 'Working Memory' | 'Deductive Logic' | 'Lateral Thinking' | 'Math & Spatial';
  description: string;
  targetPath: string;
  icon: string;
  duration: string;
  badge?: string;
}

const BRAIN_ACTIVITIES: BrainItem[] = [
  {
    id: 'memory-grid',
    title: 'Memory Grid',
    domain: 'Working Memory',
    description: 'Retain and replicate increasingly complex sequences of illuminated acoustic cyber nodes.',
    targetPath: '/activity/memory-grid',
    icon: 'Brain',
    duration: '2 min',
    badge: 'Cognitive'
  },
  {
    id: 'mystery-picture',
    title: 'Mystery Picture',
    domain: 'Deductive Logic',
    description: 'Analyze progressive classified clues to deduce enigmatic historical and scientific artifacts.',
    targetPath: '/activity/mystery-picture',
    icon: 'Search',
    duration: '2 min',
    badge: 'Deduction'
  },
  {
    id: 'daily-riddle',
    title: 'Daily Enigma Riddle',
    domain: 'Lateral Thinking',
    description: 'Untangle thought-provoking riddles that challenge semantic and philosophical logic.',
    targetPath: '/activity/daily-riddle',
    icon: 'Key',
    duration: '2 min',
    badge: 'Lateral'
  },
  {
    id: 'block-puzzle',
    title: 'Block Puzzle Matrix',
    domain: 'Math & Spatial',
    description: 'Fit randomized geometric polyomino blocks into the 10x10 matrix to trigger massive line combos.',
    targetPath: '/game/block-puzzle',
    icon: 'Brain',
    duration: '3 min',
    badge: 'Spatial'
  },
  {
    id: 'number-merge',
    title: 'Quantum 2048 Merge',
    domain: 'Math & Spatial',
    description: 'Slide numbered tiles to combine identical values and synthesize the legendary 2048 quantum core.',
    targetPath: '/game/number-merge',
    icon: 'Brain',
    duration: '5 min',
    badge: 'Strategy'
  },
  {
    id: 'cyber-sweeper',
    title: 'Cyber Sweeper',
    domain: 'Deductive Logic',
    description: 'Locate and disarm hidden data mines across tactical grids using strict numerical radar clues.',
    targetPath: '/game/cyber-sweeper',
    icon: 'Search',
    duration: '4 min',
    badge: 'Pure Logic'
  },
];

export const BrainLabPage: React.FC<BrainLabPageProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<string>('All');
  const profile = getStoredProfile();

  const domains = ['All', 'Working Memory', 'Deductive Logic', 'Lateral Thinking', 'Math & Spatial'];

  const filtered = BRAIN_ACTIVITIES.filter((item) => filter === 'All' || item.domain === filter);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1b243b]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#ccff00] font-bold mb-1 uppercase tracking-wider">
            <Brain className="w-4 h-4 text-[#ccff00]" />
            <span>Cognitive Fitness &amp; Neural Calibration</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-slate-400">Play Beyond Limits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#fbfaf6] tracking-tight">The Brain Lab</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Targeted mental workouts designed to sharpen spatial reasoning, working memory, deductive classification, and lateral problem-solving.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-[#0a0e1a] border border-[#1b243b] rounded-xl self-start md:self-auto overflow-x-auto no-scrollbar max-w-full">
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setFilter(dom)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase whitespace-nowrap transition-all cursor-pointer ${
                filter === dom
                  ? 'bg-[#ccff00] text-[#060810] shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {dom === 'Working Memory' ? 'Memory' : dom === 'Deductive Logic' ? 'Logic' : dom === 'Lateral Thinking' ? 'Lateral' : dom === 'Math & Spatial' ? 'Spatial' : 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Brain Lab Activities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => {
          const pb = profile.personalBests[item.id];
          return (
            <div
              key={item.id}
              className="p-5 sm:p-6 rounded-xl bg-[#0a0e1a] border border-[#1b243b] hover:border-[#ccff00] transition-colors flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
                  <span className="text-[#a3e635] font-semibold">{item.domain}</span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3 text-slate-500" /> {item.duration}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#fbfaf6] group-hover:text-[#ccff00] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#1b243b] flex items-center justify-between">
                <div>
                  {pb !== undefined ? (
                    <div className="text-[11px] font-mono text-[#ff6600] font-bold flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5 text-[#ff5500]" /> Record: {pb}
                    </div>
                  ) : (
                    <span className="text-[11px] text-slate-500 font-mono">Uncalibrated</span>
                  )}
                </div>

                <button
                  onClick={() => onNavigate(item.targetPath)}
                  className="px-4 py-2 rounded-lg bg-[#ccff00] hover:bg-[#d9ff33] text-[#060810] font-mono font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Engage
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <AdPlaceholder format="banner" slotId="brain-lab-bottom-banner" />
    </div>
  );
};

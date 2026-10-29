import React, { useState } from 'react';
import { getStoredProfile } from '../utils/progression';
import { Brain, Play, Trophy, Sparkles, Lightbulb, Search, Key, ShieldAlert } from 'lucide-react';

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
  isNew?: boolean;
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
    isNew: true,
  },
  {
    id: 'mystery-picture',
    title: 'Mystery Picture',
    domain: 'Deductive Logic',
    description: 'Analyze progressive classified clues to deduce enigmatic historical and scientific artifacts.',
    targetPath: '/activity/mystery-picture',
    icon: 'Search',
    duration: '2 min',
    isNew: true,
  },
  {
    id: 'daily-riddle',
    title: 'Daily Enigma Riddle',
    domain: 'Lateral Thinking',
    description: 'Untangle thought-provoking riddles that challenge semantic and philosophical logic.',
    targetPath: '/activity/daily-riddle',
    icon: 'Key',
    duration: '2 min',
    isNew: true,
  },
  {
    id: 'cyber-wordle',
    title: 'Cyber Wordle',
    domain: 'Deductive Logic',
    description: 'Deduce hidden 5-letter cryptographic passcodes using color-coded positional feedback.',
    targetPath: '/game/cyber-wordle',
    icon: 'Lightbulb',
    duration: '3 min',
  },
  {
    id: 'cyber-sweeper',
    title: 'Cyber Sweeper',
    domain: 'Deductive Logic',
    description: 'Use numerical boundary adjacency logic to safely flag volatile data minefields.',
    targetPath: '/game/cyber-sweeper',
    icon: 'ShieldAlert',
    duration: '3 min',
  },
  {
    id: 'number-merge',
    title: 'Quantum 2048 Merge',
    domain: 'Math & Spatial',
    description: 'Plan spatial grid movements ahead to combine binary powers of 2 into the 2048 singularity.',
    targetPath: '/game/number-merge',
    icon: 'Brain',
    duration: '4 min',
  },
  {
    id: 'memory-match',
    title: 'Cyber Memory Matrix',
    domain: 'Working Memory',
    description: 'Uncover paired cryptographic glyphs against the clock to train fast visual recall.',
    targetPath: '/game/memory-match',
    icon: 'Sparkles',
    duration: '2 min',
  },
];

export const BrainLabPage: React.FC<BrainLabPageProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<string>('All');
  const profile = getStoredProfile();

  const filtered = BRAIN_ACTIVITIES.filter((item) => filter === 'All' || item.domain === filter);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium mb-1">
            <Brain className="w-4 h-4" />
            <span>Cognitive Fitness</span>
            <span aria-hidden="true">·</span>
            <span>Logic & Memory Workouts</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">The Brain Lab</h1>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Sharpen working memory, pattern recognition, spatial deduction, and lateral thinking with structured cognitive puzzles.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl self-start md:self-auto overflow-x-auto no-scrollbar max-w-full">
          {['All', 'Working Memory', 'Deductive Logic', 'Lateral Thinking', 'Math & Spatial'].map((dom) => (
            <button
              key={dom}
              onClick={() => setFilter(dom)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                filter === dom
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Brain Lab modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filtered.map((item) => {
          const pb = profile.personalBests[item.id];
          return (
            <div
              key={item.id}
              className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-lg hover:shadow-purple-500/10"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-medium">{item.domain}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.duration}</span>
                  </div>
                  {item.isNew && (
                    <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">New</span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  {pb !== undefined ? (
                    <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" /> Best: {pb}
                    </div>
                  ) : (
                    <span className="text-[11px] text-slate-500">Unplayed</span>
                  )}
                </div>

                <button
                  onClick={() => onNavigate(item.targetPath)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Begin Lab
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

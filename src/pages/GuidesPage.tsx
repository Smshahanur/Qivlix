import React, { useState } from 'react';
import { BookOpen, Clock, User, ArrowRight, Sparkles, Filter, Gamepad2 } from 'lucide-react';
import { GUIDES } from '../data/guides';
import { AdPlaceholder } from '../components/AdPlaceholder';

interface GuidesPageProps {
  onNavigate: (path: string) => void;
}

export const GuidesPage: React.FC<GuidesPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Puzzle', 'Arcade', 'Strategy'];

  const filteredGuides = GUIDES.filter(
    (g) => selectedCategory === 'All' || g.category === selectedCategory
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Qivlix Strategy &amp; Editorial Hub</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-slate-100 tracking-tight">
          Game Guides &amp; Master Strategies
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Comprehensive tactical walkthroughs, algorithm breakdowns, and spatial techniques written by founder <strong className="text-slate-100">Shahanur Mollah</strong>. Master mechanics, avoid common traps, and climb high score leaderboards.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Guide Banner (Top Article) */}
      {filteredGuides.length > 0 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-slate-900/90 to-cyan-950/40 border border-purple-500/30 relative overflow-hidden shadow-2xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-purple-400 mb-2">
            <span className="px-2 py-0.5 rounded bg-purple-500/20 border border-purple-500/40 text-purple-300 font-semibold">
              Featured Masterclass
            </span>
            <span>·</span>
            <span>{filteredGuides[0].category}</span>
            <span>·</span>
            <span className="flex items-center gap-1 text-slate-300">
              <Clock className="w-3 h-3" /> {filteredGuides[0].readTime}
            </span>
          </div>

          <h2 className="font-display font-black text-xl sm:text-3xl text-slate-100 max-w-2xl mt-1 mb-3">
            {filteredGuides[0].title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed mb-6">
            {filteredGuides[0].summary}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
            <div className="text-xs text-slate-400 flex items-center gap-2 font-mono">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>By {filteredGuides[0].author} ({filteredGuides[0].authorRole})</span>
            </div>

            <button
              onClick={() => onNavigate(`/guides/${filteredGuides[0].slug}`)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-300 hover:to-purple-400 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Read Full Guide</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Grid of Strategy Guides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGuides.map((guide) => (
          <article
            key={guide.id}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="text-cyan-400 font-mono font-semibold">{guide.category}</span>
                <span className="flex items-center gap-1 text-[11px] font-mono">
                  <Clock className="w-3 h-3 text-slate-500" /> {guide.readTime}
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-slate-100 group-hover:text-cyan-300 transition-colors leading-snug">
                {guide.title}
              </h3>

              <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                {guide.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {guide.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-slate-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Author: {guide.author}
              </span>

              <button
                onClick={() => onNavigate(`/guides/${guide.slug}`)}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                <span>Read Strategy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>

      <AdPlaceholder format="banner" slotId="guides-hub-banner" />
    </div>
  );
};

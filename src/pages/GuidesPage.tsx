import React, { useState } from 'react';
import { BookOpen, Clock, User, ArrowRight, Filter, Gamepad2 } from 'lucide-react';
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
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Editorial Header */}
      <div className="border-b border-[#1b243b] pb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ccff00] mb-2 font-bold">
          <BookOpen className="w-4 h-4" />
          <span>Qivlix Strategy Dispatch // Editorial Masterclasses</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-[#fbfaf6] tracking-tight">
          Game Guides &amp; Tactical Walkthroughs
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Comprehensive tactical breakdowns, algorithm analyses, and spatial techniques authored by founder <strong className="text-white">Shahanur Mollah</strong>. Master mechanics, avoid lockouts, and climb high-score leaderboards.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5 text-[#ccff00]" /> CATEGORY:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#ccff00] text-[#060810] shadow-sm'
                  : 'bg-[#0a0e1a] border border-[#1b243b] text-slate-300 hover:text-white hover:border-[#2a375a]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Masterclass Banner (First Guide) */}
      {filteredGuides.length > 0 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0a0e1a] border border-[#ccff00]/60 relative overflow-hidden shadow-2xl arcade-corner-ticks">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono mb-2">
            <span className="px-2 py-0.5 rounded bg-[#ccff00] text-[#060810] font-black uppercase tracking-wider text-[10px]">
              FEATURED MASTERCLASS
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-[#a3e635] font-semibold">{filteredGuides[0].category}</span>
            <span className="text-slate-600">·</span>
            <span className="flex items-center gap-1 text-slate-300">
              <Clock className="w-3 h-3 text-slate-500" /> {filteredGuides[0].readTime}
            </span>
          </div>

          <h2 className="font-display font-black text-xl sm:text-3xl text-[#fbfaf6] max-w-2xl mt-1 mb-3">
            {filteredGuides[0].title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed mb-6">
            {filteredGuides[0].summary}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#1b243b]">
            <div className="text-xs text-slate-400 flex items-center gap-2 font-mono">
              <User className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>By {filteredGuides[0].author} ({filteredGuides[0].authorRole})</span>
            </div>

            <button
              onClick={() => onNavigate(`/guides/${filteredGuides[0].slug}`)}
              className="px-5 py-2.5 rounded-lg bg-[#ccff00] hover:bg-[#d9ff33] text-[#060810] font-black font-mono text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Read Full Masterclass</span>
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
            className="p-6 rounded-xl bg-[#0a0e1a] border border-[#1b243b] hover:border-[#ccff00] transition-colors flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span className="text-[#a3e635] font-semibold">{guide.category}</span>
                <span className="flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3 text-slate-500" /> {guide.readTime}
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-[#fbfaf6] group-hover:text-[#ccff00] transition-colors leading-snug">
                {guide.title}
              </h3>

              <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                {guide.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {guide.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#060810] border border-[#1b243b] text-slate-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#1b243b] flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] text-slate-400">
                Author: {guide.author}
              </span>

              <button
                onClick={() => onNavigate(`/guides/${guide.slug}`)}
                className="font-bold text-[#ccff00] hover:underline flex items-center gap-1 cursor-pointer font-mono"
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

import React, { useState, useEffect } from 'react';
import { DISCOVERIES_VAULT } from '../data/playgroundContent';
import { getStoredProfile, toggleLearnedDiscovery, toggleFavorite, onProfileChange } from '../utils/progression';
import { DiscoveryCardData, UserProfile } from '../types/playground';
import { Compass, Sparkles, BookOpen, Heart, CheckCircle2, ChevronDown, ChevronUp, Eye, Orbit, Waves, TreePine, Clock, Zap, Globe, Grid, Radio, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DiscoverPageProps {
  onNavigate?: (path: string) => void;
}

export const DiscoverPage: React.FC<DiscoverPageProps> = () => {
  const [topicFilter, setTopicFilter] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile>(getStoredProfile);

  // Optical illusion interactive state
  const [showIllusionBridge, setShowIllusionBridge] = useState<boolean>(false);

  useEffect(() => {
    return onProfileChange((updated) => setProfile(updated));
  }, []);

  const topics = ['All', 'Cosmos & Physics', 'Bioluminescence & Nature', 'Anomalies & Paradoxes', 'Optical Illusions & Mind'];

  const filtered = DISCOVERIES_VAULT.filter((card) => topicFilter === 'All' || card.topic === topicFilter);

  const handleToggleLearned = (id: string) => {
    const isNowLearned = toggleLearnedDiscovery(id);
    if (isNowLearned) {
      confetti({ particleCount: 20, spread: 45, origin: { y: 0.7 } });
    }
  };

  const handleToggleFav = (id: string) => {
    toggleFavorite(id);
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Clock': return <Clock className="w-5 h-5 text-amber-400" />;
      case 'Waves': return <Waves className="w-5 h-5 text-teal-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Eye': return <Eye className="w-5 h-5 text-rose-400" />;
      case 'TreePine': return <TreePine className="w-5 h-5 text-emerald-400" />;
      case 'Orbit': return <Orbit className="w-5 h-5 text-cyan-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-blue-400" />;
      case 'Grid': return <Grid className="w-5 h-5 text-cyan-400" />;
      case 'Radio': return <Radio className="w-5 h-5 text-orange-400" />;
      default: return <HelpCircle className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-purple-400 font-medium mb-1">
            <Compass className="w-4 h-4" />
            <span>Curiosity Archive</span>
            <span aria-hidden="true">·</span>
            <span>{profile.learnedDiscoveries.length} of {DISCOVERIES_VAULT.length} Explored</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">The Discovery Vault</h1>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Mind-bending physics anomalies, deep-ocean mysteries, optical illusions, and scientific enigmas. Read deep dives and collect them into your records.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto no-scrollbar max-w-full self-start md:self-auto">
          {topics.map((top) => (
            <button
              key={top}
              onClick={() => setTopicFilter(top)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                topicFilter === top
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {top}
            </button>
          ))}
        </div>
      </div>

      {/* Discovery Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => {
          const isExpanded = expandedId === item.id;
          const isLearned = profile.learnedDiscoveries.includes(item.id);
          const isFav = profile.favorites.includes(item.id);

          return (
            <div
              key={item.id}
              className={`p-6 rounded-3xl border transition-all duration-200 flex flex-col justify-between ${
                isLearned
                  ? 'bg-slate-900/90 border-slate-800 shadow-md'
                  : 'bg-slate-900/95 border-purple-500/20 hover:border-purple-500/40'
              }`}
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400 font-medium">{item.topic}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.readTime}</span>
                  </div>

                  <button
                    onClick={() => handleToggleFav(item.id)}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                    aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>

                <div className="flex items-start gap-3.5 mb-2">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                    {renderIcon(item.iconName)}
                  </div>
                  <h3 className="text-xl font-bold text-white leading-snug">{item.title}</h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">{item.summary}</p>

                {/* Deep Dive Expanded Section */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-800 space-y-3 animate-fadeIn text-xs sm:text-sm">
                    <div>
                      <div className="font-semibold text-cyan-400 mb-1 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" /> Scientific Deep Dive
                      </div>
                      <p className="text-slate-300 leading-relaxed">{item.deepDive}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400">
                      <strong className="text-slate-200">Fascinating Fact:</strong> {item.curiousFact}
                    </div>

                    {/* Interactive Widget for Optical Illusions */}
                    {item.interactiveType === 'illusion-checker' && (
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                        <div className="text-xs font-semibold text-amber-400">
                          Interactive Proof: Toggle Bridge
                        </div>
                        <div className="relative w-full max-w-xs mx-auto aspect-video rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center bg-slate-900">
                          <div className="flex gap-4 items-center">
                            <div className="w-16 h-16 bg-[#787878] rounded flex items-center justify-center font-bold text-white shadow-lg">
                              A
                            </div>
                            {showIllusionBridge && (
                              <div className="h-6 w-8 bg-[#787878] animate-fadeIn" />
                            )}
                            <div className="w-16 h-16 bg-[#787878] rounded flex items-center justify-center font-bold text-white shadow-lg">
                              B
                            </div>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-400 text-center">
                          Both squares A and B are identical (#787878).
                        </p>
                        <button
                          onClick={() => setShowIllusionBridge(!showIllusionBridge)}
                          className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors cursor-pointer"
                        >
                          {showIllusionBridge ? 'Hide Connecting Bridge' : 'Connect Squares with Bridge'}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {isExpanded ? (
                    <>
                      Collapse <ChevronUp className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      Read Deep Dive <ChevronDown className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleToggleLearned(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isLearned
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white'
                  }`}
                >
                  {isLearned ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Explored
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Mark Learned (+15 XP)
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

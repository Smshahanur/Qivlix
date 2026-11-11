import React, { useState, useEffect } from 'react';
import { DISCOVERIES_VAULT } from '../data/playgroundContent';
import { getStoredProfile, toggleLearnedDiscovery, toggleFavorite, onProfileChange } from '../utils/progression';
import { DiscoveryCardData, UserProfile } from '../types/playground';
import { Compass, Sparkles, BookOpen, Heart, CheckCircle2, ChevronDown, ChevronUp, Eye, Orbit, Waves, TreePine, Clock, Zap, Globe, Grid, Radio } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AdPlaceholder } from '../components/AdPlaceholder';

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
      try {
        confetti({ particleCount: 20, spread: 45, origin: { y: 0.7 }, colors: ['#ccff00', '#ff5500', '#fbfaf6'] });
      } catch {}
    }
  };

  const handleToggleFav = (id: string) => {
    toggleFavorite(id);
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Clock': return <Clock className="w-5 h-5 text-[#ccff00]" />;
      case 'Waves': return <Waves className="w-5 h-5 text-[#a3e635]" />;
      case 'Eye': return <Eye className="w-5 h-5 text-[#ff5500]" />;
      case 'TreePine': return <TreePine className="w-5 h-5 text-[#a3e635]" />;
      case 'Orbit': return <Orbit className="w-5 h-5 text-[#ccff00]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[#ff6600]" />;
      case 'Globe': return <Globe className="w-5 h-5 text-[#ccff00]" />;
      case 'Grid': return <Grid className="w-5 h-5 text-[#ccff00]" />;
      case 'Radio': return <Radio className="w-5 h-5 text-[#ff5500]" />;
      default: return <Compass className="w-5 h-5 text-[#ccff00]" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1b243b]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#ccff00] font-bold mb-1 uppercase tracking-wider">
            <Compass className="w-4 h-4 text-[#ccff00]" />
            <span>Scientific Curiosities &amp; Optical Wonders</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-slate-400">Play Beyond Limits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#fbfaf6] tracking-tight">The Discovery Vault</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Bite-sized scientific phenomena, physics oddities, audio illusions, and perceptual paradoxes. Expand any card to uncover facts, try interactive demos, and earn XP.
          </p>
        </div>

        {/* Progress summary */}
        <div className="flex items-center gap-3 self-start md:self-auto font-mono text-xs">
          <div className="px-3 py-2 rounded-xl bg-[#0a0e1a] border border-[#1b243b] text-slate-300">
            <span className="text-[#ccff00] font-bold">{profile.learnedDiscoveries.length}</span> / {DISCOVERIES_VAULT.length} UNLOCKED
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => setTopicFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase whitespace-nowrap transition-all cursor-pointer ${
              topicFilter === t
                ? 'bg-[#ccff00] text-[#060810] shadow-sm'
                : 'bg-[#0a0e1a] border border-[#1b243b] text-slate-400 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Cards Masonry / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((item: DiscoveryCardData) => {
          const isExpanded = expandedId === item.id;
          const isLearned = profile.learnedDiscoveries.includes(item.id);
          const isFav = profile.favorites.includes(item.id);

          return (
            <div
              key={item.id}
              className={`p-5 sm:p-6 rounded-xl border transition-all ${
                isLearned
                  ? 'bg-[#0a1410] border-[#a3e635]/40'
                  : 'bg-[#0a0e1a] border-[#1b243b] hover:border-[#2a375a]'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#060810] border border-[#1b243b] shrink-0">
                    {renderIcon(item.iconName)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono mb-1">
                      <span className="text-[#a3e635] font-semibold">{item.topic}</span>
                      <span aria-hidden="true" className="text-slate-700">·</span>
                      <span className="text-slate-400">{item.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#fbfaf6]">{item.title}</h3>
                  </div>
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => handleToggleFav(item.id)}
                  className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                    isFav
                      ? 'bg-[#ff5500]/10 border-[#ff5500]/50 text-[#ff5500]'
                      : 'bg-[#060810] border-[#1b243b] text-slate-500 hover:text-white'
                  }`}
                  aria-label="Toggle favorite"
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Summary */}
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                {item.summary}
              </p>

              {/* Expanded details */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-[#1b243b] space-y-4 animate-fadeIn">
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {item.deepDive}
                  </p>

                  {/* Interactive Optical Illusion if type specified */}
                  {item.interactiveType && item.interactiveType !== 'none' && (
                    <div className="p-4 rounded-lg bg-[#060810] border border-[#1b243b] space-y-3 font-mono text-xs">
                      <div className="flex items-center gap-2 text-[#ccff00] font-bold">
                        <Zap className="w-4 h-4" />
                        <span>INTERACTIVE EXPERIMENT</span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Toggle the luminance guide below to verify how your neural cortex compensates for shadow geometry.
                      </p>

                      <div className="flex flex-col items-center justify-center p-6 bg-[#0a0e1a] rounded-lg relative">
                        <div className="w-48 h-32 relative flex items-center justify-center border border-[#1b243b] rounded bg-slate-950 p-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#787878] rounded flex items-center justify-center text-[10px] text-white font-mono font-bold shadow-inner">
                              A
                            </div>
                            <div className={`w-12 h-12 rounded flex items-center justify-center text-[10px] text-white font-mono font-bold ${showIllusionBridge ? 'bg-[#787878] border border-[#ccff00]' : 'bg-[#787878] shadow-[0_0_15px_rgba(0,0,0,0.8)]'}`}>
                              B
                            </div>
                          </div>

                          {showIllusionBridge && (
                            <div className="absolute inset-x-8 h-3 bg-[#787878] border-y border-[#ccff00] pointer-events-none flex items-center justify-center text-[8px] text-[#ccff00] font-mono">
                              #787878 CONNECTING BRIDGE
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => setShowIllusionBridge(!showIllusionBridge)}
                          className="mt-3 px-3 py-1.5 rounded-lg bg-[#060810] border border-[#1b243b] text-xs font-mono text-[#ccff00] hover:border-[#ccff00] cursor-pointer"
                        >
                          {showIllusionBridge ? 'Remove Connecting Bridge' : 'Show Connecting Bridge (Prove Match)'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Curious Fact Callout */}
                  <div className="p-3 rounded-lg bg-[#060810] border border-[#ccff00]/30 text-xs">
                    <span className="font-mono text-[#ccff00] font-bold block mb-1">CURIOUS FACT:</span>
                    <span className="text-slate-200">{item.curiousFact}</span>
                  </div>
                </div>
              )}

              {/* Action Bar */}
              <div className="mt-4 pt-4 border-t border-[#1b243b] flex items-center justify-between text-xs font-mono">
                <button
                  onClick={() => handleToggleLearned(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    isLearned
                      ? 'bg-[#a3e635]/10 border border-[#a3e635]/40 text-[#a3e635] font-bold'
                      : 'bg-[#060810] border border-[#1b243b] text-slate-300 hover:text-white'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isLearned ? 'LEARNED (+15 XP)' : 'MARK AS LEARNED'}</span>
                </button>

                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="text-[#ccff00] hover:underline flex items-center gap-1 font-bold cursor-pointer"
                >
                  <span>{isExpanded ? 'COLLAPSE' : 'EXPLORE'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <AdPlaceholder format="banner" slotId="discover-bottom-banner" />
    </div>
  );
};

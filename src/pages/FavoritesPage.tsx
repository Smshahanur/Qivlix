import React, { useState, useEffect } from 'react';
import { getStoredProfile, toggleFavorite, onProfileChange } from '../utils/progression';
import { DISCOVERIES_VAULT, RIDDLES } from '../data/playgroundContent';
import { GAMES } from '../data/games';
import { UserProfile } from '../types/playground';
import { Heart, Play, BookOpen, ArrowRight, Bookmark } from 'lucide-react';

interface FavoritesPageProps {
  onNavigate: (path: string) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({ onNavigate }) => {
  const [profile, setProfile] = useState<UserProfile>(getStoredProfile);

  useEffect(() => {
    return onProfileChange((updated) => setProfile(updated));
  }, []);

  const favoriteIds = profile.favorites;

  const favGames = GAMES.filter((g) => favoriteIds.includes(g.id) || favoriteIds.includes(g.slug));
  const favDiscoveries = DISCOVERIES_VAULT.filter((d) => favoriteIds.includes(d.id));
  const favRiddles = RIDDLES.filter((r) => favoriteIds.includes(r.id));

  const totalFavs = favGames.length + favDiscoveries.length + favRiddles.length;

  const handleRemove = (id: string) => {
    toggleFavorite(id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-[#0a0e1a] border border-[#1b243b] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ccff00]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#ff5500] mb-2">
              <Bookmark className="w-3.5 h-3.5" />
              <span>SAVED ARCHIVE</span>
              <span className="text-slate-600">/</span>
              <span className="text-[#ccff00]">{totalFavs} ITEMS CURATED</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#fbfaf6] tracking-tight uppercase">
              Favorites &amp; Bookmarks
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-xl">
              Direct access to your bookmarked arcade cartridges, daily brain teasers, and scientific curiosities.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('/#games')}
              className="px-4 py-2.5 rounded-lg bg-[#ccff00] text-[#060810] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#d8ff33] transition-colors cursor-pointer"
            >
              Explore Catalog
            </button>
          </div>
        </div>
      </div>

      {totalFavs === 0 ? (
        <div className="p-12 sm:p-16 rounded-2xl bg-[#0a0e1a] border border-[#1b243b] text-center space-y-5 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-xl bg-[#ff5500]/10 border border-[#ff5500]/30 text-[#ff5500] flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#fbfaf6] uppercase tracking-wide">No Bookmarks Saved Yet</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tap the bookmark or heart icon on any game cartridge or discovery dispatch to pin it here for quick access.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('/#games')}
              className="px-4 py-2.5 rounded-lg bg-[#ccff00] text-[#060810] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#d8ff33] transition-colors cursor-pointer"
            >
              Browse Games
            </button>
            <button
              onClick={() => onNavigate('/discover')}
              className="px-4 py-2.5 rounded-lg bg-[#0f1527] border border-[#1b243b] text-[#fbfaf6] font-mono text-xs font-semibold hover:border-slate-500 transition-colors cursor-pointer"
            >
              Discovery Vault
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Favorite Games */}
          {favGames.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#1b243b] pb-3">
                <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-[#ccff00] flex items-center gap-2">
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Favorited Cartridges ({favGames.length})</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {favGames.map((game) => (
                  <div
                    key={game.id}
                    className="group relative p-5 rounded-xl bg-[#0a0e1a] border border-[#1b243b] hover:border-[#ccff00] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[10px] text-[#ccff00] uppercase tracking-wider">
                          [{game.category}]
                        </span>
                        <button
                          onClick={() => handleRemove(game.id)}
                          className="text-[#ff5500] hover:text-[#ff7733] p-1 transition-colors cursor-pointer"
                          aria-label="Remove bookmark"
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                      <h3 className="text-lg font-bold text-[#fbfaf6] group-hover:text-[#ccff00] transition-colors">
                        {game.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                        {game.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#1b243b] flex items-center justify-between">
                      <span className="font-mono text-[11px] text-slate-500 uppercase">{game.estimatedPlayTime} RUN</span>
                      <button
                        onClick={() => onNavigate(`/game/${game.slug}`)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#ccff00] text-[#060810] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#d8ff33] flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        Launch <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Favorite Discoveries */}
          {favDiscoveries.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#1b243b] pb-3">
                <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-[#ff5500] flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Bookmarked Science &amp; Trivia ({favDiscoveries.length})</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {favDiscoveries.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-xl bg-[#0a0e1a] border border-[#1b243b] hover:border-[#ff5500] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[10px] text-[#ff5500] uppercase tracking-wider">
                          [{item.topic}]
                        </span>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-[#ff5500] hover:text-[#ff7733] p-1 transition-colors cursor-pointer"
                          aria-label="Remove bookmark"
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                      <h3 className="text-lg font-bold text-[#fbfaf6]">{item.title}</h3>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">{item.summary}</p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#1b243b] flex justify-end">
                      <button
                        onClick={() => onNavigate('/discover')}
                        className="px-3.5 py-1.5 rounded-lg bg-[#0f1527] border border-[#1b243b] text-[#fbfaf6] hover:border-slate-400 font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        Read Vault <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Favorite Riddles */}
          {favRiddles.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#1b243b] pb-3">
                <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-[#ccff00] flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Saved Daily Enigmas ({favRiddles.length})</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {favRiddles.map((riddle) => (
                  <div
                    key={riddle.id}
                    className="p-5 rounded-xl bg-[#0a0e1a] border border-[#1b243b] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[10px] text-[#ccff00] uppercase tracking-wider">
                          [ENIGMA #{riddle.id}]
                        </span>
                        <button
                          onClick={() => handleRemove(riddle.id)}
                          className="text-[#ff5500] hover:text-[#ff7733] p-1 cursor-pointer"
                          aria-label="Remove"
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                      <p className="text-sm text-[#fbfaf6] font-medium leading-relaxed italic">
                        &ldquo;{riddle.riddle}&rdquo;
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#1b243b] flex justify-end">
                      <button
                        onClick={() => onNavigate('/daily')}
                        className="px-3.5 py-1.5 rounded-lg bg-[#ccff00] text-[#060810] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#d8ff33] flex items-center gap-1 cursor-pointer"
                      >
                        Daily Terminal <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { getStoredProfile, toggleFavorite, onProfileChange } from '../utils/progression';
import { DISCOVERIES_VAULT, RIDDLES } from '../data/playgroundContent';
import { GAMES } from '../data/games';
import { UserProfile } from '../types/playground';
import { Heart, Play, BookOpen, ArrowRight, Sparkles } from 'lucide-react';

interface FavoritesPageProps {
  onNavigate: (path: string) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({ onNavigate }) => {
  const [profile, setProfile] = useState<UserProfile>(getStoredProfile);

  useEffect(() => {
    return onProfileChange((updated) => setProfile(updated));
  }, []);

  const favoriteIds = profile.favorites;

  // Resolve favorited items across games, discoveries, and riddles
  const favGames = GAMES.filter((g) => favoriteIds.includes(g.id) || favoriteIds.includes(g.slug));
  const favDiscoveries = DISCOVERIES_VAULT.filter((d) => favoriteIds.includes(d.id));
  const favRiddles = RIDDLES.filter((r) => favoriteIds.includes(r.id));

  const totalFavs = favGames.length + favDiscoveries.length + favRiddles.length;

  const handleRemove = (id: string) => {
    toggleFavorite(id);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-rose-400 font-medium mb-1">
            <Heart className="w-4 h-4 fill-current" />
            <span>Personal Bookmarks</span>
            <span aria-hidden="true">·</span>
            <span>{totalFavs} Saved Items</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Favorites & Curated</h1>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Quick access to your preferred mini-games, thought-provoking riddles, and scientific curiosities.
          </p>
        </div>
      </div>

      {totalFavs === 0 ? (
        <div className="p-12 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white">No Favorites Saved Yet</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Tap the heart icon on any game, discovery card, or daily riddle to bookmark it here for immediate access.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('/quick-play')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Browse Games
            </button>
            <button
              onClick={() => onNavigate('/discover')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Explore Discoveries
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Favorite Games */}
          {favGames.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Play className="w-4 h-4 text-cyan-400 fill-current" /> Favorited Mini-Games ({favGames.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favGames.map((game) => (
                  <div
                    key={game.id}
                    className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-cyan-400 font-medium">{game.category}</span>
                        <button
                          onClick={() => handleRemove(game.id)}
                          className="text-rose-400 hover:text-rose-300 p-1"
                          aria-label="Remove"
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                      <h3 className="text-lg font-bold text-white">{game.title}</h3>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-2">{game.shortDescription}</p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-800 flex justify-end">
                      <button
                        onClick={() => onNavigate(`/game/${game.slug}`)}
                        className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        Launch <ArrowRight className="w-3.5 h-3.5" />
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
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-400" /> Bookmarked Discoveries ({favDiscoveries.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favDiscoveries.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-purple-400 font-medium">{item.topic}</span>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-rose-400 hover:text-rose-300 p-1"
                          aria-label="Remove"
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                      <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{item.summary}</p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-800 flex justify-end">
                      <button
                        onClick={() => onNavigate('/discover')}
                        className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        Read Vault <ArrowRight className="w-3.5 h-3.5" />
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

import { UserProfile, AchievementBadge } from '../types/playground';
import { ALL_BADGES } from '../data/playgroundContent';

const STORAGE_KEY = 'qivlix_profile_v1';
const PROFILE_UPDATED_EVENT = 'qivlix_profile_updated';

const DEFAULT_PROFILE: UserProfile = {
  version: 1,
  points: 0,
  streak: 0,
  lastActiveDate: '',
  dailyCompletions: {},
  personalBests: {},
  favorites: [],
  unlockedBadges: [],
  selectedTitle: 'novice-seeker',
  learnedDiscoveries: [],
  recentActivities: [],
};

// Safe JSON loader with schema fallback
export function getStoredProfile(): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && parsed.version === 1) {
      return {
        ...DEFAULT_PROFILE,
        ...parsed,
        dailyCompletions: parsed.dailyCompletions || {},
        personalBests: parsed.personalBests || {},
        favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
        unlockedBadges: Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges : [],
        learnedDiscoveries: Array.isArray(parsed.learnedDiscoveries) ? parsed.learnedDiscoveries : [],
        recentActivities: Array.isArray(parsed.recentActivities) ? parsed.recentActivities : [],
      };
    }
    return DEFAULT_PROFILE;
  } catch (e) {
    console.warn('Failed to parse Qivlix profile from localStorage:', e);
    return DEFAULT_PROFILE;
  }
}

// Save profile and broadcast event
export function saveProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new CustomEvent(PROFILE_UPDATED_EVENT, { detail: profile }));
  } catch (e) {
    console.error('Failed to save Qivlix profile to localStorage:', e);
  }
}

// Calculate streak based on local date
export function computeStreak(lastDate: string, currentStreak: number, todayStr: string): number {
  if (!lastDate) return 1;
  if (lastDate === todayStr) return currentStreak || 1;

  const last = new Date(lastDate);
  const today = new Date(todayStr);
  const diffTime = today.getTime() - last.getTime();
  const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

  if (diffDays === 1) {
    return (currentStreak || 0) + 1;
  } else if (diffDays > 1) {
    return 1; // streak reset
  }
  return currentStreak || 1;
}

// Award points, check badges, and record activity
export function recordActivityCompletion(params: {
  activityId: string;
  activityTitle: string;
  type: 'game' | 'activity' | 'discovery' | 'riddle';
  targetPath: string;
  pointsEarned: number;
  score?: number;
  isDailyPortal?: boolean;
  dateStr?: string;
  isMystery?: boolean;
}): { newBadges: AchievementBadge[]; updatedProfile: UserProfile } {
  const profile = getStoredProfile();
  const todayStr = params.dateStr || new Date().toISOString().slice(0, 10);

  // Update streak
  const newStreak = computeStreak(profile.lastActiveDate, profile.streak, todayStr);
  profile.streak = newStreak;
  profile.lastActiveDate = todayStr;

  // Add points
  profile.points = (profile.points || 0) + params.pointsEarned;

  // Record personal best if score provided
  if (params.score !== undefined) {
    const currentBest = profile.personalBests[params.activityId];
    // For reaction test/rush, lower is better. For others, higher is better
    const isReaction = params.activityId.includes('reaction');
    if (currentBest === undefined) {
      profile.personalBests[params.activityId] = params.score;
    } else {
      if (isReaction) {
        if (params.score < currentBest) {
          profile.personalBests[params.activityId] = params.score;
        }
      } else {
        if (params.score > currentBest) {
          profile.personalBests[params.activityId] = params.score;
        }
      }
    }
  }

  // Update daily completion record if part of daily portal
  if (params.isDailyPortal) {
    const currentDay = profile.dailyCompletions[todayStr] || {
      completedActivityIds: [],
      mysteryCompleted: false,
      allCompleted: false,
    };

    if (params.isMystery) {
      currentDay.mysteryCompleted = true;
    }

    if (!currentDay.completedActivityIds.includes(params.activityId)) {
      currentDay.completedActivityIds.push(params.activityId);
    }

    // Check if 3 activities completed
    if (currentDay.completedActivityIds.length >= 3) {
      currentDay.allCompleted = true;
    }

    profile.dailyCompletions[todayStr] = currentDay;
  }

  // Record recent activity (limit to 10)
  const existingIdx = profile.recentActivities.findIndex((a) => a.id === params.activityId);
  if (existingIdx !== -1) {
    profile.recentActivities.splice(existingIdx, 1);
  }
  profile.recentActivities.unshift({
    id: params.activityId,
    title: params.activityTitle,
    timestamp: Date.now(),
    score: params.score,
    type: params.type,
    path: params.targetPath,
  });
  if (profile.recentActivities.length > 10) {
    profile.recentActivities.pop();
  }

  // Check achievements & unlock badges
  const newlyUnlocked: AchievementBadge[] = [];

  for (const badge of ALL_BADGES) {
    if (profile.unlockedBadges.includes(badge.id)) continue;

    let shouldUnlock = false;

    switch (badge.id) {
      case 'first-spark':
        shouldUnlock = true;
        break;
      case 'daily-triad':
        shouldUnlock = !!profile.dailyCompletions[todayStr]?.allCompleted;
        break;
      case 'streak-3':
        shouldUnlock = profile.streak >= 3;
        break;
      case 'streak-7':
        shouldUnlock = profile.streak >= 7;
        break;
      case 'reflex-lightning':
        const reflexBest = profile.personalBests['reaction-rush'];
        shouldUnlock = reflexBest !== undefined && reflexBest > 0 && reflexBest < 230;
        break;
      case 'memory-overclock':
        const memoryBest = profile.personalBests['memory-grid'];
        shouldUnlock = memoryBest !== undefined && memoryBest >= 6;
        break;
      case 'eagle-eye':
        const oddBest = profile.personalBests['odd-one-out'];
        shouldUnlock = oddBest !== undefined && oddBest >= 5;
        break;
      case 'detective-prime':
        shouldUnlock = params.activityId === 'mystery-picture' && (params.score || 0) >= 75;
        break;
      case 'riddle-sage':
        const solvedRiddlesCount = Object.keys(profile.personalBests).filter((k) => k.startsWith('riddle-')).length;
        shouldUnlock = solvedRiddlesCount >= 3;
        break;
      case 'curious-polymath':
        shouldUnlock = profile.learnedDiscoveries.length >= 6;
        break;
      case 'collector-hoard':
        shouldUnlock = profile.favorites.length >= 5;
        break;
      case 'grand-archon':
        shouldUnlock = profile.points >= 1000;
        break;
    }

    if (shouldUnlock) {
      profile.unlockedBadges.push(badge.id);
      profile.points += badge.xpReward;
      newlyUnlocked.push(badge);
    }
  }

  saveProfile(profile);
  return { newBadges: newlyUnlocked, updatedProfile: profile };
}

// Mark discovery as learned
export function toggleLearnedDiscovery(discoveryId: string): boolean {
  const profile = getStoredProfile();
  const exists = profile.learnedDiscoveries.includes(discoveryId);
  if (exists) {
    profile.learnedDiscoveries = profile.learnedDiscoveries.filter((id) => id !== discoveryId);
  } else {
    profile.learnedDiscoveries.push(discoveryId);
    profile.points += 15; // bonus XP for learning
  }
  saveProfile(profile);
  return !exists;
}

// Toggle favorite item
export function toggleFavorite(itemId: string): boolean {
  const profile = getStoredProfile();
  const exists = profile.favorites.includes(itemId);
  if (exists) {
    profile.favorites = profile.favorites.filter((id) => id !== itemId);
  } else {
    profile.favorites.push(itemId);
  }
  saveProfile(profile);
  return !exists;
}

// Check if item is favorited
export function isItemFavorite(itemId: string): boolean {
  const profile = getStoredProfile();
  return profile.favorites.includes(itemId);
}

// Reset progress completely with fallback
export function resetStoredProgress(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(PROFILE_UPDATED_EVENT, { detail: DEFAULT_PROFILE }));
  } catch (e) {
    console.error('Failed to reset progress:', e);
  }
}

// Hook-like event listener helper
export function onProfileChange(callback: (profile: UserProfile) => void): () => void {
  const handler = (e: Event) => {
    const custom = e as CustomEvent<UserProfile>;
    callback(custom.detail || getStoredProfile());
  };
  window.addEventListener(PROFILE_UPDATED_EVENT, handler);
  return () => window.removeEventListener(PROFILE_UPDATED_EVENT, handler);
}

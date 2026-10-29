import { DailyChallengeData, DailyActivityItem } from '../types/playground';
import { RIDDLES, MYSTERY_PICTURES } from '../data/playgroundContent';

// Deterministic 32-bit integer hash from string
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Weekly themes list
const WEEKLY_THEMES = [
  {
    title: 'Cosmic Horizons Week',
    description: 'Explore the boundaries of astrophysics, deep-space probes, and celestial anomalies.',
    badgeIcon: 'Orbit',
  },
  {
    title: 'Cybernetic Matrix Week',
    description: 'Sharpen your neural synapses with high-frequency speed, logic gates, and pattern recognition.',
    badgeIcon: 'Cpu',
  },
  {
    title: 'Deep Ocean Mysteries Week',
    description: 'Uncover bioluminescent wonders and acoustic anomalies from the midnight bathypelagic abyss.',
    badgeIcon: 'Waves',
  },
  {
    title: 'Enigmas & Cryptography Week',
    description: 'Decipher paradoxical ciphers, ancient mechanisms, and lost mathematical manuscripts.',
    badgeIcon: 'Key',
  },
  {
    title: 'Neuro-Cognitive Mastery Week',
    description: 'Supercharge your working memory, reaction speed, and cognitive flexibility.',
    badgeIcon: 'Brain',
  },
];

// Activity pool for daily rotation
const ACTIVITY_POOL_1: DailyActivityItem[] = [
  {
    id: 'reaction-rush',
    type: 'activity',
    title: 'Reaction Rush',
    subtitle: 'Test millisecond reflex speed',
    category: 'Reflex Speed',
    duration: '1 min',
    pointsReward: 50,
    iconName: 'Zap',
    color: 'amber',
    targetPath: '/activity/reaction-rush',
  },
  {
    id: 'odd-one-out',
    type: 'activity',
    title: 'Odd One Out',
    subtitle: 'Spot subtle anomalies & patterns',
    category: 'Visual Logic',
    duration: '2 min',
    pointsReward: 60,
    iconName: 'Eye',
    color: 'purple',
    targetPath: '/activity/odd-one-out',
  },
  {
    id: 'snake',
    type: 'game',
    title: 'Cyber Snake',
    subtitle: 'Score 10+ points in neon arena',
    category: 'Arcade Classic',
    duration: '3 min',
    pointsReward: 50,
    iconName: 'Gamepad2',
    color: 'emerald',
    targetPath: '/game/snake',
  },
  {
    id: 'block-puzzle',
    type: 'game',
    title: 'Neon Block Puzzle',
    subtitle: 'Clear lines on the 10x10 cyber grid',
    category: 'Spatial Puzzle',
    duration: '3 min',
    pointsReward: 55,
    iconName: 'Grid',
    color: 'cyan',
    targetPath: '/game/block-puzzle',
  },
];

const ACTIVITY_POOL_2: DailyActivityItem[] = [
  {
    id: 'memory-grid',
    type: 'activity',
    title: 'Memory Grid',
    subtitle: 'Memorize & repeat lighted node sequences',
    category: 'Working Memory',
    duration: '2 min',
    pointsReward: 65,
    iconName: 'Brain',
    color: 'cyan',
    targetPath: '/activity/memory-grid',
  },
  {
    id: 'memory-match',
    type: 'game',
    title: 'Cyber Memory Matrix',
    subtitle: 'Match neon icon cards under 60s',
    category: 'Visual Recall',
    duration: '2 min',
    pointsReward: 55,
    iconName: 'Sparkles',
    color: 'purple',
    targetPath: '/game/memory-match',
  },
  {
    id: 'number-merge',
    type: 'game',
    title: 'Quantum 2048 Merge',
    subtitle: 'Synthesize high-energy 512+ tiles',
    category: 'Math Strategy',
    duration: '3 min',
    pointsReward: 60,
    iconName: 'Layers',
    color: 'amber',
    targetPath: '/game/number-merge',
  },
  {
    id: 'cyber-sweeper',
    type: 'game',
    title: 'Cyber Sweeper',
    subtitle: 'Defuse data mines without triggering glitch',
    category: 'Deductive Logic',
    duration: '3 min',
    pointsReward: 50,
    iconName: 'ShieldAlert',
    color: 'emerald',
    targetPath: '/game/cyber-sweeper',
  },
];

const ACTIVITY_POOL_3: DailyActivityItem[] = [
  {
    id: 'mystery-picture',
    type: 'activity',
    title: 'Mystery Picture',
    subtitle: 'Investigate progressive clues & deduce',
    category: 'Investigation',
    duration: '2 min',
    pointsReward: 75,
    iconName: 'Search',
    color: 'purple',
    targetPath: '/activity/mystery-picture',
  },
  {
    id: 'daily-riddle',
    type: 'riddle',
    title: 'Daily Enigma Riddle',
    subtitle: 'Solve today\'s philosophical word puzzle',
    category: 'Lateral Thinking',
    duration: '2 min',
    pointsReward: 50,
    iconName: 'HelpCircle',
    color: 'amber',
    targetPath: '/activity/daily-riddle',
  },
  {
    id: 'cyber-wordle',
    type: 'game',
    title: 'Cyber Wordle',
    subtitle: 'Crack the 5-letter access passcode',
    category: 'Vocabulary Crypt',
    duration: '3 min',
    pointsReward: 60,
    iconName: 'Terminal',
    color: 'cyan',
    targetPath: '/game/cyber-wordle',
  },
];

// Returns ISO week number
function getWeekNumber(d: Date): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

// Format local date string
export function getTodayDateStr(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatFriendlyDate(dateStr: string): string {
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }
  } catch {}
  return dateStr;
}

// Generate deterministic challenge for any date
export function getDailyChallenge(dateStr?: string): DailyChallengeData {
  const targetDateStr = dateStr || getTodayDateStr();
  const hash = hashString(targetDateStr);

  // Date object for weekly theme
  const [y, m, d] = targetDateStr.split('-').map(Number);
  const dateObj = new Date(y, (m || 1) - 1, d || 1);
  const weekNum = getWeekNumber(dateObj);
  const weeklyTheme = WEEKLY_THEMES[weekNum % WEEKLY_THEMES.length];

  // Pick activities deterministically
  const act1 = ACTIVITY_POOL_1[hash % ACTIVITY_POOL_1.length];
  const act2 = ACTIVITY_POOL_2[(hash >> 2) % ACTIVITY_POOL_2.length];
  const act3 = ACTIVITY_POOL_3[(hash >> 4) % ACTIVITY_POOL_3.length];

  // Pick featured mystery: alternate between riddle and mystery picture by day
  const isPictureMystery = (hash % 2) === 0;
  const mysteryIdx = (hash >> 3);

  let featuredMystery = {
    id: 'daily-mystery-challenge',
    title: 'The Eye of the Deep Cosmos',
    tagline: 'Deduce today\'s classified celestial anomaly before time runs out',
    points: 75,
    activitySlug: 'mystery-picture',
  };

  if (isPictureMystery) {
    const pic = MYSTERY_PICTURES[mysteryIdx % MYSTERY_PICTURES.length];
    featuredMystery = {
      id: pic.id,
      title: pic.title,
      tagline: `Investigate progressive clues about ${pic.category}`,
      points: 80,
      activitySlug: 'mystery-picture',
    };
  } else {
    const rid = RIDDLES[mysteryIdx % RIDDLES.length];
    featuredMystery = {
      id: rid.id,
      title: rid.title,
      tagline: `Test your lateral logic: "${rid.category}" enigma`,
      points: 60,
      activitySlug: 'daily-riddle',
    };
  }

  return {
    dateStr: targetDateStr,
    formattedDate: formatFriendlyDate(targetDateStr),
    weeklyTheme,
    featuredMystery,
    activities: [act1, act2, act3],
  };
}

/**
 * Timezone Strategy:
 * Daily challenges and calendar dates are synchronized to the visitor's Local Device Timezone.
 * Each calendar date (YYYY-MM-DD) deterministically produces the exact same activities,
 * weekly theme, and mystery for all visits on that date. Rollover occurs naturally at 00:00 midnight.
 */
export const DAILY_TIMEZONE_STRATEGY = 'Visitor Local Device Timezone (Midnight 00:00 Rollover)';

export function getDailyRiddleIndex(dateStr?: string): number {
  const hash = hashString(dateStr || getTodayDateStr());
  return (hash >> 3) % RIDDLES.length;
}

export function getDailyMysteryPictureIndex(dateStr?: string): number {
  const hash = hashString(dateStr || getTodayDateStr());
  return (hash >> 3) % MYSTERY_PICTURES.length;
}


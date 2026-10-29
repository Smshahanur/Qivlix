export type NavSection = 'home' | 'daily' | 'quick-play' | 'brain-lab' | 'discover' | 'collection' | 'favorites';

export interface DailyActivityItem {
  id: string;
  type: 'activity' | 'game' | 'riddle' | 'discovery';
  title: string;
  subtitle: string;
  category: string;
  duration: string;
  pointsReward: number;
  iconName: string;
  color: 'cyan' | 'purple' | 'amber' | 'emerald' | 'orange';
  targetPath: string;
}

export interface DailyChallengeData {
  dateStr: string; // YYYY-MM-DD
  formattedDate: string;
  weeklyTheme: {
    title: string;
    description: string;
    badgeIcon: string;
  };
  featuredMystery: {
    id: string;
    title: string;
    tagline: string;
    points: number;
    activitySlug: string;
  };
  activities: DailyActivityItem[];
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  category: 'daily' | 'reflex' | 'brain' | 'explorer' | 'mastery';
  icon: string;
  xpReward: number;
  unlockedAt?: number;
}

export interface CosmicTitle {
  id: string;
  title: string;
  minPoints: number;
  color: string;
}

export interface UserProfile {
  version: number;
  points: number;
  streak: number;
  lastActiveDate: string;
  dailyCompletions: {
    [dateStr: string]: {
      completedActivityIds: string[];
      mysteryCompleted: boolean;
      allCompleted: boolean;
    };
  };
  personalBests: {
    [key: string]: number; // e.g. 'reaction-rush': 214 (ms), 'memory-grid': 8 (level)
  };
  favorites: string[];
  unlockedBadges: string[];
  selectedTitle: string;
  learnedDiscoveries: string[];
  recentActivities: {
    id: string;
    title: string;
    timestamp: number;
    score?: number;
    type: 'game' | 'activity' | 'discovery' | 'riddle';
    path: string;
  }[];
}

export interface RiddleData {
  id: string;
  title: string;
  riddle: string;
  hints: string[];
  answers: string[]; // accepted answers (lowercase)
  explanation: string;
  category: string;
  points: number;
}

export interface MysteryPictureData {
  id: string;
  title: string;
  category: string;
  clues: string[];
  hints: string[];
  choices: string[];
  correctAnswer: string;
  explanation: string;
  visualGraphic: string; // SVG icon or visual description
  funFact: string;
}

export interface OddOneOutSet {
  id: string;
  title: string;
  category: string;
  items: {
    label: string;
    subtext: string;
    isOdd: boolean;
  }[];
  explanation: string;
}

export interface DiscoveryCardData {
  id: string;
  title: string;
  topic: 'Cosmos & Physics' | 'Bioluminescence & Nature' | 'Anomalies & Paradoxes' | 'Optical Illusions & Mind';
  summary: string;
  deepDive: string;
  curiousFact: string;
  iconName: string;
  readTime: string;
  interactiveType?: 'illusion-checker' | 'illusion-contrast' | 'none';
}

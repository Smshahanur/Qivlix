export type GameCategory = 'All' | 'Puzzle' | 'Arcade' | 'Memory' | 'Strategy' | 'Reflex' | 'Word';

export interface GameControlInfo {
  device: 'Keyboard' | 'Touch / Mouse' | 'Keyboard / Button' | 'Any Device';
  keys: string;
  action: string;
}

export interface GameScoringRule {
  event: string;
  points: string;
  notes: string;
}

export interface GameFAQ {
  question: string;
  answer: string;
}

export interface GameInfo {
  id: string;
  slug: string;
  title: string;
  category: 'Puzzle' | 'Arcade' | 'Memory' | 'Strategy' | 'Reflex' | 'Word';
  shortDescription: string;
  description: string;
  tagline: string;
  objective: string;
  thumbnail: string;
  badge?: string;
  difficulty: 'Casual' | 'Intermediate' | 'Master';
  estimatedPlayTime: string;
  controls: GameControlInfo[];
  rules: string[];
  scoringSystem: GameScoringRule[];
  mechanics: string[];
  tips: string[];
  proStrategies: string[];
  faqs: GameFAQ[];
  guideSlug?: string;
  color: 'cyan' | 'purple' | 'emerald' | 'amber';
}


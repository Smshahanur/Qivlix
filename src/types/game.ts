export type GameCategory = 'All' | 'Puzzle' | 'Arcade' | 'Memory' | 'Strategy' | 'Reflex';

export interface GameControlInfo {
  device: 'Keyboard' | 'Touch / Mouse' | 'Keyboard / Button' | 'Any Device';
  keys: string;
  action: string;
}

export interface GameInfo {
  id: string;
  slug: string;
  title: string;
  category: 'Puzzle' | 'Arcade' | 'Memory' | 'Strategy' | 'Reflex';
  shortDescription: string;
  description: string;
  tagline: string;
  thumbnail: string;
  badge?: string;
  controls: GameControlInfo[];
  rules: string[];
  tips: string[];
  color: 'cyan' | 'purple' | 'emerald' | 'amber';
}

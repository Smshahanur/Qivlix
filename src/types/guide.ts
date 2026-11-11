export interface GuideSection {
  title: string;
  content: string[];
  tips?: string[];
}

export interface GuideArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  gameSlug: string;
  gameTitle: string;
  category: 'Puzzle' | 'Arcade' | 'Strategy' | 'Reflex';
  author: string;
  authorRole: string;
  readTime: string;
  publishedDate: string;
  summary: string;
  keyTakeaways: string[];
  sections: GuideSection[];
  tags: string[];
}

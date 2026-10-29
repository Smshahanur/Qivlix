import React from 'react';
import { ReactionRushActivity } from '../components/activities/ReactionRushActivity';
import { MemoryGridActivity } from '../components/activities/MemoryGridActivity';
import { OddOneOutActivity } from '../components/activities/OddOneOutActivity';
import { MysteryPictureActivity } from '../components/activities/MysteryPictureActivity';
import { DailyRiddleActivity } from '../components/activities/DailyRiddleActivity';

interface ActivityDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  isDaily?: boolean;
}

export const ActivityDetailPage: React.FC<ActivityDetailPageProps> = ({ slug, onNavigate, isDaily }) => {
  const handleBack = () => {
    onNavigate('/');
  };

  switch (slug) {
    case 'reaction-rush':
      return <ReactionRushActivity onBack={handleBack} isDaily={isDaily} />;
    case 'memory-grid':
      return <MemoryGridActivity onBack={handleBack} isDaily={isDaily} />;
    case 'odd-one-out':
      return <OddOneOutActivity onBack={handleBack} isDaily={isDaily} />;
    case 'mystery-picture':
      return <MysteryPictureActivity onBack={handleBack} isDaily={isDaily} />;
    case 'daily-riddle':
      return <DailyRiddleActivity onBack={handleBack} isDaily={isDaily} />;
    default:
      return (
        <div className="max-w-md mx-auto py-16 text-center space-y-4">
          <h2 className="text-xl font-bold text-white">Activity Not Found</h2>
          <p className="text-xs text-slate-400">The requested playground activity does not exist.</p>
          <button
            onClick={() => onNavigate('/')}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
          >
            Return to Playground
          </button>
        </div>
      );
  }
};

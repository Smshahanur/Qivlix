import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { SurpriseModal } from './components/SurpriseModal';
import { HomePage } from './pages/HomePage';
import { DailyPortalPage } from './pages/DailyPortalPage';
import { QuickPlayPage } from './pages/QuickPlayPage';
import { BrainLabPage } from './pages/BrainLabPage';
import { DiscoverPage } from './pages/DiscoverPage';
import { CollectionPage } from './pages/CollectionPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { HelpPage } from './pages/HelpPage';
import { ActivityDetailPage } from './pages/ActivityDetailPage';
import { GameDetailPage } from './pages/GameDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfUsePage } from './pages/TermsOfUsePage';
import { SitemapPage } from './pages/SitemapPage';
import { GAMES } from './data/games';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [surpriseOpen, setSurpriseOpen] = useState<boolean>(false);

  // Sync with browser URL history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    // Anchor link handling
    if (path.startsWith('/#')) {
      if (currentPath !== '/') {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
        setTimeout(() => {
          const anchor = path.split('#')[1];
          const el = document.getElementById(anchor);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const anchor = path.split('#')[1];
        const el = document.getElementById(anchor);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic Title Management
  useEffect(() => {
    if (currentPath === '/') {
      document.title = 'Qivlix — The Daily Discovery Playground';
    } else if (currentPath === '/daily') {
      document.title = 'Daily Portal — Qivlix Challenges';
    } else if (currentPath === '/quick-play') {
      document.title = 'Quick Play Arena — Instant Games on Qivlix';
    } else if (currentPath === '/brain-lab') {
      document.title = 'The Brain Lab — Cognitive Fitness & Puzzles | Qivlix';
    } else if (currentPath === '/discover') {
      document.title = 'Discovery Vault — Science Curiosities & Illusions | Qivlix';
    } else if (currentPath === '/collection') {
      document.title = 'My Collection & Badges — Qivlix Playground';
    } else if (currentPath === '/favorites') {
      document.title = 'Favorites — Qivlix Playground';
    } else if (currentPath === '/help') {
      document.title = 'Help & FAQ — Qivlix Support';
    } else if (currentPath.startsWith('/activity/')) {
      const slug = currentPath.replace('/activity/', '');
      const titles: { [key: string]: string } = {
        'reaction-rush': 'Reaction Rush',
        'memory-grid': 'Memory Grid',
        'odd-one-out': 'Odd One Out',
        'mystery-picture': 'Mystery Picture',
        'daily-riddle': 'Daily Riddle',
      };
      document.title = `${titles[slug] || 'Activity'} — Qivlix Playground`;
    } else if (currentPath.startsWith('/game/')) {
      const slug = currentPath.replace('/game/', '');
      const game = GAMES.find((g) => g.slug === slug);
      if (game) {
        document.title = `${game.title} — Play Free on Qivlix`;
      } else {
        document.title = 'Play Game — Qivlix';
      }
    } else if (currentPath === '/about') {
      document.title = 'About Qivlix — The Daily Discovery Playground';
    } else if (currentPath === '/contact') {
      document.title = 'Contact & Feedback — Qivlix';
    } else if (currentPath === '/privacy-policy') {
      document.title = 'Privacy Policy — Qivlix';
    } else if (currentPath === '/terms-of-use') {
      document.title = 'Terms of Use — Qivlix';
    } else if (currentPath === '/sitemap') {
      document.title = 'HTML Sitemap — Qivlix';
    }
  }, [currentPath]);

  // Route selector
  const renderCurrentPage = () => {
    if (currentPath.startsWith('/activity/')) {
      const slug = currentPath.replace('/activity/', '');
      return <ActivityDetailPage slug={slug} onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/game/')) {
      const slug = currentPath.replace('/game/', '');
      return <GameDetailPage slug={slug} onNavigate={navigate} />;
    }

    switch (currentPath) {
      case '/daily':
        return <DailyPortalPage onNavigate={navigate} />;
      case '/quick-play':
        return <QuickPlayPage onNavigate={navigate} />;
      case '/brain-lab':
        return <BrainLabPage onNavigate={navigate} />;
      case '/discover':
        return <DiscoverPage onNavigate={navigate} />;
      case '/collection':
        return <CollectionPage onNavigate={navigate} />;
      case '/favorites':
        return <FavoritesPage onNavigate={navigate} />;
      case '/help':
        return <HelpPage onNavigate={navigate} />;
      case '/about':
        return <AboutPage onNavigate={navigate} />;
      case '/contact':
        return <ContactPage />;
      case '/privacy-policy':
        return <PrivacyPolicyPage />;
      case '/terms-of-use':
        return <TermsOfUsePage />;
      case '/sitemap':
        return <SitemapPage onNavigate={navigate} />;
      case '/':
      default:
        return (
          <HomePage
            onSelectGame={(slug) => navigate(`/game/${slug}`)}
            onNavigate={navigate}
            onOpenSurprise={() => setSurpriseOpen(true)}
            onOpenSearch={() => setSearchOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full max-w-full min-w-0 overflow-x-hidden bg-[#070a12] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenSurprise={() => setSurpriseOpen(true)}
      />

      <main className="flex-1 w-full min-w-0 max-w-full overflow-x-hidden">
        {renderCurrentPage()}
      </main>

      <Footer onNavigate={navigate} />

      {/* Global Command/Search Palette */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={navigate}
      />

      {/* Quantum Dice Surprise Me Roulette */}
      <SurpriseModal
        isOpen={surpriseOpen}
        onClose={() => setSurpriseOpen(false)}
        onNavigate={navigate}
      />
    </div>
  );
}

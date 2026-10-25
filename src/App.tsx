import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
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

  // Sync with browser URL history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    // If anchor link on home
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
      document.title = 'Qivlix — Free Online Browser Games';
    } else if (currentPath.startsWith('/game/')) {
      const slug = currentPath.replace('/game/', '');
      const game = GAMES.find((g) => g.slug === slug);
      if (game) {
        document.title = `${game.title} — Play Free on Qivlix`;
      } else {
        document.title = 'Play Game — Qivlix';
      }
    } else if (currentPath === '/about') {
      document.title = 'About Qivlix by Shahanur Mollah — Free Browser Gaming';
    } else if (currentPath === '/contact') {
      document.title = 'Contact & Feedback — Qivlix by Shahanur Mollah';
    } else if (currentPath === '/privacy-policy') {
      document.title = 'Privacy Policy — Qivlix Games';
    } else if (currentPath === '/terms-of-use') {
      document.title = 'Terms of Use — Qivlix Games';
    } else if (currentPath === '/sitemap') {
      document.title = 'HTML Sitemap — Qivlix Games Directory';
    }
  }, [currentPath]);

  // Route selector
  const renderCurrentPage = () => {
    if (currentPath.startsWith('/game/')) {
      const slug = currentPath.replace('/game/', '');
      return <GameDetailPage slug={slug} onNavigate={navigate} />;
    }

    switch (currentPath) {
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
            onOpenSearch={() => setSearchOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070a12] text-slate-100">
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <main className="flex-1 w-full">
        {renderCurrentPage()}
      </main>

      <Footer onNavigate={navigate} />

      {/* Global Command/Search Palette */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectGame={(slug) => navigate(`/game/${slug}`)}
      />
    </div>
  );
}

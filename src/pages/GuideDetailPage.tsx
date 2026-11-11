import React, { useEffect } from 'react';
import {
  ArrowLeft,
  Clock,
  User,
  Share2,
  Check,
  CheckCircle2,
  Lightbulb,
  Gamepad2,
  BookOpen,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { GUIDES, getGuideBySlug } from '../data/guides';
import { GAMES } from '../data/games';
import { AdPlaceholder } from '../components/AdPlaceholder';

interface GuideDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const GuideDetailPage: React.FC<GuideDetailPageProps> = ({ slug, onNavigate }) => {
  const [copied, setCopied] = React.useState(false);
  const guide = getGuideBySlug(slug) || GUIDES[0];
  const relatedGame = GAMES.find((g) => g.slug === guide.gameSlug);

  // Inject Schema.org Article structured data
  useEffect(() => {
    const scriptId = 'guide-json-ld';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': guide.title,
      'description': guide.summary,
      'author': {
        '@type': 'Person',
        'name': guide.author,
        'jobTitle': guide.authorRole
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Qivlix',
        'url': 'https://qivlix.vercel.app'
      },
      'datePublished': '2026-01-15T08:00:00+00:00',
      'dateModified': '2026-10-25T12:00:00+00:00',
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': `https://qivlix.vercel.app/guides/${guide.slug}`
      }
    };

    scriptEl.textContent = JSON.stringify(structuredData);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [guide]);

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <article className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 font-medium">
        <button
          onClick={() => onNavigate('/')}
          className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <ChevronRight className="w-3 h-3 text-slate-600" />
        <button
          onClick={() => onNavigate('/guides')}
          className="hover:text-cyan-400 transition-colors cursor-pointer"
        >
          Guides
        </button>
        <ChevronRight className="w-3 h-3 text-slate-600" />
        <span className="text-cyan-400 font-semibold truncate max-w-[200px] sm:max-w-none">
          {guide.gameTitle} Strategy
        </span>
      </nav>

      {/* Article Header */}
      <header className="space-y-4 border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400">
          <span className="px-2.5 py-0.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 font-semibold">
            {guide.category} Guide
          </span>
          <span>·</span>
          <span className="text-slate-300 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {guide.readTime}
          </span>
          <span>·</span>
          <span className="text-slate-400">Published: {guide.publishedDate}</span>
        </div>

        <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-100 tracking-tight leading-tight">
          {guide.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
          {guide.subtitle}
        </p>

        {/* Author Meta & Action */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-500 p-0.5">
              <div className="w-full h-full rounded-[10px] bg-[#0b101e] flex items-center justify-center font-display font-bold text-xs text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                SM
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">{guide.author}</div>
              <div className="text-[11px] font-mono text-cyan-400">{guide.authorRole}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {relatedGame && (
              <button
                onClick={() => onNavigate(`/game/${relatedGame.slug}`)}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Play {relatedGame.title}</span>
              </button>
            )}

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-cyan-400 transition-all cursor-pointer"
              title="Share guide link"
              aria-label="Share guide link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Key Takeaways Callout Card */}
      <section className="p-6 rounded-2xl bg-slate-900/70 border border-cyan-500/30 space-y-3">
        <div className="flex items-center gap-2 text-cyan-400">
          <CheckCircle2 className="w-5 h-5" />
          <h2 className="font-display font-bold text-base text-slate-100">
            Executive Summary &amp; Key Tactical Rules
          </h2>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
          {guide.keyTakeaways.map((takeaway, idx) => (
            <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
              <span className="text-cyan-400 font-bold">•</span>
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Main Long-Form Article Sections */}
      <div className="space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
        {guide.sections.map((section, idx) => (
          <section key={idx} className="space-y-3 p-6 sm:p-7 rounded-2xl bg-slate-900/40 border border-slate-800">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-100">
              {section.title}
            </h2>
            {section.content.map((paragraph, pIdx) => (
              <p key={pIdx} className="text-slate-300 leading-relaxed">
                {paragraph}
              </p>
            ))}

            {section.tips && section.tips.length > 0 && (
              <div className="p-4 mt-3 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                  <Lightbulb className="w-4 h-4" />
                  <span>Pro Coach Observation</span>
                </div>
                <ul className="space-y-1 text-xs text-slate-300">
                  {section.tips.map((tip, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <span className="text-amber-400">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Non-intrusive Ad Placeholder */}
      <AdPlaceholder format="banner" slotId="guide-bottom-banner" />

      {/* Launch Game Banner CTA */}
      {relatedGame && (
        <aside aria-label="Launch Game" className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/50 via-slate-900 to-purple-950/50 border border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-mono uppercase text-cyan-400 font-semibold">
              Put Theory into Practice
            </span>
            <h3 className="font-display font-black text-xl sm:text-2xl text-slate-100">
              Ready to test these strategies in {relatedGame.title}?
            </h3>
            <p className="text-xs text-slate-300 max-w-lg">
              Launch {relatedGame.title} instantly in your browser with zero download delays and track your personal high score.
            </p>
          </div>

          <button
            onClick={() => onNavigate(`/game/${relatedGame.slug}`)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 hover:from-cyan-300 hover:to-cyan-200 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Play {relatedGame.title} Now</span>
          </button>
        </aside>
      )}

      {/* Browse Other Guides */}
      <div className="pt-8 border-t border-slate-800 flex items-center justify-between">
        <button
          onClick={() => onNavigate('/guides')}
          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Browse All Strategy Guides</span>
        </button>

        <button
          onClick={() => onNavigate('/#games')}
          className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1.5 cursor-pointer"
        >
          <span>Explore All 10 Games</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};

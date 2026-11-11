import React from 'react';
import { ShieldCheck, Eye, Lock, FileText } from 'lucide-react';
import { QivlixArcadeBadge } from '../components/BrandLogo';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <div className="border-b border-[#1b243b] pb-8 text-center sm:text-left">
        <span className="text-xs font-mono uppercase tracking-wider text-[#ccff00] font-bold">
          LEGAL &amp; COMPLIANCE // TRANSPARENCY
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-[#fbfaf6] mt-2 mb-2">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-slate-400">
          Effective Date: January 1, 2026 · Last Updated: October 2026
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-xl bg-[#0a0e1a] border border-[#1b243b] space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-display font-bold text-lg text-[#fbfaf6]">
            1. Introduction &amp; Scope
          </h2>
          <p>
            Welcome to <strong className="text-white">Qivlix</strong>, an independent browser gaming platform created and maintained by <strong className="text-white">Shahanur Mollah</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We respect your privacy and are committed to protecting any information associated with your use of Qivlix (&quot;the Website&quot;). Tagline: <em className="text-[#ccff00] not-italic font-bold">PLAY BEYOND LIMITS.</em>
          </p>
          <p>
            This Privacy Policy explains how information is handled when you play our games, browse our strategy guides, or contact us.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-lg text-[#fbfaf6]">
            2. Information We Do Not Collect
          </h2>
          <p>
            Qivlix is architected as a lightweight, client-side browser gaming destination. We do not require account registration, passwords, biometric profiles, or credit card numbers to play our games.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-lg text-[#fbfaf6]">
            3. Local Storage &amp; Gameplay State
          </h2>
          <p>
            To enhance your gameplay experience, Qivlix uses your browser&apos;s HTML5 <code className="text-[#ccff00] font-mono">localStorage</code> feature to store:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>Your personal high scores in Block Puzzle, Cyber Snake, 2048, and Reaction Test.</li>
            <li>Your sound preference (muted or unmuted).</li>
            <li>Match streaks and game settings (such as snake wrap mode or memory card difficulty).</li>
          </ul>
          <p>
            This data never leaves your device and is not sent to external database servers. You can clear this data at any time by clearing your browser cache and cookies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-lg text-[#fbfaf6]">
            4. Google AdSense &amp; Third-Party Advertising
          </h2>
          <p>
            We may partner with third-party advertising networks, notably <strong className="text-white">Google AdSense</strong>, to serve advertisements when you visit our website.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-400">
            <li>
              <strong>Cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to your website or other websites on the internet.
            </li>
            <li>
              <strong>Google Advertising Cookies:</strong> Google&apos;s use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
            </li>
            <li>
              <strong>Opt-Out Options:</strong> Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#ccff00] underline">Google Ads Settings</a>. Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-[#ccff00] underline">www.aboutads.info</a>.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-lg text-[#fbfaf6]">
            5. Log Files &amp; Technical Analytics
          </h2>
          <p>
            Like most websites, our hosting servers may automatically record standard technical access data (such as IP addresses, browser user-agents, referring URLs, and timestamps). These logs are used exclusively for security auditing, DDoS prevention, and server health diagnostics.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-lg text-[#fbfaf6]">
            6. GDPR &amp; CCPA Compliance
          </h2>
          <p>
            Under the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), you have the right to request deletion or disclosure of any personal data held about you. Because Qivlix does not maintain user database accounts, we do not store sellable personal consumer profiles.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-lg text-[#fbfaf6]">
            7. Contact Information
          </h2>
          <p>
            If you have questions regarding this Privacy Policy or privacy practices on Qivlix, please reach out to <strong className="text-white">Shahanur Mollah</strong> via our official Contact form or email at <a href="mailto:shahanurmollah1@gmail.com" className="text-[#ccff00] underline">shahanurmollah1@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

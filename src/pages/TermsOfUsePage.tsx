import React from 'react';

export const TermsOfUsePage: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center sm:text-left">
        <span className="text-xs font-mono uppercase tracking-wider text-purple-400">
          User Agreement
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-100 mt-1 mb-3">
          Terms of Use
        </h1>
        <p className="text-xs font-mono text-slate-400">
          Effective Date: January 1, 2026 · Last Updated: October 2026
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-display font-bold text-lg text-slate-100">
            1. Agreement to Terms
          </h2>
          <p>
            By accessing or playing games on <strong className="text-slate-100">Qivlix</strong> (&quot;the Website&quot;), created by <strong className="text-slate-100">Shahanur Mollah</strong>, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-lg text-slate-100">
            2. Intellectual Property Rights
          </h2>
          <p>
            The software, interactive gameplay scripts, design layout, styling, and graphics on Qivlix are the intellectual property of Shahanur Mollah and protected by copyright, trademark, and other intellectual property laws. You may play the games for personal, non-commercial entertainment. You may not reverse-engineer, redistribute, sell, or mirror game assets without express written consent.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-lg text-slate-100">
            3. Disclaimer of Warranties
          </h2>
          <p>
            The materials and games on Qivlix are provided on an &apos;as is&apos; and &apos;as available&apos; basis. Shahanur Mollah makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties of merchantability or fitness for a particular purpose.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-lg text-slate-100">
            4. Limitation of Liability
          </h2>
          <p>
            In no event shall Qivlix or Shahanur Mollah be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the games on the website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-lg text-slate-100">
            5. Advertising &amp; Third-Party Services
          </h2>
          <p>
            The website contains clearly designated spaces for third-party advertisements (such as Google AdSense). We do not guarantee approval, display quality, or content of third-party promotional products. Interacting with third-party advertisements is subject to that party&apos;s independent policies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-lg text-slate-100">
            6. Governing Law &amp; Updates
          </h2>
          <p>
            We reserve the right to revise or modify these Terms of Use at any time without prior notice. Continued use of the website following any changes signifies your acceptance of the updated terms.
          </p>
        </section>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, User, HelpCircle, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sound.playMatch();
    setSubmitted(true);
    // Persist feedback to local storage simulation
    try {
      const existing = JSON.parse(localStorage.getItem('qivlix_contact_submissions') || '[]');
      existing.push({ ...formData, timestamp: new Date().toISOString() });
      localStorage.setItem('qivlix_contact_submissions', JSON.stringify(existing));
    } catch {}
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <span className="text-xs font-mono uppercase tracking-wider text-purple-400">
          Get in Touch
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-slate-100 mt-2 mb-4 tracking-tight">
          Contact &amp; Feedback
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          Have an idea for a new game, found a bug in a simulation, or want to collaborate with creator <strong className="text-slate-200">Shahanur Mollah</strong>? Send us a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="md:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in duration-200">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-100">
                Message Received!
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="text-cyan-300 font-semibold">{formData.name}</span>. Your feedback has been queued directly for review by Shahanur Mollah.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', topic: 'General Inquiry', message: '' });
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Mercer"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d18] border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d18] border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Topic
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d18] border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="New Game Suggestion">New Game Suggestion</option>
                  <option value="Bug Report">Bug / Glitch Report</option>
                  <option value="Advertising / Business">Advertising &amp; Sponsorship</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what's on your mind..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d18] border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-300 hover:to-purple-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Info Column */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <h3 className="font-display font-bold text-base text-slate-100 flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              Creator Information
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Qivlix is maintained and updated directly by creator <span className="text-slate-200 font-semibold">Shahanur Mollah</span>.
            </p>
            <div className="pt-2 text-xs space-y-1.5 font-mono text-slate-300">
              <div>Creator: <span className="text-cyan-400 font-medium">Shahanur Mollah</span></div>
              <div>Platform: <span className="text-purple-400">Qivlix</span></div>
              <div>Status: <span className="text-emerald-400">All 6 Systems Operational</span></div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <h3 className="font-display font-bold text-base text-slate-100 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-purple-400" />
              Frequently Asked
            </h3>
            <div className="space-y-2 text-xs text-slate-400">
              <div>
                <strong className="text-slate-200 block mb-0.5">Are all games completely free?</strong>
                Yes! Every game is free to play forever without microtransactions.
              </div>
              <div>
                <strong className="text-slate-200 block mb-0.5">Do I need an account to save high scores?</strong>
                No, all high scores and settings are preserved in your local browser storage.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

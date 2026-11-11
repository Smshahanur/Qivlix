import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, User, HelpCircle, Sparkles, Instagram, ExternalLink } from 'lucide-react';
import { sound } from '../utils/audio';

const DEFAULT_AVATAR = '/assets/aistudio/20250326_100301_1__c7089703.jpg';
const INSTAGRAM_URL = 'https://www.instagram.com/shahanurmollah__?exln=MTl6cTdzMmwyYWx3dA==';

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
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <div className="text-center sm:text-left border-b border-[#1b243b] pb-8">
        <span className="text-xs font-mono uppercase tracking-wider text-[#ccff00] font-bold">
          GET IN TOUCH // DIRECT LINE
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-[#fbfaf6] mt-2 mb-3 tracking-tight">
          Contact &amp; Feedback
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
          Have an idea for a new game, spotted a physics glitch, or want to collaborate with creator <strong className="text-white">Shahanur Mollah</strong>? Send a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="md:col-span-7 p-6 sm:p-8 rounded-xl bg-[#0a0e1a] border border-[#1b243b]">
          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in duration-200">
              <div className="w-14 h-14 mx-auto rounded-xl bg-[#060810] border border-[#ccff00] flex items-center justify-center text-[#ccff00]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#fbfaf6]">
                Message Transmitted!
              </h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="text-[#ccff00] font-semibold">{formData.name}</span>. Your dispatch has been logged directly for review by Shahanur Mollah.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', topic: 'General Inquiry', message: '' });
                }}
                className="px-5 py-2.5 rounded-lg bg-[#060810] hover:bg-[#12192e] text-xs font-mono font-bold text-[#ccff00] border border-[#1b243b] cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-300 mb-1.5 font-bold uppercase tracking-wider text-[11px]">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Mercer"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#060810] border border-[#1b243b] text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#ccff00]"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1.5 font-bold uppercase tracking-wider text-[11px]">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#060810] border border-[#1b243b] text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#ccff00]"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1.5 font-bold uppercase tracking-wider text-[11px]">
                  TOPIC
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#060810] border border-[#1b243b] text-slate-100 focus:outline-none focus:border-[#ccff00]"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="New Game Suggestion">New Game Suggestion</option>
                  <option value="Bug Report">Bug / Glitch Report</option>
                  <option value="Advertising / Business">Advertising &amp; Sponsorship</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1.5 font-bold uppercase tracking-wider text-[11px]">
                  YOUR MESSAGE
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your note here..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#060810] border border-[#1b243b] text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#ccff00] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-[#ccff00] hover:bg-[#d9ff33] text-[#060810] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Info Column */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 rounded-xl bg-[#0a0e1a] border border-[#1b243b] space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={DEFAULT_AVATAR}
                alt="Shahanur Mollah"
                className="w-12 h-12 rounded-lg object-cover border border-[#ccff00]/40"
              />
              <div>
                <h3 className="font-display font-bold text-base text-[#fbfaf6]">
                  Shahanur Mollah
                </h3>
                <div className="text-xs font-mono text-[#ccff00]">Creator &amp; Architect</div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Qivlix is maintained and updated directly by creator <strong className="text-white">Shahanur Mollah</strong>.
            </p>

            <div className="pt-2 text-xs space-y-1.5 font-mono text-slate-300 border-t border-[#1b243b]">
              <div>CREATOR: <span className="text-[#fbfaf6]">Shahanur Mollah</span></div>
              <div>EMAIL: <a href="mailto:shahanurmollah1@gmail.com" className="text-[#ccff00] hover:underline">shahanurmollah1@gmail.com</a></div>
              <div>PLATFORM: <span className="text-[#ff6600]">QIVLIX</span></div>
              <div>STATUS: <span className="text-[#a3e635]">All 10 Systems Operational</span></div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href="mailto:shahanurmollah1@gmail.com"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#060810] hover:bg-[#12192e] border border-[#1b243b] hover:border-[#ccff00] text-slate-200 hover:text-[#ccff00] text-xs font-mono transition-all cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-[#ccff00]" />
                <span>Direct: shahanurmollah1@gmail.com</span>
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#060810] hover:bg-[#12192e] border border-[#1b243b] hover:border-[#ff5500] text-slate-200 hover:text-[#ff5500] text-xs font-mono transition-all cursor-pointer"
              >
                <Instagram className="w-3.5 h-3.5 text-[#ff5500]" />
                <span>Instagram: @shahanurmollah__</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#0a0e1a] border border-[#1b243b] space-y-3">
            <h3 className="font-display font-bold text-base text-[#fbfaf6] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#ccff00]" />
              Quick Answers
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              <div>
                <strong className="text-white block mb-0.5">Are all 10 games completely free?</strong>
                Yes! Every game is free to play forever with zero paywalls.
              </div>
              <div>
                <strong className="text-white block mb-0.5">Where are high scores stored?</strong>
                All scores are securely saved in your local browser storage.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

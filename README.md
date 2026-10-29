# Qivlix — The Daily Discovery Playground

> **Branding:** Qivlix by Shahanur Mollah  
> **Tagline:** The Daily Discovery Playground  
> **Creator:** Shahanur Mollah  
> **Production URL:** [https://qivlix.vercel.app](https://qivlix.vercel.app)

Qivlix is a polished, responsive browser entertainment platform where visitors play quick games, solve daily mysteries, explore unexpected discoveries, and earn virtual achievements. Built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and the browser **Web Audio API**.

---

## 🌟 Core Features & Navigation Sections

### 1. Home (`/`)
- Dynamic welcome hub with today's featured mystery challenge.
- Live daily task progress indicator (e.g., `0 of 3 Completed`).
- Prominent **Surprise Me** quantum roulette launcher.
- Daily Discovery of the Day preview with deep-dive access.
- Quick Jump Back for recently played activities.
- Comprehensive footer with Help & FAQ, About, Contact, Privacy Policy, and Terms of Use.

### 2. Daily Portal (`/daily`)
- **Deterministic rotation**: Synchronized date-based challenges. Every visitor on the same calendar date experiences the exact same challenge triad and mystery.
- **Weekly Challenge Theme**: Rotating themes (e.g., *Cosmic Horizons Week*, *Cybernetic Matrix Week*, *Deep Ocean Mysteries Week*).
- **Streak Tracker**: Tracks consecutive days played based on local date transitions.
- **Date Archive Navigator**: Revisit and play past dates.

### 3. Quick Play Arena (`/quick-play`)
- Instant casual reflex and arcade mini-games with zero load times:
  - **Reaction Rush**: Millisecond-precision human reflex benchmark.
  - **Odd One Out**: Fast visual and classification anomaly detection.
  - **Cyber Snake**: High-voltage neon arena classic with wrap and barrier modes.
  - **Block Puzzle**: 10x10 cyber grid polyomino line clears and combos.
  - **Neon Breakout**: Photonic brick-shattering arcade action.
  - **Cyber Flap**: Drone navigation through voltage conduits.

### 4. The Brain Lab (`/brain-lab`)
- Structured cognitive logic workouts categorized by domain:
  - **Memory Grid**: Ascending audio-visual sequence repetition with procedural harmonic notes.
  - **Mystery Picture**: Progressive clue deduction with animated decrypting shroud tiles.
  - **Daily Riddle**: Philosophical and lateral logic enigmas with hints and answers.
  - **Cyber Wordle**: 5-letter cryptographic passcode deduction.
  - **Cyber Sweeper**: Numerical boundary logic data defusing.
  - **Quantum 2048**: Binary tile synthesis up to the 2048 singularity.
  - **Cyber Memory Matrix**: Card pairing visual recall test.

### 5. Discovery Vault (`/discover`)
- Curiosity cards exploring science anomalies, extreme biology, and perceptual paradoxes:
  - Time Dilation on satellites & gravitational altitude tests.
  - The "Bloop" Antarctic icequake acoustic discovery.
  - Biological immortality of *Turritopsis dohrnii*.
  - Interactive **Checker Shadow Illusion** with toggleable connecting bridge.
  - Interactive **Hermann Grid** peripheral ghost dot demonstration.
  - "Mark as Learned" XP progress and bookmarking.

### 6. My Collection (`/collection`)
- Complete virtual progression vault:
  - Total Points & Cosmic Rank Progression (*Starlight Seeker* to *Qivlix Archon*).
  - 12 Distinctive Achievement Badges (e.g., *First Spark*, *Temporal Runner*, *Lightning Synapse*, *Detective Prime*).
  - High score record table across all activities.
  - Honest browser data disclosure.
  - Reset progress option with confirmation dialog.

### 7. Favorites (`/favorites`)
- Dedicated personal collection of bookmarked games, riddles, and discoveries with 1-click launch.

---

## 🎲 Surprise Me Feature

The Surprise Me modal triggers a quantum roll across games, activities, and discoveries. It intelligently avoids repeating the same activity consecutively.

---

## 🛠️ Technical Stack & Architecture

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite 8
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss";`) with deep midnight navy background (`#070a12`), violet, cyan, turquoise, and amber accents.
- **Audio Engine**: Web Audio API procedural synthesis with zero external audio assets and global mute toggle.
- **Persistence**: Safe, versioned `localStorage` with error fallback and cross-component broadcast events.
- **SEO & Web Standards**: Verified Google Search Console tag, Google AdSense verification meta tag, OpenGraph cards, Twitter cards, and Schema.org `WebApplication` JSON-LD.

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js (version 18 or newer)
- npm or pnpm

### Running Locally
```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in browser
# Visit http://localhost:3000
```

### Production Build
```bash
npm run build
```
Build output is saved to `/dist`.

---

## ☁️ Deploying to Vercel

The project includes `vercel.json` configured with client-side SPA rewrites so all routes (`/daily`, `/quick-play`, `/brain-lab`, `/discover`, `/collection`, etc.) load seamlessly on direct link refresh.

### Automatic Git Deployment
1. Commit and push your changes to your Git repository:
   ```bash
   git add .
   git commit -m "Build Qivlix — The Daily Discovery Playground"
   git push origin main
   ```
2. In the [Vercel Dashboard](https://vercel.com/dashboard), import your repository or let automatic git integration build and deploy.

### CLI Deployment
```bash
# Deploy to production
npx vercel --prod
```

---

## ℹ️ Scope & Limitations (Version 1)

- **Single Player Focus**: High scores, badges, and streaks are recorded locally on your device via sandboxed `localStorage`.
- **Zero Cloud Account Requirement**: Visitors can immediately play, solve mysteries, and collect achievements without login friction.
- **Device Sandboxing**: Local browser data may be lost if site data is wiped or if switching devices.

---

## 📜 Credits & Verification

- **Owner & Developer:** Shahanur Mollah
- **Google Search Console Tag:** `<meta name="google-site-verification" content="ci49ZoPsQaIdKucUGiJXXPcg7_97_5wrK8ISnPa_WQw" />`
- **Google AdSense Tag:** `<meta name="google-adsense-account" content="ca-pub-6725270907667054">`
- © 2026 Qivlix. All rights reserved.

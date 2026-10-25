# Qivlix — Free Online Browser Games

> **Branding:** Qivlix by Shahanur Mollah  
> **Tagline:** Play Beyond Limits.  
> **Creator:** Shahanur Mollah  

![Qivlix Banner](/src/assets/images/qivlix_hero_banner_1792937338560.jpg)

Qivlix is a high-performance, dark-themed responsive browser gaming platform built with **React 19**, **TypeScript**, **Tailwind CSS**, and the browser **Web Audio API**. It is designed from scratch to deliver instant, zero-download, zero-lag arcade and puzzle entertainment on Android phones, iPhones, tablets, laptops, and desktop computers.

---

## 🎮 Included Games (100% Playable)

1. **Block Puzzle** (`/game/block-puzzle`)
   - 10x10 matrix puzzle with randomized polyomino blocks.
   - Drag-and-drop & tap-to-place mobile friendly controls.
   - Horizontal and vertical multi-line blast clears with combo multipliers.
   - High score persistence in `localStorage`.

2. **Cyber Snake** (`/game/snake`)
   - High-voltage cyber serpent navigating a neon arena.
   - Continuous velocity scaling and special golden energy orbs (+50 pts).
   - Mode selector: Screen Wrap Mode vs Hard Barrier Walls.
   - WASD / Arrow keys on PC and on-screen responsive D-Pad / swipe gestures on mobile.

3. **Memory Match** (`/game/memory-match`)
   - Holographic cybernetic relic cards with 3D flip perspective animations.
   - Multiple grid sizes: Casual 4x4 (16 cards), Standard 4x5 (20 cards), and Cyber Master 6x6 (36 cards).
   - Timer, move counter, and combo streak multipliers.

4. **Neon Tic-Tac-Toe** (`/game/tic-tac-toe`)
   - Tactical 3x3 strategy with electric cyan 'X' and purple 'O'.
   - Unbeatable Minimax AI mode, Casual AI mode, or 2-Player local pass-and-play.
   - First move selector and match win streak tracking.

5. **Number Merge (2048)** (`/game/number-merge`)
   - Sliding number merge puzzle with rich cyberpunk tier colors.
   - Keyboard arrow keys, touch swipe gestures, and on-screen directional controls.
   - Friendly **Undo 1 Move** feature to recover from accidental slips.
   - 2048 victory modal with endless continuation to 4096 and beyond.

6. **Reaction Test** (`/game/reaction-test`)
   - Sub-millisecond precision human reflex benchmark tool (`performance.now()`).
   - False-start detection preventing early clicking on red.
   - 5-round average mode with gamer tier classifications (*Cybernetic Godlike*, *Pro Esports*, *Average Human*).

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (version 18 or newer)
- npm or pnpm

### Installation
```bash
# Clone or navigate to the project directory
cd qivlix

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Visit `http://localhost:3000` (or the port indicated in your terminal) to play and test all games.

### Production Build
```bash
npm run build
```
This produces optimized production assets in the `dist` folder.

---

## ☁️ Deploying to Vercel

Qivlix is pre-configured for one-click deployment to **Vercel** with complete client-side routing support (`vercel.json` rewrites).

### Option A: Using the Vercel Dashboard (Recommended)
1. Push your repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your Qivlix repository.
4. Framework Preset will be automatically detected as **Vite**.
5. Click **"Deploy"**. Your site will be live within ~40 seconds!

### Option B: Using the Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy directly from terminal
vercel
```

---

## 💰 Google AdSense Configuration

Qivlix includes clearly defined, policy-compliant Google AdSense placeholder slots located in:
- **Homepage Header Leaderboard** (`728x90` / responsive `320x50` on mobile)
- **Mid-Content Responsive Banner** (`max-w-4xl`)
- **Game Detail Pages** (below the active gameplay screen)

### How to insert your verified Google AdSense Code:
1. Open `index.html` and add your Google AdSense script inside `<head>`:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
   ```
2. Open `/src/components/AdPlaceholder.tsx` and uncomment or insert your `<ins class="adsbygoogle" ...>` tag.
3. Replace the placeholder slot IDs with your real AdSense `data-ad-slot` values.

> **AdSense Policy Note:** Advertisements are intentionally placed outside active game viewports to comply with Google AdSense terms and avoid accidental clicks. AdSense approval depends entirely on Google's independent domain audit; approval cannot be automatically guaranteed.

---

## 🔍 SEO & Web Standards

- **Title & Metadata:** Configured with dynamic client updates and OpenGraph / Twitter Cards.
- **Structured Data:** Includes Schema.org `WebApplication` JSON-LD.
- **Sitemap & Robots:** Located at `/public/sitemap.xml` and `/public/robots.txt`.
- **Audio:** Zero external audio files; uses pure Web Audio API procedural synthesis with global mute toggling.

---

## 📜 License & Credits

- **Project:** Qivlix
- **Creator:** Shahanur Mollah
- **Copyright:** © 2026 Qivlix. Created by Shahanur Mollah. All rights reserved.

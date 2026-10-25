import { GameInfo, GameCategory } from '../types/game';

export const GAMES: GameInfo[] = [
  {
    id: 'block-puzzle',
    slug: 'block-puzzle',
    title: 'Block Puzzle',
    category: 'Puzzle',
    tagline: 'Place neon polyomino blocks, blast lines, and trigger massive combos.',
    shortDescription: 'Fit geometric neon shapes onto the 10x10 matrix to clear rows and columns.',
    description: 'Qivlix Block Puzzle challenges your spatial awareness. Drag or tap to place randomized polyomino blocks into the 10x10 cyber grid. Clear horizontal and vertical lines simultaneously to unlock escalating combo multipliers and achieve the ultimate high score.',
    thumbnail: '/src/assets/images/game_block_puzzle_1792937338910.jpg',
    badge: 'Popular',
    color: 'cyan',
    controls: [
      { device: 'Touch / Mouse', keys: 'Drag & Drop or Tap', action: 'Select a shape from the bottom tray and tap target grid square' },
      { device: 'Keyboard', keys: '1 / 2 / 3', action: 'Quick select piece from your reserve slots' },
      { device: 'Keyboard', keys: 'R / Space', action: 'Restart current board' }
    ],
    rules: [
      'Drag or tap a shape from the tray and position it on any free squares.',
      'Fill any entire 10-block horizontal row or vertical column to clear it.',
      'Clearing multiple lines at once earns exponential combo points.',
      'The game ends when none of the 3 current shapes can fit on the board.'
    ],
    tips: [
      'Always keep open space for large 3x3 blocks and 5-length straight lines.',
      'Aim for double and triple line clears to trigger the combo multiplier.',
      'Clear both rows and columns in the same turn for maximum bonus score.'
    ]
  },
  {
    id: 'snake',
    slug: 'snake',
    title: 'Cyber Snake',
    category: 'Arcade',
    tagline: 'Glide through the neon matrix, collect energy orbs, and grow without crashing.',
    shortDescription: 'Classic arcade snake reimagined with neon visuals, speed progression, and smooth controls.',
    description: 'Control a high-voltage cyber serpent navigating a futuristic arena. Collect energy orbs to extend your length and increase your score multiplier. Watch out for rare luminous power cores and choose between classic barrier walls or modern screen wrap modes.',
    thumbnail: '/src/assets/images/game_cyber_snake_1792937339522.jpg',
    badge: 'Arcade Classic',
    color: 'purple',
    controls: [
      { device: 'Keyboard', keys: 'Arrow Keys / WASD', action: 'Steer the snake in four directions' },
      { device: 'Touch / Mouse', keys: 'On-Screen D-Pad / Swipe', action: 'Tap direction arrows or swipe across playfield' },
      { device: 'Keyboard', keys: 'P / Space', action: 'Pause or resume simulation' }
    ],
    rules: [
      'Steer the cyber serpent to devour pulsing energy orbs.',
      'Each orb consumed lengthens your body and increases speed slightly.',
      'Golden power cores grant 3x points and spawn for a limited time.',
      'Avoid colliding into your own tail or hard border boundaries (in Wall Mode).'
    ],
    tips: [
      'Circle the perimeter when your body becomes exceptionally long.',
      'Switch between Wrap Mode (pass through walls) and Barrier Mode in settings.',
      'Plan turns 2-3 steps ahead to avoid trapping your head in tight coils.'
    ]
  },
  {
    id: 'memory-match',
    slug: 'memory-match',
    title: 'Memory Match',
    category: 'Memory',
    tagline: 'Uncover paired cyber relics and test your visual recall under time pressure.',
    shortDescription: 'Flip holographic cards to pair matching cybernetic glyphs in minimal moves.',
    description: 'Engage your cognitive memory with high-tech holographic relic cards. Flip two cards at a time to uncover matching cyber runes, quantum cores, and matrix crests. Features multiple grid sizes (4x4, 4x5, 6x6) with timer, combo streaks, and precision move counting.',
    thumbnail: '/src/assets/images/game_cyber_relics_1792937338719.jpg',
    badge: 'Brain Trainer',
    color: 'cyan',
    controls: [
      { device: 'Touch / Mouse', keys: 'Click or Tap Card', action: 'Flip card over to inspect hidden cyber rune' },
      { device: 'Keyboard', keys: 'R', action: 'Reshuffle and start new round' }
    ],
    rules: [
      'Click or tap any face-down card to reveal its holographic symbol.',
      'Reveal a second card to attempt a match.',
      'If both symbols match, the pair remains permanently revealed.',
      'Consecutive matches without mistakes build a streak multiplier.'
    ],
    tips: [
      'Focus on remembering corners and border cards first.',
      'Keep a calm tempo—rapid guessing adds moves and hurts your rank.',
      'Try the 6x6 Expert Matrix mode for maximum memory challenge.'
    ]
  },
  {
    id: 'tic-tac-toe',
    slug: 'tic-tac-toe',
    title: 'Neon Tic-Tac-Toe',
    category: 'Strategy',
    tagline: 'Outsmart the Minimax AI or battle a friend in high-voltage cyber XO.',
    shortDescription: 'Tactical 3x3 strategy with casual or unbeatable Minimax AI and 2-player mode.',
    description: 'Experience the classic game of Xs and Os wrapped in electric cyan and purple neon aesthetics. Challenge a calibrated computer opponent—choose Casual for relaxed fun or Unbeatable Minimax AI to test flawless game theory—or challenge a friend in local pass-and-play.',
    thumbnail: '/src/assets/images/hero_banner_fallback.svg',
    badge: 'AI Opponent',
    color: 'purple',
    controls: [
      { device: 'Touch / Mouse', keys: 'Click / Tap Square', action: 'Place your mark (X or O) on any empty cell' },
      { device: 'Keyboard', keys: '1 through 9 (Numpad)', action: 'Quick place mark corresponding to cell position' }
    ],
    rules: [
      'Players alternate turns placing their symbol in an open 3x3 slot.',
      'First player to align 3 consecutive marks horizontally, vertically, or diagonally wins.',
      'If all 9 slots are filled without 3 in a row, the round ends in a draw.',
      'Streaks and aggregate head-to-head records persist across rounds.'
    ],
    tips: [
      'Taking the center square gives you the most winning paths.',
      'Corners create dual-threat forks that force the opponent to block one.',
      'Play against Unbeatable AI to learn perfect defensive and offensive traps.'
    ]
  },
  {
    id: 'number-merge',
    slug: 'number-merge',
    title: 'Number Merge',
    category: 'Puzzle',
    tagline: 'Slide and combine matching cyber numbers to reach the legendary 2048 tile.',
    shortDescription: 'Addictive 2048 sliding number merge with smooth fluid animations and undo move.',
    description: 'Slide neon numbered tiles across a 4x4 matrix. When two tiles with identical numbers collide, they fuse into a double-value tile. Strategize your movements to create the legendary 2048 quantum core, then push onward to 4096 and beyond. Includes a friendly 1-move undo feature.',
    thumbnail: '/src/assets/images/hero_banner_fallback.svg',
    badge: 'Addictive',
    color: 'cyan',
    controls: [
      { device: 'Keyboard', keys: 'Arrow Keys / WASD', action: 'Slide all tiles in chosen direction' },
      { device: 'Touch / Mouse', keys: 'Swipe / On-screen Arrows', action: 'Swipe across grid or tap directional buttons' },
      { device: 'Keyboard / Button', keys: 'Z / Undo', action: 'Revert your previous move' }
    ],
    rules: [
      'Every slide pushes all tiles as far as possible in that direction.',
      'Identical touching numbers merge into their sum (e.g. 2+2=4, 1024+1024=2048).',
      'After every move, a new 2 or 4 tile randomly generates in an empty space.',
      'The game ends when the grid is full and no valid merges remain.'
    ],
    tips: [
      'Build your highest value tile in one corner (e.g., bottom-right) and keep it locked there.',
      'Avoid swiping upward unless absolutely necessary to keep your hierarchy intact.',
      'Keep tiles sorted in descending order along your primary edge.'
    ]
  },
  {
    id: 'reaction-test',
    slug: 'reaction-test',
    title: 'Reaction Test',
    category: 'Reflex',
    tagline: 'Benchmark your cognitive reflexes and reaction speed with sub-millisecond precision.',
    shortDescription: 'Wait for the electric green signal and tap as fast as humanly possible.',
    description: 'Test your motor and visual response time against esports champions. Watch the screen intently through a randomized delay interval. The instant the dark screen flashes electric neon green, click or tap. Calculates your average over 5 rounds and grades your reflex tier from Godlike to Turtle.',
    thumbnail: '/src/assets/images/hero_banner_fallback.svg',
    badge: 'Pro Benchmark',
    color: 'purple',
    controls: [
      { device: 'Touch / Mouse', keys: 'Click / Tap Screen', action: 'Trigger start, signal reaction, or retry' },
      { device: 'Keyboard', keys: 'Spacebar / Enter', action: 'Instant trigger with lowest mechanical latency' }
    ],
    rules: [
      'Click or press Spacebar to prime the sensor.',
      'Wait patiently while the screen is red. Clicking prematurely counts as a False Start!',
      'When the screen turns electric green, click or press Spacebar immediately.',
      'Complete 5 attempts to calculate your verified gamer average benchmark.'
    ],
    tips: [
      'Spacebar often registers 15-30ms faster than mouse switches.',
      'Maintain soft peripheral focus rather than staring intensely at one pixel.',
      'Ensure your screen refresh rate is at its highest setting for optimal accuracy.'
    ]
  },
  {
    id: 'cyber-sweeper',
    slug: 'cyber-sweeper',
    title: 'Cyber Sweeper',
    category: 'Puzzle',
    tagline: 'Deactivate hidden matrix data mines using pure tactical deduction.',
    shortDescription: 'High-voltage cyberpunk minesweeper with safe first click and chording.',
    description: 'Matrix security grid has armed explosive data nodes across the cyber matrix. Deduce node locations using numerical radar hints, place digital disarm flags, and clear all safe sectors. Features Novice (9x9), Hacker (16x16), and Master (16x30) tiers, mobile-optimized Flag Mode, chording shortcuts, and best time tracking.',
    thumbnail: '/src/assets/images/game_cyber_sweeper.svg',
    badge: 'Logic Classic',
    color: 'cyan',
    controls: [
      { device: 'Touch / Mouse', keys: 'Left Click / Tap', action: 'Reveal cell (or flag in Flag Mode)' },
      { device: 'Touch / Mouse', keys: 'Right Click / Long Press', action: 'Place or remove disarm flag' },
      { device: 'Touch / Mouse', keys: 'Double Tap / Double Click', action: 'Chord reveal surrounding neighbors when flags match number' },
      { device: 'Keyboard / Button', keys: 'Flag Mode Button', action: 'Toggle between Dig and Flagging actions on mobile' }
    ],
    rules: [
      'The first cell clicked is always 100% guaranteed safe with an open perimeter.',
      'Numbers indicate precisely how many mines touch that specific cell (1 through 8).',
      'Flag suspected mines to safeguard yourself from accidental detonation.',
      'Clear every non-mine cell on the grid to achieve victory and set a record time.'
    ],
    tips: [
      'Look for 1s on corners: their only adjacent unrevealed neighbor is guaranteed to be a mine.',
      'Toggle Flag Mode on mobile touchscreens to flag quickly without long-pressing.',
      'Use double-click chording on completed numbers to clear large swathes instantly.'
    ]
  },
  {
    id: 'neon-breakout',
    slug: 'neon-breakout',
    title: 'Neon Breakout',
    category: 'Arcade',
    tagline: 'Shatter cybernetic brick matrices with high-energy deflections and laser cannons.',
    shortDescription: 'Dynamic 60fps brick breaker with multi-ball, laser paddle, and multi-tier stages.',
    description: 'Pilot an electric deflector platform to shatter glowing neon energy prisms. Collect falling power cores to trigger Multi-Ball splitters, wide-field paddles, laser cannons, and spare shields. Face three increasingly intense sectors with multi-hit reinforced bricks and particle explosions.',
    thumbnail: '/src/assets/images/game_neon_breakout.svg',
    badge: 'Arcade Action',
    color: 'purple',
    controls: [
      { device: 'Touch / Mouse', keys: 'Drag / Move Pointer', action: 'Directly steer deflector paddle horizontally' },
      { device: 'Keyboard', keys: 'Arrow Keys / A & D', action: 'Precision left and right paddle steering' },
      { device: 'Keyboard / Button', keys: 'Spacebar / Laser Button', action: 'Fire twin laser cannons when armed with laser power-up' },
      { device: 'Keyboard', keys: 'P', action: 'Pause or resume game simulation' }
    ],
    rules: [
      'Keep the high-voltage energy balls from dropping below your lower shield.',
      'Bounce angles adjust based on where the ball strikes your paddle—center shoots straight, edges angle sharply.',
      'Some reinforced bricks require multiple impacts to shatter.',
      'Collect falling power capsules to gain laser firing capability, paddle expansions, and multi-balls.'
    ],
    tips: [
      'Strike balls with the extreme edges of the paddle to create sharp angles that penetrate behind brick clusters.',
      'Laser power-up allows you to blast stubborn bricks directly from afar.',
      'Multi-ball triples your score acquisition rate—keep as many in play as possible.'
    ]
  },
  {
    id: 'cyber-flap',
    slug: 'cyber-flap',
    title: 'Cyber Flap',
    category: 'Reflex',
    tagline: 'Pulse engine thrusters and navigate your cyber drone through high-voltage energy pylons.',
    shortDescription: 'Intense one-touch reflex flyer with fluid particle thrusters and medal tiers.',
    description: 'Test your motor rhythm and spatial precision in Cyber Flap. Pulse your miniature drone’s ion thrusters to weave cleanly between electrified energy pylons. Single-tap flight mechanics paired with strict physics and medal progression (Bronze, Silver, Gold, Cyber Elite) deliver endless addictive replayability.',
    thumbnail: '/src/assets/images/game_cyber_flap.svg',
    badge: 'Addictive',
    color: 'cyan',
    controls: [
      { device: 'Touch / Mouse', keys: 'Tap / Click Anywhere', action: 'Pulse ion thrusters for upward impulse' },
      { device: 'Keyboard', keys: 'Spacebar / Arrow Up / W', action: 'Instantly fire thrusters with mechanical switch precision' }
    ],
    rules: [
      'Gravity pulls your drone downward continuously.',
      'Each tap or spacebar press fires a short upward thruster burst.',
      'Passing between a pair of neon pylons awards 1 score point.',
      'Colliding with any pylon, the ceiling, or the electrified floor terminates flight.'
    ],
    tips: [
      'Establish a gentle, steady cadence of short taps rather than waiting until you fall low.',
      'Focus your vision 1-2 pylons ahead rather than directly on the drone.',
      'Spacebar provides the crispest physical feedback for higher scores.'
    ]
  },
  {
    id: 'cyber-wordle',
    slug: 'cyber-wordle',
    title: 'Cyber Wordle',
    category: 'Word',
    tagline: 'Crack the encrypted 5-letter security cipher within 6 tactical attempts.',
    shortDescription: 'Matrix password decrypter with color-coded hints and unlimited play.',
    description: 'Infiltrate terminal mainframes by deducing the secret 5-letter cipher code. Each guess gives cryptographic feedback: Emerald indicates correct letter in the right slot, Amber means letter is in the code but elsewhere, and Dark Slate eliminates characters. Track your win streaks and play unlimited rounds.',
    thumbnail: '/src/assets/images/game_cyber_wordle.svg',
    badge: 'Word Master',
    color: 'emerald',
    controls: [
      { device: 'Touch / Mouse', keys: 'Tap Virtual Keyboard', action: 'Input letters, backspace, and submit guesses' },
      { device: 'Keyboard', keys: 'Physical A-Z / Enter / Backspace', action: 'Full mechanical typing support' },
      { device: 'Keyboard / Button', keys: 'New Word', action: 'Generate fresh encrypted password at any time' }
    ],
    rules: [
      'You have 6 attempts to crack the secret 5-letter code word.',
      'Each guess must be a valid 5-letter word.',
      'Green/Emerald: Letter is in the exact right position.',
      'Yellow/Amber: Letter exists in the word but belongs in another slot.',
      'Dark Grey: Letter does not appear in the target cipher.'
    ],
    tips: [
      'Start with vowel-heavy words like AUDIO, CYBER, or QUEST to eliminate letters early.',
      'Take note of the color-coded virtual keyboard to see which keys remain viable.',
      'Letters can appear more than once in the target word!'
    ]
  }
];

export const CATEGORIES: GameCategory[] = ['All', 'Puzzle', 'Arcade', 'Memory', 'Strategy', 'Reflex', 'Word'];


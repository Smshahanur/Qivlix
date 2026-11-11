import { GameInfo, GameCategory } from '../types/game';

export const GAMES: GameInfo[] = [
  {
    id: 'block-puzzle',
    slug: 'block-puzzle',
    title: 'Block Puzzle',
    category: 'Puzzle',
    tagline: 'Place neon polyomino blocks, blast rows and columns, and trigger exponential combo surges.',
    shortDescription: 'Fit geometric neon polyomino shapes onto the 10x10 cyber matrix to clear lines and prevent board lockouts.',
    description: 'Qivlix Block Puzzle is a premier spatial puzzle built with pure HTML5 Canvas mechanics. Drag or tap randomized polyomino blocks into a 10x10 neon grid. Complete uninterrupted horizontal rows or vertical columns to detonate them from the board. Unlike traditional falling-block puzzles, there is no gravity timer, allowing you to contemplate placements, engineer multi-line cross clears, and execute high-scoring combos without false pressure.',
    objective: 'Strategically position continuous 3-piece polyomino batches on the 10x10 matrix to clear lines, conserve an open 3x3 survival buffer, and maximize combo chain multipliers before running out of valid moves.',
    thumbnail: '/src/assets/images/game_block_puzzle_1792937338910.jpg',
    badge: 'Popular',
    color: 'cyan',
    difficulty: 'Intermediate',
    estimatedPlayTime: '3–6 min',
    guideSlug: 'block-puzzle-polyomino-strategy',
    controls: [
      { device: 'Touch / Mouse', keys: 'Drag & Drop or Tap', action: 'Drag a shape from the bottom dock onto the 10x10 grid or tap a shape then tap target cells' },
      { device: 'Keyboard', keys: '1 / 2 / 3', action: 'Quick-select active piece slot 1, 2, or 3 from the tray' },
      { device: 'Keyboard', keys: 'R / Space', action: 'Restart board or reset active game run' }
    ],
    rules: [
      'Pieces arrive in batches of three. All three shapes must be positioned before a fresh triplet spawns.',
      'Shapes cannot be rotated once spawned; placement must match their exact spatial orientation.',
      'Filling any continuous 10-block horizontal row or vertical column immediately clears those 10 cells.',
      'Clearing multiple lines simultaneously multiplies your base points exponentially.',
      'The game concludes when none of the remaining tray pieces can legally fit onto the active grid.'
    ],
    scoringSystem: [
      { event: 'Piece Deployed', points: '+1 pt per block', notes: 'Earn points equal to individual cells occupied by the shape.' },
      { event: 'Single Line Clear', points: '100 pts', notes: 'Base reward for clearing 1 horizontal row or vertical column.' },
      { event: 'Double Line Clear', points: '300 pts', notes: 'Clearing 2 lines simultaneously unlocks a 1.5x combo bonus.' },
      { event: 'Triple Line Clear', points: '700 pts', notes: 'Clearing 3 lines in a single drop unlocks a 2.3x combo bonus.' },
      { event: 'Cross Clear (Row + Col)', points: '1,200 pts', notes: 'Simultaneous intersection clear yielding maximum point surge.' }
    ],
    mechanics: [
      'Uniform Polyomino RNG: Shapes are selected with weighted distribution covering mono-blocks, dominoes, trominoes, tetrominoes, pentaminoes, and 3x3 mega-cubes.',
      'Footprint Collision Verification: Grid checks coordinate validity in real time and highlights preview cells green for valid drop zones or red for collisions.',
      'Batch-State Validation: At the end of every placement, the board executes an availability sweep across all remaining dock shapes. If total valid placements equals zero, game-over triggers cleanly.'
    ],
    tips: [
      'Always safeguard a 3x3 square void in one of your quadrants to survive the deadly 3x3 block.',
      'Avoid placing blocks along the extreme outer edge unless they complete an immediate line.',
      'Build up rows and columns in tandem to set up dual-axis simultaneous clears.'
    ],
    proStrategies: [
      'Perform piece triage: Always look at all 3 pieces in your tray before deciding where to drop piece #1.',
      'Clear the center first: Central grid squares offer the highest spatial utility for irregularly shaped L and T polyominoes.',
      'When board occupancy exceeds 70%, immediately transition from score-chasing into defragmentation mode.'
    ],
    faqs: [
      {
        question: 'Can you rotate the blocks in Qivlix Block Puzzle?',
        answer: 'No. Just like authentic modern polyomino puzzles, shapes cannot be rotated once spawned. The game challenges you to plan around their fixed orientations, making spatial foresight and pocket conservation critical.'
      },
      {
        question: 'What triggers a game-over?',
        answer: 'Game over occurs strictly when none of the current three pieces in your dock have legal clearance to fit anywhere on the remaining 10x10 matrix.'
      },
      {
        question: 'How do combo multipliers work?',
        answer: 'When a single piece completes two or more lines at once, the scoring engine calculates an exponential bonus rather than a linear addition: 1 line = 100, 2 lines = 300, 3 lines = 700, and cross-clears = 1,200 points.'
      },
      {
        question: 'Is my high score saved automatically?',
        answer: 'Yes! Your highest achieved score is persistently stored in your browser local storage and syncs across your Qivlix profile and badges showcase.'
      }
    ]
  },
  {
    id: 'snake',
    slug: 'snake',
    title: 'Cyber Snake',
    category: 'Arcade',
    tagline: 'Glide through the neon matrix, collect high-voltage energy orbs, and grow without crashing.',
    shortDescription: 'Classic arcade serpent gameplay reimagined with 60fps neon physics, screen wrap toggle, and speed progression.',
    description: 'Cyber Snake merges the addictive retro arcade formula with futuristic cyber aesthetics, fluid directional buffering, and dynamic particle effects. Steer a high-voltage cybernetic serpent across an electrified grid. Consume neon energy orbs to extend your body length and elevate your score multiplier, while navigating around your own tail and avoiding catastrophic high-speed collisions.',
    objective: 'Steer your cyber serpent to devour pulsing energy orbs, grow your length, survive accelerating tick speeds, and attain the highest matrix score without colliding into yourself or arena perimeter walls.',
    thumbnail: '/src/assets/images/game_cyber_snake_1792937339522.jpg',
    badge: 'Arcade Classic',
    color: 'purple',
    difficulty: 'Intermediate',
    estimatedPlayTime: '2–5 min',
    guideSlug: 'cyber-snake-speed-management',
    controls: [
      { device: 'Keyboard', keys: 'Arrow Keys / WASD', action: 'Steer the serpent in four cardinal directions with input buffering' },
      { device: 'Touch / Mouse', keys: 'On-Screen D-Pad / Swipe', action: 'Tap direction arrows or swipe fingers across the playfield' },
      { device: 'Keyboard', keys: 'P / Space', action: 'Pause or resume the simulation' }
    ],
    rules: [
      'The serpent moves continuously along its current vector and cannot come to a full stop.',
      'Consuming a standard cyan energy orb extends body length by 1 segment and awards 10 points.',
      'Golden power cores spawn periodically for 6 seconds, granting 50 points and 3x multiplier.',
      'Colliding with your own body terminates the run immediately.',
      'In Hard Barrier Mode, contacting the outer boundary wall causes a terminal crash. In Wrap Mode, your head wraps safely to the opposing edge.'
    ],
    scoringSystem: [
      { event: 'Standard Cyan Orb', points: '10 pts', notes: 'Increases body length by +1 segment.' },
      { event: 'Golden Power Core', points: '50 pts', notes: 'Time-limited rare orb offering 5x point value.' },
      { event: 'Length Milestone (50 segments)', points: '500 bonus pts', notes: 'Awarded upon reaching 50 continuous body segments.' },
      { event: 'Length Milestone (100 segments)', points: '1,500 bonus pts', notes: 'Master cyber serpent milestone.' }
    ],
    mechanics: [
      'Input Buffering Engine: Directions are buffered by one tick to prevent accidental 180-degree self-collisions when rapid keys are pressed.',
      'Velocity Acceleration Curve: Tick frequency starts at 120ms and scales progressively down to 60ms every 5 orbs consumed.',
      'Procedural Grid Lighting: Consuming orbs generates localized light waves that illuminate the grid floor with neon chromatic ripples.'
    ],
    tips: [
      'Adopt a serpentine S-curve trajectory along columns to pack your body without sealing your head inside.',
      'Keep your visual attention focused 2-3 cells ahead of your head, never on the tail behind you.',
      'Use the Wrap Mode option in settings if you prefer frictionless boundary traversal.'
    ],
    proStrategies: [
      'Tail Tip Tracking: Wherever your tail tip is right now, that space will be guaranteed empty on the subsequent tick—use it as an escape hatch.',
      'Perimeter Cycling: When your body exceeds 60 segments, ride the outer perimeter wall and sweep inward only when an orb spawns.'
    ],
    faqs: [
      {
        question: 'What is the difference between Barrier Mode and Wrap Mode?',
        answer: 'In Barrier Mode (classic), colliding with the outer border ends your run immediately. In Wrap Mode, crossing an outer wall teleports your serpent head seamlessly to the opposite side of the arena.'
      },
      {
        question: 'Does the snake speed up as you play?',
        answer: 'Yes. Every 5 energy orbs devoured slightly decreases the game tick interval, accelerating your movement speed from 120ms down to a maximum velocity of 60ms per cell.'
      },
      {
        question: 'Can I reverse directions instantly?',
        answer: 'No. Moving directly into the opposite direction (e.g. Left while heading Right) is locked by safety buffering to prevent self-collision instant deaths.'
      }
    ]
  },
  {
    id: 'memory-match',
    slug: 'memory-match',
    title: 'Memory Match',
    category: 'Memory',
    tagline: 'Uncover paired holographic cyber relics and test your cognitive recall under time pressure.',
    shortDescription: 'Flip holographic cards to pair matching cybernetic glyphs in minimal moves with escalating matrix sizes.',
    description: 'Engage your visual-spatial recall and cognitive processing with holographic relic cards. Flip two cards at a time to reveal encrypted cyber runes, quantum reactors, and neural chips. The simulation offers multiple board configurations (4x4 Novice, 4x5 Hacker, and 6x6 Cyber Master) with move counters, completion timers, and streak multipliers.',
    objective: 'Locate and pair all identical cybernetic relic cards across the matrix in the fewest total moves and quickest elapsed time.',
    thumbnail: '/src/assets/images/game_cyber_relics_1792937338719.jpg',
    badge: 'Brain Trainer',
    color: 'cyan',
    difficulty: 'Casual',
    estimatedPlayTime: '2–4 min',
    controls: [
      { device: 'Touch / Mouse', keys: 'Click or Tap Card', action: 'Flip card face-up to reveal its encrypted holographic glyph' },
      { device: 'Keyboard', keys: 'R', action: 'Reshuffle cards and initiate a fresh challenge board' }
    ],
    rules: [
      'Click or tap any face-down card to reveal its hidden cyber symbol.',
      'Select a second card to test for a match.',
      'If both cards share the identical symbol, they remain face-up permanently.',
      'If symbols differ, both cards automatically flip back down after a brief memory inspection interval.',
      'Consecutive successful matches without mistakes build your streak multiplier.'
    ],
    scoringSystem: [
      { event: 'Matched Pair', points: '100 pts', notes: 'Base score for uncovering a valid identical pair.' },
      { event: 'Streak Multiplier', points: '+50 pts per streak', notes: 'Consecutive matches without an incorrect flip build streak score.' },
      { event: 'Sub-60s Clear Bonus', points: '500 bonus pts', notes: 'Awarded for completing the matrix under 60 seconds.' },
      { event: 'Minimum Moves Star', points: '300 bonus pts', notes: 'Granted for clearing with fewer than 1.5x the minimum mathematical flips.' }
    ],
    mechanics: [
      'Fisher-Yates Shuffle Algorithm: Card arrays are deterministically randomized across all grid cells with guaranteed pair equity.',
      'Two-Card Lock State: Input is temporarily throttled while two non-matching cards flip face-down, preventing race conditions or click spam.',
      'Haptic and Sound Feedback: Unique procedural synthesized tones sound for successful matches versus mismatches.'
    ],
    tips: [
      'Assign mnemonic nicknames or categories to cyber glyphs (e.g. "Cyan Diamond", "Purple Orb", "Laser Cross") for rapid verbal recall.',
      'Systematically uncover cards row-by-row rather than picking random cards across corners.',
      'When your first card matches a relic you remember seeing earlier, flip the remembered card second.'
    ],
    proStrategies: [
      'Quadrant Anchoring: Mentally divide the grid into 4 quadrants. Remember which quadrant holds which symbol rather than memorizing exact row/column coordinates.',
      'Elimination Focus: Once 60% of the board is cleared, the remaining hidden cards become exponentially easier to pair by deduction.'
    ],
    faqs: [
      {
        question: 'What difficulty levels are available?',
        answer: 'You can select from 4x4 (16 cards / 8 pairs - Novice), 4x5 (20 cards / 10 pairs - Hacker), and 6x6 (36 cards / 18 pairs - Cyber Master).'
      },
      {
        question: 'Does flip speed matter for score?',
        answer: 'Yes! Both total elapsed seconds and total move count factor into your final star rating and XP rewards.'
      },
      {
        question: 'Can cards ever fail to generate pairs?',
        answer: 'Never. The Fisher-Yates generator mathematically duplicates each selected glyph before shuffling the deck.'
      }
    ]
  },
  {
    id: 'tic-tac-toe',
    slug: 'tic-tac-toe',
    title: 'Neon Tic-Tac-Toe',
    category: 'Strategy',
    tagline: 'Outsmart the Minimax AI or battle a friend in high-voltage cyber XO.',
    shortDescription: 'Tactical 3x3 strategy with casual or unbeatable Minimax AI and local 2-player pass-and-play.',
    description: 'Experience classic Xs and Os wrapped in electric cyan and purple neon aesthetics. Challenge a calibrated computer opponent—choose Casual for relaxed fun or Unbeatable Minimax AI to test flawless mathematical game theory—or challenge a friend in local pass-and-play with persisted streak tracking.',
    objective: 'Align three of your holographic symbols horizontally, vertically, or diagonally on the 3x3 neon grid before your opponent can do so.',
    thumbnail: '/src/assets/images/hero_banner_fallback.svg',
    badge: 'AI Opponent',
    color: 'purple',
    difficulty: 'Intermediate',
    estimatedPlayTime: '1–2 min',
    controls: [
      { device: 'Touch / Mouse', keys: 'Click / Tap Square', action: 'Place your mark (X or O) into any open 3x3 cell' },
      { device: 'Keyboard', keys: 'Numpad 1–9', action: 'Quick-place mark corresponding to grid position' }
    ],
    rules: [
      'Players alternate turns placing their assigned symbol into an unoccupied grid square.',
      'The first player to align 3 consecutive marks in a straight row, column, or diagonal wins the round.',
      'If all 9 squares are occupied without 3 consecutive marks, the round concludes as a Draw.',
      'Session win-draw-loss records persist across rounds until manually reset.'
    ],
    scoringSystem: [
      { event: 'Round Victory vs Casual AI', points: '100 pts', notes: 'Win against standard randomized heuristic opponent.' },
      { event: 'Round Draw vs Unbeatable AI', points: '150 pts', notes: 'Holding the Minimax mathematical AI to a draw is a tactical feat.' },
      { event: 'Round Victory vs Unbeatable AI', points: '500 pts', notes: 'Accomplished only if the human player exploits first-move initiative.' },
      { event: '3-Game Win Streak', points: '300 bonus pts', notes: 'Consecutive victories without a loss.' }
    ],
    mechanics: [
      'Recursive Minimax Algorithm: The Unbeatable AI utilizes a depth-first search exploring all future board states, guaranteeing it will never lose a game from any legal position.',
      'Heuristic Casual Engine: The Casual mode mixes random exploration with simple 1-ply blocking to create an accessible, beatable adversary.',
      'Local Pass-and-Play: Enables two human players to share the same touchscreen or keyboard.'
    ],
    tips: [
      'Taking the central square on move 1 grants access to 4 possible winning lines (1 row, 1 col, 2 diagonals).',
      'Corner openings allow you to create dual-threat "forks" that present two simultaneous winning threats.',
      'When defending against a corner opening, taking the center is strictly mandatory.'
    ],
    proStrategies: [
      'The Corner Fork Trap: Place your first X in a corner. If the opponent takes an edge, take another corner. You now have two distinct paths to victory on move 3.'
    ],
    faqs: [
      {
        question: 'Is it actually possible to beat the Unbeatable AI mode?',
        answer: 'In game theory, Tic-Tac-Toe is a mathematically solved game. When played optimally by both sides, it always results in a draw. The Unbeatable AI uses the Minimax algorithm and will never make a tactical mistake; the highest achievable result against it is a perfect draw!'
      },
      {
        question: 'Can I play with a friend on the same device?',
        answer: 'Yes! Simply toggle the Mode switch from "vs AI" to "2 Players" for local pass-and-play.'
      }
    ]
  },
  {
    id: 'number-merge',
    slug: 'number-merge',
    title: 'Number Merge',
    category: 'Puzzle',
    tagline: 'Slide and fuse matching cyber numbers to synthesize the legendary 2048 quantum core.',
    shortDescription: 'Addictive 2048 sliding number merge with smooth fluid animations and 1-move undo safety net.',
    description: 'Slide neon numbered tiles across a 4x4 matrix. When two tiles with identical numerical values collide, they fuse into a double-value tile. Strategize your movements to create the legendary 2048 quantum core, then push onward to 4096 and beyond. Includes a friendly 1-move undo feature to recover from accidental slips.',
    objective: 'Slide and combine matching cyber numbers on the 4x4 matrix to synthesize the 2048 tile and attain the highest cumulative numerical score.',
    thumbnail: '/src/assets/images/hero_banner_fallback.svg',
    badge: 'Addictive',
    color: 'cyan',
    difficulty: 'Master',
    estimatedPlayTime: '5–15 min',
    guideSlug: 'quantum-2048-corner-lock',
    controls: [
      { device: 'Keyboard', keys: 'Arrow Keys / WASD', action: 'Slide all tiles across the 4x4 matrix in chosen vector' },
      { device: 'Touch / Mouse', keys: 'Swipe / On-screen Arrows', action: 'Swipe fingers across the grid or tap directional buttons' },
      { device: 'Keyboard / Button', keys: 'Z / Undo Button', action: 'Revert your previous move if an accidental key is pressed' }
    ],
    rules: [
      'Every directional move slides all active tiles as far as possible along the designated axis.',
      'Colliding tiles with identical values fuse into their sum (2+2=4, 4+4=8 ... 1024+1024=2048).',
      'After every legal slide, a new "2" (90% probability) or "4" (10% probability) spawns in a random empty cell.',
      'The run concludes when the grid fills completely and no adjacent matching tiles can be merged.'
    ],
    scoringSystem: [
      { event: 'Tile Merge', points: 'Value of merged tile', notes: 'Fusing two 64s adds 128 points to your running score.' },
      { event: 'Synthesizing 2048', points: '2,048 bonus pts', notes: 'Unlocks the Quantum Architect virtual achievement.' },
      { event: 'Synthesizing 4096', points: '4,096 bonus pts', notes: 'Unlocks the Grandmaster Core virtual achievement.' }
    ],
    mechanics: [
      'Vector Slide Compression: Columns and rows are collapsed using array filtering to eliminate 0-values followed by pairwise merge checks.',
      'Single-Merge Guarantee: A tile can only participate in one merge operation per directional slide.',
      'State History Cache: Board state is snapshot before every move, enabling reliable 1-step undo functionality.'
    ],
    tips: [
      'Lock your highest value tile into a single corner (e.g. bottom-left) and never move it out of that pocket.',
      'Restrict your movement to three primary directions (e.g. Down, Left, and Right); avoid pressing Up.',
      'Maintain monotonic descending order along your anchor wall (e.g. 1024 -> 512 -> 256 -> 128).'
    ],
    proStrategies: [
      'The Snake Formation: Weave your secondary row in the reverse direction of your primary row to cascade merges effortlessly into the corner apex.'
    ],
    faqs: [
      {
        question: 'Does the game automatically stop when you hit 2048?',
        answer: 'No! When you synthesize the 2048 quantum core, a celebratory banner appears, but you are free to continue playing toward 4096, 8192, and beyond until the grid is filled.'
      },
      {
        question: 'How does the Undo button work?',
        answer: 'You have access to a 1-move undo safety net. If you accidentally swipe Up and displace your corner tile, click Undo immediately to revert the board to its prior state.'
      }
    ]
  },
  {
    id: 'reaction-test',
    slug: 'reaction-test',
    title: 'Reaction Test',
    category: 'Reflex',
    tagline: 'Benchmark your cognitive reflexes and motor response speed with sub-millisecond precision.',
    shortDescription: 'Wait for the electric green sensor pulse and tap as fast as humanly possible across 5 rounds.',
    description: 'Test your motor and visual response time against esports benchmarks. Watch the screen intently through a randomized delay interval. The instant the dark crimson screen flashes electric neon green, click or tap. Calculates your average over 5 rounds and grades your reflex tier from Godlike to Turtle.',
    objective: 'React the instant the stimulus changes from red to green to achieve the lowest possible millisecond reaction latency across 5 calibrated rounds.',
    thumbnail: '/src/assets/images/hero_banner_fallback.svg',
    badge: 'Pro Benchmark',
    color: 'purple',
    difficulty: 'Intermediate',
    estimatedPlayTime: '1–2 min',
    controls: [
      { device: 'Touch / Mouse', keys: 'Click / Tap Screen', action: 'Prime sensor, trigger reaction response, or advance rounds' },
      { device: 'Keyboard', keys: 'Spacebar / Enter', action: 'Mechanical switch trigger for the lowest hardware input latency' }
    ],
    rules: [
      'Click or tap to prime the reaction sensor into Waiting state (Crimson Red).',
      'The stimulus timer waits for a randomized delay between 1.5 and 4.5 seconds.',
      'If you click before the screen turns green, a "False Start!" penalty is issued.',
      'When the field flashes Electric Green, click or press Spacebar as quickly as possible.',
      'Complete 5 attempts to produce your verified average reaction speed.'
    ],
    scoringSystem: [
      { event: '< 180 ms', points: 'Rank: Godlike', notes: 'Top 0.1% tier; matches competitive esports champions.' },
      { event: '180 – 220 ms', points: 'Rank: Cyber Elite', notes: 'Exceptional visual-motor cognitive processing.' },
      { event: '221 – 260 ms', points: 'Rank: High Pro', notes: 'Faster than global average human reaction speed (250ms).' },
      { event: '261 – 320 ms', points: 'Rank: Fast Casual', notes: 'Standard healthy human baseline.' },
      { event: '> 320 ms', points: 'Rank: Developing', notes: 'Room for motor reflex warm-up.' }
    ],
    mechanics: [
      'Performance.now() High-Res Timestamp: Latency is clocked using the browser sub-millisecond hardware clock rather than standard Date ticks.',
      'False Start Enforcement: Premature clicks cancel the active timeout and force a clean retry without skewing average metrics.'
    ],
    tips: [
      'Using a desktop mechanical Spacebar typically shaves 15–25ms of hardware debounce latency compared to mobile touchscreen digitizers.',
      'Relax your facial muscles and soften your peripheral gaze rather than straining on a single pixel.',
      'Ensure your monitor or phone refresh rate is set to 120Hz or higher if supported.'
    ],
    proStrategies: [
      'Anticipation breathing: Inhale as you prime the sensor; hold and exhale sharply upon the green flash to engage optimal motor response pathways.'
    ],
    faqs: [
      {
        question: 'What is the average human reaction time?',
        answer: 'The median human visual reaction time to a color change stimulus is approximately 250 milliseconds. Scores below 200ms represent top-tier gamer performance.'
      },
      {
        question: 'Does screen refresh rate affect my score?',
        answer: 'Yes. A standard 60Hz display has a frame interval of ~16.6ms, while a 120Hz or 144Hz display refreshes every ~7–8ms, offering lower visual display latency.'
      }
    ]
  },
  {
    id: 'cyber-sweeper',
    slug: 'cyber-sweeper',
    title: 'Cyber Sweeper',
    category: 'Puzzle',
    tagline: 'Deactivate hidden matrix data mines using pure tactical deduction.',
    shortDescription: 'High-voltage cyberpunk minesweeper with guaranteed safe first click, chording, and mobile flag mode.',
    description: 'Matrix security grid has armed explosive data nodes across the cyber matrix. Deduce node locations using numerical radar hints, place digital disarm flags, and clear all safe sectors. Features Novice (9x9), Hacker (16x16), and Master (16x30) tiers, mobile-optimized Flag Mode, chording shortcuts, and best time tracking.',
    objective: 'Deduce the coordinates of all concealed data mines using adjacent numerical clues, flag suspicious sectors, and reveal all non-mine cells.',
    thumbnail: '/src/assets/images/game_cyber_sweeper.svg',
    badge: 'Logic Classic',
    color: 'cyan',
    difficulty: 'Master',
    estimatedPlayTime: '3–8 min',
    guideSlug: 'cyber-sweeper-deduction-patterns',
    controls: [
      { device: 'Touch / Mouse', keys: 'Left Click / Tap', action: 'Reveal cell (or flag cell if Flag Mode is enabled on mobile)' },
      { device: 'Touch / Mouse', keys: 'Right Click / Long Press', action: 'Place or remove disarm flag on suspected mine' },
      { device: 'Touch / Mouse', keys: 'Double Tap / Double Click', action: 'Chord-reveal surrounding neighbors when placed flags match the cell number' },
      { device: 'Keyboard / Button', keys: 'Flag Mode Button', action: 'Toggle between Digging and Flagging actions on touchscreens' }
    ],
    rules: [
      'The first cell revealed is 100% guaranteed to be completely safe and clears an initial cavern.',
      'Numerical digits (1 through 8) report the exact number of mines adjacent in all 8 directions.',
      'Flag suspected mines to safeguard yourself from accidental detonation clicks.',
      'Detonating even one mine triggers an immediate matrix security lockdown (game over).',
      'Reveal every single non-mine square on the grid to conquer the board.'
    ],
    scoringSystem: [
      { event: 'Novice Clear (9x9, 10 mines)', points: '250 pts', notes: 'Quick deductive warm-up.' },
      { event: 'Hacker Clear (16x16, 40 mines)', points: '750 pts', notes: 'Standard tactical benchmark.' },
      { event: 'Master Clear (16x30, 99 mines)', points: '2,500 pts', notes: 'Grandmaster logic accomplishment.' }
    ],
    mechanics: [
      'Guaranteed Safe Opening: Mines are placed into the grid only after the first player click, ensuring the target cell and its immediate neighbors are always void of mines.',
      'Flood-Fill Void Propagation: Revealing a "0" blank cell automatically triggers recursive breath-first expansion, opening large connected clearings in 1 click.',
      'Chording Accelerator: Double-clicking an already satisfied number tests adjacent flags; if flag count equals the number, remaining adjacent hidden cells are revealed automatically.'
    ],
    tips: [
      'Memorize the 1-2-1 pattern: on a flat wall, mines are always under the 1s, and the cell under the 2 is always safe!',
      'Look for isolated corners with a "1": if it only touches 1 unrevealed cell, that cell is guaranteed to be a mine.',
      'On mobile, turn on Flag Mode to quickly tap and tag obvious mines without waiting for long-press delays.'
    ],
    proStrategies: [
      '1-2-2-1 Flat Wall Pattern: Mines sit directly under the two middle 2s; cells opposite the outer 1s are safe.',
      'When faced with a genuine mathematical 50/50 corner, guess immediately rather than wasting time clearing the rest of the board.'
    ],
    faqs: [
      {
        question: 'Can I lose on my very first click in Cyber Sweeper?',
        answer: 'No! The first click is guaranteed 100% safe. Mines are generated dynamically after your first click, guaranteeing an open perimeter.'
      },
      {
        question: 'What does "chording" mean?',
        answer: 'Chording is an advanced minesweeper technique where you double-click or middle-click a revealed number once you have flagged all its adjacent mines. The engine instantly uncovers all remaining untouched neighbors, saving dozens of individual clicks.'
      }
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
    objective: 'Deflect high-velocity photonic orbs with your paddle to shatter all defensive neon brick prisms across 3 sectors without dropping below your shield.',
    thumbnail: '/src/assets/images/game_neon_breakout.svg',
    badge: 'Arcade Action',
    color: 'purple',
    difficulty: 'Intermediate',
    estimatedPlayTime: '3–6 min',
    guideSlug: 'neon-breakout-deflection-physics',
    controls: [
      { device: 'Touch / Mouse', keys: 'Drag / Move Pointer', action: 'Directly steer deflector paddle horizontally across the bottom track' },
      { device: 'Keyboard', keys: 'Arrow Keys / A & D', action: 'Precision left and right paddle steering' },
      { device: 'Keyboard / Button', keys: 'Spacebar / Laser Button', action: 'Fire twin laser cannons when armed with laser power-up' },
      { device: 'Keyboard', keys: 'P', action: 'Pause or resume game simulation' }
    ],
    rules: [
      'Keep active energy balls above the lower threshold shield at all times.',
      'Bounce angles adjust dynamically based on where the ball impacts your paddle.',
      'Reinforced silver and gold bricks require 2 to 3 impacts before shattering.',
      'Power capsules fall randomly from destroyed prisms; catch them with your paddle to equip upgrades.',
      'Shatter every destructible brick in a sector to advance to the subsequent tier.'
    ],
    scoringSystem: [
      { event: 'Standard Brick Shattered', points: '20 pts', notes: 'Single-hit neon prism.' },
      { event: 'Reinforced Brick Shattered', points: '50 pts', notes: 'Multi-layer armored cyber prism.' },
      { event: 'Power Capsule Collected', points: '100 pts', notes: 'Equips laser, multi-ball, or wide paddle.' },
      { event: 'Sector Clear Bonus', points: '1,000 pts', notes: 'Awarded upon clearing an entire stage formation.' }
    ],
    mechanics: [
      'Segmented Normalized Deflection: Paddle contact calculates impact delta from -1.0 to +1.0, translating into sharp horizontal angles for edge hits and steep vertical angles for center hits.',
      'Multi-Ball Entity Manager: Independent physics loops track up to 6 concurrent energy balls simultaneously without frame drops.',
      'Dynamic Laser Projectiles: Laser blasts run ray-cast collision checks against the lowest brick layer in that column.'
    ],
    tips: [
      'Strike balls with the extreme edges of the paddle to create sharp angles that penetrate behind brick clusters.',
      'The "Ceiling Trap": Carve a vertical tunnel up one side and send the ball above the brick ceiling for rapid automated bounces.',
      'Laser power-up allows you to blast stubborn bricks directly from afar.'
    ],
    proStrategies: [
      'Priority Ball Tracking: In Multi-Ball mode, ignore high balls and focus your paddle positioning exclusively on the lowest descending orb.'
    ],
    faqs: [
      {
        question: 'How do bounce angles work?',
        answer: 'Unlike basic breakout games where angle of incidence equals angle of reflection, Neon Breakout calculates reflection based on where the ball strikes your paddle. Center hits deflect straight up, while outer edge hits shoot at sharp shallow angles.'
      },
      {
        question: 'What happens if a ball drops below the paddle?',
        answer: 'You lose 1 shield energy life. If multiple balls are active (Multi-Ball power-up), losing one ball does not penalize your life as long as at least one ball remains active on screen!'
      }
    ]
  },
  {
    id: 'cyber-flap',
    slug: 'cyber-flap',
    title: 'Cyber Flap',
    category: 'Reflex',
    tagline: 'Pulse engine thrusters and navigate your cyber drone through high-voltage energy pylons.',
    shortDescription: 'Intense one-touch reflex flyer with fluid particle thrusters, medal tiers, and distance score.',
    description: 'Test your motor rhythm and spatial precision in Cyber Flap. Pulse your miniature drone’s ion thrusters to weave cleanly between electrified energy pylons. Single-tap flight mechanics paired with strict physics and medal progression (Bronze, Silver, Gold, Cyber Elite) deliver endless addictive replayability.',
    objective: 'Navigate your ion thruster drone through narrow gaps between high-voltage electric pylons for as long as possible without crashing.',
    thumbnail: '/src/assets/images/game_cyber_flap.svg',
    badge: 'Addictive',
    color: 'cyan',
    difficulty: 'Intermediate',
    estimatedPlayTime: '1–3 min',
    controls: [
      { device: 'Touch / Mouse', keys: 'Tap / Click Anywhere', action: 'Pulse ion thrusters for upward impulse' },
      { device: 'Keyboard', keys: 'Spacebar / Arrow Up / W', action: 'Instantly fire thrusters with mechanical switch precision' }
    ],
    rules: [
      'Gravity continuously pulls your drone downward toward the electrified floor.',
      'Each tap or Spacebar press generates a calibrated upward impulse vector.',
      'Successfully passing through a pair of energy pylons awards 1 score point.',
      'Colliding with any pylon structure, ceiling, or ground terminates the flight immediately.'
    ],
    scoringSystem: [
      { event: 'Pylon Cleared', points: '+1 pt', notes: 'Baseline flight distance metric.' },
      { event: 'Bronze Medal (10 pts)', points: 'Bronze Tier', notes: 'First flight milestone.' },
      { event: 'Silver Medal (25 pts)', points: 'Silver Tier', notes: 'Demonstrates consistent rhythmic cadence.' },
      { event: 'Gold Medal (50 pts)', points: 'Gold Tier', notes: 'Master drone navigator.' },
      { event: 'Cyber Elite (100+ pts)', points: 'Cyber Elite', notes: 'Legendary flight achievement.' }
    ],
    mechanics: [
      'Eulerian Gravity Simulation: Velocity accelerates downward by a constant gravity factor each frame, counterbalanced by a fixed upward impulse impulse upon player tap.',
      'Procedural Pylon Generator: Obstacle gap heights are procedurally randomized within safe navigational variance to prevent impossible wall spawns.',
      'Particle Trail Thrusters: Dynamic glowing particle emissions flare from the rear exhaust whenever thrusters fire.'
    ],
    tips: [
      'Establish a gentle, steady cadence of short taps rather than waiting until you fall low.',
      'Focus your vision 1-2 pylons ahead rather than directly on the drone.',
      'Spacebar provides the crispest physical feedback for higher scores.'
    ],
    proStrategies: [
      'Enter pylon gaps near the lower third rather than the ceiling to maximize reaction time for the subsequent obstacle.'
    ],
    faqs: [
      {
        question: 'Why does the drone fall so quickly?',
        answer: 'Cyber Flap simulates genuine gravitational physics with constant downward acceleration. The secret is finding a calm, rhythmic tapping cadence rather than erratic panic clicks.'
      },
      {
        question: 'Are high scores saved?',
        answer: 'Yes! Your best distance and unlocked medal tiers are preserved in your local browser profile.'
      }
    ]
  },
  {
    id: 'cyber-wordle',
    slug: 'cyber-wordle',
    title: 'Cyber Wordle',
    category: 'Word',
    tagline: 'Crack the encrypted 5-letter security cipher within 6 tactical attempts.',
    shortDescription: 'Matrix password decrypter with cryptographic feedback, letter filtering, and unlimited play.',
    description: 'Infiltrate terminal mainframes by deducing the secret 5-letter cipher code. Each guess gives cryptographic feedback: Emerald indicates correct letter in the right slot, Amber means letter is in the code but elsewhere, and Dark Slate eliminates characters. Track your win streaks and play unlimited rounds.',
    objective: 'Deduce the encrypted 5-letter secret terminal passcode within 6 tactical word guesses using color-coded feedback hints.',
    thumbnail: '/src/assets/images/game_cyber_wordle.svg',
    badge: 'Word Master',
    color: 'emerald',
    difficulty: 'Intermediate',
    estimatedPlayTime: '2–5 min',
    controls: [
      { device: 'Touch / Mouse', keys: 'Tap Virtual Keyboard', action: 'Input letters, backspace, and submit guesses' },
      { device: 'Keyboard', keys: 'Physical A-Z / Enter / Backspace', action: 'Full mechanical typing support' },
      { device: 'Keyboard / Button', keys: 'New Word', action: 'Generate fresh encrypted password at any time' }
    ],
    rules: [
      'You have 6 attempts to deduce the hidden 5-letter word.',
      'Every guess must be a valid 5-letter English word.',
      'Emerald Green: Letter is in the word and in the exact correct position.',
      'Amber Yellow: Letter exists in the word but belongs in another slot.',
      'Dark Slate: Letter does not appear in the target cipher.',
      'Letters may appear more than once in the mystery word.'
    ],
    scoringSystem: [
      { event: 'Solved on Guess 1 or 2', points: '500 pts', notes: 'Incredible linguistic intuition or lucky opener.' },
      { event: 'Solved on Guess 3 or 4', points: '300 pts', notes: 'Optimal tactical deduction.' },
      { event: 'Solved on Guess 5 or 6', points: '150 pts', notes: 'Clutch cipher decryption under pressure.' },
      { event: '5-Game Win Streak', points: '500 bonus pts', notes: 'Consecutive cipher decryptions.' }
    ],
    mechanics: [
      'Cryptographic Two-Pass Feedback: Guess evaluation matches exact letters first to prevent false duplicate amber flags before evaluating misplaced characters.',
      'Curated Dictionary Index: Target words are drawn from a curated vocabulary of engaging, common 5-letter words with high semantic interest.',
      'Adaptive On-Screen Keyboard: Letter keys dynamically update their background colors to reflect their highest known confirmation status.'
    ],
    tips: [
      'Start with vowel-heavy words like AUDIO, CYBER, or QUEST to eliminate letters early.',
      'Take note of the color-coded virtual keyboard to see which keys remain viable.',
      'Letters can appear more than once in the target word!'
    ],
    proStrategies: [
      'Information Theory Opening: Pick an opener with 3 common vowels and 2 frequent consonants (e.g. STARE, CRANE, ADIEU) to maximize bits of information gained on turn 1.'
    ],
    faqs: [
      {
        question: 'Can letters repeat in the mystery word?',
        answer: 'Yes! Words like SPEED, ROBOT, or CYBER contain repeating characters. The clue system colors multiple occurrences accurately.'
      },
      {
        question: 'Can I play multiple games a day?',
        answer: 'Yes! Unlike single-day Wordle variants, Qivlix Cyber Wordle offers unlimited puzzles with instant "New Word" generation whenever you finish a game.'
      }
    ]
  }
];

export const CATEGORIES: GameCategory[] = ['All', 'Puzzle', 'Arcade', 'Memory', 'Strategy', 'Reflex', 'Word'];

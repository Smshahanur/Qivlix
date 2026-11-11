import { GuideArticle } from '../types/guide';

export const GUIDES: GuideArticle[] = [
  {
    id: 'block-puzzle-polyomino-strategy',
    slug: 'block-puzzle-polyomino-strategy',
    title: 'Mastering Block Puzzle: The Matrix Grid Strategy & Combo Clearing Guide',
    subtitle: 'Learn how polyomino reservation, perimeter buffers, and dual-axis simultaneous clears yield 50,000+ scores.',
    gameSlug: 'block-puzzle',
    gameTitle: 'Block Puzzle',
    category: 'Puzzle',
    author: 'Shahanur Mollah',
    authorRole: 'Founder & Game Architect, Qivlix',
    readTime: '6 min read',
    publishedDate: 'January 2026',
    summary: 'Block Puzzle tests spatial forecasting and board conservation. Unlike falling-block games with gravity, shapes in Block Puzzle remain where placed until a complete 10-block row or column forms. Discover how grandmasters manage the 10x10 matrix to prevent early lockouts.',
    keyTakeaways: [
      'Always reserve a persistent 3x3 pocket in one quadrant to survive the deadly 3x3 square piece.',
      'Clearing a row and a column simultaneously yields a 3x exponential score multiplier compared to sequential single clears.',
      'Evaluate piece triplets together before placing your first block of the trio.',
      'Prioritize center-out clearing over edge clustering to maximize viable placement configurations.'
    ],
    sections: [
      {
        title: '1. Understanding the 10x10 Matrix Physics',
        content: [
          'In Qivlix Block Puzzle, the playing field consists of a rigid 10x10 grid with 100 discrete cells. Unlike Tetris, there is zero downward gravity and no automatic wall-kick rotation. Pieces must fit into unoccupied cells exactly as rendered in the three bottom dock slots.',
          'The random number generator (RNG) pulls shapes in sets of three from a polyomino library containing single blocks, 2-to-5 length straight lines, L-shapes, T-shapes, and the dreaded 3x3 mega-cube. A new triplet only spawns once all three active tray pieces have been successfully deployed.',
          'This discrete batching creates the foundational rule of high-level play: you are never placing just one piece; you are solving for the survival of the entire three-piece batch.'
        ],
        tips: [
          'Before dropping the first shape, mentally simulate where shapes 2 and 3 will go.',
          'If two placements seem equal, choose the one that keeps the largest contiguous rectangular void open.'
        ]
      },
      {
        title: '2. The 3x3 Survival Pocket Rule',
        content: [
          'Over 80% of player losses in Block Puzzle occur when the RNG deals a 3x3 solid block and no quadrant contains an unobstructed 3x3 opening. Because the 3x3 requires 9 contiguous empty cells, a single stray block in each quadrant will instantly terminate an otherwise promising run.',
          'To avoid this death trap, elite players designate either the top-left or bottom-right corner as a protected safety zone. When clearing lines, deliberately steer your polyominoes away from fracturing this designated 3x3 pocket.',
          'Even if leaving the pocket open costs you a quick 1-line clear elsewhere, the preservation of your 3x3 buffer ensures you survive any emergency block drop.'
        ]
      },
      {
        title: '3. Engineering Simultaneous Multi-Line Combos',
        content: [
          'Single line clears award a baseline of 100 points. However, the Qivlix scoring engine rewards geometric synchronicity. Clearing two lines in a single drop grants 300 points, three lines yield 700 points, and a cross-clear (clearing an intersecting horizontal row and vertical column at once) triggers a 1,200-point Nova Surge.',
          'To prepare a cross-clear, identify an intersection cell at coordinates (X, Y). Build row Y until it has 9 filled blocks with only cell X empty. Simultaneously build column X until it has 9 filled blocks with only cell Y empty.',
          'When you drop a single 1x1 block or an intersecting corner piece into (X, Y), both lines detonate simultaneously. This empties 19 grid cells in a single frame and resets board pressure dramatically.'
        ],
        tips: [
          'Cross-clears create the highest ratio of cleared grid real estate to pieces spent.',
          'Watch the glowing matrix lines: rows at 8/10 or 9/10 saturation emit subtle neon pulses to indicate readiness.'
        ]
      },
      {
        title: '4. Endgame Salvage and Crisis Recovery',
        content: [
          'When the grid becomes saturated with fragmented orphan blocks (occupancy exceeding 75%), shift immediately from score-maximization mode into emergency defragmentation.',
          'Stop trying to engineer dual-line combos. Instead, accept any placement that completes even a single line. Every completed line opens 10 fresh adjacent slots, reducing matrix density and creating connectivity between isolated voids.',
          'On desktop, use numeric keyboard shortcuts (1, 2, 3) to swiftly select shapes and hover over cells to preview footprint highlights before committing.'
        ]
      }
    ],
    tags: ['Block Puzzle', 'Polyomino Strategy', 'Grid Management', 'Spatial Reasoning']
  },
  {
    id: 'quantum-2048-corner-lock',
    slug: 'quantum-2048-corner-lock',
    title: 'Quantum 2048 Merge: The Corner Lock Principle and Endgame Execution',
    subtitle: 'A mathematical breakdown of monotonic tile ordering, wall containment, and how to reliably reach 2048 and 4096.',
    gameSlug: 'number-merge',
    gameTitle: 'Number Merge',
    category: 'Puzzle',
    author: 'Shahanur Mollah',
    authorRole: 'Founder & Game Architect, Qivlix',
    readTime: '7 min read',
    publishedDate: 'January 2026',
    summary: 'Reaching the 2048 tile in Number Merge is not a matter of luck—it is a deterministic algorithmic exercise in monotonic gradient arrangement. Understand why pressing the forbidden fourth directional key collapses your structure and how the Corner Lock technique guarantees success.',
    keyTakeaways: [
      'Pick one anchor corner (e.g. bottom-left) and never move your apex tile out of that coordinate.',
      'Restrict your movement repertoire strictly to three directions (Down, Left, and Right); treat the Up key as radioactive.',
      'Maintain strict monotonic descending order along the anchor wall (e.g. 1024 -> 512 -> 256 -> 128).',
      'Use the 1-move undo safety net strategically to reverse accidental shifts caused by errant key presses.'
    ],
    sections: [
      {
        title: '1. The Mathematics of Monotonic Chains',
        content: [
          'In Number Merge, every move slides all tiles as far as possible along the chosen vector. When two identical numerical values meet, they fuse into a single tile of double value (2+2=4, 4+4=8 ... 1024+1024=2048).',
          'After each legal move, the engine randomly spawns either a "2" tile (90% probability) or a "4" tile (10% probability) in an unoccupied coordinate.',
          'Because new tiles generate at low values, high-value tiles cannot easily traverse past smaller blocks. If a 512 tile gets trapped behind a column of 2s and 4s in the center of the board, fusing it becomes mathematically improbable. The solution is creating a strictly monotonic snake: values must strictly decrease as they wind away from your anchor corner.'
        ]
      },
      {
        title: '2. Implementing the Corner Lock Algorithm',
        content: [
          'Step 1: Choose your anchor corner. For right-handed players, the bottom-left or bottom-right corner is standard. For this walkthrough, we designate Bottom-Left (row 4, column 1) as the apex.',
          'Step 2: Maintain a fully packed bottom row. As long as all four cells in row 4 contain tiles, pressing Left or Right will never displace your apex tile from the bottom-left corner.',
          'Step 3: Establish the Primary Gradient along row 4: [Apex, Apex/2, Apex/4, Apex/8]. For example, if your highest tile is 512, your ideal bottom row reads: [512, 256, 128, 64].',
          'Step 4: Feed the tail. Work on fusing smaller tiles in row 3 to match the end of your chain in row 4. Once row 3 produces a 64 adjacent to the 64 in row 4, trigger a downward merge, starting a cascading domino fusion all the way back to the 512 apex!'
        ],
        tips: [
          'Never swipe in the direction away from your anchor wall unless you have zero legal moves.',
          'If row 4 only has 3 tiles, pressing Left or Right might displace your apex. Fill the empty slot with a downward move first!'
        ]
      },
      {
        title: '3. Handling Emergency Inversions',
        content: [
          'What happens when you are forced to make a move that shifts your apex tile out of the corner? This usually occurs when rows 1, 2, and 3 are completely blocked and only an upward swipe is valid.',
          'If your apex tile floats into the second row, do not panic and do not make random panic moves. Look for the coordinate directly below the apex. Immediately clear that lower slot using horizontal merges and swipe down on the very next turn to restore your anchor.',
          'On Qivlix Number Merge, use the integrated Undo button (hotkey Z) immediately if an accidental stroke breaks your bottom row alignment.'
        ]
      },
      {
        title: '4. Pushing Beyond 2048: The 4096 and 8192 Frontier',
        content: [
          'Creating the 2048 tile requires 1,024 individual merges of value 2. Pushing further to 4096 requires building two independent 2048 tiles on the same board.',
          'At this stage, you must utilize a dual-row snake structure. Row 4 holds [2048, 1024, 512, 256], and Row 3 holds [16, 32, 64, 128] winding in reverse order. When the 128 in row 3 fuses, the entire second tier cascades directly into the primary bottom row.'
        ]
      }
    ],
    tags: ['2048', 'Number Merge', 'Corner Lock', 'Math Puzzle', 'Algorithmic Gaming']
  },
  {
    id: 'cyber-sweeper-deduction-patterns',
    slug: 'cyber-sweeper-deduction-patterns',
    title: 'Cyber Sweeper Tactical Guide: 1-2-1 Patterns, Boundary Deductions & Zero-Guess Logic',
    subtitle: 'Transform matrix minesweeper from random guesswork into deterministic deductive mastery.',
    gameSlug: 'cyber-sweeper',
    gameTitle: 'Cyber Sweeper',
    category: 'Strategy',
    author: 'Shahanur Mollah',
    authorRole: 'Founder & Game Architect, Qivlix',
    readTime: '8 min read',
    publishedDate: 'January 2026',
    summary: 'Many players mistakenly believe minesweeper relies on luck. In reality, expert Cyber Sweeper players read numeric configurations like musical sheet music. Learn the classic 1-2-1, 1-2-2-1, and corner perimeter rules to clear Hacker (16x16) and Master (16x30) boards without detonating a single data mine.',
    keyTakeaways: [
      'The opening click on Qivlix Cyber Sweeper is 100% guaranteed safe and clears an initial cavern.',
      'The 1-2-1 pattern against a flat wall always places mines under the 1s and a safe cell under the 2.',
      'The 1-2-2-1 pattern against a flat wall always places mines under the two 2s and safe cells under the two 1s.',
      'Master the "chording" technique (double-click on satisfied numbers) to slash clear times by over 60%.'
    ],
    sections: [
      {
        title: '1. The Core Rules of Matrix Radar Numbers',
        content: [
          'In Cyber Sweeper, numeric values (1 through 8) report the exact number of explosive data mines contained in the eight surrounding adjacent cells (horizontally, vertically, and diagonally).',
          'A cell showing "1" with only one unrevealed neighboring square means that neighbor is 100% guaranteed to be a mine. Place a disarm flag on it immediately.',
          'Once all mines touching a revealed number have been accurately flagged, all other adjacent unflagged cells are 100% safe to dig. This is the bedrock of zero-guess deduction.'
        ]
      },
      {
        title: '2. The Universal Flat-Wall Patterns',
        content: [
          'Pattern Alpha: The 1-2-1 Configuration.',
          'Whenever you encounter the sequence 1 - 2 - 1 along an uninterrupted boundary wall with three unrevealed cells directly opposite them, simple algebra dictates the solution:',
          'The middle "2" requires two mines. If the middle opposite cell were safe, both mines would have to sit under the 1s, which would satisfy the "2" and the 1s. Conversely, placing a mine under the middle cell would satisfy both 1s simultaneously, leaving the 2 with only 1 mine—a contradiction.',
          'Therefore: Under a flat-wall 1-2-1, mines ALWAYS sit opposite the two "1" numbers. The cell opposite the middle "2" is ALWAYS 100% safe to open!',
          'Pattern Beta: The 1-2-2-1 Configuration.',
          'When you observe 1 - 2 - 2 - 1 along a straight wall, the reverse symmetry applies: mines ALWAYS reside opposite the two middle "2" numbers, while the cells opposite the outer "1" numbers are guaranteed safe.'
        ],
        tips: [
          'Commit 1-2-1 and 1-2-2-1 to muscle memory—they appear in virtually every Cyber Sweeper board.',
          'Never guess when an open flat wall exists elsewhere on the board; resolve the deterministic zones first.'
        ]
      },
      {
        title: '3. Mobile Optimization: Flag Mode vs. Chording',
        content: [
          'On desktop keyboards and mice, right-clicking places a flag while left-clicking reveals cells. Double-clicking or middle-clicking on a satisfied number executes a "chord", revealing all remaining unflagged neighbors in one click.',
          'On mobile touchscreens, long-pressing to flag can feel slow. Qivlix Cyber Sweeper solves this with an instant-toggle "Flag Mode" button. When Flag Mode is armed, single taps swiftly mark nodes with high-voltage flags without delay.',
          'Once flags are placed, switch back to Dig Mode and double-tap the numbered tile to chord-clear surrounding areas instantly.'
        ]
      },
      {
        title: '4. When a 50/50 Guess Is Truly Unavoidable',
        content: [
          'On rare occasions in corners of high-density Master grids, a closed 2x2 cluster creates a true 50/50 probability branch with zero exterior clues.',
          'If you determine that a sector is mathematically ambiguous, execute your guess immediately rather than saving it for the end of the game. Guessing early prevents wasting 5 minutes methodically clearing the rest of the board only to lose on the final tile.'
        ]
      }
    ],
    tags: ['Cyber Sweeper', 'Minesweeper Tactics', 'Logic Puzzles', 'Deductive Reasoning']
  },
  {
    id: 'cyber-snake-speed-management',
    slug: 'cyber-snake-speed-management',
    title: 'Cyber Snake Mastery: High-Speed Wall Wrapping and Tail Routing Mechanics',
    subtitle: 'How to survive 90+ body segments, avoid head-to-tail self-entrapment, and exploit Wrap Mode.',
    gameSlug: 'snake',
    gameTitle: 'Cyber Snake',
    category: 'Arcade',
    author: 'Shahanur Mollah',
    authorRole: 'Founder & Game Architect, Qivlix',
    readTime: '6 min read',
    publishedDate: 'January 2026',
    summary: 'Cyber Snake brings high-voltage velocity and procedural lighting to the classic Nokia arcade formula. As your serpent ingests energy orbs, velocity increases exponentially while free turning space diminishes. Discover how grandmaster serpent pilots survive lengths exceeding 100 tiles.',
    keyTakeaways: [
      'Adopt the Hamiltonian serpentine pattern to systematically cover the arena without trapping your head.',
      'In Barrier Mode, hug walls tightly; in Wrap Mode, use boundary teleports to escape coiled corners.',
      'Never double-back directly along your neck—maintain at least a 2-tile turning radius at maximum speed.',
      'Golden power cores yield 3x points but only remain active for 6 seconds; assess navigation safety before dashing toward them.'
    ],
    sections: [
      {
        title: '1. Velocity Scaling and Tick Latency',
        content: [
          'Cyber Snake runs on a synchronized game loop that ticks every 120ms at baseline speed. With every 5 energy orbs consumed, the tick interval decreases by 4ms until reaching a blisteringly fast 60ms threshold.',
          'At 60ms per grid cell, human visual-motor reaction time (typically 200–250ms) is too slow to steer reactively. You cannot wait to see a barrier and then decide where to turn. You must buffer directional inputs into the engine 2 to 3 cells before the turn coordinate.'
        ]
      },
      {
        title: '2. The Serpentine S-Curve Routine',
        content: [
          'When your snake length exceeds 40 tiles, traveling freely through the center of the arena becomes suicidal. The safest methodology is the Serpentine S-Curve, inspired by mathematical Hamiltonian cycles.',
          'Trace a zig-zag trajectory across the vertical axis: sweep down column A, turn right at the bottom into column B, sweep up column B, turn right at the top into column C, and repeat.',
          'This pattern packs your tail into compact, parallel columns, leaving the opposite perimeter completely clear for a clean return path.'
        ],
        tips: [
          'Keep your eye fixed on your tail tip: wherever your tail vacates, that cell is guaranteed open on the very next tick.',
          'When chasing a rogue orb, ensure your return corridor back to the perimeter remains unblocked.'
        ]
      },
      {
        title: '3. Wrap Mode vs. Classic Hard Barrier Mode',
        content: [
          'In Qivlix Cyber Snake settings, players can toggle between two distinct collision modes:',
          'Hard Barrier Mode: Colliding with the outer perimeter wall causes an immediate terminal crash. This mode demands strict perimeter clearance and offers the most authentic retro challenge.',
          'Wrap Mode: Hitting a perimeter border teleports your serpent head directly to the opposing side of the matrix. While this prevents wall crashes, it introduces a unique hazard: wrapping directly into your own elongated body on the other side! Always verify that the entry vector on the opposite wall is unoccupied before diving through.'
        ]
      }
    ],
    tags: ['Cyber Snake', 'Arcade Mechanics', 'Reflex Games', 'Speedrun Strategy']
  },
  {
    id: 'neon-breakout-deflection-physics',
    slug: 'neon-breakout-deflection-physics',
    title: 'Neon Breakout Pro Guide: Paddle Angle Physics, Multi-Ball Trajectories & Sector Clearing',
    subtitle: 'Master paddle edge deflection angles, laser beam management, and multi-ball chaos control.',
    gameSlug: 'neon-breakout',
    gameTitle: 'Neon Breakout',
    category: 'Arcade',
    author: 'Shahanur Mollah',
    authorRole: 'Founder & Game Architect, Qivlix',
    readTime: '6 min read',
    publishedDate: 'January 2026',
    summary: 'Neon Breakout reinvents the vintage brick breaker with 60fps vector physics, dynamic paddle slicing, and explosive tiered power-ups. Learn how striking the ball with different segments of your paddle allows precision targeting of high-value reinforced neon bricks.',
    keyTakeaways: [
      'The ball bounce angle is determined by the distance between the impact point and paddle center—not just the incoming trajectory.',
      'Slicing the ball with the outer 10% of the paddle produces sharp shallow angles that slice behind top brick rows.',
      'Laser cannons penetrate multi-hit armored bricks from distance without altering ball velocities.',
      'During Multi-Ball states, track the lowest falling ball first; higher balls give you extra seconds of reaction buffer.'
    ],
    sections: [
      {
        title: '1. Anatomy of the Paddle Collision Engine',
        content: [
          'In many rudimentary brick games, ball deflection uses simple axis reflection (angle in equals angle out). This makes steering the ball feel sluggish and unresponsive.',
          'In Neon Breakout, the bounce angle is dynamically computed using normalized paddle coordinates from -1.0 (extreme left tip) to +1.0 (extreme right tip).',
          'Striking the exact center of the paddle (coordinate 0.0) sends the ball vertically at an 85–90 degree angle. Striking the outer wings (coordinates +/- 0.8 to 1.0) deflects the ball at aggressive 25–35 degree horizontal skims.'
        ]
      },
      {
        title: '2. The "Ceiling Trap" Technique',
        content: [
          'The fastest way to clear high-tier stages is punching a narrow vertical chimney through one side of the brick formation.',
          'Once a 2-brick wide tunnel is carved open to the ceiling, use an edge deflection to send the ball up the chute. When the ball enters the void between the top of the bricks and the ceiling, it bounces rapidly between the ceiling and the back of the brick formation.',
          'This "Ceiling Trap" shatters dozens of bricks in seconds without requiring any paddle interaction until the ball eventually drops back down.'
        ],
        tips: [
          'Aim exclusively for the leftmost or rightmost columns during the opening 30 seconds of any sector.',
          'Avoid collecting the "Speed Up" pill if you already have 3 balls active—keep ball velocities manageable.'
        ]
      },
      {
        title: '3. Power-Up Tier Ranking & Tactics',
        content: [
          'Tier S: Multi-Ball. Triples your offensive firepower and multiplies point accrual.',
          'Tier S: Laser Cannon. Mounts twin energy blaster turrets on your paddle wings. Press Spacebar or tap the Laser trigger to fire directly into reinforced bricks, shattering them safely from a distance.',
          'Tier A: Wide Paddle. Expands your deflector surface by 35%, significantly reducing the probability of letting balls slip through the floor shield.',
          'Tier B: Spare Shield. Restores an energy life to your backup reserve.'
        ]
      }
    ],
    tags: ['Neon Breakout', 'Brick Breaker', 'Vector Physics', 'Arcade Tactics']
  }
];

export const getGuideBySlug = (slug: string): GuideArticle | undefined => {
  return GUIDES.find((g) => g.slug === slug);
};

export const getGuideByGameSlug = (gameSlug: string): GuideArticle | undefined => {
  return GUIDES.find((g) => g.gameSlug === gameSlug);
};

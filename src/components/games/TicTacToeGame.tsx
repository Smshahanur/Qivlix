import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Bot, User, Trophy, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';

type Player = 'X' | 'O';
type Board = (Player | null)[];
type GameMode = 'ai_unbeatable' | 'ai_casual' | 'pvp';

const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export const TicTacToeGame: React.FC = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [turn, setTurn] = useState<Player>('X');
  const [mode, setMode] = useState<GameMode>('ai_unbeatable');
  const [playerSymbol, setPlayerSymbol] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | 'TIE' | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [stats, setStats] = useState<{ wins: number; losses: number; ties: number; streak: number }>(() => {
    try {
      const saved = localStorage.getItem('qivlix_tictactoe_stats');
      return saved ? JSON.parse(saved) : { wins: 0, losses: 0, ties: 0, streak: 0 };
    } catch {
      return { wins: 0, losses: 0, ties: 0, streak: 0 };
    }
  });

  const checkWinner = (currentBoard: Board): { winner: Player | 'TIE' | null; line: number[] | null } => {
    for (const combo of WINNING_COMBOS) {
      const [a, b, c] = combo;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return { winner: currentBoard[a], line: combo };
      }
    }
    if (currentBoard.every((cell) => cell !== null)) {
      return { winner: 'TIE', line: null };
    }
    return { winner: null, line: null };
  };

  // Minimax algorithm for unbeatable AI
  const minimax = (newBoard: Board, depth: number, isMaximizing: boolean, aiSym: Player, humanSym: Player): number => {
    const { winner: winState } = checkWinner(newBoard);
    if (winState === aiSym) return 10 - depth;
    if (winState === humanSym) return depth - 10;
    if (winState === 'TIE') return 0;

    if (isMaximizing) {
      let best = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (newBoard[i] === null) {
          newBoard[i] = aiSym;
          best = Math.max(best, minimax(newBoard, depth + 1, false, aiSym, humanSym));
          newBoard[i] = null;
        }
      }
      return best;
    } else {
      let best = Infinity;
      for (let i = 0; i < 9; i++) {
        if (newBoard[i] === null) {
          newBoard[i] = humanSym;
          best = Math.min(best, minimax(newBoard, depth + 1, true, aiSym, humanSym));
          newBoard[i] = null;
        }
      }
      return best;
    }
  };

  const getBestMove = (currentBoard: Board, aiSym: Player, humanSym: Player, isUnbeatable: boolean): number => {
    // If casual mode, 35% chance to make random open move
    if (!isUnbeatable && Math.random() < 0.35) {
      const openIndices: number[] = [];
      currentBoard.forEach((cell, idx) => {
        if (cell === null) openIndices.push(idx);
      });
      return openIndices[Math.floor(Math.random() * openIndices.length)];
    }

    let bestVal = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        currentBoard[i] = aiSym;
        const moveVal = minimax(currentBoard, 0, false, aiSym, humanSym);
        currentBoard[i] = null;
        if (moveVal > bestVal) {
          bestVal = moveVal;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setTurn('X');
    setWinner(null);
    setWinningLine(null);
  };

  // AI Turn triggering
  useEffect(() => {
    if (mode === 'pvp' || winner !== null) return;

    const aiSymbol: Player = playerSymbol === 'X' ? 'O' : 'X';
    if (turn === aiSymbol) {
      const timer = setTimeout(() => {
        const moveIdx = getBestMove(board, aiSymbol, playerSymbol, mode === 'ai_unbeatable');
        if (moveIdx !== -1) {
          const newBoard = [...board];
          newBoard[moveIdx] = aiSymbol;
          setBoard(newBoard);
          sound.playTone(280, 'sine', 0.08, 0.1);

          const result = checkWinner(newBoard);
          if (result.winner) {
            setWinner(result.winner);
            setWinningLine(result.line);
            handleGameEnd(result.winner, aiSymbol);
          } else {
            setTurn(playerSymbol);
          }
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [turn, mode, winner, playerSymbol, board]);

  const handleGameEnd = (endWinner: Player | 'TIE', aiSymbol: Player) => {
    setStats((prev) => {
      let wins = prev.wins;
      let losses = prev.losses;
      let ties = prev.ties;
      let streak = prev.streak;

      if (endWinner === 'TIE') {
        ties += 1;
        streak = 0;
        sound.playGameOver();
      } else if (endWinner === playerSymbol) {
        wins += 1;
        streak += 1;
        sound.playVictory();
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } else {
        losses += 1;
        streak = 0;
        sound.playGameOver();
      }

      const updated = { wins, losses, ties, streak };
      try {
        localStorage.setItem('qivlix_tictactoe_stats', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleCellClick = (idx: number) => {
    if (board[idx] !== null || winner !== null) return;
    if (mode !== 'pvp' && turn !== playerSymbol) return;

    sound.playMove();
    const newBoard = [...board];
    newBoard[idx] = turn;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result.winner) {
      setWinner(result.winner);
      setWinningLine(result.line);
      const aiSymbol = playerSymbol === 'X' ? 'O' : 'X';
      handleGameEnd(result.winner, aiSymbol);
    } else {
      setTurn(turn === 'X' ? 'O' : 'X');
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto select-none">
      {/* HUD Bar */}
      <div className="w-full flex items-center justify-between p-3.5 mb-4 rounded-xl bg-slate-900/90 border border-slate-800">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Wins</div>
            <div className="text-xl font-bold font-mono text-cyan-400 tabular-nums">
              {stats.wins}
            </div>
          </div>
          <div className="border-l border-slate-800 pl-4">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Losses</div>
            <div className="text-xl font-bold font-mono text-purple-400 tabular-nums">
              {stats.losses}
            </div>
          </div>
          <div className="border-l border-slate-800 pl-4">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Ties</div>
            <div className="text-xl font-bold font-mono text-slate-400 tabular-nums">
              {stats.ties}
            </div>
          </div>
          {stats.streak > 1 && (
            <div className="border-l border-slate-800 pl-4 hidden sm:block animate-bounce">
              <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">Streak</div>
              <div className="text-xl font-bold font-mono text-amber-400">
                {stats.streak}x
              </div>
            </div>
          )}
        </div>

        <button
          onClick={resetBoard}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
          title="Restart match"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Mode & Turn Controls */}
      <div className="w-full flex items-center justify-between mb-4 px-1 gap-2">
        <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => {
              setMode('ai_unbeatable');
              resetBoard();
            }}
            className={`px-2.5 py-1 rounded text-xs transition-colors ${
              mode === 'ai_unbeatable'
                ? 'bg-purple-950/60 text-purple-300 font-semibold border border-purple-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Unbeatable AI
          </button>
          <button
            onClick={() => {
              setMode('ai_casual');
              resetBoard();
            }}
            className={`px-2.5 py-1 rounded text-xs transition-colors ${
              mode === 'ai_casual'
                ? 'bg-purple-950/60 text-purple-300 font-semibold border border-purple-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Casual AI
          </button>
          <button
            onClick={() => {
              setMode('pvp');
              resetBoard();
            }}
            className={`px-2.5 py-1 rounded text-xs transition-colors ${
              mode === 'pvp'
                ? 'bg-cyan-950/60 text-cyan-300 font-semibold border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2 Players
          </button>
        </div>

        <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
          <span>Turn:</span>
          <span className={`font-bold ${turn === 'X' ? 'text-cyan-400' : 'text-purple-400'}`}>
            {turn} {mode !== 'pvp' && turn === playerSymbol ? '(You)' : ''}
          </span>
        </div>
      </div>

      {/* 3x3 Board Grid */}
      <div className="relative w-full aspect-square max-w-[360px] p-3 rounded-2xl bg-[#090e1c] border-2 border-slate-800 shadow-2xl grid grid-cols-3 gap-2.5">
        {board.map((cell, idx) => {
          const isWinningCell = winningLine && winningLine.includes(idx);

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleCellClick(idx)}
              className={`rounded-xl border transition-all duration-200 flex items-center justify-center font-display font-black text-4xl sm:text-5xl cursor-pointer ${
                cell === 'X'
                  ? 'text-cyan-400 border-cyan-500/40 bg-cyan-950/20 shadow-md shadow-cyan-500/10'
                  : cell === 'O'
                  ? 'text-purple-400 border-purple-500/40 bg-purple-950/20 shadow-md shadow-purple-500/10'
                  : 'bg-[#101729] hover:bg-slate-800/90 border-slate-800 hover:border-slate-700'
              } ${isWinningCell ? 'ring-2 ring-amber-400 scale-105 animate-pulse z-10' : ''}`}
              aria-label={`Cell ${idx + 1}`}
            >
              {cell}
            </button>
          );
        })}

        {/* Match Result Overlay */}
        {winner && (
          <div className="absolute inset-0 rounded-2xl bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-150">
            {winner === 'TIE' ? (
              <h3 className="font-display font-black text-2xl text-slate-300 mb-1">
                Stalemate Draw!
              </h3>
            ) : winner === playerSymbol && mode !== 'pvp' ? (
              <h3 className="font-display font-black text-2xl text-cyan-400 mb-1">
                Victory!
              </h3>
            ) : mode === 'pvp' ? (
              <h3 className="font-display font-black text-2xl text-cyan-400 mb-1">
                Player {winner} Wins!
              </h3>
            ) : (
              <h3 className="font-display font-black text-2xl text-rose-400 mb-1">
                AI Outplayed You!
              </h3>
            )}
            <p className="text-xs text-slate-400 mb-5">
              {winner === 'TIE'
                ? 'A well-balanced tactical contest.'
                : `Winning pattern locked in.`}
            </p>
            <button
              onClick={resetBoard}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 hover:opacity-90 cursor-pointer"
            >
              Play Next Round
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

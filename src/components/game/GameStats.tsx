'use client';
import { GameState } from '@/types/game';

interface GameStatsProps {
  gameState: GameState;
}

const difficultyColors = {
  easy: 'text-[#00ff88] border-[#00ff88]/40 bg-[#00ff88]/10',
  medium: 'text-[#00f5ff] border-[#00f5ff]/40 bg-[#00f5ff]/10',
  hard: 'text-[#ff006e] border-[#ff006e]/40 bg-[#ff006e]/10',
};

export default function GameStats({ gameState }: GameStatsProps) {
  const { round, playerDeck, aiDeck, difficulty, playerWinStreak, aiWinStreak } =
    gameState;

  const playerPct = Math.round((playerDeck.length / 52) * 100);
  const aiPct = Math.round((aiDeck.length / 52) * 100);

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Top row */}
      <div className="flex items-center justify-between gap-2 text-sm">
        {/* Round */}
        <div className="flex items-center gap-1.5">
          <span className="text-white/40 text-xs">Round</span>
          <span className="text-white font-bold tabular-nums">{round}</span>
        </div>

        {/* Difficulty badge */}
        <span
          className={`px-2 py-0.5 rounded border text-xs font-bold uppercase tracking-wider ${difficultyColors[difficulty]}`}
        >
          {difficulty}
        </span>

        {/* Streaks */}
        <div className="flex items-center gap-2 text-xs">
          {playerWinStreak >= 3 && (
            <span className="text-[#00ff88] font-bold">
              🔥 {playerWinStreak}
            </span>
          )}
          {aiWinStreak >= 3 && (
            <span className="text-[#ff006e] font-bold">
              💀 {aiWinStreak}
            </span>
          )}
        </div>
      </div>

      {/* Progress bars */}
      <div className="flex flex-col gap-1">
        {/* AI bar */}
        <div className="flex items-center gap-2">
          <span className="text-[#ff006e]/70 text-xs w-5 text-right">AI</span>
          <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#ff006e] rounded-full transition-all duration-500"
              style={{ width: `${aiPct}%` }}
            />
          </div>
          <span className="text-[#ff006e]/70 text-xs w-6 tabular-nums">{aiDeck.length}</span>
        </div>

        {/* Player bar */}
        <div className="flex items-center gap-2">
          <span className="text-[#00f5ff]/70 text-xs w-5 text-right">You</span>
          <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00f5ff] rounded-full transition-all duration-500"
              style={{ width: `${playerPct}%` }}
            />
          </div>
          <span className="text-[#00f5ff]/70 text-xs w-6 tabular-nums">{playerDeck.length}</span>
        </div>
      </div>
    </div>
  );
}

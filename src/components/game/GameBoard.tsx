'use client';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Difficulty } from '@/types/game';
import { useGame } from '@/hooks/useGame';
import GameStats from './GameStats';
import BattleArea from './BattleArea';
import DeckPile from './DeckPile';
import EndScreen from './EndScreen';
import PauseMenu from './PauseMenu';
import Button from '@/components/ui/Button';
import SoundToggle from '@/components/ui/SoundToggle';

interface GameBoardProps {
  difficulty: Difficulty;
  onQuit: () => void;
}

export default function GameBoard({ difficulty, onQuit }: GameBoardProps) {
  const {
    gameState,
    isPaused,
    isAnimating,
    soundEnabled,
    toggleSound,
    startGame,
    playRound,
    togglePause,
    quitGame,
  } = useGame();

  // Initialize game on mount or difficulty change
  useEffect(() => {
    startGame(difficulty);
  }, [difficulty, startGame]);

  if (!gameState) return null;

  const canPlay =
    !isAnimating &&
    !isPaused &&
    gameState.phase === 'idle' &&
    gameState.playerDeck.length > 0 &&
    gameState.aiDeck.length > 0;

  const handleQuit = () => {
    quitGame();
    onQuit();
  };

  const handlePlayAgain = () => {
    startGame(difficulty);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a1a] text-white select-none">
      {/* Top bar */}
      <div className="flex-shrink-0 px-4 pt-4 pb-2 border-b border-white/5">
        <div className="max-w-lg mx-auto flex items-start gap-4">
          <div className="flex-1">
            <GameStats gameState={gameState} />
          </div>
          <div className="flex items-center gap-2 pt-1 flex-shrink-0">
            <SoundToggle enabled={soundEnabled} onToggle={toggleSound} />
            <button
              onClick={togglePause}
              disabled={gameState.phase === 'game_over'}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/20 bg-white/5 text-white/70 hover:bg-white/10 transition-all text-sm font-bold focus:outline-none disabled:opacity-40"
            >
              {isPaused ? '▶' : '⏸'}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-6 px-4 py-6 max-w-lg mx-auto w-full">
        {/* Desktop: AI deck on left, Player deck on right; Mobile: AI top, Player bottom with battle in center */}

        {/* AI Deck */}
        <div className="sm:order-1 order-1">
          <DeckPile
            count={gameState.aiDeck.length}
            label="AI Deck"
            isPlayer={false}
          />
        </div>

        {/* Battle Area */}
        <div className="sm:order-2 order-2 flex-1 flex flex-col items-center gap-4 w-full sm:w-auto">
          <BattleArea gameState={gameState} />

          {/* Play round button */}
          <div className="mt-2">
            <Button
              onClick={playRound}
              disabled={!canPlay}
              size="lg"
              variant={canPlay ? 'primary' : 'secondary'}
            >
              {isAnimating
                ? '...'
                : gameState.phase === 'war' || gameState.phase === 'war_result'
                  ? '⚔️ Resolving War...'
                  : gameState.phase === 'result'
                    ? 'Collecting Cards...'
                    : '▶ Play Round'}
            </Button>
          </div>

          {/* Quit button */}
          <button
            onClick={handleQuit}
            className="text-white/20 hover:text-white/50 text-xs transition-colors focus:outline-none"
          >
            Quit to Menu
          </button>
        </div>

        {/* Player Deck */}
        <div className="sm:order-3 order-3">
          <DeckPile
            count={gameState.playerDeck.length}
            label="Your Deck"
            isPlayer={true}
          />
        </div>
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {isPaused && (
          <PauseMenu onResume={togglePause} onQuit={handleQuit} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {gameState.phase === 'game_over' && gameState.winner && (
          <EndScreen
            gameState={gameState}
            onPlayAgain={handlePlayAgain}
            onMainMenu={handleQuit}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

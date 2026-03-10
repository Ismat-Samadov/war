'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameState } from '@/types/game';
import Button from '@/components/ui/Button';

interface EndScreenProps {
  gameState: GameState;
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

interface Confetti {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
}

const COLORS = ['#00f5ff', '#00ff88', '#ff006e', '#ff6b00', '#ffffff', '#a855f7'];

function generateConfetti(count: number): Confetti[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    size: 6 + Math.random() * 8,
  }));
}

export default function EndScreen({ gameState, onPlayAgain, onMainMenu }: EndScreenProps) {
  const isWin = gameState.winner === 'player';
  const [confetti] = useState<Confetti[]>(() => generateConfetti(40));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      {/* Confetti for win */}
      {isWin && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {confetti.map((c) => (
            <div
              key={c.id}
              className="absolute top-0 rounded-sm"
              style={{
                left: `${c.x}%`,
                width: c.size,
                height: c.size,
                backgroundColor: c.color,
                animation: `confetti-fall ${c.duration}s ease-in ${c.delay}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      {/* Card */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.1 }}
        className="relative z-10 flex flex-col items-center gap-6 px-8 py-10 rounded-2xl border max-w-sm w-full mx-4"
        style={{
          borderColor: isWin ? '#00ff88' : '#ff006e',
          backgroundColor: 'rgba(10,10,26,0.95)',
          boxShadow: `0 0 60px ${isWin ? '#00ff8840' : '#ff006e40'}`,
        }}
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.3 }}
          className="text-6xl"
        >
          {isWin ? '🏆' : '💀'}
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-black tracking-tight"
          style={{
            color: isWin ? '#00ff88' : '#ff006e',
            textShadow: `0 0 20px ${isWin ? '#00ff88' : '#ff006e'}`,
          }}
        >
          {isWin ? 'VICTORY!' : 'DEFEATED'}
        </motion.h2>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full rounded-xl border border-white/10 bg-white/5 p-4 space-y-2"
        >
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Rounds Played</span>
            <span className="text-white font-bold">{gameState.round}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Difficulty</span>
            <span
              className="font-bold capitalize"
              style={{
                color:
                  gameState.difficulty === 'easy'
                    ? '#00ff88'
                    : gameState.difficulty === 'hard'
                      ? '#ff006e'
                      : '#00f5ff',
              }}
            >
              {gameState.difficulty}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Result</span>
            <span
              className="font-bold"
              style={{ color: isWin ? '#00ff88' : '#ff006e' }}
            >
              {isWin ? 'You collected all cards' : 'AI collected all cards'}
            </span>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-3 w-full"
        >
          <Button
            onClick={onPlayAgain}
            variant="primary"
            size="md"
            className="flex-1"
          >
            Play Again
          </Button>
          <Button
            onClick={onMainMenu}
            variant="secondary"
            size="md"
            className="flex-1"
          >
            Menu
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Difficulty, HighScore } from '@/types/game';
import Button from '@/components/ui/Button';

interface MainMenuProps {
  onStart: (difficulty: Difficulty) => void;
  highScores: HighScore[];
}

const difficultyInfo: Record<
  Difficulty,
  { label: string; description: string; color: string }
> = {
  easy: {
    label: 'Easy',
    description: 'You get more high-value cards. Great for beginners.',
    color: '#00ff88',
  },
  medium: {
    label: 'Medium',
    description: 'Fair 50/50 split. The classic experience.',
    color: '#00f5ff',
  },
  hard: {
    label: 'Hard',
    description: 'AI gets more high-value cards. A real challenge.',
    color: '#ff006e',
  },
};

const suits = ['♠', '♥', '♦', '♣'];

export default function MainMenu({ onStart, highScores }: MainMenuProps) {
  const [selected, setSelected] = useState<Difficulty>('medium');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated background suits */}
      {suits.map((suit, i) => (
        <motion.span
          key={suit}
          className="absolute text-white/5 text-8xl pointer-events-none select-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.03, 0.07, 0.03],
            y: [0, -15, 0],
            rotate: [0, i % 2 === 0 ? 8 : -8, 0],
          }}
          transition={{
            duration: 3 + i * 0.7,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          style={{
            top: `${15 + i * 20}%`,
            left: i % 2 === 0 ? `${5 + i * 5}%` : undefined,
            right: i % 2 !== 0 ? `${5 + i * 5}%` : undefined,
          }}
        >
          {suit}
        </motion.span>
      ))}

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-7xl sm:text-8xl font-black tracking-tight neon-text text-[#00f5ff] mb-2">
          WAR
        </h1>
        <p className="text-white/40 text-sm tracking-widest uppercase">
          The Classic Card Game
        </p>
      </motion.div>

      {/* Difficulty selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-sm flex flex-col gap-3 mb-8"
      >
        <p className="text-white/50 text-xs uppercase tracking-widest text-center mb-1">
          Select Difficulty
        </p>
        {(Object.keys(difficultyInfo) as Difficulty[]).map((diff) => {
          const info = difficultyInfo[diff];
          const isSelected = selected === diff;
          return (
            <button
              key={diff}
              onClick={() => setSelected(diff)}
              className="w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none"
              style={{
                borderColor: isSelected ? info.color : 'rgba(255,255,255,0.1)',
                backgroundColor: isSelected
                  ? `${info.color}15`
                  : 'rgba(255,255,255,0.03)',
                boxShadow: isSelected ? `0 0 15px ${info.color}40` : 'none',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: isSelected ? info.color : 'rgba(255,255,255,0.2)',
                    boxShadow: isSelected ? `0 0 8px ${info.color}` : 'none',
                  }}
                />
                <div>
                  <div
                    className="font-bold text-sm"
                    style={{ color: isSelected ? info.color : 'rgba(255,255,255,0.7)' }}
                  >
                    {info.label}
                  </div>
                  <div className="text-white/40 text-xs mt-0.5">{info.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </motion.div>

      {/* Start button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Button size="lg" onClick={() => onStart(selected)}>
          ▶ Start Game
        </Button>
      </motion.div>

      {/* Rules */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8 max-w-sm w-full rounded-xl border border-white/10 bg-white/5 p-4"
      >
        <h3 className="text-white/60 text-xs uppercase tracking-widest mb-3 font-medium">
          How to Play
        </h3>
        <ul className="text-white/40 text-xs space-y-1.5">
          <li>• Both players flip their top card each round</li>
          <li>• Higher card wins both cards (Ace is highest)</li>
          <li>• Equal values trigger <span className="text-[#ff6b00]">WAR</span> — each player places 3 face-down + 1 face-up</li>
          <li>• Win by collecting all 52 cards</li>
        </ul>
      </motion.div>

      {/* High scores */}
      {highScores.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-4 max-w-sm w-full rounded-xl border border-white/10 bg-white/5 p-4"
        >
          <h3 className="text-white/60 text-xs uppercase tracking-widest mb-3 font-medium">
            Recent Games
          </h3>
          <div className="space-y-1.5">
            {highScores.slice(0, 5).map((score, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span
                  className={
                    score.winner === 'player' ? 'text-[#00ff88]' : 'text-[#ff006e]'
                  }
                >
                  {score.winner === 'player' ? 'Victory' : 'Defeat'}
                </span>
                <span className="text-white/30 capitalize">{score.difficulty}</span>
                <span className="text-white/30">{score.rounds} rounds</span>
                <span className="text-white/20">
                  {new Date(score.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

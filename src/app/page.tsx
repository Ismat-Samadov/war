'use client';
import { useState } from 'react';
import MainMenu from '@/components/game/MainMenu';
import GameBoard from '@/components/game/GameBoard';
import { Difficulty } from '@/types/game';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { HighScore } from '@/types/game';

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [highScores] = useLocalStorage<HighScore[]>('war-high-scores', []);

  return (
    <main className="min-h-screen bg-[#0a0a1a] overflow-hidden">
      {!gameStarted ? (
        <MainMenu
          highScores={highScores}
          onStart={(d) => {
            setDifficulty(d);
            setGameStarted(true);
          }}
        />
      ) : (
        <GameBoard
          difficulty={difficulty}
          onQuit={() => setGameStarted(false)}
        />
      )}
    </main>
  );
}

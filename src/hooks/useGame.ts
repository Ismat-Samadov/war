'use client';
import { useState, useCallback, useRef } from 'react';
import { GameState, Difficulty, HighScore } from '@/types/game';
import {
  initGame,
  executeBattle,
  resolveRound,
  executeWar,
} from '@/lib/gameEngine';
import { useLocalStorage } from './useLocalStorage';
import { useSound } from './useSound';

export function useGame() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [highScores, setHighScores] = useLocalStorage<HighScore[]>(
    'war-high-scores',
    []
  );
  const { soundEnabled, toggleSound, playCardFlip, playWin, playLose, playWar } =
    useSound();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPendingTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const startGame = useCallback(
    (difficulty: Difficulty) => {
      clearPendingTimeout();
      setIsAnimating(false);
      setIsPaused(false);
      setGameState(initGame(difficulty));
    },
    []
  );

  const saveHighScore = useCallback(
    (state: GameState) => {
      if (!state.winner) return;
      const newScore: HighScore = {
        rounds: state.round,
        difficulty: state.difficulty,
        winner: state.winner,
        date: new Date().toISOString(),
      };
      setHighScores((prev) => {
        const updated = [newScore, ...prev].slice(0, 10);
        return updated;
      });
    },
    [setHighScores]
  );

  const processWarSequence = useCallback(
    (stateAfterBattle: GameState) => {
      // Show WAR announcement for 1.5s, then execute war cards
      playWar();
      setIsAnimating(true);
      timeoutRef.current = setTimeout(() => {
        const warState = executeWar(stateAfterBattle);
        setGameState(warState);
        playCardFlip();

        if (warState.phase === 'war') {
          // Double war - recurse
          processWarSequence(warState);
          return;
        }

        if (warState.phase === 'game_over') {
          setIsAnimating(false);
          saveHighScore(warState);
          if (warState.winner === 'player') playWin();
          else playLose();
          return;
        }

        // war_result - resolve after 2s
        timeoutRef.current = setTimeout(() => {
          const resolved = resolveRound(warState);
          setGameState(resolved);

          if (resolved.phase === 'game_over') {
            saveHighScore(resolved);
            if (resolved.winner === 'player') playWin();
            else playLose();
          }
          setIsAnimating(false);
        }, 2000);
      }, 1500);
    },
    [playCardFlip, playLose, playWar, playWin, saveHighScore]
  );

  const playRound = useCallback(() => {
    if (!gameState || isAnimating || isPaused) return;
    if (gameState.phase !== 'idle') return;

    clearPendingTimeout();
    setIsAnimating(true);
    playCardFlip();

    const afterBattle = executeBattle(gameState);
    setGameState(afterBattle);

    if (afterBattle.phase === 'war') {
      processWarSequence(afterBattle);
      return;
    }

    if (afterBattle.phase === 'game_over') {
      setIsAnimating(false);
      saveHighScore(afterBattle);
      if (afterBattle.winner === 'player') playWin();
      else playLose();
      return;
    }

    // result phase — auto-resolve after 2s
    timeoutRef.current = setTimeout(() => {
      const resolved = resolveRound(afterBattle);
      setGameState(resolved);

      if (resolved.phase === 'game_over') {
        saveHighScore(resolved);
        if (resolved.winner === 'player') playWin();
        else playLose();
      }
      setIsAnimating(false);
    }, 2000);
  }, [
    gameState,
    isAnimating,
    isPaused,
    playCardFlip,
    playLose,
    playWin,
    processWarSequence,
    saveHighScore,
  ]);

  const togglePause = useCallback(() => {
    setIsPaused((p) => !p);
  }, []);

  const quitGame = useCallback(() => {
    clearPendingTimeout();
    setGameState(null);
    setIsAnimating(false);
    setIsPaused(false);
  }, []);

  return {
    gameState,
    isPaused,
    isAnimating,
    highScores,
    soundEnabled,
    toggleSound,
    startGame,
    playRound,
    togglePause,
    quitGame,
  };
}

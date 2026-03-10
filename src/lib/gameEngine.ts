import { GameState, Card, Difficulty } from '@/types/game';
import { createDeck, compareCards } from './cardUtils';

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function initGame(difficulty: Difficulty): GameState {
  const deck = createDeck();
  let playerDeck: Card[];
  let aiDeck: Card[];

  const sorted = [...deck].sort((a, b) => b.value - a.value);

  if (difficulty === 'easy') {
    playerDeck = [];
    aiDeck = [];
    for (let i = 0; i < sorted.length; i++) {
      if (i % 3 === 2) aiDeck.push(sorted[i]);
      else playerDeck.push(sorted[i]);
    }
    playerDeck = shuffleArray(playerDeck);
    aiDeck = shuffleArray(aiDeck);
  } else if (difficulty === 'hard') {
    playerDeck = [];
    aiDeck = [];
    for (let i = 0; i < sorted.length; i++) {
      if (i % 3 === 2) playerDeck.push(sorted[i]);
      else aiDeck.push(sorted[i]);
    }
    playerDeck = shuffleArray(playerDeck);
    aiDeck = shuffleArray(aiDeck);
  } else {
    playerDeck = deck.slice(0, 26);
    aiDeck = deck.slice(26);
  }

  return {
    playerDeck,
    aiDeck,
    playerCard: null,
    aiCard: null,
    warPile: [],
    warPlayerCards: [],
    warAiCards: [],
    phase: 'idle',
    round: 0,
    roundResult: null,
    winner: null,
    message: 'Click "Play Round" to start!',
    difficulty,
    playerWinStreak: 0,
    aiWinStreak: 0,
  };
}

export function executeBattle(state: GameState): GameState {
  const { playerDeck, aiDeck } = state;
  if (playerDeck.length === 0 || aiDeck.length === 0) return state;

  const playerCard = playerDeck[0];
  const aiCard = aiDeck[0];
  const newPlayerDeck = playerDeck.slice(1);
  const newAiDeck = aiDeck.slice(1);

  const result = compareCards(playerCard, aiCard);

  return {
    ...state,
    playerDeck: newPlayerDeck,
    aiDeck: newAiDeck,
    playerCard,
    aiCard,
    warPile: [playerCard, aiCard],
    phase: result === 'war' ? 'war' : 'result',
    round: state.round + 1,
    roundResult: result,
    message:
      result === 'player'
        ? 'You win this round!'
        : result === 'ai'
          ? 'AI wins this round!'
          : 'WAR!',
    playerWinStreak: result === 'player' ? state.playerWinStreak + 1 : 0,
    aiWinStreak: result === 'ai' ? state.aiWinStreak + 1 : 0,
  };
}

export function resolveRound(state: GameState): GameState {
  const { roundResult, playerDeck, aiDeck, warPile } = state;
  if (!roundResult || roundResult === 'war') return state;

  const wonCards = shuffleArray(warPile);
  const newPlayerDeck =
    roundResult === 'player' ? [...playerDeck, ...wonCards] : playerDeck;
  const newAiDeck =
    roundResult === 'ai' ? [...aiDeck, ...wonCards] : aiDeck;

  const winner =
    newPlayerDeck.length === 52
      ? 'player'
      : newAiDeck.length === 52
        ? 'ai'
        : null;
  const noCards =
    newPlayerDeck.length === 0
      ? 'ai'
      : newAiDeck.length === 0
        ? 'player'
        : null;
  const gameWinner = winner ?? noCards;

  return {
    ...state,
    playerDeck: newPlayerDeck,
    aiDeck: newAiDeck,
    playerCard: null,
    aiCard: null,
    warPile: [],
    warPlayerCards: [],
    warAiCards: [],
    phase: gameWinner ? 'game_over' : 'idle',
    roundResult: null,
    winner: gameWinner,
    message: gameWinner
      ? gameWinner === 'player'
        ? 'You Win the Game!'
        : 'AI Wins the Game!'
      : 'Click "Play Round" to continue',
  };
}

export function executeWar(state: GameState): GameState {
  const { playerDeck, aiDeck, warPile } = state;

  const playerWarCount = Math.min(4, playerDeck.length);
  const aiWarCount = Math.min(4, aiDeck.length);

  if (playerWarCount === 0 || aiWarCount === 0) {
    const winner = playerDeck.length === 0 ? 'ai' : 'player';
    return {
      ...state,
      phase: 'game_over',
      winner,
      message:
        winner === 'player'
          ? 'You Win! (AI ran out of war cards)'
          : 'AI Wins! (You ran out of war cards)',
    };
  }

  const playerWarCards = playerDeck.slice(0, playerWarCount);
  const aiWarCards = aiDeck.slice(0, aiWarCount);
  const newPlayerDeck = playerDeck.slice(playerWarCount);
  const newAiDeck = aiDeck.slice(aiWarCount);

  const playerCard = playerWarCards[playerWarCards.length - 1];
  const aiCard = aiWarCards[aiWarCards.length - 1];
  const result = compareCards(playerCard, aiCard);

  const allWarCards = [...warPile, ...playerWarCards, ...aiWarCards];

  return {
    ...state,
    playerDeck: newPlayerDeck,
    aiDeck: newAiDeck,
    playerCard,
    aiCard,
    warPile: allWarCards,
    warPlayerCards: playerWarCards.slice(0, -1),
    warAiCards: aiWarCards.slice(0, -1),
    phase: result === 'war' ? 'war' : 'war_result',
    roundResult: result,
    message:
      result === 'player'
        ? 'You win the war!'
        : result === 'ai'
          ? 'AI wins the war!'
          : 'DOUBLE WAR!',
    playerWinStreak: result === 'player' ? state.playerWinStreak + 1 : 0,
    aiWinStreak: result === 'ai' ? state.aiWinStreak + 1 : 0,
  };
}

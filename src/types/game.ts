export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type CardValue = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export interface Card {
  suit: Suit;
  value: CardValue;
  id: string;
}

export type GamePhase =
  | 'menu'
  | 'idle'
  | 'flipping'
  | 'result'
  | 'war'
  | 'war_result'
  | 'game_over';

export type Difficulty = 'easy' | 'medium' | 'hard';
export type RoundResult = 'player' | 'ai' | 'war';

export interface GameState {
  playerDeck: Card[];
  aiDeck: Card[];
  playerCard: Card | null;
  aiCard: Card | null;
  warPile: Card[];
  warPlayerCards: Card[];
  warAiCards: Card[];
  phase: GamePhase;
  round: number;
  roundResult: RoundResult | null;
  winner: 'player' | 'ai' | null;
  message: string;
  difficulty: Difficulty;
  playerWinStreak: number;
  aiWinStreak: number;
}

export interface HighScore {
  rounds: number;
  difficulty: Difficulty;
  winner: 'player' | 'ai';
  date: string;
}

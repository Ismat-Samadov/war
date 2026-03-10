# WAR - Card Game

A production-ready, neon-styled War card game built with Next.js 15, TypeScript, Tailwind CSS v4, and Framer Motion.

## Features

- Full War card game logic with war (tie) sequences and double-war support
- Three difficulty levels (Easy / Medium / Hard) with biased card distribution
- Framer Motion animations: card flip-ins, result banners, confetti on win, war shake effect
- Web Audio API synthesized sounds (no external audio files) with mute toggle
- Responsive layout — works on mobile and desktop
- Persistent high scores stored in localStorage
- Pause menu overlay
- Neon casino dark theme with cyan / pink / orange accent colors

## Tech Stack

- [Next.js 15](https://nextjs.org/) — App Router, React Server Components
- [TypeScript](https://www.typescriptlang.org/) — strict mode throughout
- [Tailwind CSS v4](https://tailwindcss.com/) — utility-first styling with arbitrary values
- [Framer Motion](https://www.framer.com/motion/) — animations

## Game Rules

1. A standard 52-card deck is split equally between you and the AI (26 cards each).
2. Each round both players flip their top card — the higher card wins both.
3. Card ranking (low to high): 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A.
4. **WAR**: When both cards have equal value, each player places 3 cards face-down and 1 card face-up. The higher face-up card wins all cards on the table.
5. Double War is possible if the war cards also tie — the process repeats.
6. If a player runs out of cards during a war, they lose immediately.
7. The game ends when one player holds all 52 cards.

## Difficulty

| Level  | Description |
|--------|-------------|
| Easy   | Player receives ~2/3 of high-value cards |
| Medium | Fair 50/50 random split |
| Hard   | AI receives ~2/3 of high-value cards |

## Controls

| Action | Control |
|--------|---------|
| Play Round | Click "Play Round" button |
| Pause | Click the pause button (top-right) |
| Mute / Unmute | Click the sound button (top-right) |
| Quit to menu | Click "Quit to Menu" link |

## Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push the repository to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects Next.js — no additional configuration needed.
4. Click **Deploy**.

## Screenshots

_Add screenshots here_

## Project Structure

```
src/
├── app/
│   ├── globals.css       # Tailwind v4 + custom keyframes
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Entry point — menu / game toggle
├── components/
│   ├── game/
│   │   ├── BattleArea.tsx   # Center battle display
│   │   ├── CardFace.tsx     # Individual card renderer
│   │   ├── DeckPile.tsx     # Stacked deck visual
│   │   ├── EndScreen.tsx    # Win/lose overlay with confetti
│   │   ├── GameBoard.tsx    # Main game layout
│   │   ├── GameStats.tsx    # Round counter + progress bars
│   │   ├── MainMenu.tsx     # Start screen
│   │   └── PauseMenu.tsx    # Pause overlay
│   └── ui/
│       ├── Button.tsx       # Neon glow button
│       └── SoundToggle.tsx  # Sound on/off button
├── hooks/
│   ├── useGame.ts          # Main game state + logic orchestration
│   ├── useLocalStorage.ts  # SSR-safe localStorage hook
│   └── useSound.ts         # Web Audio API synthesized sounds
├── lib/
│   ├── cardUtils.ts        # Deck creation, card helpers, compareCards
│   └── gameEngine.ts       # Pure game state transitions
└── types/
    └── game.ts             # All TypeScript types
```

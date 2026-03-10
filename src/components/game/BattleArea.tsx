'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { GameState } from '@/types/game';
import CardFace from './CardFace';

interface BattleAreaProps {
  gameState: GameState;
}

export default function BattleArea({ gameState }: BattleAreaProps) {
  const {
    playerCard,
    aiCard,
    phase,
    roundResult,
    message,
    warPlayerCards,
    warAiCards,
  } = gameState;

  const isWar = phase === 'war' || phase === 'war_result';
  const showResult = phase === 'result' || phase === 'war_result';

  const resultColor =
    roundResult === 'player'
      ? 'text-[#00ff88]'
      : roundResult === 'ai'
        ? 'text-[#ff006e]'
        : 'text-[#ff6b00]';

  const resultGlow =
    roundResult === 'player'
      ? 'shadow-[0_0_30px_#00ff88]'
      : roundResult === 'ai'
        ? 'shadow-[0_0_30px_#ff006e]'
        : 'shadow-[0_0_30px_#ff6b00]';

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* AI side label */}
      <span className="text-[#ff006e]/60 text-xs uppercase tracking-widest font-medium">
        AI&apos;s Card
      </span>

      {/* War face-down cards row */}
      <AnimatePresence>
        {isWar && warAiCards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex gap-1"
          >
            {warAiCards.map((_, i) => (
              <CardFace key={i} faceDown size="sm" />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI card */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {aiCard ? (
            <motion.div
              key={`ai-${aiCard.id}`}
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <CardFace card={aiCard} size="lg" />
            </motion.div>
          ) : (
            <motion.div key="ai-empty">
              <CardFace card={null} size="lg" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* VS / Result divider */}
      <div className="flex items-center gap-3 w-full max-w-xs">
        <div className="flex-1 h-px bg-white/10" />
        <AnimatePresence mode="wait">
          {showResult ? (
            <motion.div
              key="result"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              className={`px-3 py-1 rounded-lg border text-sm font-bold ${resultColor} ${resultGlow} border-current bg-black/60`}
            >
              {roundResult === 'player'
                ? 'YOU WIN'
                : roundResult === 'ai'
                  ? 'AI WINS'
                  : 'WAR!'}
            </motion.div>
          ) : phase === 'war' ? (
            <motion.div
              key="war-announce"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [1, 1.15, 1], opacity: 1 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
              className="px-3 py-1 rounded-lg border border-[#ff6b00] text-[#ff6b00] text-sm font-bold shadow-[0_0_20px_#ff6b00] war-shake bg-black/60"
            >
              ⚔️ WAR!
            </motion.div>
          ) : (
            <motion.span
              key="vs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/30 text-sm font-bold"
            >
              VS
            </motion.span>
          )}
        </AnimatePresence>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Player card */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {playerCard ? (
            <motion.div
              key={`player-${playerCard.id}`}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <CardFace card={playerCard} size="lg" />
            </motion.div>
          ) : (
            <motion.div key="player-empty">
              <CardFace card={null} size="lg" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* War face-down cards row */}
      <AnimatePresence>
        {isWar && warPlayerCards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex gap-1"
          >
            {warPlayerCards.map((_, i) => (
              <CardFace key={i} faceDown size="sm" />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Player side label */}
      <span className="text-[#00f5ff]/60 text-xs uppercase tracking-widest font-medium">
        Your Card
      </span>

      {/* Message */}
      <AnimatePresence mode="wait">
        <motion.p
          key={message}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className={`text-sm font-medium text-center ${
            phase === 'war' || phase === 'war_result'
              ? 'text-[#ff6b00]'
              : showResult
                ? resultColor
                : 'text-white/50'
          }`}
        >
          {message}
        </motion.p>
      </AnimatePresence>

      {/* War pile indicator */}
      <AnimatePresence>
        {gameState.warPile.length > 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5 text-[#ff6b00]/70 text-xs"
          >
            <span>⚔️</span>
            <span>{gameState.warPile.length} cards at stake</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';
import { motion, AnimatePresence } from 'framer-motion';

interface DeckPileProps {
  count: number;
  label: string;
  isPlayer?: boolean;
}

export default function DeckPile({ count, label, isPlayer = false }: DeckPileProps) {
  const accentColor = isPlayer ? '#00f5ff' : '#ff006e';
  const empty = count === 0;

  const stackCards = Math.min(count, 5);

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-white/50 text-xs uppercase tracking-widest font-medium">
        {label}
      </span>

      {/* Stack visual */}
      <div className="relative w-24 h-36 flex items-center justify-center">
        {!empty ? (
          <>
            {Array.from({ length: stackCards }).map((_, i) => (
              <div
                key={i}
                className="absolute w-20 h-28 rounded-xl border-2"
                style={{
                  borderColor: `${accentColor}30`,
                  backgroundColor: '#1a0a3a',
                  backgroundImage:
                    'repeating-linear-gradient(45deg, #2a1060 0px, #2a1060 3px, #1a0a3a 3px, #1a0a3a 10px)',
                  transform: `translateY(${-(stackCards - 1 - i) * 2}px) translateX(${(i - (stackCards - 1) / 2) * 1}px)`,
                  zIndex: i,
                }}
              />
            ))}
          </>
        ) : (
          <div className="w-20 h-28 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center">
            <span className="text-white/20 text-xs">Empty</span>
          </div>
        )}
      </div>

      {/* Count badge */}
      <AnimatePresence mode="wait">
        <motion.div
          key={count}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          <span
            className="text-2xl font-bold tabular-nums"
            style={{ color: accentColor }}
          >
            {count}
          </span>
          <span className="text-white/40 text-xs ml-1">cards</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

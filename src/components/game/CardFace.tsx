'use client';
import { motion } from 'framer-motion';
import { Card } from '@/types/game';
import { getCardLabel, getSuitSymbol, isRedSuit } from '@/lib/cardUtils';

interface CardFaceProps {
  card?: Card | null;
  faceDown?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: { card: 'w-16 h-24', label: 'text-xs', center: 'text-2xl' },
  md: { card: 'w-24 h-36', label: 'text-sm', center: 'text-4xl' },
  lg: { card: 'w-28 h-40 sm:w-32 sm:h-44', label: 'text-base', center: 'text-5xl' },
};

export default function CardFace({ card, faceDown = false, size = 'md' }: CardFaceProps) {
  const sz = sizes[size];

  if (!card && !faceDown) {
    return (
      <div
        className={`${sz.card} rounded-xl border-2 border-dashed border-white/10 bg-white/5 flex items-center justify-center`}
      >
        <span className="text-white/20 text-3xl">?</span>
      </div>
    );
  }

  if (faceDown) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`${sz.card} rounded-xl border-2 border-[#4a3080]/60 bg-[#1a0a3a] relative overflow-hidden shadow-lg`}
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #2a1060 0px, #2a1060 4px, #1a0a3a 4px, #1a0a3a 12px)',
        }}
      >
        <div className="absolute inset-1 rounded-lg border border-[#6030a0]/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[#6030a0]/60 text-2xl">✦</span>
        </div>
      </motion.div>
    );
  }

  if (!card) return null;

  const red = isRedSuit(card.suit);
  const label = getCardLabel(card.value);
  const symbol = getSuitSymbol(card.suit);
  const colorClass = red ? 'text-[#ff4466]' : 'text-white';
  const borderColor = red ? 'border-[#ff4466]/40' : 'border-[#00f5ff]/30';
  const glowClass = red
    ? 'shadow-[0_0_15px_rgba(255,68,102,0.25)]'
    : 'shadow-[0_0_15px_rgba(0,245,255,0.15)]';

  return (
    <motion.div
      initial={{ scale: 0.8, rotateY: 90, opacity: 0 }}
      animate={{ scale: 1, rotateY: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`${sz.card} rounded-xl border-2 ${borderColor} bg-white/8 backdrop-blur-sm relative flex flex-col justify-between p-1.5 ${glowClass} overflow-hidden select-none`}
    >
      {/* Top-left corner */}
      <div className={`flex flex-col items-start leading-none ${colorClass} ${sz.label} font-bold`}>
        <span>{label}</span>
        <span>{symbol}</span>
      </div>

      {/* Center suit */}
      <div className={`absolute inset-0 flex items-center justify-center ${colorClass}`}>
        <span className={sz.center}>{symbol}</span>
      </div>

      {/* Bottom-right corner (rotated) */}
      <div
        className={`flex flex-col items-end leading-none ${colorClass} ${sz.label} font-bold rotate-180`}
      >
        <span>{label}</span>
        <span>{symbol}</span>
      </div>
    </motion.div>
  );
}

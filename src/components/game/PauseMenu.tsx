'use client';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

interface PauseMenuProps {
  onResume: () => void;
  onQuit: () => void;
}

export default function PauseMenu({ onResume, onQuit }: PauseMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className="flex flex-col items-center gap-6 px-8 py-10 rounded-2xl border border-[#00f5ff]/30 bg-[#0a0a1a]/95 shadow-[0_0_40px_#00f5ff20] max-w-xs w-full mx-4"
      >
        <h2 className="text-3xl font-black text-[#00f5ff]">PAUSED</h2>
        <div className="flex flex-col gap-3 w-full">
          <Button onClick={onResume} variant="primary" size="lg" className="w-full">
            ▶ Resume
          </Button>
          <Button onClick={onQuit} variant="danger" size="md" className="w-full">
            Quit to Menu
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

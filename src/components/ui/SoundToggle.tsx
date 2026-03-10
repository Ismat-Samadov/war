'use client';

interface SoundToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export default function SoundToggle({ enabled, onToggle }: SoundToggleProps) {
  return (
    <button
      onClick={onToggle}
      title={enabled ? 'Mute sound' : 'Enable sound'}
      className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/20 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200 text-lg focus:outline-none"
    >
      {enabled ? '🔊' : '🔇'}
    </button>
  );
}

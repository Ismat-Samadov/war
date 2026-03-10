'use client';
import { ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Button({
  onClick,
  children,
  variant = 'primary',
  disabled = false,
  size = 'md',
  className = '',
}: ButtonProps) {
  const base =
    'font-bold rounded-lg border transition-all duration-200 cursor-pointer select-none focus:outline-none active:scale-95';

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  const variants = {
    primary:
      'bg-[#00f5ff]/10 border-[#00f5ff] text-[#00f5ff] hover:bg-[#00f5ff]/20 hover:shadow-[0_0_20px_#00f5ff] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none',
    secondary:
      'bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/40 disabled:opacity-40 disabled:cursor-not-allowed',
    danger:
      'bg-[#ff006e]/10 border-[#ff006e] text-[#ff006e] hover:bg-[#ff006e]/20 hover:shadow-[0_0_20px_#ff006e] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

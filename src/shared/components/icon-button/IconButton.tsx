import { cn } from '@/shared';
import React from 'react';

const IconButton = ({
  iconComponent,
  text,
  onNavigate,
  disabled = false,
}: {
  iconComponent: React.ReactNode;
  text: string;
  onNavigate?: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      className={cn(
        'sm:flex hidden items-center gap-2 cursor-pointer group',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
      onClick={onNavigate}
      disabled={disabled}
    >
      {iconComponent}
      <span className="text-[14px] group-hover:underline">{text}</span>
    </button>
  );
};

export default IconButton;

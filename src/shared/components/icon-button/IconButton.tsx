import { cn } from '@/shared';
import React from 'react';

const IconButton = ({
  iconComponent,
  text,
  onNavigate,
}: {
  iconComponent: React.ReactNode;
  text: string;
  onNavigate?: () => void;
}) => {
  return (
    <button
      className={cn('flex items-center gap-2 cursor-pointer group')}
      onClick={onNavigate}
    >
      {iconComponent}
      <span className="text-[14px] group-hover:underline">{text}</span>
    </button>
  );
};

export default IconButton;

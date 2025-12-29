import { cn } from '@/shared';
import React from 'react';

const IconButton = ({
  iconComponent,
  text,
}: {
  iconComponent: React.ReactNode;
  text: string;
}) => {
  return (
    <button className={cn('flex items-center gap-2 cursor-pointer')}>
      {iconComponent}
      <span className="text-[14px]">{text}</span>
    </button>
  );
};

export default IconButton;

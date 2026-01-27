import { cn } from '@/shared';
import type { ReactNode } from 'react';

interface InfoListProps {
  children: ReactNode;
  className?: string;
}

const InfoList = ({ children, className }: InfoListProps) => {
  return (
    <div
      className={cn('info__list', 'inline-flex flex-col gap-[12px]', className)}
    >
      {children}
    </div>
  );
};

export default InfoList;

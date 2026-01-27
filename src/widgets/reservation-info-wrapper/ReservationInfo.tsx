import { cn } from '@/shared';
import type { ReactNode } from 'react';

interface ReservationInfoProps {
  title: string;
  children: ReactNode;
}

const ReservationInfo = ({ title, children }: ReservationInfoProps) => {
  return (
    <div className={cn('reservation__info', 'flex-1')}>
      <h3 className={cn('text-[22px] font-bold mb-[20px]')}>{title}</h3>
      {children}
    </div>
  );
};

export default ReservationInfo;

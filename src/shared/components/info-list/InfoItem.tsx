import { cn } from '@/shared';
import type { ReactNode } from 'react';

interface InfoItemProps {
  label: string;
  value: ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

const InfoItem = ({
  label,
  value,
  className,
  labelClassName,
  valueClassName,
}: InfoItemProps) => {
  return (
    <div className={cn('info__item', 'flex', className)}>
      <span
        className={cn(
          'info__label',
          'w-[100px] text-[#666] text-[14px]',
          labelClassName,
        )}
      >
        {label}
      </span>
      <span className={cn('info__value', 'text-[14px]', valueClassName)}>
        {value}
      </span>
    </div>
  );
};

export default InfoItem;

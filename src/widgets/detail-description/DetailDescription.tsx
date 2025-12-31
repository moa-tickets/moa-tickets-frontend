import { cn } from '@/shared';
import { type ReactNode } from 'react';

const DetailDescription = ({
  dd,
  dt,
}: {
  dd: string;
  dt: string | ReactNode;
}) => {
  return (
    <dl className={cn('detail__description flex gap-[10px] text-[16px]')}>
      <dd className={cn('font-normal w-[100px]')}>{dd}</dd>
      <dt className={cn('flex-1')}>{dt}</dt>
    </dl>
  );
};

export default DetailDescription;

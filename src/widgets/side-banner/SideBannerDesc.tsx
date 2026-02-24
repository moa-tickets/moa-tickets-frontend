import type { ConcertItem } from '@/entities/types/types';
import { cn } from '@/shared';

export default function SideBannerDesc({ data }: { data: ConcertItem }) {
  return (
    <div className={cn('side__banner__desc', 'flex flex-col')}>
      <span className={cn('text-[14px] text-[#333] block mb-[10px]')}>
        {data.hallName}
      </span>
      <span className={cn('text-[14px] whitespace-nowrap')}>{data.concertName}</span>
      <span className={cn('text-[12px] mt-[6px] whitespace-nowrap')}>
        {data.concertDuration}
      </span>
    </div>
  );
}

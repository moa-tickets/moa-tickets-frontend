import { cn } from '@/shared';
import Skeleton from '@/shared/components/skeleton/Skeleton';

export default function SideBannerItemSkeleton() {
  return (
    <div
      className={cn(
        'side__banner__item__skeleton',
        'flex gap-[16px] mb-[20px]',
      )}
    >
      <Skeleton className="w-[150px] h-[150px] bg-[#ccc] rounded-[10px]" />
      <div className={cn('text__wrapper', 'flex-1')}>
        {[...Array(3)].map((_, index) => (
          <Skeleton
            key={index}
            className="w-full h-[20px] bg-[#ccc] rounded-[5px] mb-[8px]"
          />
        ))}
      </div>
    </div>
  );
}

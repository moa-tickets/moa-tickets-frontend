import { cn } from '@/shared';
import Skeleton from '@/shared/components/skeleton/Skeleton';

export default function HomeMainItemSkeleton() {
  return (
    <div className={cn('home__main__item__skeleton')}>
      <Skeleton className="w-full aspect-square rounded-[10px] bg-[#e0e0e0]" />
      <Skeleton className="w-1/2 h-[12px] mt-[10px] mb-[4px] bg-[#e0e0e0] rounded" />
      <Skeleton className="w-3/4 h-[14px] bg-[#e0e0e0] rounded" />
    </div>
  );
}

import { cn } from '@/shared';
import HomeMainItemSkeleton from './HomeMainItemSkeleton';

export default function HomeMainListSkeleton() {
  return (
    <div className={cn('home__main__list__skeleton', 'grid grid-cols-4 gap-4')}>
      {Array.from({ length: 12 }, (_, i) => (
        <HomeMainItemSkeleton key={i} />
      ))}
    </div>
  );
}

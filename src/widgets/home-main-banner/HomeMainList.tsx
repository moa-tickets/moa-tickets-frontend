import type { ConcertItem } from '@/entities/types/types';
import { cn } from '@/shared';
import HomeMainItem from './HomeMainItem';

export default function HomeMainList({ products }: { products: ConcertItem[] }) {
  return (
    <div className={cn('home__main__list', 'grid grid-cols-4 gap-4')}>
      {products.slice(0, 12).map((product: ConcertItem) => (
        <HomeMainItem key={product.concertId} product={product} />
      ))}
    </div>
  );
}

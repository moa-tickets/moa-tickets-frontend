import type { HomeProduct, HomeProductContent } from '@/entities/types/types';
import { cn } from '@/shared';
import HomeMainItem from './HomeMainItem';

export default function HomeMainList({ products }: { products: HomeProduct }) {
  return (
    <div className={cn('home__main__list', 'grid grid-cols-4 gap-4')}>
      {(products?.result?.content?.length ?? 0) > 0 ? (
        products?.result?.content
          .slice(0, 12)
          .map((product: HomeProductContent) => (
            <HomeMainItem key={product.productId} product={product} />
          ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

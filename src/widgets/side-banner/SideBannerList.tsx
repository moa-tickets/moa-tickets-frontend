import type { HomeProductContent } from '@/entities/types/types';
import { useHomeProduct } from '@/features/home-product/useHomeProduct';
import { cn } from '@/shared';
import SideBannerItem from './SideBannerItem';
import SideBannerItemSkeleton from './SideBannerItemSkeleton';

export default function SideBannerList() {
  const { potatoProducts, isPotatoProductsLoading } = useHomeProduct();

  return (
    <div className={cn('side__banner__list')}>
      {!isPotatoProductsLoading &&
        potatoProducts &&
        ((potatoProducts?.result?.content?.length ?? 0) > 0 ? (
          potatoProducts?.result?.content
            .slice(0, 8)
            .map((product: HomeProductContent, index: number) => (
              <SideBannerItem
                key={product.productId}
                data={product}
                index={index + 1}
              />
            ))
        ) : (
          <div
            className={cn(
              'no__side__banner__item',
              'h-[500px] flex justify-center items-center opacity-45',
            )}
          >
            상품이 없습니다.
          </div>
        ))}
      {isPotatoProductsLoading &&
        [...Array(3)].map((_, index) => <SideBannerItemSkeleton key={index} />)}
    </div>
  );
}

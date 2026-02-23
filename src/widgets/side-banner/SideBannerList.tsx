import type { HomeProductContent } from '@/entities/types/types';
import { useHomeProduct } from '@/features/home-product/useHomeProduct';
import { cn } from '@/shared';
import SideBannerItem from './SideBannerItem';
import SideBannerItemSkeleton from './SideBannerItemSkeleton';

export default function SideBannerList() {
  const { products, isProductsLoading } = useHomeProduct(8, '감자');

  return (
    <div className={cn('side__banner__list')}>
      {!isProductsLoading &&
        products &&
        ((products?.result?.content?.length ?? 0) > 0 ? (
          products?.result?.content.map(
            (product: HomeProductContent, index: number) => (
              <SideBannerItem
                key={product.productId}
                data={product}
                index={index + 1}
              />
            ),
          )
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
      {isProductsLoading &&
        [...Array(3)].map((_, index) => <SideBannerItemSkeleton key={index} />)}
    </div>
  );
}

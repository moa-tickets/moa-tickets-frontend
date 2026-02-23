import type { HomeProductContent } from '@/entities/types/types';
import { cn } from '@/shared';
import ImageBox from '@/shared/components/image-box/ImageBox';
import LazyImage from '@/shared/components/lazy-image/LazyImage';

export default function HomeMainItem({
  product,
}: {
  product: HomeProductContent;
}) {
  return (
    <div className={cn('home__main__item')}>
      <ImageBox
        boxSize={'100%'}
        imgElement={<LazyImage src={product.mainImageUrl} alt={product.name} />}
      />
      <span className="inline-block mt-[10px] mb-[4px] text-[12px] text-[#b9b9b9]">
        {product.brand}
      </span>
      <span className="block text-[14px]">{product.name}</span>
    </div>
  );
}

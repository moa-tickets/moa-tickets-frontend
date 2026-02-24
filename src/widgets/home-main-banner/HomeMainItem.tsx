import type { ConcertItem } from '@/entities/types/types';
import { cn } from '@/shared';
import ImageBox from '@/shared/components/image-box/ImageBox';

export default function HomeMainItem({
  product,
}: {
  product: ConcertItem;
}) {
  return (
    <div className={cn('home__main__item')}>
      <ImageBox
        boxSize={'100%'}
        imgElement={<img src={product.concertThumbnail} alt={product.concertName} />}
      />
      <span className="inline-block mt-[10px] mb-[4px] text-[12px] text-[#b9b9b9]">
        {product.hallName}
      </span>
      <span className="block text-[14px]">{product.concertName}</span>
    </div>
  );
}

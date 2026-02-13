import { cn } from '@/shared';
import ImageBox from './ImageBox';

export default function BrandProductItem({ data }: { data: any }) {
  return (
    <div className={cn('brand__product__item', 'flex flex-col')}>
      <ImageBox
        imgElement={<img src={data.mainImageUrl} alt={data.name} />}
        boxSize={150}
      />
      <span className={cn('text-[12px] text-[#ccc] block mt-[10px]')}>
        {data.brand}
      </span>
      <span
        className={cn(
          'block overflow-hidden whitespace-nowrap text-ellipsis text-[14px] font-medium',
        )}
      >
        {data.name}
      </span>
    </div>
  );
}

import type { HomeProductContent } from '@/entities/types/types';
import { cn } from '@/shared';

export default function SideBannerDesc({ data }: { data: HomeProductContent }) {
  return (
    <div className={cn('side__banner__desc', 'flex flex-col')}>
      <span className={cn('text-[14px] text-[#333] block mb-[10px]')}>
        {data.brand}
      </span>
      <span className={cn('text-[14px] whitespace-nowrap')}>{data.name}</span>
      <span className={cn('text-[12px] mt-[6px] whitespace-nowrap')}>
        {data.shortDescription}
      </span>
      <div className={cn('sale__status mt-[20px] flex items-center gap-[4px]')}>
        {data.salesPrice !== data.discountedPrice && (
          <span
            className={cn('text-[14px] font-bold text-[#fd5744] line-through')}
          >
            {data.salesPrice.toLocaleString()}원
          </span>
        )}

        <span className={cn('text-[14px] font-bold')}>
          {data.discountedPrice.toLocaleString()}원
        </span>
      </div>
    </div>
  );
}

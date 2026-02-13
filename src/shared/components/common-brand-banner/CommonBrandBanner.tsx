import { useHomeProduct } from '@/features/home-product/useHomeProduct';
import { cn } from '@/shared';
import BrandBanner from './BrandBanner';

export default function CommonBrandBanner({ title }: { title: string }) {
  return (
    <div className={cn('common__brand__banner', 'w-full')}>
      <div
        className={cn(
          'common__brand__banner__inner',
          'max-w-[1080px] mx-auto mt-[70px]',
        )}
      >
        <h2
          className={cn(
            'common__brand__banner__title',
            'text-[26px] font-bold ',
          )}
        >
          {title}
        </h2>
        <BrandBanner title={title} />
      </div>
    </div>
  );
}

import { cn } from '@/shared';
import OptimizedImage from '@/shared/components/optimized-image/OptimizedImage';

const BannerGrid = () => {
  return (
    <div className={cn('banner__grid__wrapper w-full mt-[20px] mb-[160px]')}>
      <div
        className={cn(
          'banner__grid max-w-[1080px] mx-auto grid grid-cols-3 gap-4',
        )}
      >
        <button
          className={cn(
            'banner__button aspect-[12/3] bg-[#EFF0F3] rounded-md cursor-pointer',
          )}
        >
          <OptimizedImage
            src={'/grid-banner/grid_banner_1.gif'}
            alt="grid-banner-1"
            className={cn('w-full h-full')}
          />
        </button>
        <button
          className={cn(
            'banner__button aspect-[12/3] bg-[#20A5EA] rounded-md cursor-pointer',
          )}
        >
          <OptimizedImage
            src={'/grid-banner/grid_banner_2.gif'}
            alt="grid-banner-2"
            className={cn('w-full h-full')}
          />
        </button>
        <button
          className={cn(
            'banner__button aspect-[12/3] bg-[#35230A] rounded-md cursor-pointer',
          )}
        >
          <OptimizedImage
            src={'/grid-banner/grid_banner_3.gif'}
            alt="grid-banner-3"
            className={cn('w-full h-full')}
          />
        </button>
        <button
          className={cn(
            'banner__button aspect-[12/3] bg-[#48DDFB] rounded-md cursor-pointer',
          )}
        >
          <OptimizedImage
            src={'/grid-banner/grid_banner_4.gif'}
            alt="grid-banner-4"
            className={cn('w-full h-full')}
          />
        </button>
        <button
          className={cn(
            'banner__button aspect-[12/3] bg-[#030020] rounded-md cursor-pointer',
          )}
        >
          <OptimizedImage
            src={'/grid-banner/grid_banner_5.gif'}
            alt="grid-banner-5"
            className={cn('w-full h-full')}
          />
        </button>
        <button
          className={cn(
            'banner__button aspect-[12/3] bg-[#FAF9F7] rounded-md cursor-pointer',
          )}
        >
          <OptimizedImage
            src={'/grid-banner/grid_banner_6.gif'}
            alt="grid-banner-6"
            className={cn('w-full h-full')}
          />
        </button>
      </div>
    </div>
  );
};

export default BannerGrid;

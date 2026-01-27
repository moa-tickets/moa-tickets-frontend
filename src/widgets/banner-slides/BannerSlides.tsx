import { bannerSlides } from '@/entities/constant/bannerSlides';
import { cn } from '@/shared';
import { useEffect, useState } from 'react';
import BannerSlideItem from './BannerSlideItem';

const BannerSlides = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % bannerSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        'banner__slide w-[180px] h-[50px] ml-[30px] overflow-hidden relative',
      )}
    >
      <div
        className="transition-transform duration-500 ease-in-out"
        style={{ transform: `translateY(-${currentBannerIndex * 50}px)` }}
      >
        {bannerSlides.map((slide) => (
          <BannerSlideItem key={slide.id} slide={slide} />
        ))}
      </div>
    </div>
  );
};

export default BannerSlides;

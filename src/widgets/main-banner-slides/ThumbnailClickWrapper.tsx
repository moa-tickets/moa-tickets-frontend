import type { MainBannerSlide } from '@/entities/constant/mainBannerSlides';
import { cn } from '@/shared';
import ThumbnailItem from './ThumbnailItem';
import type { Dispatch, SetStateAction } from 'react';

export default function ThumbnailClickWrapper({
  mainBannerSlides,
  currentIndex,
  setCurrentIndex,
}: {
  mainBannerSlides: MainBannerSlide[];
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div
      className={cn('thumbnail__wrapper absolute bottom-[20px] left-0 w-full')}
    >
      <div
        className={cn(
          'thumbnail__inner max-w-[1100px] mx-auto flex items-center gap-[10px]',
        )}
      >
        {mainBannerSlides.map((slide: MainBannerSlide, index: number) => (
          <ThumbnailItem
            key={slide.id}
            thumbnail={slide.smallClick}
            isActive={currentIndex === index + 1}
            index={index}
            setCurrentIndex={setCurrentIndex}
          />
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import type { mainBannerSlides } from '@/entities/constant/mainBannerSlides';
import ClickedBannerThumbnailItem from './ClickedBannerThumbnailItem';

interface BannerThumbnailProps {
  slides: typeof mainBannerSlides;
  currentIndex: number;
  onSelect: (index: number) => void;
}

const ClickedBannerThumbnails = React.memo(
  ({ slides, currentIndex, onSelect }: BannerThumbnailProps) => {
    return (
      <div className="absolute bottom-[30px] left-0 w-full">
        <ul className="max-w-[1380px] mx-auto flex gap-2 items-center">
          {slides.map((slide, index) => (
            <ClickedBannerThumbnailItem
              key={slide.id}
              slide={slide}
              index={index}
              isActive={currentIndex === index}
              onSelect={onSelect}
            />
          ))}
        </ul>
      </div>
    );
  },
);

export default ClickedBannerThumbnails;

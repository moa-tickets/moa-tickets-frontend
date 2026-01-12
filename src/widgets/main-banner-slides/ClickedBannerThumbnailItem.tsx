import type { mainBannerSlides } from '@/entities/constant/mainBannerSlides';
import { cn } from '@/shared';
import OptimizedImage from '@/shared/components/lazy-loading/LazyImage';
import React from 'react';

interface ThumbnailItemProps {
  slide: (typeof mainBannerSlides)[number];
  index: number;
  isActive: boolean;
  onSelect: (index: number) => void;
}

const ClickedBannerThumbnailItem = React.memo(
  ({ slide, index, isActive, onSelect }: ThumbnailItemProps) => {
    const handleClick = React.useCallback(() => {
      onSelect(index);
    }, [onSelect, index]);

    return (
      <li
        className={cn(
          'w-[60px] h-[60px] rounded-[20px] overflow-hidden',
          isActive && 'border-2 border-white',
        )}
      >
        <button className="w-full h-full" onClick={handleClick}>
          <OptimizedImage
            src={slide.smallClick}
            alt={`Thumbnail ${slide.id}`}
            className="w-full h-full"
          />
        </button>
      </li>
    );
  },
);

export default ClickedBannerThumbnailItem;

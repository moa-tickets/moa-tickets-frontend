import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/shared';
import type { MainBannerSlide } from '@/entities/constant/mainBannerSlides';
import OptimizedImage from '@/shared/components/optimized-image/OptimizedImage';

const BannerSlideItem = ({
  slide,
  onLinkClick,
}: {
  slide: MainBannerSlide;
  onLinkClick: (e: React.MouseEvent) => void;
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link
      to={slide.linkUrl}
      onClick={onLinkClick}
      onDragStart={(e) => e.preventDefault()}
      draggable={false}
      className={cn(
        'slide__each__wrapper relative flex-shrink-0 basis-full w-full h-full cursor-grab active:cursor-grabbing',
      )}
    >
      <OptimizedImage
        src={slide.imageUrl}
        alt={`Main Banner Slide ${slide.id}`}
        className={cn('w-full h-full')}
        skeletonClassName="bg-gray-300"
        onLoadComplete={() => setIsImageLoaded(true)}
      />
      <div
        className={cn(
          'image__text absolute inset-0 z-[50] transition-opacity duration-500',
          isImageLoaded ? 'opacity-100' : 'opacity-0',
        )}
      >
        <div
          className="image__text__inner max-w-[1380px] mx-auto h-full"
          style={{ color: slide.textColor }}
        >
          <h1 className="mt-[80px] text-[40px] font-bold mb-[10px]">
            {slide.bigText.split('|').map((text, index) => (
              <span key={index} className={'block'}>
                {text}
              </span>
            ))}
          </h1>
          <h2 className="text-[20px] mb-[30px]">{slide.middleText}</h2>
          <span className="block">{slide.smallText}</span>
          <span className="block">{slide.dateText}</span>
        </div>
      </div>
    </Link>
  );
};

export default BannerSlideItem;

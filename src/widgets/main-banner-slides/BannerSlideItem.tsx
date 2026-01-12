import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/shared';
import type { MainBannerSlide } from '@/entities/constant/mainBannerSlides';
import LazyImage from '@/shared/components/lazy-loading/LazyImage';
import { detailData } from '@/entities/constant/detailData';
import { useModalStore } from '@/entities/stores/useModalStore';

interface BannerSlideItemProps {
  slide: MainBannerSlide;
  onLinkClick: (e: React.MouseEvent) => void;
  priority?: boolean;
}

const BannerSlideItem = React.memo(
  ({ slide, onLinkClick, priority = false }: BannerSlideItemProps) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const openModal = useModalStore((state) => state.openModal);

    const isLandingPage = Object.keys(detailData).includes(String(slide.id))
      ? (detailData[slide.id].isLandingPage ?? false)
      : false;

    const isReady = slide.id === 1 || slide.id === 6;

    const linkPath = isReady
      ? isLandingPage
        ? `/landing/${slide.id}`
        : `/detail/${slide.id}`
      : '#';

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        onLinkClick(e);
        if (e.defaultPrevented) return;

        if (!isReady) {
          e.preventDefault();
          openModal('주의사항', '준비중인 페이지입니다.');
        }
      },
      [onLinkClick, isReady, openModal],
    );

    const handleImageLoad = useCallback(() => {
      setIsImageLoaded(true);
    }, []);

    const handleDragStart = useCallback((e: React.DragEvent) => {
      e.preventDefault();
    }, []);

    return (
      <Link
        to={linkPath}
        onClick={handleClick}
        onDragStart={handleDragStart}
        draggable={false}
        className={cn(
          'slide__each__wrapper relative flex-shrink-0 basis-full w-full h-full cursor-grab active:cursor-grabbing',
        )}
      >
        <LazyImage
          src={slide.imageUrl}
          alt={`Main Banner Slide ${slide.id}`}
          className={cn('w-full h-full')}
          onLoad={handleImageLoad}
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
  },
);

export default BannerSlideItem;

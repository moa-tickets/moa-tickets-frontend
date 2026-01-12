import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/shared';
import { mainBannerSlides } from '@/entities/constant/mainBannerSlides';
import BannerSlideItem from './BannerSlideItem';
import ConfirmModal from '@/shared/components/confirm-modal/ConfirmModal';
import { useModalStore } from '@/entities/stores/useModalStore';
import ClickedBannerThumbnails from './ClickedBannerThumbnails';

const MainBannerSlides = () => {
  const { isOpen, title, message, closeModal } = useModalStore();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const startX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const hasDragged = useRef<boolean>(false);

  const goToSlide = useCallback((nextIndex: number) => {
    setCurrentIndex((prev) => {
      const length = mainBannerSlides.length;
      const isLooping =
        (prev === length - 1 && nextIndex === 0) ||
        (prev === 0 && nextIndex === length - 1);

      if (isLooping) {
        setIsTransitioning(false);
      }
      return nextIndex;
    });
  }, []);

  const handleThumbnailClick = useCallback(
    (index: number) => {
      goToSlide(index);
    },
    [goToSlide],
  );

  // 트랜지션 복구
  useEffect(() => {
    if (!isTransitioning) {
      const timer = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
      return () => cancelAnimationFrame(timer);
    }
  }, [isTransitioning, currentIndex]);

  const handleDragStart = useCallback((clientX: number) => {
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = clientX;
  }, []);

  const handleDragEnd = useCallback((clientX: number) => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const diff = startX.current - clientX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      hasDragged.current = true;
    }

    const length = mainBannerSlides.length;
    if (diff > threshold) {
      // 왼쪽으로 드래그 -> 다음 슬라이드
      setCurrentIndex((prev) => (prev + 1) % length);
    } else if (diff < -threshold) {
      // 오른쪽으로 드래그 -> 이전 슬라이드
      setCurrentIndex((prev) => (prev - 1 + length) % length);
    }
  }, []);

  const handleLinkClick = useCallback((e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.preventDefault();
    }
  }, []);

  // 자동 슬라이드
  useEffect(() => {
    const timer = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % mainBannerSlides.length;
      goToSlide(nextIndex);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex, goToSlide]);

  return (
    <>
      <ConfirmModal
        isOpen={isOpen}
        onClose={closeModal}
        title={title}
        message={message}
      />
      <section
        className={cn(
          'main__banner__slides w-full h-[500px] flex overflow-hidden relative cursor-grab active:cursor-grabbing',
        )}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseUp={(e) => handleDragEnd(e.clientX)}
        onMouseLeave={(e) => handleDragEnd(e.clientX)}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
        aria-roledescription="carousel"
        aria-label="Main Banner Slides"
      >
        <div
          className={cn(
            'slides__wrapper flex w-full h-full',
            isTransitioning && 'transition-transform duration-500 ease-in-out',
          )}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {mainBannerSlides.map((slide, index) => (
            <BannerSlideItem
              key={slide.id}
              slide={slide}
              onLinkClick={handleLinkClick}
              priority={index === 0}
            />
          ))}
        </div>
        <ClickedBannerThumbnails
          slides={mainBannerSlides}
          currentIndex={currentIndex}
          onSelect={handleThumbnailClick}
        />
      </section>
    </>
  );
};

export default MainBannerSlides;

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/shared';
import { mainBannerSlides } from '@/entities/constant/mainBannerSlides';
import OptimizedImage from '@/shared/components/optimized-image/OptimizedImage';
import BannerSlideItem from './BannerSlideItem';
import ConfirmModal from '@/shared/components/confirm-modal/ConfirmModal';
import { useModalStore } from '@/entities/stores/useModalStore';

const MainBannerSlides = () => {
  const { isOpen, title, message, closeModal } = useModalStore();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const startX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const hasDragged = useRef<boolean>(false);

  const goToSlide = (nextIndex: number) => {
    const length = mainBannerSlides.length;
    const isLooping =
      (currentIndex === length - 1 && nextIndex === 0) ||
      (currentIndex === 0 && nextIndex === length - 1);

    if (isLooping) {
      setIsTransitioning(false);
    }
    setCurrentIndex(nextIndex);
  };

  // 트랜지션 복구
  useEffect(() => {
    if (!isTransitioning) {
      const timer = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
      return () => cancelAnimationFrame(timer);
    }
  }, [isTransitioning, currentIndex]);

  const handleDragStart = (clientX: number) => {
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = clientX;
  };

  const handleDragEnd = (clientX: number) => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const diff = startX.current - clientX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      hasDragged.current = true;
    }

    if (diff > threshold) {
      // 왼쪽으로 드래그 -> 다음 슬라이드
      const nextIndex = (currentIndex + 1) % mainBannerSlides.length;
      goToSlide(nextIndex);
    } else if (diff < -threshold) {
      // 오른쪽으로 드래그 -> 이전 슬라이드
      const nextIndex =
        (currentIndex - 1 + mainBannerSlides.length) % mainBannerSlides.length;
      goToSlide(nextIndex);
    }
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.preventDefault();
    }
  };

  // 자동 슬라이드
  useEffect(() => {
    const timer = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % mainBannerSlides.length;
      goToSlide(nextIndex);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

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
          'slides__wrapper flex',
          isTransitioning && 'transition-transform duration-500 ease-in-out',
        )}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {mainBannerSlides.map((slide) => (
          <BannerSlideItem
            key={slide.id}
            slide={slide}
            onLinkClick={handleLinkClick}
          />
        ))}
      </div>
      <div className={cn('absolute bottom-[30px] left-0 w-full')}>
        <ul className="max-w-[1380px] mx-auto flex gap-2 items-center">
          {mainBannerSlides.map((slide) => (
            <li
              key={slide.id}
              className={cn(
                'w-[60px] h-[60px] rounded-[20px] overflow-hidden',
                currentIndex === slide.id - 1 ? 'border-2 border-white' : '',
              )}
            >
              <button
                className={cn('cursor-pointer w-full h-full')}
                onClick={() => goToSlide(slide.id - 1)}
              >
                <OptimizedImage
                  src={slide.smallClick}
                  alt={`Thumbnail ${slide.id}`}
                  className={cn('w-full h-full')}
                  skeletonClassName="rounded-[20px]"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
    </>
  );
};

export default MainBannerSlides;

import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/shared';
import { mainBannerSlides } from '@/entities/constant/mainBannerSlides';

const MainBannerSlides = () => {
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
          <Link
            key={slide.id}
            to={slide.linkUrl}
            onClick={handleLinkClick}
            onDragStart={(e) => e.preventDefault()}
            draggable={false}
            className={cn(
              'slide__each__wrapper relative flex-shrink-0 basis-full w-full h-full cursor-grab active:cursor-grabbing',
            )}
          >
            <img
              src={slide.imageUrl}
              alt={`Main Banner Slide ${slide.id}`}
              className={cn('w-full h-full object-cover')}
              draggable={false}
            />
            <div className="image__text absolute inset-0 z-[50]">
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
                <img
                  src={slide.smallClick}
                  alt={`Thumbnail ${slide.id}`}
                  className={cn('w-full h-full object-cover')}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default MainBannerSlides;

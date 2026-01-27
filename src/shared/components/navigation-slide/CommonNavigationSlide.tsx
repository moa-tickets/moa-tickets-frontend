import React, { useState, useRef, useCallback } from 'react';
import type {
  ConcertRankSlide,
  PlayListItem,
  RecommendKeywordItem,
  WillOpenGridItem,
} from '@/entities/types/types';
import { cn } from '@/shared';
import SlideCard from '../slide-card/SlideCard';
import SlideGridCard from '../slide-card/SlideGridCard';
import SlidePlayCard from '../slide-card/SlidePlayCard';
import Icon from '@/shared/lib/Icon';

interface SlideNavButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
}

// 아이콘을 컴포넌트 외부에 상수로 정의하여 리렌더링 방지
const NavButtonIcon = <Icon ICON="RIGHT" className="w-[16px] h-[16px] fill-none" />;

const SlideNavButton = React.memo(({ direction, onClick, disabled }: SlideNavButtonProps) => {
  const isPrev = direction === 'prev';
  return (
    <button
      className={cn(
        isPrev
          ? 'slide__nav__prev rotate-[180deg] w-[46px] h-[46px] bg-[rgba(255,255,255,.9)] rounded-full flex justify-center items-center absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 z-[20] cursor-pointer text-white shadow-[0_0_8px_0_rgba(0,0,0,.13)] border border-solid border-[rgba(0,0,0,.1)] disabled:opacity-40 disabled:cursor-not-allowed'
          : 'slide__nav__next w-[46px] h-[46px] bg-[rgba(255,255,255,.9)] rounded-full flex justify-center items-center absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 z-[20] cursor-pointer text-white shadow-[0_0_8px_0_rgba(0,0,0,.13)] border border-solid border-[rgba(0,0,0,.1)] disabled:opacity-40 disabled:cursor-not-allowed',
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {NavButtonIcon}
    </button>
  );
});

const CommonNavigationSlide = ({
  type,
  data,
  className,
}: {
  type: 'VERTICAL-5' | 'GRID' | 'VERTICAL-3';
  data:
    | ConcertRankSlide[]
    | WillOpenGridItem[]
    | PlayListItem[]
    | RecommendKeywordItem[];
  className: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragOffset = useRef(0);
  const [dragDelta, setDragDelta] = useState(0);

  // 타입에 따라 보이는 카드 수와 이동 비율 설정
  const visibleCount = type === 'VERTICAL-3' ? 3 : 5;
  const maxIndex = Math.max(0, data.length - visibleCount);
  const isVertical = type.startsWith('VERTICAL');

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  }, [maxIndex]);

  // 카드 1개 너비 + gap 비율 (VERTICAL-3: 33.33%, VERTICAL-5: 20%)
  const slidePercentage = type === 'VERTICAL-3' ? 100 / 3 : 20;
  const translateX = currentIndex * slidePercentage;

  // 드래그 핸들러
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isVertical) return;
    isDragging.current = true;
    startX.current = e.clientX;
    dragOffset.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !slideRef.current) return;
    const diff = e.clientX - startX.current;
    dragOffset.current = diff;
    setDragDelta(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging.current || !slideRef.current) return;
    isDragging.current = false;

    const containerWidth = slideRef.current.offsetWidth;
    const threshold = containerWidth / (visibleCount * 3);

    if (dragOffset.current < -threshold && currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    } else if (dragOffset.current > threshold && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }

    setDragDelta(0);
    dragOffset.current = 0;
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      handleMouseUp();
    }
  };

  return (
    <div className={cn('w-full relative mb-[50px]', className)}>
      {type === 'VERTICAL-5' && (
        <>
          {/* 버튼 - 슬라이드 영역 바깥에 위치 */}
          <SlideNavButton
            direction="prev"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          />
          <SlideNavButton
            direction="next"
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
          />

          {/* 슬라이드 영역 */}
          <div
            ref={slideRef}
            className={cn('overflow-hidden', isVertical && 'cursor-grab')}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={cn(
                'slide__wrapper flex gap-4 transition-transform duration-300 ease-in-out select-none',
                isDragging.current && 'transition-none',
              )}
              style={{
                transform: `translateX(calc(-${translateX}% + ${dragDelta}px))`,
              }}
            >
              {(data as ConcertRankSlide[]).map((item) => (
                <SlideCard
                  key={item.id}
                  item={item}
                  className="w-[calc((100%-64px)/5)] flex-shrink-0"
                />
              ))}
            </div>
          </div>
        </>
      )}
      {type === 'GRID' && (
        <ul className={cn('grid grid-cols-3 gap-4')}>
          {(data as WillOpenGridItem[]).map((item: WillOpenGridItem) => (
            <li
              key={item.title}
              className={cn(
                'border border-solid border-[rgba(41,41,45,.15)] p-4 rounded-[12px]',
              )}
            >
              <SlideGridCard item={item} />
            </li>
          ))}
        </ul>
      )}
      {type === 'VERTICAL-3' && (
        <>
          {/* 버튼 - 슬라이드 영역 바깥에 위치 */}
          <SlideNavButton
            direction="prev"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          />
          <SlideNavButton
            direction="next"
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
          />

          {/* 슬라이드 영역 */}
          <div
            ref={slideRef}
            className={cn('overflow-hidden', isVertical && 'cursor-grab')}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={cn(
                'slide__wrapper flex gap-4 transition-transform duration-300 ease-in-out select-none',
                isDragging.current && 'transition-none',
              )}
              style={{
                transform: `translateX(calc(-${translateX}% + ${dragDelta}px))`,
              }}
            >
              {(data as PlayListItem[]).map((item) => (
                <SlidePlayCard
                  key={item.id}
                  item={item}
                  className="w-[calc((100%-32px)/3)] flex-shrink-0"
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CommonNavigationSlide;

import { useState } from 'react';
import type {
  ConcertRankSlide,
  PlayListItem,
  WillOpenGridItem,
} from '@/entities/types/types';
import { cn } from '@/shared';
import SlideCard from '../slide-card/SlideCard';
import SlideGridCard from '../slide-card/SlideGridCard';
import SlidePlayCard from '../slide-card/SlidePlayCard';
import Icon from '@/shared/lib/Icon';

const CommonNavigationSlide = ({
  type,
  data,
  className,
}: {
  type: 'VERTICAL-5' | 'GRID' | 'VERTICAL-3';
  data: ConcertRankSlide[] | WillOpenGridItem[] | PlayListItem[];
  className: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // 타입에 따라 보이는 카드 수와 이동 비율 설정
  const visibleCount = type === 'VERTICAL-3' ? 3 : 5;
  const maxIndex = Math.max(0, data.length - visibleCount);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  };

  // 카드 1개 너비 + gap 비율 (VERTICAL-3: 33.33%, VERTICAL-5: 20%)
  const slidePercentage = type === 'VERTICAL-3' ? 100 / 3 : 20;
  const translateX = currentIndex * slidePercentage;

  return (
    <div className={cn('w-full relative', className)}>
      {type === 'VERTICAL-5' && (
        <>
          {/* 버튼 - 슬라이드 영역 바깥에 위치 */}
          <button
            className={cn(
              'slide__nav__prev rotate-[180deg] w-[46px] h-[46px] bg-[rgba(255,255,255,.9)] rounded-full flex justify-center items-center absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 z-[20] cursor-pointer text-white shadow-[0_0_8px_0_rgba(0,0,0,.13)] border border-solid border-[rgba(0,0,0,.1)] disabled:opacity-40 disabled:cursor-not-allowed',
            )}
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <Icon ICON="RIGHT" className="w-[16px] h-[16px] fill-none" />
          </button>
          <button
            className={cn(
              'slide__nav__next w-[46px] h-[46px] bg-[rgba(255,255,255,.9)] rounded-full flex justify-center items-center absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 z-[20] cursor-pointer text-white shadow-[0_0_8px_0_rgba(0,0,0,.13)] border border-solid border-[rgba(0,0,0,.1)] disabled:opacity-40 disabled:cursor-not-allowed',
            )}
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
          >
            <Icon ICON="RIGHT" className="w-[16px] h-[16px] fill-none" />
          </button>

          {/* 슬라이드 영역 */}
          <div className={cn('overflow-hidden')}>
            <div
              className={cn(
                'slide__wrapper flex gap-4 transition-transform duration-300 ease-in-out',
              )}
              style={{ transform: `translateX(-${translateX}%)` }}
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
          <button
            className={cn(
              'slide__nav__prev rotate-[180deg] w-[46px] h-[46px] bg-[rgba(255,255,255,.9)] rounded-full flex justify-center items-center absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 z-[20] cursor-pointer text-white shadow-[0_0_8px_0_rgba(0,0,0,.13)] border border-solid border-[rgba(0,0,0,.1)] disabled:opacity-40 disabled:cursor-not-allowed',
            )}
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <Icon ICON="RIGHT" className="w-[16px] h-[16px] fill-none" />
          </button>
          <button
            className={cn(
              'slide__nav__next w-[46px] h-[46px] bg-[rgba(255,255,255,.9)] rounded-full flex justify-center items-center absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 z-[20] cursor-pointer text-white shadow-[0_0_8px_0_rgba(0,0,0,.13)] border border-solid border-[rgba(0,0,0,.1)] disabled:opacity-40 disabled:cursor-not-allowed',
            )}
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
          >
            <Icon ICON="RIGHT" className="w-[16px] h-[16px] fill-none" />
          </button>

          {/* 슬라이드 영역 */}
          <div className={cn('overflow-hidden')}>
            <div
              className={cn(
                'slide__wrapper flex gap-4 transition-transform duration-300 ease-in-out',
              )}
              style={{ transform: `translateX(-${translateX}%)` }}
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

import { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import {
  mainBannerSlides,
  type MainBannerSlide,
} from '@/entities/constant/mainBannerSlides';
import { cn } from '@/shared';
import MainBannerSlideItem from './MainBannerSlideItem';
import ThumbnailClickWrapper from './ThumbnailClickWrapper';
import type { ModalState } from '@/entities/types/types';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmModal from '@/shared/components/confirm-modal/ConfirmModal';
import { CLOSE_MODAL, OPEN_MODAL } from '@/entities/reducers/ModalReducer';
import useIntersect from '@/features/intersect/useIntersect';

const SWIPE_LIMIT = 5; // 연속 스와이프 제한 횟수
const SWIPE_RESET_TIME = 1500; // 스와이프 카운트 리셋 시간 (ms)

const MainBannerSlides = () => {
  // 모달 변수값 가져오기
  const { isOpen, title, message } = useSelector(
    (state: { modalReducer: ModalState }) => state.modalReducer,
  );

  // close 함수
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
    console.log('console');
  };

  // 슬라이드 개수
  const slideCount = mainBannerSlides.length;

  // 클론 포함 슬라이드 배열: [마지막] + [원본들] + [첫번째]
  const extendedSlides = [
    mainBannerSlides[slideCount - 1],
    ...mainBannerSlides,
    mainBannerSlides[0],
  ];

  // 현재 인덱스 (1부터 시작 - 클론 때문에)
  const [currentIndex, setCurrentIndex] = useState<number>(1);

  // 드래그 여부
  const [isDrag, setIsDrag] = useState<boolean>(false);

  // 드래그 값 관리
  const dragOffsetRef = useRef<number>(0);

  // transition 활성화 여부
  const [isTransition, setIsTransition] = useState<boolean>(true);

  // 시작 X 위치
  const startXRef = useRef<number>(0);

  // 드래그 여부 (클릭 방지용)
  const wasDragRef = useRef<boolean>(false);

  // 트랙 DOM 참조
  const trackRef = useRef<HTMLDivElement>(null);

  // 연속 스와이프 감지용
  const swipeCountRef = useRef<number>(0);
  const lastSwipeTimeRef = useRef<number>(0);

  // 감지 변수 가져오기
  const { ref, isIntersecting } = useIntersect({
    threshold: 0.2,
    rootMargin: '100px',
  });

  // 클론에서 실제 위치로 점프하기
  useEffect(() => {
    if (!isTransition) return;

    const timeout = setTimeout(() => {
      // 첫번째 클론(인덱스 0)에 도달하면 실제 마지막으로 점프
      if (currentIndex === 0) {
        setIsTransition(false);
        setCurrentIndex(slideCount);
      }
      // 마지막 클론에 도달하면 실제 첫번째로 점프
      if (currentIndex === slideCount + 1) {
        setIsTransition(false);
        setCurrentIndex(1);
      }
    }, 500); // transition 끝난 후

    return () => clearTimeout(timeout);
  }, [currentIndex, slideCount, isTransition]);

  // transition 비활성화 후 다시 활성화
  useEffect(() => {
    if (isTransition) return;

    const timeout = setTimeout(() => {
      setIsTransition(true);
    }, 50);

    return () => clearTimeout(timeout);
  }, [isTransition]);

  // 2초마다 자동 슬라이드 (드래그 중에는 일시정지)

  useEffect(() => {
    if (isDrag) return;

    let timeout = undefined;
    if (isIntersecting) {
      timeout = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 2000);
    }

    return () => {
      if (isIntersecting) {
        clearTimeout(timeout);
      }
    };
  }, [currentIndex, isDrag, isIntersecting]);

  // 드래그 하려고 눌렀을 상황
  const handleStart = useCallback((clientX: number) => {
    startXRef.current = clientX;
    setIsDrag(true);
    dragOffsetRef.current = 0;
    wasDragRef.current = false;
  }, []);

  // 드래그 중인 상황
  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDrag) return;
      const diff = clientX - startXRef.current;
      dragOffsetRef.current = diff;

      // 일정 거리 이상 움직이면 드래그로 판정
      if (Math.abs(diff) > 5) {
        wasDragRef.current = true;
      }

      // DOM 직접 조작으로 transform 업데이트
      if (trackRef.current) {
        const trackTranslate = -(currentIndex * 100);
        trackRef.current.style.transform = `translateX(calc(${trackTranslate}% + ${diff}px))`;
      }
    },
    [isDrag, currentIndex],
  );

  // 드래그 끝난 상황
  const handleEnd = useCallback(() => {
    if (!isDrag) return;

    const threshold = 50;
    const now = Date.now();

    // 스와이프 감지
    if (Math.abs(dragOffsetRef.current) > threshold) {
      // 일정 시간 지나면 카운트 리셋
      if (now - lastSwipeTimeRef.current > SWIPE_RESET_TIME) {
        swipeCountRef.current = 0;
      }

      swipeCountRef.current += 1;
      lastSwipeTimeRef.current = now;

      // 연속 스와이프 제한 초과 시 모달 표시
      if (swipeCountRef.current > SWIPE_LIMIT) {
        dispatch({
          type: OPEN_MODAL,
          payload: {
            title: '알림',
            message:
              '너무 빠르게 슬라이드하고 있습니다. 잠시 후 다시 시도해주세요.',
          },
        });
        swipeCountRef.current = 0;
        setIsDrag(false);
        dragOffsetRef.current = 0;
        return;
      }

      if (dragOffsetRef.current > threshold) {
        // 오른쪽 스와이프 -> 이전 슬라이드 (범위 제한)
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      } else if (dragOffsetRef.current < -threshold) {
        // 왼쪽 스와이프 -> 다음 슬라이드 (범위 제한)
        setCurrentIndex((prev) => Math.min(slideCount + 1, prev + 1));
      }
    }

    setIsDrag(false);
    dragOffsetRef.current = 0;
  }, [isDrag, dispatch, slideCount]);

  // 트랙 전체 이동 계산
  const trackTranslate = -(currentIndex * 100);

  return (
    <>
      {isOpen &&
        ReactDOM.createPortal(
          <ConfirmModal
            title={title!}
            message={message}
            isOpen={isOpen}
            onClose={closeModal}
          />,
          document.getElementById('modal-root')!,
        )}
      <div
        className={cn(
          'main__banner__slides w-full h-[500px] overflow-hidden select-none relative cursor-grab',
          'max-w-full mx-auto',
          isDrag && 'cursor-grabbing',
        )}
        onClickCapture={(e) => {
          // 드래그였으면 Link 클릭 차단
          if (wasDragRef.current) {
            e.preventDefault();
            e.stopPropagation();
            wasDragRef.current = false;
          }
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          handleStart(e.clientX);
        }}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
        ref={ref}
      >
        <div
          ref={trackRef}
          className="flex h-full"
          style={{
            transform: `translateX(${trackTranslate}%)`,
            transition:
              isDrag || !isTransition ? 'none' : 'transform 0.5s ease-in-out',
          }}
        >
          {extendedSlides.map((mbs: MainBannerSlide, idx: number) => (
            <MainBannerSlideItem key={`${mbs.id}-${idx}`} slideItem={mbs} />
          ))}
        </div>
        <ThumbnailClickWrapper
          mainBannerSlides={mainBannerSlides}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
    </>
  );
};

export default MainBannerSlides;

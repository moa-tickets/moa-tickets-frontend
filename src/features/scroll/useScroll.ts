import { useState, useEffect, useRef } from 'react';

interface ScrollPosition {
  scrollY: number;
  activeSection: string | null;
  isElementFixed: boolean;
}

export const useScroll = (
  sectionIds: string[],
  elementRef?: React.RefObject<HTMLDivElement | null>,
): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    activeSection: null,
    isElementFixed: false,
  });
  const initialOffsetTopRef = useRef<number | null>(null);

  useEffect(() => {
    // 초기 offsetTop 설정 (처음 한 번만)
    if (elementRef?.current && initialOffsetTopRef.current === null) {
      initialOffsetTopRef.current = elementRef.current.offsetTop;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      let currentSection: string | null = null;
      let isFixed = false;

      // 요소의 위치 확인 (요소가 있으면)
      if (initialOffsetTopRef.current !== null) {
        // 저장된 초기 offsetTop과 비교
        isFixed = scrollY >= initialOffsetTopRef.current;
      }

      // 각 섹션의 위치를 확인하고 가장 가까운 섹션 찾기
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop } = element;

          // 현재 스크롤 위치가 섹션의 상단과 하단 사이에 있는지 확인
          if (scrollY + window.innerHeight / 2 >= offsetTop) {
            currentSection = sectionId;
          }
        }
      }

      setScrollPosition({
        scrollY,
        activeSection: currentSection,
        isElementFixed: isFixed,
      });
    };

    // 초기 offsetTop 설정을 위해 약간의 지연 후 스크롤 처리
    const timeoutId = setTimeout(() => {
      if (elementRef?.current && initialOffsetTopRef.current === null) {
        initialOffsetTopRef.current = elementRef.current.offsetTop;
      }
      handleScroll();
    }, 0);

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [sectionIds, elementRef]);

  return scrollPosition;
};

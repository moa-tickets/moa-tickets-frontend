import React, { useState, useEffect } from 'react';
import { cn } from '@/shared';
import type { MainBannerSlide } from '@/entities/constant/mainBannerSlides';

import MainBannerItemText from './MainBannerItemText';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { OPEN_MODAL } from '@/entities/reducers/ModalReducer';
import LazyImage from '@/shared/components/lazy-loading/LazyImage';
import Skeleton from '@/shared/components/skeleton/Skeleton';

const MainBannerSlideItem = React.memo(
  ({ slideItem }: { slideItem: MainBannerSlide }) => {
    // 리듀서 디스패치
    const dispatch = useDispatch();

    // 모달 열기 함수
    const waitOpenModal = (e: React.MouseEvent) => {
      e.preventDefault();
      dispatch({
        type: OPEN_MODAL,
        payload: { title: '알림', message: '현재 준비중인 서비스입니다.' },
      });
    };

    // 반응형 이미지 바꾸기
    const [screenSize, setScreenSize] = useState<number>(0);

    useEffect(() => {
      const resizeScreenSize = () => {
        setScreenSize(window.innerWidth);
      };

      resizeScreenSize();

      window.addEventListener('resize', resizeScreenSize);

      return () => {
        window.removeEventListener('resize', resizeScreenSize);
      };
    }, []);

    return (
      <Link
        to={`/detail/${slideItem.id}`}
        className={cn(
          'slide__item flex-shrink-0 w-full h-full relative',
          screenSize < 1080
            ? 'after:content-[""] after:absolute after:inset-0 after:bg-[rgba(0,0,0,.25)] z-[100]'
            : '',
        )}
        onClick={waitOpenModal}
      >
        <LazyImage
          src={
            screenSize >= 1080 ? slideItem.imageUrl : slideItem.mobileImageUrl
          }
          alt={slideItem.bigText}
          className="w-full h-full object-fit"
          skeletonComponent={
            <Skeleton className="w-full h-[500px] bg-[#ccc]" />
          }
        />
        <MainBannerItemText
          bigText={slideItem.bigText}
          smallText={slideItem.smallText}
          mediumText={slideItem.middleText}
          dateText={slideItem.dateText}
          color={
            screenSize >= 1080 ? slideItem.textColor : slideItem.mobileTextColor
          }
        />
      </Link>
    );
  },
);

export default MainBannerSlideItem;

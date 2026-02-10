import React from 'react';
import { cn } from '@/shared';
import type { MainBannerSlide } from '@/entities/constant/mainBannerSlides';

import MainBannerItemText from './MainBannerItemText';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { OPEN_MODAL } from '@/entities/reducers/ModalReducer';

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

    return (
      <Link
        to={`/detail/${slideItem.id}`}
        className={cn(
          'slide__item flex-shrink-0 w-full h-full relative',
          'after:content-[""] after:absolute after:inset-0 after:bg-[rgba(0,0,0,.25)] z-[100]',
        )}
        onClick={waitOpenModal}
      >
        <img
          src={slideItem.imageUrl}
          alt={slideItem.bigText}
          className={cn('w-full h-full', 'object-cover')}
        />
        <MainBannerItemText
          bigText={slideItem.bigText}
          smallText={slideItem.smallText}
          mediumText={slideItem.middleText}
          dateText={slideItem.dateText}
          color={slideItem.textColor}
        />
      </Link>
    );
  },
);

export default MainBannerSlideItem;

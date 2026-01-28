import type { RealProductDetail } from '@/entities/reducers/ConcertDetailReducer';
import { RESET_SEAT_STATE } from '@/entities/reducers/BookSeatReducer';
import { SESSION_INIT } from '@/entities/reducers/LoginReducer';
import { useProduct } from '@/features/product/useProduct';
import { cn } from '@/shared';
import BookingInfoWrapper from '@/widgets/booking-info-wrapper/BookingInfoWrapper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const { getDetailProduct, getDetailProductPending } = useProduct();

  const { data: concertDetailData } = useSelector(
    (state: { concertDetailReducer: RealProductDetail }) =>
      state.concertDetailReducer,
  );

  useEffect(() => {
    // 페이지 진입 시 세션 및 좌석 상태 초기화
    dispatch({ type: SESSION_INIT });
    dispatch({ type: RESET_SEAT_STATE });
    getDetailProduct.mutate({ id: Number(id) });
  }, [id]);

  return (
    <div className={cn('booking__page')}>
      <div
        className={cn(
          'booking__page__inner',
          'max-w-[1080px] mx-auto relative',
        )}
      >
        <h2 className={cn('mt-[30px] text-[26px] font-bold mb-[16px]')}>
          예약하기
        </h2>
        <h3 className={cn('mb-[40px]')}>
          공연정보를 확인하고 좌석을 선택해주세요.
        </h3>
        {!getDetailProductPending && (
          <BookingInfoWrapper data={concertDetailData} />
        )}
      </div>
    </div>
  );
};

export default BookingPage;

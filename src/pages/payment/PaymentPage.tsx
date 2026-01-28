import {
  type MainSeatInfo,
  RESET_SEAT_STATE,
} from '@/entities/reducers/BookSeatReducer';
import type { RealProductDetail } from '@/entities/reducers/ConcertDetailReducer';
import type { LoginState } from '@/entities/reducers/LoginReducer';
import { useProduct } from '@/features/product/useProduct';
import { cn } from '@/shared';
import ReservationInfoWrapper from '@/widgets/reservation-info-wrapper/ReservationInfoWrapper';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const PaymentPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [remainingTime, setRemainingTime] = useState<number>(0);

  const { getDetailProduct, getDetailProductPending } = useProduct();

  const { data: concertDetailData } = useSelector(
    (state: { concertDetailReducer: RealProductDetail }) =>
      state.concertDetailReducer,
  );

  const { selectedSession } = useSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer,
  );

  const { holdedInfo } = useSelector(
    (state: { bookSeatReducer: MainSeatInfo }) => state.bookSeatReducer,
  );

  const handleExpire = useCallback(() => {
    dispatch({ type: RESET_SEAT_STATE });
    navigate(`/detail/${id}`, { replace: true });
  }, [dispatch, navigate, id]);

  // 타이머 설정 (최대 10분)
  useEffect(() => {
    if (!holdedInfo.expiresAt) return;

    const MAX_TIME = 600; // 10분

    const updateTimer = () => {
      const now = Date.now();
      const expiresAt = new Date(holdedInfo.expiresAt).getTime();
      const diff = Math.min(MAX_TIME, Math.max(0, Math.floor((expiresAt - now) / 1000)));
      setRemainingTime(diff);

      if (diff <= 0) {
        handleExpire();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [holdedInfo.expiresAt, handleExpire]);

  useEffect(() => {
    if (selectedSession.sessionId === 0 || holdedInfo.holdedIndex.length === 0) {
      navigate(`/detail/${id}/booking`, { replace: true });
    }
  }, [selectedSession.sessionId, holdedInfo.holdedIndex.length, id, navigate]);

  useEffect(() => {
    getDetailProduct.mutate({ id: Number(id) });
  }, [id]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <div className={cn('payment__page', 'w-full')}>
      <div className={cn('max-w-[1080px] mx-auto pt-[30px]')}>
        <div className={cn('flex items-center justify-between mb-[10px]')}>
          <h2 className={cn('text-[26px] font-bold')}>결제확인</h2>
          <div
            className={cn(
              'text-[18px] font-bold px-[16px] py-[8px] rounded-[8px]',
              remainingTime <= 60 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600',
            )}
          >
            남은 시간: {formatTime(remainingTime)}
          </div>
        </div>
        <span className={cn('text-[14px]')}>
          예약정보를 확인하고, 결제를 진행해주세요.
        </span>

        {!getDetailProductPending && (
          <ReservationInfoWrapper data={concertDetailData} />
        )}
      </div>
    </div>
  );
};

export default PaymentPage;

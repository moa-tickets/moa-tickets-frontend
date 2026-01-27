import type { MainSeatInfo } from '@/entities/reducers/BookSeatReducer';
import type { RealProductDetail } from '@/entities/reducers/ConcertDetailReducer';
import type { LoginState } from '@/entities/reducers/LoginReducer';
import { useProduct } from '@/features/product/useProduct';
import { cn } from '@/shared';
import ReservationInfoWrapper from '@/widgets/reservation-info-wrapper/ReservationInfoWrapper';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const PaymentPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (selectedSession.sessionId === 0 || holdedInfo.holdedIndex.length === 0) {
      navigate(`/detail/${id}/booking`, { replace: true });
    }
  }, [selectedSession.sessionId, holdedInfo.holdedIndex.length, id, navigate]);

  useEffect(() => {
    getDetailProduct.mutate({ id: Number(id) });
  }, [id]);

  return (
    <div className={cn('payment__page', 'w-full')}>
      <div className={cn('max-w-[1080px] mx-auto pt-[30px]')}>
        <h2 className={cn('text-[26px] font-bold mb-[10px]')}>결제확인</h2>
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

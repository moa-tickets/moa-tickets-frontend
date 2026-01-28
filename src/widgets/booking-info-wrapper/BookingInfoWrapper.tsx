import type { ProductDetail } from '@/entities/reducers/ConcertDetailReducer';
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '@/shared';
import ImageFrame from '@/shared/components/image-frame/ImageFrame';
import LazyImage from '@/shared/components/lazy-loading/LazyImage';
import Skeleton from '@/shared/components/skeleton/Skeleton';
import SessionSelector from '../session-selector/SessionSelector';
import SubmitButton from '@/shared/components/submit-button/SubmitButton';

import type { LoginState } from '@/entities/reducers/LoginReducer';
import { CLOSE_MODAL, OPEN_MODAL } from '@/entities/reducers/ModalReducer';
import type { MainSeatInfo } from '@/entities/reducers/BookSeatReducer';
import { useNavigate, useParams } from 'react-router-dom';
import type { ModalState } from '@/entities/types/types';
import ConfirmModal from '@/shared/components/confirm-modal/ConfirmModal';
import { usePayment } from '@/features/payment/usePayment';
import { useReservation } from '@/features/reservation/useReservation';

const BookingInfoWrapper = ({ data }: { data: ProductDetail }) => {
  const { id } = useParams<{ id: string }>();

  const { isOpen, title, message } = useSelector(
    (state: { modalReducer: ModalState }) => state.modalReducer,
  );

  const { selectedSession } = useSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer,
  );

  const { selectedTicketIds, holdedInfo } = useSelector(
    (state: { bookSeatReducer: MainSeatInfo }) => state.bookSeatReducer,
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { paymentReady, paymentReadyPending } = usePayment();
  const { getReser, getReserPending } = useReservation();

  const goSubmitButton = () => {
    if (selectedSession.date === '' || selectedTicketIds.length === 0) {
      dispatch({
        type: OPEN_MODAL,
        payload: { title: '경고', message: '세션 및 좌석을 먼저 선택하세요.' },
      });
      return;
    }

    // 내 예매 내역 조회 후 4개 제한 확인
    getReser.mutate(
      { view: 'PERIOD', range: 'M3', page: 0 },
      {
        onSuccess: (reservationData) => {
          // 같은 세션 날짜의 기존 구매 티켓 수 합산
          const mySoldCount = reservationData.items
            .filter((item) => {
              const bookingDate = new Date(item.sessionDate)
                .toISOString()
                .split('T')[0];
              const targetDate = new Date(selectedSession.date)
                .toISOString()
                .split('T')[0];
              return bookingDate === targetDate;
            })
            .reduce((sum, item) => sum + item.ticketCount, 0);

          // 기존 구매 + 새로 선택한 좌석이 4개 초과하면 경고
          if (mySoldCount + selectedTicketIds.length > 4) {
            dispatch({
              type: OPEN_MODAL,
              payload: {
                title: '구매 제한',
                message: `이미 ${mySoldCount}개의 티켓을 구매하셨습니다. 1인당 최대 4매까지 구매 가능합니다.`,
              },
            });
            return;
          }

          // 제한 통과 시 결제 준비 진행
          if (!holdedInfo.holdToken) {
            dispatch({
              type: OPEN_MODAL,
              payload: { title: '경고', message: '좌석을 먼저 선점해주세요.' },
            });
            return;
          }

          paymentReady.mutate(
            { holdToken: holdedInfo.holdToken },
            {
              onSuccess: () => {
                navigate(`/detail/${Number(id)}/payment`);
              },
            },
          );
        },
      },
    );
  };

  return (
    <>
      {isOpen && (
        <ConfirmModal
          title={title!}
          message={message}
          isOpen={isOpen}
          onClose={() => dispatch({ type: CLOSE_MODAL })}
        />
      )}
      <div
        className={cn(
          'booking__info__wrapper',
          'mt-[40px] flex justify-between mb-[30px] relative',
        )}
      >
        <ImageFrame
          imgComponent={
            <LazyImage
              src={data.thumbnail ?? '/placeholder.png'}
              alt={'detail-thumbnail'}
              className={'rounded-[10px] overflow-hidden'}
              skeletonComponent={
                <Skeleton className={'w-full h-full bg-[#ccc]'} />
              }
            />
          }
          w={300}
          h={400}
        />
        <SessionSelector data={data} />
        <SubmitButton
          title={getReserPending || paymentReadyPending ? '처리 중...' : '결제하기'}
          className="absolute left-0 top-[500px] w-[300px] cursor-pointer"
          onClick={goSubmitButton}
        />
      </div>
    </>
  );
};

export default BookingInfoWrapper;

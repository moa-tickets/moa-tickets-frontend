import type { MainSeatInfo } from '@/entities/reducers/BookSeatReducer';
import type { ProductDetail } from '@/entities/reducers/ConcertDetailReducer';
import type { LoginState } from '@/entities/reducers/LoginReducer';
import { cn } from '@/shared';
import ImageFrame from '@/shared/components/image-frame/ImageFrame';
import InfoItem from '@/shared/components/info-list/InfoItem';
import InfoList from '@/shared/components/info-list/InfoList';
import LazyImage from '@/shared/components/lazy-loading/LazyImage';
import Skeleton from '@/shared/components/skeleton/Skeleton';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import ReservationInfo from './ReservationInfo';
import PaymentButtonWrapper from '../payment-button-wrapper/PaymentButtonWrapper';
import PaymentModal from '@/shared/components/payment-modal/PaymentModal';
import type { ModalState } from '@/entities/types/types';

const ReservationInfoWrapper = ({ data }: { data: ProductDetail }) => {
  const { isOpen } = useSelector(
    (state: { modalReducer: ModalState }) => state.modalReducer,
  );

  const { selectedSession } = useSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer,
  );

  const { holdedInfo, data: seatData } = useSelector(
    (state: { bookSeatReducer: MainSeatInfo }) => state.bookSeatReducer,
  );

  const selectedSessionData = useMemo(() => {
    return data.sessions.find(
      (session) => session.sessionId === selectedSession.sessionId,
    );
  }, [data.sessions, selectedSession.sessionId]);

  const totalPrice = useMemo(() => {
    if (!selectedSessionData) return 0;
    return selectedSessionData.price * holdedInfo.holdedIndex.length;
  }, [selectedSessionData, holdedInfo.holdedIndex.length]);

  const seatNumbers = useMemo(() => {
    return holdedInfo.holdedIndex
      .map((ticketId) => {
        const seat = seatData.find((s) => s.ticketId === ticketId);
        return seat ? seat.seatNum : ticketId;
      })
      .sort((a, b) => a - b);
  }, [holdedInfo.holdedIndex, seatData]);

  return (
    <>
      {isOpen && <PaymentModal isOpen={isOpen} />}
      <div
        className={cn(
          'reservation__info__wrapper',
          'mt-[40px] flex items-center gap-[80px] mb-[30px]',
        )}
      >
        <ImageFrame
          imgComponent={
            <LazyImage
              src={data.thumbnail ?? '/placeholder.png'}
              alt={'concert-thumbnail'}
              className={'rounded-[10px] overflow-hidden'}
              skeletonComponent={
                <Skeleton className={'w-full h-full bg-[#ccc]'} />
              }
            />
          }
          w={240}
          h={320}
        />

        <ReservationInfo title={data.concertName}>
          <InfoList>
            <InfoItem label="장소" value={data.hallName} />
            <InfoItem label="관람일시" value={selectedSession.date} />
            <InfoItem label="관람시간" value={data.concertDuration} />
            <InfoItem
              label="선택좌석"
              value={
                seatNumbers.length > 0
                  ? seatNumbers.map((seat) => `${seat}번`).join(', ')
                  : '선택된 좌석이 없습니다'
              }
            />
            <InfoItem
              label="티켓가격"
              value={`${selectedSessionData?.price.toLocaleString()}원`}
            />
            <InfoItem
              label="수량"
              value={`${holdedInfo.holdedIndex.length}매`}
            />
            <InfoItem
              label="총 결제금액"
              value={`${totalPrice.toLocaleString()}원`}
              className="mt-[20px] pt-[20px] border-t border-[#ddd]"
              labelClassName="text-[16px] font-bold text-black"
              valueClassName="text-[20px] font-bold text-[#e74c3c]"
            />
          </InfoList>
        </ReservationInfo>
        <PaymentButtonWrapper />
      </div>
    </>
  );
};

export default ReservationInfoWrapper;

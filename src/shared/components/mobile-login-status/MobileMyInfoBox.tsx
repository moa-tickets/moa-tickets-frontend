import { useEffect } from 'react';
import { useReservation } from '@/features/reservation/useReservation';
import { cn } from '@/shared';
import type {
  MainReservation,
  Reservation,
  ReservationList,
} from '@/entities/reducers/ReservationReducer';
import { useSelector } from 'react-redux';

const MobileMyInfoBox = ({
  nickname,
  onClose,
}: {
  nickname: string;
  onClose: () => void;
}) => {
  const { getReser } = useReservation();
  const { data: reservationData } = useSelector(
    (state: { reservationReducer: MainReservation }) =>
      state.reservationReducer,
  );

  useEffect(() => {
    getReser.mutate({ view: 'PERIOD', range: 'D15', page: 0 });
  }, []);

  const computeTicketNumbers = (reservationData: Reservation) => {
    let current = 0;
    reservationData.items.forEach((ele: ReservationList) => {
      if (ele.ticketCount > 0) {
        current = current + ele.ticketCount;
      }
    });
    return current;
  };

  return (
    <div
      className={cn(
        'mobile__my__info__box',
        'absolute w-[300px] left-[51px] top-[calc(100%_+_10px)] z-[300]',
        'bg-[rgb(254,250,250)] shadow-[0px_1px_1px_1px_rgba(0,0,0,.25)] rounded-[10px]',
      )}
    >
      <span
        className={cn(
          'block text-center mt-[20px] font-bold text-[24px] mb-[20px]',
        )}
      >
        {nickname} 님
      </span>
      <span className={cn('block text-[14px] text-center mb-[16px]')}>
        {computeTicketNumbers(reservationData)}건 예매중이시네요.
      </span>
      <button
        className={cn(
          'absolute text-[12px] top-[10px] right-[10px] cursor-pointer',
        )}
        onClick={onClose}
      >
        닫기
      </button>
    </div>
  );
};

export default MobileMyInfoBox;

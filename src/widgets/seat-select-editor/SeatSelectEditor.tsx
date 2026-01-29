import { useDispatch, useSelector } from 'react-redux';
import {
  DESELECT_SEAT,
  type MainSeatInfo,
  SELECT_SEAT,
  type SeatInfo,
} from '@/entities/reducers/BookSeatReducer';
import type { LoginState } from '@/entities/reducers/LoginReducer';
import { CLOSE_MODAL, OPEN_MODAL } from '@/entities/reducers/ModalReducer';
import type { ModalState } from '@/entities/types/types';
import { useBooking } from '@/features/booking/useBooking';
import { cn } from '@/shared';
import ConfirmModal from '@/shared/components/confirm-modal/ConfirmModal';

const SeatSelectEditor = ({ data }: { data: SeatInfo[] }) => {
  const { isOpen, title, message } = useSelector(
    (state: { modalReducer: ModalState }) => state.modalReducer,
  );

  const { selectedSession } = useSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer,
  );

  const { selectedTicketIds } = useSelector(
    (state: { bookSeatReducer: MainSeatInfo }) => state.bookSeatReducer,
  );

  const { getSeatInfo, getSeatInfoPending } = useBooking();

  const dispatch = useDispatch();

  const isSelectedSeat = (ticketId: number) => {
    return selectedTicketIds.includes(ticketId);
  };

  const handleSeatClick = (seatInfo: SeatInfo) => {
    // 이미 선택한 좌석이면 선택 해제
    if (isSelectedSeat(seatInfo.ticketId)) {
      dispatch({ type: DESELECT_SEAT, payload: { ticketId: seatInfo.ticketId } });
      return;
    }

    // 4개 이상 선택 불가
    if (selectedTicketIds.length >= 4) {
      dispatch({
        type: OPEN_MODAL,
        payload: {
          title: '경고',
          message: '4개 이상 티켓 선택할 수 없습니다.',
        },
      });
      return;
    }

    // 좌석 선택
    dispatch({ type: SELECT_SEAT, payload: { ticketId: seatInfo.ticketId } });
  };

  const refreshSeats = () => {
    getSeatInfo.mutate({ sessionId: selectedSession.sessionId });
  };

  const isDisabled = (seatInfo: SeatInfo) => {
    // 내가 선택한 좌석은 클릭 가능 (해제 위해)
    if (isSelectedSeat(seatInfo.ticketId)) {
      return false;
    }
    // 다른 사람이 홀드했거나 sold된 좌석은 disabled
    return seatInfo.state === 'HOLD' || seatInfo.state === 'SOLD';
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
          'w-full h-[400px] border border-solid border-black mt-[20px] p-[10px] flex flex-col items-center',
        )}
      >
        <div className={cn('flex items-center gap-[10px] mb-[20px]')}>
          <div
            className={cn(
              'stage__front',
              'w-[240px] py-[10px] bg-black text-white text-center',
            )}
          >
            무대 앞
          </div>
          <button
            className={cn(
              'px-[12px] py-[8px] bg-[rgb(87,100,255)] text-white text-[12px] rounded-[6px]',
              'cursor-pointer hover:bg-[rgb(65,84,255)]',
              getSeatInfoPending && 'opacity-50',
            )}
            onClick={refreshSeats}
            disabled={getSeatInfoPending}
          >
            {getSeatInfoPending ? '로딩...' : '새로고침'}
          </button>
        </div>
        <div className={cn('flex flex-wrap gap-[20px] overflow-y-auto max-h-[280px]')}>
          {data.map((seatInfo: SeatInfo) => (
            <button
              key={seatInfo.ticketId}
              className={cn(
                'w-[26px] h-[26px]',
                'text-[12px]',
                'cursor-pointer',
                'bg-black text-white rounded-full',
                seatInfo.state === 'SOLD' && 'bg-gray-400 cursor-not-allowed',
                seatInfo.state === 'HOLD' && 'opacity-45',
                isSelectedSeat(seatInfo.ticketId) && 'bg-[rgb(239,62,67)]',
              )}
              disabled={isDisabled(seatInfo)}
              onClick={() => {
                handleSeatClick(seatInfo);
              }}
            >
              {seatInfo.seatNum}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default SeatSelectEditor;

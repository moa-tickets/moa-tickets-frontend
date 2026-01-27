import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type {
  MainSeatInfo,
  SeatInfo,
} from '@/entities/reducers/BookSeatReducer';
import { CLOSE_MODAL, OPEN_MODAL } from '@/entities/reducers/ModalReducer';
import type { ModalState } from '@/entities/types/types';
import { useBooking } from '@/features/booking/useBooking';
import { cn } from '@/shared';
import ConfirmModal from '@/shared/components/confirm-modal/ConfirmModal';
import { HashLoader } from 'react-spinners';

const SeatSelectEditor = ({
  data,
  sessionId,
}: {
  data: SeatInfo[];
  sessionId: number;
}) => {
  const { seatHold, seatHoldPending, seatRelease, seatReleasePending } =
    useBooking();

  const { isOpen, title, message } = useSelector(
    (state: { modalReducer: ModalState }) => state.modalReducer,
  );

  const { holdedInfo } = useSelector(
    (state: { bookSeatReducer: MainSeatInfo }) => state.bookSeatReducer,
  );

  const [ticketIds, setTicketIds] = useState<number[]>([]);

  const dispatch = useDispatch();

  const selectHoldOrRelease = (seatInfo: SeatInfo) => {
    // 내가 누르려는 seatInfo의 인덱스가 ticketIds가 포함되어 있는가
    const exists = holdedInfo.holdedIndex.find((f) => f === seatInfo.ticketId);

    if (exists) {
      setTicketIds((prev) => prev.filter((p) => p !== seatInfo.ticketId));
      seatRelease.mutate({
        holdToken: holdedInfo.holdToken,
        ticketId: seatInfo.ticketId,
        sessionId,
        remainingTicketIds: holdedInfo.holdedIndex.filter(
          (item) => item !== seatInfo.ticketId,
        ),
      });
    } else {
      if (ticketIds.length >= 4) {
        dispatch({
          type: OPEN_MODAL,
          payload: {
            title: '경고',
            message: '4개 이상 티켓 점유할 수 없습니다.',
          },
        });
        return;
      }
      const newTicketIds = [...ticketIds, seatInfo.ticketId];
      setTicketIds(newTicketIds);
      seatHold.mutate({ sessionId, ticketIds: newTicketIds });
    }
  };

  useEffect(() => {
    const expiresAt = new Date(holdedInfo.expiresAt).getTime();
    const now = Date.now();
    const timeUntilExpiry = expiresAt - now;

    if (timeUntilExpiry <= 0) {
      setTicketIds([]);
    }
  }, [holdedInfo.expiresAt]);

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
          'relative',
          (seatHoldPending || seatReleasePending) &&
            'after:content-[""] after:absolute after:inset-0 after:bg-[rgba(0,0,0,.85)] m-auto',
        )}
      >
        {(seatHoldPending || seatReleasePending) && (
          <HashLoader
            color={'#fff'}
            cssOverride={{
              zIndex: '300',
              position: 'absolute',
              inset: '0',
              margin: 'auto',
            }}
          />
        )}
        <div
          className={cn(
            'stage__front',
            'w-[240px] py-[10px] bg-black text-white text-center mb-[30px]',
          )}
        >
          무대 앞
        </div>
        <div className={cn('flex flex-wrap gap-[20px]')}>
          {data.map((seatInfo: SeatInfo) => (
            <button
              key={seatInfo.ticketId}
              className={cn(
                'w-[26px] h-[26px]',
                'text-[12px]',
                'cursor-pointer',
                'bg-black text-white rounded-full',
                seatInfo.state === 'HOLD' && 'opacity-45',
              )}
              onClick={() => {
                selectHoldOrRelease(seatInfo);
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

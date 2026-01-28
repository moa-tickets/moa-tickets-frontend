import { cn } from '@/shared';
import SeatItem from './SeatItem';
import type { ProductDetail } from '@/entities/reducers/ConcertDetailReducer';
import type { SeatInfo } from '@/entities/reducers/BookSeatReducer';

const SeatList = ({
  holdedIndex,
  data,
  selectedSession,
  seatData,
}: {
  holdedIndex: number[];
  data: ProductDetail;
  selectedSession: {
    date: string;
    sessionId: number;
  };
  seatData: SeatInfo[];
}) => {
  const foundSession = data.sessions.find(
    (f) => f.sessionId === selectedSession.sessionId,
  );

  if (!foundSession) {
    return null;
  }

  return (
    <div className={cn('seat__list', 'flex flex-col w-full')}>
      {holdedIndex.map((ticketId: number) => {
        const seatNum = seatData.find((s) => s.ticketId === ticketId)?.seatNum ?? ticketId;
        return (
          <SeatItem seatNum={seatNum} key={ticketId} foundSession={foundSession} />
        );
      })}
    </div>
  );
};

export default SeatList;

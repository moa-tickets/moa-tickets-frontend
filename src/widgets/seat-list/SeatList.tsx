import { cn } from '@/shared';
import SeatItem from './SeatItem';
import type { ProductDetail } from '@/entities/reducers/ConcertDetailReducer';

const SeatList = ({
  holdedIndex,
  data,
  selectedSession,
}: {
  holdedIndex: number[];
  data: ProductDetail;
  selectedSession: {
    date: string;
    sessionId: number;
  };
}) => {
  const foundSession = data.sessions.find(
    (f) => f.sessionId === selectedSession.sessionId,
  );

  return (
    <div className={cn('seat__list', 'flex flex-col w-full')}>
      {holdedIndex.map((hi: number) => (
        <SeatItem hi={hi} key={hi} foundSession={foundSession} />
      ))}
    </div>
  );
};

export default SeatList;

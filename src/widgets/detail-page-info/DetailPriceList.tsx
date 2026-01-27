import type { ProductSession } from '@/entities/reducers/ConcertDetailReducer';
import { cn } from '@/shared';
import DetailPageDescription from './DetailPageDescription';

const DetailPriceList = ({ list }: { list: ProductSession[] }) => {
  const uniquePrices = list.filter(
    (session, index, self) =>
      self.findIndex((s) => s.price === session.price) === index,
  );

  return (
    <div className={cn('detail__price__list mt-[20px]')}>
      {uniquePrices.map((session: ProductSession) => (
        <DetailPageDescription
          title={'전석'}
          data={String(session.price.toLocaleString() + '원')}
          key={session.sessionId}
          isSession
        />
      ))}
    </div>
  );
};

export default DetailPriceList;

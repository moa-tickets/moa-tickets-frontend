import type { ProductDetail } from '@/entities/reducers/ConcertDetailReducer';
import { cn } from '@/shared';
import ImageFrame from '@/shared/components/image-frame/ImageFrame';
import LazyImage from '@/shared/components/lazy-image/LazyImage';
import DetailPageInfo from '../detail-page-info/DetailPageInfo';
import DetailTicketOpen from '../detail-ticket-open/DetailTicketOpen';

const DetailPageFunctions = ({ data }: { data: ProductDetail }) => {
  return (
    <div className={cn('detail__page__functions', 'flex justify-between')}>
      <ImageFrame
        w={300}
        h={400}
        imgComponent={<LazyImage src={data.thumbnail!} alt="image-frame-thumbnail" />}
      />
      <DetailPageInfo data={data} />
      <DetailTicketOpen data={data} />
    </div>
  );
};

export default DetailPageFunctions;

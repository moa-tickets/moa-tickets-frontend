import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { cn } from '@/shared';
import { useProduct } from '@/features/product/useProduct';
import { useSelector } from 'react-redux';
import type { RealProductDetail } from '@/entities/reducers/ConcertDetailReducer';
import DetailPageContainer from '@/widgets/detail-page-container/DetailPageContainer';
import DetailSkeleton from './DetailSkeleton';

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getDetailProduct, getDetailProductPending } = useProduct();
  const { data: productDetailData } = useSelector(
    (state: { concertDetailReducer: RealProductDetail }) =>
      state.concertDetailReducer,
  );

  useEffect(() => {
    getDetailProduct.mutate({ id: Number(id) });
  }, [id]);

  return (
    <div className={cn('detail__page')}>
      {!getDetailProductPending && (
        <DetailPageContainer data={productDetailData} />
      )}
      {getDetailProductPending && <DetailSkeleton />}
    </div>
  );
};

export default DetailPage;

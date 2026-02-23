import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { cn } from '@/shared';
import { useProduct } from '@/features/product/useProduct';
import { useSelector } from 'react-redux';
import type { RealProductDetail } from '@/entities/reducers/ConcertDetailReducer';
import CommunityDetail from '@/widgets/community-detail/CommunityDetail';

const CommunityDetailPage = () => {
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
    <div className={cn('community__detail__page py-[40px] px-[20px]')}>
      {!getDetailProductPending && (
        <CommunityDetail concertName={productDetailData.concertName} />
      )}
    </div>
  );
};

export default CommunityDetailPage;

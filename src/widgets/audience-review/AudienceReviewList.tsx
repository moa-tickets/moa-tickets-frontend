import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { cn } from '@/shared';
import type {
  MainReviewData,
  ReviewData,
} from '@/entities/reducers/AudienceReviewReducer';
import { useReview } from '@/features/review/useReview';
import { useParams } from 'react-router-dom';
import AudienceReviewItem from './AudienceReviewItem';

const AudienceReviewList = () => {
  const { id } = useParams<{ id: string }>();

  const { data: reviewData } = useSelector(
    (state: { audienceReviewReducer: MainReviewData }) =>
      state.audienceReviewReducer,
  );

  const { reviewGetter, reviewGetterPending } = useReview();

  useEffect(() => {
    reviewGetter.mutate({ concertId: Number(id) });
  }, []);

  return (
    <div className={cn('audience__review__list', 'flex flex-col')}>
      {reviewGetterPending && 'loading....'}
      {!reviewGetterPending &&
        reviewData.length > 0 &&
        reviewData.map((rdata: ReviewData) => (
          <AudienceReviewItem key={rdata.reviewId} data={rdata} />
        ))}
    </div>
  );
};

export default AudienceReviewList;

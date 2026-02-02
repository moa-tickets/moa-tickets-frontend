import { cn } from '@/shared';
import AudienceReviewInput from './AudienceReviewInput';
import AudienceReviewList from './AudienceReviewList';
import { useSelector } from 'react-redux';
import type { MainReviewData } from '@/entities/reducers/AudienceReviewReducer';

export default function AudienceReview() {
  const { data: reviewData } = useSelector(
    (state: { audienceReviewReducer: MainReviewData }) =>
      state.audienceReviewReducer,
  );

  return (
    <div className={cn('audience__review')}>
      <div className={cn('audience__review__inner', 'max-w-[1080px] mx-auto')}>
        <div
          className={cn(
            'audience__review__title',
            'flex items-center pb-[18px] border-b border-solid border-black mb-[20px]',
          )}
        >
          <h2 className={cn('text-[22px] font-bold')}>관람후기</h2>
          <span className={cn('text-[18px] ml-[8px] text-[#FA2728]')}>
            {reviewData.length}
          </span>
        </div>
        <AudienceReviewInput />
        <AudienceReviewList />
      </div>
    </div>
  );
}

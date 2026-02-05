import { useEffect } from 'react';
import { cn } from '@/shared';
import { useSelector } from 'react-redux';
import { useKeyword } from '@/features/keyword/useKeyword';
import type { MainKeywordData, KeywordItem } from '@/entities/reducers/KeywordReducer';
import AudienceReviewKeywordItem from './AudienceReviewKeywordItem';

export default function AudienceReviewKeywordTop7() {
  const keywordState = useSelector((state: any) => state.keywordReducer);
  const data = keywordState?.data ?? { positive: [], negative: [] };


  const { keywordGetter, keywordGetterPending } = useKeyword();

  useEffect(() => {
    // ✅ 이제 concertId 필요 없음(전역 통계)
    keywordGetter.mutate();
  }, []);

  return (
    <>
      <div className={cn('audience__review__positive')}>
        <span className={cn('text-[20px] font-semibold text-[rgb(0, 0, 0)] inline-block mb-[6px]')}>
          긍정
        </span>
        <div>
          <ul className={cn('flex gap-4 flex-wrap')}>
            {keywordGetterPending && 'loading...'}
            {!keywordGetterPending &&
              data.positive.map((item: KeywordItem, idx: number) => (
                <AudienceReviewKeywordItem key={`pos-${idx}-${item.keyword}`} data={item} tone="positive" />
              ))}
          </ul>
        </div>
      </div>

      <div className={cn('audience__review__negative mt-6 mb-6')}>
        <span className={cn('text-[20px] font-semibold text-[rgb(0, 0, 0)] inline-block mb-[6px]')}>
          부정
        </span>
        <div>
          <ul className={cn('flex gap-4 flex-wrap')}>
            {keywordGetterPending && 'loading...'}
            {!keywordGetterPending &&
              data.negative.map((item: KeywordItem, idx: number) => (
                <AudienceReviewKeywordItem key={`neg-${idx}-${item.keyword}`} data={item} tone="negative" />
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

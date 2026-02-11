import { useEffect, useMemo } from 'react';
import { cn } from '@/shared';
import { useSelector } from 'react-redux';
import { useKeyword } from '@/features/keyword/useKeyword';
import type { AspectKeywordGroup } from '@/entities/reducers/KeywordReducer';
import AudienceReviewKeywordItem from './AudienceReviewKeywordItem';

export default function AudienceReviewKeywordTop7({ concertId }: { concertId: number }) {
  const keywordState = useSelector((state: any) => state.keywordReducer);

  // ✅ new response shape: { positive: AspectKeywordGroup[], negative: AspectKeywordGroup[] }
  const data = keywordState?.data ?? { positive: [], negative: [] };

  const { keywordGetter, keywordGetterPending } = useKeyword();

  useEffect(() => {
    if (!concertId) return;
    keywordGetter.mutate({ concertId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [concertId]);

  type AspectSummary = {
    aspect: string;
    totalCount: number;
  };

  const aspectSort = (a: AspectSummary, b: AspectSummary) => {
    if (a.aspect === '기타' && b.aspect !== '기타') return 1;
    if (a.aspect !== '기타' && b.aspect === '기타') return -1;
    return b.totalCount - a.totalCount || a.aspect.localeCompare(b.aspect);
  };

  // ✅ aspect별 totalCount 계산해서 0은 숨김
  const positiveSummary = useMemo(() => {
    return (data.positive as AspectKeywordGroup[])
      .map((group) => ({
        aspect: group.aspect,
        totalCount: group.keywords.reduce((sum, kw) => sum + kw.count, 0),
      }))
      .filter((x) => x.totalCount > 0)
      .sort(aspectSort);
  }, [data.positive]);

  const negativeSummary = useMemo(() => {
    return (data.negative as AspectKeywordGroup[])
      .map((group) => ({
        aspect: group.aspect,
        totalCount: group.keywords.reduce((sum, kw) => sum + kw.count, 0),
      }))
      .filter((x) => x.totalCount > 0)
      .sort(aspectSort);
  }, [data.negative]);

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
              positiveSummary.map((item, idx) => (
                <AudienceReviewKeywordItem
                  key={`pos-${idx}-${item.aspect}`}
                  data={item}
                  tone="positive"
                />
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
              negativeSummary.map((item, idx) => (
                <AudienceReviewKeywordItem
                  key={`neg-${idx}-${item.aspect}`}
                  data={item}
                  tone="negative"
                />
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
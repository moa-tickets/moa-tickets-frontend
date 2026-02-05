import { useEffect } from 'react';
import { cn } from '@/shared';
import { useSelector } from 'react-redux';
import { useKeyword } from '@/features/keyword/useKeyword';
import { useParams } from 'react-router-dom';
import type {
  MainKeywordData,
  KeywordData,
} from '@/entities/reducers/KeywordReducer'
import AudienceReviewKeywordItem from './AudienceReviewKeywordItem';

export default function AudienceReviewKeywordsTop7() {
  const { id } = useParams<{ id: string }>();

  const { data: keywordData } = useSelector(
      (state: { keywordReducer: MainKeywordData }) =>
        state.keywordReducer,
    );

  const { keywordGetter, keywordGetterPending } = useKeyword();

  useEffect(() => {
    keywordGetter.mutate({ concertId: Number(id) });
  }, []);

  return (
    <>
      <div className={cn('audience__review__positive')}>
        <span
          className={cn(
            'text-[16px] text-[rgb(54, 61, 255)] inline-block mb-[0px]',
          )}
        >
          긍정 
        </span>
        <div>
          <ul className={cn('flex gap-4')}>
            {keywordGetterPending && 'loading...'}
            {!keywordGetterPending &&
            keywordData.length > 0 &&
            keywordData.map((rdata: KeywordData) => (
              <AudienceReviewKeywordItem data={rdata} />
            ))}
          </ul>
        </div>
      </div>
      <div className={cn('audience__review__negative')}>
        <span
          className={cn(
            'text-[16px] text-[rgb(0, 0, 0)] inline-block mb-[0px]',
          )}
        >
          부정
        </span>
        <div>
          <ul className={cn('flex gap-4')}>
            {keywordGetterPending && 'loading...'}
            <li>
              <span
                className={cn(
                  'text-[12px] text-[rgb(137,137,137)] inline-block mb-[20px]',
                )}
              >
                부정 키워드 7개
              </span>
            </li>
        </ul>
        </div>
      </div>
    </>
  );
}

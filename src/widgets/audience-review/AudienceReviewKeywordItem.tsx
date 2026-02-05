import type { KeywordItem } from '@/entities/reducers/KeywordReducer';
import { cn } from '@/shared';

const AudienceReviewKeywordItem = ({
  data,
  tone,
}: {
  data: KeywordItem;
  tone: 'positive' | 'negative';
}) => {
  return (
    <li
      className={cn(
        'flex items-center justify-between',
        'min-w-[100px] px-3 py-2',
        'border border-solid border-[rgba(0,0,0,0.15)] rounded-md',
      )}
    >
      {/* 키워드 */}
      <span className={cn('text-[16px] font-semibold')}>
        {data.keyword}
      </span>

      {/* 카운트 */}
      <span
        className={cn(
          'text-[16px] font-bold',
          tone === 'positive' ? 'text-[rgb(54,61,255)]' : 'text-[rgb(240, 77, 77)]',
        )}
      >
        {data.count}
      </span>
    </li>
  );
};

export default AudienceReviewKeywordItem;

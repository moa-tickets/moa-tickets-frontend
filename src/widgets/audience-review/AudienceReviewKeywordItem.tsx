import { cn } from '@/shared';

type AspectSummaryItem = {
  aspect: string;
  totalCount: number;
};

const AudienceReviewKeywordItem = ({
  data,
  tone,
}: {
  data: AspectSummaryItem;
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
      {/* aspect 이름 */}
      <span className={cn('text-[16px] font-semibold')}>{data.aspect}</span>

      {/* totalCount */}
      <span
        className={cn(
          'text-[16px] font-bold',
          tone === 'positive' ? 'text-[rgb(54,61,255)]' : 'text-[rgb(240, 77, 77)]',
        )}
      >
        {data.totalCount}
      </span>
    </li>
  );
};

export default AudienceReviewKeywordItem;

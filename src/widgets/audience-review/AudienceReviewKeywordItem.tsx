import type { KeywordData } from '@/entities/reducers/KeywordReducer';
import { cn } from '@/shared';
// import { FaStar } from 'react-icons/fa6';

const AudienceReviewKeywordItem = ({ data }: { data: KeywordData }) => {
  return (
    <li>
      <span
        className={cn(
          'text-[12px] text-[rgb(137,137,137)] inline-block mb-[20px]',
        )}
      >
        긍정 키워드
      </span>
      <span
        className={cn(
          'text-[12px] text-[rgb(137,137,137)] inline-block mb-[20px]',
        )}
      >
        kw count
      </span>
    </li>
  );
};

export default AudienceReviewKeywordItem;

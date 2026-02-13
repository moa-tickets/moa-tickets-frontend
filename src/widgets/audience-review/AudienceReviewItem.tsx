import type { ReviewData } from '@/entities/reducers/AudienceReviewReducer';
import { cn } from '@/shared';
import { Star } from 'lucide-react';

const AudienceReviewItem = ({ data }: { data: ReviewData }) => {
  return (
    <div
      className={cn(
        'audience__review__item pb-[30px] border-b border-solid border-[rgb(237,237,237)] mb-[20px]',
      )}
    >
      <ul className={cn('stars', 'flex items-center gap-[4px] mb-[10px]')}>
        {Array.from({ length: 5 }, (_, i) => (
          <li key={i}>
            {i + 1 <= data.score ? (
              <Star size={16} fill="currentColor" />
            ) : (
              <Star size={16} style={{ opacity: '.45' }} />
            )}
          </li>
        ))}
      </ul>
      <p className={cn('text-[12px] font-semibold mb-[20px]')}>
        {data.content}
      </p>
      <div
        className={cn('nickname__info text-[12px] flex items-center gap-[5px]')}
      >
        <span>{data.memberNickname}</span>
        <span
          className={cn(
            'block text-[#FB3F3D] text-[10px] px-[6px] py-[3px] border border-solid border-[#FB3F3D] rounded-[20px]',
          )}
        >
          예매자
        </span>
      </div>
    </div>
  );
};

export default AudienceReviewItem;

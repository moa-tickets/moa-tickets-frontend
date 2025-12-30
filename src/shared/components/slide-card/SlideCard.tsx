import type { ConcertRankSlide } from '@/entities/types/types';
import { cn } from '@/shared/lib/utils';
import { Link } from 'react-router-dom';

const SlideCard = ({
  item,
  className,
}: {
  item: ConcertRankSlide;
  className?: string;
}) => {
  return (
    <Link to={`concert/${item.id}`} className={cn('slide__card', className)}>
      <div
        className={cn(
          'slide__card__image w-full h-[288px] relative mb-[20px] mt-[30px] rounded-[16px] overflow-hidden',
        )}
      >
        <img
          src={item.imgUrl}
          alt={item.title}
          className={cn('w-full h-full object-cover pointer-events-none')}
          draggable={false}
        />
        <span
          className={cn(
            'text-[48px] absolute z-[10] bottom-[16px] left-[30px] text-white font-bold',
          )}
        >
          {item.id}
        </span>
      </div>
      <div className={cn('slide__card__title font-bold mb-[13px]')}>
        {item.title}
      </div>
      <div className={cn('slide__card__loc text-[14px] font-200 mb-[8px]')}>
        {item.location}
      </div>
      <div
        className={cn('slide__card__date text-[12px] font-200 text-[#7A7A7A]')}
      >
        {item.date[0]} ~ {item.date[1]}
      </div>
      {item.seatOver && (
        <div
          className={cn(
            'seat__over p-[3px] bg-[#f4f4f5] inline-block text-[12px] text-[#7e7e81] mt-[6px]',
          )}
        >
          좌석우위
        </div>
      )}
      {item.privateSale && (
        <div
          className={cn(
            'seat__over p-[3px] bg-[rgba(65,84,255,.08)] inline-block text-[12px] text-[#4154ff] mt-[6px] rounded-[4px]',
          )}
        >
          단독판매
        </div>
      )}
    </Link>
  );
};

export default SlideCard;

import type { PlayListItem } from '@/entities/types/types';
import { cn } from '@/shared';
import YoutubePlayers from '../youtube-custom/YoutubePlayers';

const SlidePlayCard = ({
  item,
  className,
}: {
  item: PlayListItem;
  className: string;
}) => {
  return (
    <div
      className={cn(
        'slide__play__card overflow-hidden rounded-[10px] border border-solid border-[#e8e8e8] box-border',
        className,
      )}
    >
      <div className="slide__youtube__box w-full aspect-[4/3] overflow-hidden relative">
        <YoutubePlayers
          videoId={item.videoId}
          thumbnailUrl={item.thumbnailUrl}
        />
      </div>
      <div
        className={cn(
          'slide__play__info p-[16px] flex gap-[10px] items-center',
        )}
      >
        <div
          className={cn(
            'thumbnail w-[60px] aspect-[3/4] overflow-hidden rounded-[10px]',
          )}
        >
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
          />
        </div>
        <div className={cn('title text-[18px] font-bold flex-1')}>
          {item.title}
        </div>
      </div>
    </div>
  );
};

export default SlidePlayCard;

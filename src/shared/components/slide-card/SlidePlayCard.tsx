import React from 'react';
import type { PlayListItem } from '@/entities/types/types';
import { cn } from '@/shared';
import YoutubePlayers from '../youtube-custom/YoutubePlayers';
import OptimizedImage from '@/shared/components/lazy-loading/LazyImage';

interface SlidePlayCardProps {
  item: PlayListItem;
  className: string;
}

const SlidePlayCard = React.memo(({ item, className }: SlidePlayCardProps) => {
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
          <OptimizedImage
            src={item.thumbnailUrl}
            alt={item.title}
            className="w-full h-full pointer-events-none"
            skeletonClassName="rounded-[10px]"
          />
        </div>
        <div className={cn('title text-[18px] font-bold flex-1')}>
          {item.title}
        </div>
      </div>
    </div>
  );
});

export default SlidePlayCard;

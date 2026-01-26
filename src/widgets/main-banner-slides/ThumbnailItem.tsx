import React, { type Dispatch, type SetStateAction } from 'react';
import { cn } from '@/shared';
import LazyImage from '@/shared/components/lazy-loading/LazyImage';
import Skeleton from '@/shared/components/skeleton/Skeleton';

const ThumbnailItem = React.memo(
  ({
    thumbnail,
    isActive,
    index,
    setCurrentIndex,
  }: {
    thumbnail: string;
    isActive: boolean;
    index: number;
    setCurrentIndex: Dispatch<SetStateAction<number>>;
  }) => {
    return (
      <button
        className={cn(
          'thumbnail__item w-[60px] h-[60px] rounded-[10px] overflow-hidden cursor-pointer',
          isActive && 'border-4 border-solid border-white',
        )}
        onClick={() => setCurrentIndex(index + 1)}
      >
        <LazyImage
          src={thumbnail}
          alt="thumbnail"
          className={cn('w-full h-full object-cover')}
          skeletonComponent={<Skeleton className={'w-full h-full bg-black'} />}
        />
      </button>
    );
  },
);

export default ThumbnailItem;

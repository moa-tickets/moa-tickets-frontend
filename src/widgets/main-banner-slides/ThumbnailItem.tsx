import React, { type Dispatch, type SetStateAction } from 'react';
import { cn } from '@/shared';

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
        <img
          src={thumbnail}
          alt="thumbnail"
          className={cn('w-full h-full object-cover')}
        />
      </button>
    );
  },
);

export default ThumbnailItem;

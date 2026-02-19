import { cn } from '@/shared';
import React from 'react';

export default function ImageBox({
  boxSize,
  imgElement,
}: {
  boxSize: number | string;
  imgElement: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'image__box rounded-[10px] overflow-hidden shrink-0',
        'border border-solid border-[#ccc]',
      )}
      style={{
        width: typeof boxSize === 'number' ? `${boxSize}px` : boxSize,
        height: typeof boxSize === 'number' ? `${boxSize}px` : 'auto',
        aspectRatio: '1 / 1',
      }}
    >
      {imgElement}
    </div>
  );
}

import { cn } from '@/shared';
import React from 'react';

export default function ImageBox({
  boxSize,
  imgElement,
}: {
  boxSize: number;
  imgElement: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'image__box rounded-[10px] overflow-hidden shrink-0',
        'border border-solid border-[#ccc]',
      )}
      style={{ width: `${boxSize}px`, height: `${boxSize}px` }}
    >
      {imgElement}
    </div>
  );
}

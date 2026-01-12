import { useEffect, useState } from 'react';
import useIntersect from '@/features/intersect/useIntersect';
import { cn } from '@/shared';
import { is } from 'date-fns/locale';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className: string;
  onLoad?: () => void;
}

export default function LazyImage(props: Readonly<OptimizedImageProps>) {
  const { ref, isIntersecting } = useIntersect<HTMLImageElement>({
    rootMargin: '100px',
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={cn('overflow-hidden', props.className)}>
      {isIntersecting ? (
        <img
          src={props.src}
          alt={props.alt}
          className={cn('w-full h-full object-cover')}
          onLoad={props.onLoad}
        />
      ) : (
        <div
          className={cn(
            'w-full h-full flex items-center justify-center bg-[#ccc]',
          )}
        ></div>
      )}
    </div>
  );
}

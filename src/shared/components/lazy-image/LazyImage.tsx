import type { ImgHTMLAttributes } from 'react';
import useIntersect from '@/features/intersect/useIntersect';

const INTERSECT_OPTIONS: IntersectionObserverInit = { threshold: 0.1 };

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export default function LazyImage({ src, alt, className, ...rest }: LazyImageProps) {
  const { ref, isIntersecting } = useIntersect<HTMLDivElement>(INTERSECT_OPTIONS);

  return (
    <div ref={ref} className="w-full h-full">
      {isIntersecting && <img src={src} alt={alt} className={className} {...rest} />}
    </div>
  );
}

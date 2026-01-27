import { cn } from '@/shared';
import useIntersect from '@/features/intersect/useIntersect';

export default function LazyImage({
  src,
  alt,
  className,
  skeletonComponent,
}: Readonly<{
  src: string;
  alt: string;
  className?: string;
  skeletonComponent: React.ReactNode;
}>) {
  const { ref, isIntersecting } = useIntersect({
    threshold: 0.2,
    rootMargin: '100px',
  });

  return (
    <div className={cn('observe__lazy__image', className)} ref={ref}>
      {isIntersecting ? (
        <img
          src={src}
          alt={alt}
          loading={'lazy'}
          className={cn('w-full h-full object-cover')}
        />
      ) : (
        skeletonComponent
      )}
    </div>
  );
}

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/shared/lib/utils';

interface OptimizedImageProps {
  className?: string;
  src: string;
  alt: string;
  placeholder?: string;
  lazy?: boolean;
}

const OptimizedImage = ({
  className,
  src,
  alt,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3Crect fill="%23e5e7eb"/%3E%3C/svg%3E',
  lazy = true,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lazy || !containerRef.current) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 테스트용 3초 딜레이
          timeoutId = setTimeout(() => {
            setIsInView(true);
          }, 3000);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' },
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [lazy]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
    >
      {isInView && (
        <img
          ref={imgRef}
          src={isLoaded ? src : placeholder}
          data-src={src}
          alt={alt}
          onLoad={handleLoad}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
          )}
        />
      )}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 rounded-[8px]" />
      )}
    </div>
  );
};

export default OptimizedImage;

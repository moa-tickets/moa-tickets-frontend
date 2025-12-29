import { bannerSlides } from '@/entities/constant/bannerSlides';
import { cn } from '@/shared';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BannerSlides = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % bannerSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentBannerIndex]);

  return (
    <div
      className={cn(
        'banner__slide w-[180px] h-[50px] ml-[30px] overflow-hidden relative',
      )}
    >
      {bannerSlides.map(
        (slide: {
          id: number;
          imageUrl: string;
          linkUrl: string;
          alt: string;
        }) => (
          <Link
            to={slide.linkUrl}
            key={slide.id}
            className="absolute left-0 right-0"
            style={{
              transition: 'top 0.5s ease-in-out',
              top: `${(slide.id - 1) * 50 - 50 * currentBannerIndex}px`,
            }}
          >
            <img src={slide.imageUrl} alt={slide.alt} />
          </Link>
        ),
      )}
    </div>
  );
};

export default BannerSlides;

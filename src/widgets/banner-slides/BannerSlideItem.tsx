import React from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '@/shared/components/skeleton/Skeleton';

interface BannerSlideItemProps {
  slide: {
    id: number;
    imageUrl: string;
    linkUrl: string;
    alt: string;
  };
}

const BannerSlideItem = React.memo(({ slide }: BannerSlideItemProps) => (
  <Link to={slide.linkUrl} className="block w-[180px] h-[50px]">
    <img src={slide.imageUrl} alt={slide.alt} className="w-[180px] h-[50px]" />
  </Link>
));

export default BannerSlideItem;

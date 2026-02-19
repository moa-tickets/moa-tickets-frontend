import type { HomeProductContent } from '@/entities/types/types';
import { cn } from '@/shared';
import ImageBox from '@/shared/components/image-box/ImageBox';
import SideBannerDesc from './SideBannerDesc';

export default function SideBannerItem({
  data,
  index,
}: {
  data: HomeProductContent;
  index: number;
}) {
  return (
    <div className={cn('side__banner__item mb-[20px] gap-[16px] flex')}>
      <ImageBox
        imgElement={
          <img
            src={data.mainImageUrl}
            alt={data.name}
            className={'w-full h-full object-cover'}
          />
        }
        boxSize={150}
      />
      <span className={cn('text-[#FD5744]')}>{index}</span>
      <SideBannerDesc data={data} />
    </div>
  );
}

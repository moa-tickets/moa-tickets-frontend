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
    <div
      className={cn(
        'side__banner__item pb-[20px] gap-[16px] flex',
        index === 1 ? 'pt-0' : 'pt-[20px]',
        'border-b border-[#eee] border-solid',
      )}
    >
      <ImageBox
        imgElement={
          <img
            src={data.mainImageUrl}
            alt={data.name}
            className={'w-full h-full object-cover'}
          />
        }
        boxSize={130}
      />
      <span className={cn('text-[#FD5744]')}>{index}</span>
      <SideBannerDesc data={data} />
    </div>
  );
}

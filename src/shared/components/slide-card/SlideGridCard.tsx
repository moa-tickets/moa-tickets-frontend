import type { WillOpenGridItem } from '@/entities/types/types';
import OptimizedImage from '@/shared/components/lazy-loading/LazyImage';
import Skeleton from '../skeleton/Skeleton';

const SlideGridCard = ({ item }: { item: WillOpenGridItem }) => {
  return (
    <div className="flex bg-white rounded-lg overflow-hidden h-[140px]">
      {/* 이미지 영역 */}
      <div className="w-[110px] h-full flex-shrink-0">
        <OptimizedImage
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full"
          skeletonComponent={<Skeleton className="w-full h-full bg-[#ccc]" />}
        />
      </div>

      {/* 정보 영역 */}
      <div className="flex flex-col justify-center px-4 py-3 flex-1 min-w-0">
        {/* 날짜/시간 */}
        <p className="text-[#4A90D9] font-semibold text-sm mb-2">{item.date}</p>

        {/* 제목 */}
        <h3 className="text-gray-900 font-medium text-sm leading-snug mb-1 truncate">
          {item.title}
        </h3>

        {/* 티켓 타입 */}
        <p className="text-gray-500 text-xs mb-3">{item.ticketType}</p>

        {/* 태그 영역 */}
        <div className="flex gap-2">
          {item.isHot && (
            <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded">
              HOT
            </span>
          )}
          {item.isExclusive && (
            <span className="px-2 py-0.5 bg-yellow-400 text-gray-800 text-xs font-medium rounded">
              단독판매
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlideGridCard;

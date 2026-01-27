import { cn } from '@/shared';
import Skeleton from '@/shared/components/skeleton/Skeleton';

const SearchResultListSkeleton = () => {
  return (
    <div
      className={cn(
        'search__result__list__skeleton__wrapper ml-[40px] flex gap-[20px]',
      )}
    >
      {Array.from({ length: 4 }, (_, i) => (
        <div className={cn('serach__result__list__skeleton')} key={i}>
          <Skeleton
            className={cn(
              'w-[188px] h-[250px] bg-[#ccc] rounded-[10px] mb-[20px]',
            )}
          />
          <Skeleton
            className={cn(
              'w-[188px] h-[20px] bg-[#ccc] rounded-[10px] mb-[20px]',
            )}
          />
          <Skeleton
            className={cn('w-[188px] h-[30px] bg-[#ccc] rounded-[10px]')}
          />
        </div>
      ))}
    </div>
  );
};

export default SearchResultListSkeleton;

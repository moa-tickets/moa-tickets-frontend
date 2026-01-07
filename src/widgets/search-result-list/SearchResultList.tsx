import type { ConcertListType } from '@/entities/types/types';

interface SearchResultListProps {
  data: ConcertListType[];
  isLoading?: boolean;
}

const SearchResultList = ({ data, isLoading }: SearchResultListProps) => {
  if (isLoading) {
    return (
      <div className="search__result__list grid grid-cols-3 grid-rows-2 w-full gap-[20px] ml-[40px]">
        {[
          'skeleton-1',
          'skeleton-2',
          'skeleton-3',
          'skeleton-4',
          'skeleton-5',
          'skeleton-6',
        ].map((id) => (
          <div key={id} className="animate-pulse">
            <div className="w-full h-[250px] mb-[20px] bg-muted rounded-[8px]" />
            <div className="h-[20px] bg-muted rounded mb-[10px] w-3/4" />
            <div className="h-[14px] bg-muted rounded mb-[10px] w-1/2" />
            <div className="h-[14px] bg-muted rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="search__result__empty flex flex-col items-center justify-center w-full py-[80px] ml-[40px]">
        <div className="text-[60px] mb-[20px]">🔍</div>
        <h3 className="text-[20px] font-bold text-gray-700 mb-[10px]">
          검색 결과가 없습니다
        </h3>
        <p className="text-[14px] text-gray-400 text-center">
          다른 검색어로 다시 시도해 보세요
        </p>
      </div>
    );
  }

  return (
    <div className="search__result__list grid grid-cols-3 grid-rows-2 gap-[20px] ml-[40px]">
      {data.map((item: ConcertListType) => (
        <div key={item.concertName} className="inline-block">
          <div className="search__result__item__thumbnail w-full h-[250px] mb-[20px]">
            <img
              src={item.concertThumbnail}
              alt={item.concertName}
              className="w-full h-full object-cover rounded-[8px]"
            />
          </div>
          <div className="search__result__item__name font-bold mb-[10px]">
            {item.concertName}
          </div>
          <div className="search__result__item__place text-[14px] font-medium mb-[10px]">
            {item.concertDuration.split('T')[0]}
          </div>
          <div className="search__result__item__start text-[14px] font-medium text-[#ccc]">
            {item.concertStart.split('T')[0]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResultList;

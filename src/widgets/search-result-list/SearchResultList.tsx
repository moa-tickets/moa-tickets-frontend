import React from 'react';
import type { ConcertList } from '@/entities/reducers/ConcertListReducer';
import { cn } from '@/shared';
import SearchResultItem from './SearchResultItem';

const SearchResultList = React.memo(({ data }: { data: ConcertList[] }) => {
  if (data.length === 0) {
    return (
      <div
        className={cn(
          'flex flex-1 ml-[40px] h-[400px] items-center justify-center',
          'text-[16px] text-[#999]',
        )}
      >
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <div className={cn('flex ml-[40px]')}>
      {data.map((concertItem: ConcertList) => (
        <SearchResultItem
          key={concertItem.concertId}
          concertItem={concertItem}
        />
      ))}
    </div>
  );
});

export default SearchResultList;

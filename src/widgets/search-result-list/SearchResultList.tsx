import React from 'react';
import type { ConcertList } from '@/entities/reducers/ConcertListReducer';
import { cn } from '@/shared';
import SearchResultItem from './SearchResultItem';

const SearchResultList = React.memo(({ data }: { data: ConcertList[] }) => {
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

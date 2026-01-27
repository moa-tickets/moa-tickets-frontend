import React from 'react';
import { Link } from 'react-router-dom';
import type { ConcertList } from '@/entities/reducers/ConcertListReducer';

const SearchResultItem = React.memo(
  ({ concertItem }: { concertItem: ConcertList }) => {
    return (
      <Link to={`/detail/${concertItem.concertId}`} className="mr-[30px]">
        <div className="search__result__item__thumbnail w-full h-[250px] mb-[20px] ">
          <img
            src={concertItem.concertThumbnail}
            alt={concertItem.concertName}
            className="w-full h-full object-cover rounded-[8px]"
          />
        </div>
        <div className="search__result__item__name font-bold mb-[10px]">
          {concertItem.concertName}
        </div>
        <div className="search__result__item__place text-[14px] font-medium mb-[10px]">
          {concertItem.hallName}
        </div>
        <div className="search__result__item__start text-[14px] font-medium text-[#ccc]">
          {concertItem.concertStart.split('T')[0].split('-')[0]}.
          {concertItem.concertStart.split('T')[0].split('-')[1]}.
          {concertItem.concertStart.split('T')[0].split('-')[2]}
        </div>
      </Link>
    );
  },
);

export default SearchResultItem;

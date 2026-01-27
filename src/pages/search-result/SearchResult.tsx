import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import type { RealConcertList } from '@/entities/reducers/ConcertListReducer';
import type { DateFilterState } from '@/entities/reducers/DateFilterReducer';
import { useProductSearch } from '@/features/product-search/useProductSearch';
import { cn } from '@/shared';
import SearchFilter from '@/widgets/search-filter/SearchFilter';
import SearchResultList from '@/widgets/search-result-list/SearchResultList';
import SearchResultListSkeleton from '@/widgets/search-result-list/SearchResultListSkeleton';

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const { getProductList, getProductListPending } = useProductSearch();

  const { data: concertListData } = useSelector(
    (state: { concertListReducer: RealConcertList }) =>
      state.concertListReducer,
  );

  const { from, to } = useSelector(
    (state: { dateFilterReducer: DateFilterState }) => state.dateFilterReducer,
  );

  const filteredData = useMemo(() => {
    if (!from && !to) return concertListData;

    return concertListData.filter((concert) => {
      const concertStart = new Date(concert.concertStart);
      const concertEnd = new Date(concert.concertEnd);
      const filterFrom = from ? new Date(from) : null;
      const filterTo = to ? new Date(to) : null;

      if (filterFrom && filterTo) {
        return concertStart <= filterTo && concertEnd >= filterFrom;
      }
      if (filterFrom) {
        return concertEnd >= filterFrom;
      }
      if (filterTo) {
        return concertStart <= filterTo;
      }
      return true;
    });
  }, [concertListData, from, to]);

  useEffect(() => {
    if (query) {
      getProductList.mutate({
        searchParam: query,
        sortBy: 'date',
        sortOrder: 'asc',
        page: 0,
      });
    }
  }, [query]);

  return (
    <div className={cn('search__result__wrapper w-full mb-[50px]')}>
      <div
        className={cn('search__result max-w-[1080px] mx-auto mt-[30px] flex')}
      >
        <SearchFilter />
        {!getProductListPending && <SearchResultList data={filteredData} />}
        {getProductListPending && <SearchResultListSkeleton />}
      </div>
    </div>
  );
};

export default SearchResult;

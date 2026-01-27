import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import type { RealConcertList } from '@/entities/reducers/ConcertListReducer';
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
        {!getProductListPending && <SearchResultList data={concertListData} />}
        {getProductListPending && <SearchResultListSkeleton />}
      </div>
    </div>
  );
};

export default SearchResult;

import { useLoginDataFunction } from '@/features/login/useLoginDataFunction';
import { useProductSearch } from '@/features/product-search/useProductSearch';
import { cn } from '@/shared';
import SearchFilter from '@/widgets/search-filter/SearchFilter';
import SearchResultList from '@/widgets/search-result-list/SearchResultList';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const { getSearchResults, productPostTest, concertList, isLoading } = useProductSearch();
  const { goSeller } = useLoginDataFunction();

  useEffect(() => {
    goSeller.mutate();
    productPostTest.mutate();
  }, []);

  useEffect(() => {
    if (query) {
      getSearchResults.mutate({ query });
    }
  }, [query]);

  console.log('concertList', concertList);
  console.log('isLoading', isLoading);

  return (
    <div className={cn('search__result__wrapper w-full mb-[50px]')}>
      <div
        className={cn('search__result max-w-[1080px] mx-auto mt-[30px] flex')}
      >
        <SearchFilter />
        <SearchResultList data={concertList} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default SearchResult;

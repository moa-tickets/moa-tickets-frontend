import { cn } from '@/shared';
import SearchFilter from '@/widgets/search-filter/SearchFilter';

const SearchResult = () => {
  return (
    <div className={cn('search__result__wrapper w-full')}>
      <div
        className={cn('search__result max-w-[1080px] mx-auto mt-[30px] flex')}
      >
        <SearchFilter />
      </div>
    </div>
  );
};

export default SearchResult;

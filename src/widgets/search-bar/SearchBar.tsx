import { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/shared';
import SearchInput from './SearchInput';
import SearchRankingBarWrapper from './SearchRankingBarWrapper';
import { useSearchParams } from 'react-router-dom';

const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams();
  const [searchWords, setSearchWords] = useState<string>(
    searchParams.get('q') || '',
  );

  useEffect(() => {
    const queryValue = searchParams.get('q') || '';
    // 값이 실제로 변경됐을 때만 업데이트
    setSearchWords(prev => prev === queryValue ? prev : queryValue);
  }, [searchParams]);

  const handleSearchWordsChange = useCallback((value: string) => {
    setSearchWords(value);
  }, []);

  return (
    <div className={cn('search__bar-wrapper relative ml-[30px]')}>
      <SearchInput
        ref={inputRef}
        searchWords={searchWords}
        onSearchWordsChange={handleSearchWordsChange}
      />
      <SearchRankingBarWrapper inputRef={inputRef} />
    </div>
  );
};

export default SearchBar;

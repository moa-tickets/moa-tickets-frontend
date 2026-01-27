import React, { forwardRef, useCallback, memo } from 'react';
import { cn } from '@/shared';
import Icon from '@/shared/lib/Icon';
import { useNavigate } from 'react-router-dom';

interface SearchInputProps {
  searchWords: string;
  onSearchWordsChange: (value: string) => void;
}

const SearchInputInner = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ searchWords, onSearchWordsChange }, ref) => {
    const navigate = useNavigate();

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchWordsChange(e.target.value);
      },
      [onSearchWordsChange],
    );

    const handleSearch = useCallback(() => {
      if (searchWords.trim()) {
        navigate(`/search/result?q=${searchWords}`);
      }
    }, [navigate, searchWords]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
      },
      [handleSearch],
    );

    return (
      <div
        className={cn(
          'search__bar w-[360px] h-[50px] flex border border-solid border-[#dfdfe0] px-5 rounded-[30px]',
        )}
      >
        <input
          type="text"
          placeholder="매일 해외여행 50% 선착순 쿠폰"
          className={cn('h-full flex-1 outline-none')}
          ref={ref}
          value={searchWords}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSearch}
          className={cn('cursor-pointer disabled:opacity-45')}
          disabled={!searchWords.trim()}
        >
          <Icon ICON="SEARCH_ICON" className={cn('w-7 h-7 fill-none')} />
        </button>
      </div>
    );
  },
);

const SearchInput = memo(SearchInputInner, (prevProps, nextProps) => {
  return (
    prevProps.searchWords === nextProps.searchWords &&
    prevProps.onSearchWordsChange === nextProps.onSearchWordsChange
  );
});

export default SearchInput;

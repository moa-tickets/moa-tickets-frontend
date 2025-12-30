import { useEffect, useRef, useState } from 'react';
import { cn } from '@/shared';
import Icon from '@/shared/lib/Icon';
import SearchRankingBar from './SearchRankingBar';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const autoCompleteBox = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState<boolean>(false);
  const [searchWords, setSearchWords] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const outsideClickListener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const refArray = [autoCompleteBox, inputRef];
      const isContained = refArray.some(
        (ref) => ref.current && ref.current.contains(target),
      );
      if (isContained) return;
      setIsAutoCompleteOpen(false);
    };

    document.addEventListener('click', outsideClickListener);
    document.addEventListener('touchstart', outsideClickListener);

    return () => {
      document.removeEventListener('click', outsideClickListener);
      document.removeEventListener('touchstart', outsideClickListener);
    };
  }, []);

  return (
    <div className={cn('search__bar-wrapper relative ml-[30px]')}>
      <div
        className={cn(
          'search__bar w-[360px] h-[50px] flex border border-solid border-[#dfdfe0] px-5 rounded-[30px]',
        )}
      >
        <input
          type="text"
          placeholder="매일 해외여행 50% 선착순 쿠폰"
          className={cn('h-full flex-1 outline-none')}
          onFocus={() => setIsAutoCompleteOpen(true)}
          onBlur={() => setIsAutoCompleteOpen(false)}
          ref={inputRef}
          value={searchWords}
          onChange={(e) => setSearchWords(e.target.value)}
        />
        <button
          onClick={() => {
            navigate(`/search/result?q=${searchWords}`);
          }}
          className={cn('cursor-pointer disabled:opacity-45')}
          disabled={!searchWords.trim()}
        >
          <Icon ICON="SEARCH_ICON" className={cn('w-7 h-7 fill-none')} />
        </button>
      </div>
      {isAutoCompleteOpen && <SearchRankingBar ref={autoCompleteBox} />}
    </div>
  );
};

export default SearchBar;

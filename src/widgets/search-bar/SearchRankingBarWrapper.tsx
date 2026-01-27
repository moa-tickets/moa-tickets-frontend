import { useEffect, useRef, useState, useCallback } from 'react';
import SearchRankingBar from './SearchRankingBar';

interface SearchRankingBarWrapperProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const SearchRankingBarWrapper = ({
  inputRef,
}: SearchRankingBarWrapperProps) => {
  const autoCompleteBox = useRef<HTMLDivElement>(null);
  const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleFocus = () => {
      setIsAutoCompleteOpen(true);
    };

    const inputElement = inputRef.current;
    inputElement?.addEventListener('focus', handleFocus);

    return () => {
      inputElement?.removeEventListener('focus', handleFocus);
    };
  }, [inputRef]);

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
  }, [inputRef]);

  if (!isAutoCompleteOpen) return null;

  return <SearchRankingBar ref={autoCompleteBox} />;
};

export default SearchRankingBarWrapper;

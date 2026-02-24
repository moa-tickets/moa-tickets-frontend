import React, { useState } from 'react';
import { cn } from '@/shared';
import SearchButton from '@/shared/components/search-button/SearchButton';

const SearchRankingBar = React.memo(
  ({ ref }: { ref: React.Ref<HTMLDivElement> }) => {
    const [recentWords] = useState<string[]>([]);

    return (
      <div
        className={cn(
          'search__ranking__bar absolute left-0 top-[calc(100%+16px)] z-[1000] w-[calc(100%+50px)] bg-white shadow-[0_1px_1px_1px_rgba(0,0,0,0.25)] rounded-[14px] p-[23px]',
        )}
        ref={ref}
      >
        {recentWords.length > 0 && (
          <div className={cn('recent__searches')}>
            <h2 className="font-bold text-[17px] mb-[17px]">최근 검색어</h2>
            <ul className="flex items-center gap-[10px]">
              {recentWords.map((word: string) => (
                <SearchButton key={word} content={word} />
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
);

export default SearchRankingBar;

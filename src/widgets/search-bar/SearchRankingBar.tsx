import React, { useState } from 'react';
import { cn } from '@/shared';
import SearchButton from '@/shared/components/search-button/SearchButton';

const INITIAL_POPULAR_RANKS = [
  { ranks: 1, words: '싱어게인', changedRanks: 0 },
  { ranks: 2, words: '성시경', changedRanks: 0 },
  { ranks: 3, words: '임영웅', changedRanks: 0 },
  { ranks: 4, words: '킥플립', changedRanks: 1 },
  { ranks: 5, words: '어쩌면 해피엔딩', changedRanks: -1 },
  { ranks: 6, words: '이창섭', changedRanks: -2 },
  { ranks: 7, words: '부산', changedRanks: 3 },
  { ranks: 8, words: '조용필', changedRanks: 3 },
  { ranks: 9, words: '싱어게인4', changedRanks: 0 },
  { ranks: 10, words: '대구', changedRanks: -1 },
];

const SearchRankingBar = React.memo(
  ({ ref }: { ref: React.Ref<HTMLDivElement> }) => {
    const [recentWords, setRecentWords] = useState<string[]>([]);
    const [popularRanks, setPopularRanks] = useState(INITIAL_POPULAR_RANKS);

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
        <div className={cn('popular__searches')}>
          <h2 className="font-bold text-[17px] mb-[17px]">실시간 검색어</h2>
          <ul className={cn('flex flex-wrap justify-between')}>
            {popularRanks.map(
              (pr: { ranks: number; words: string; changedRanks: number }) => (
                <li
                  key={pr.ranks}
                  className={cn(
                    'w-[40%] flex items-center',
                    pr.ranks % 2 === 0 ? 'ml-[30px]' : '',
                    'relative',
                    'mb-[3px]',
                  )}
                >
                  <span className={cn('mr-[20px] text-[#ff0000]')}>
                    {pr.ranks}
                  </span>
                  <span className={cn('text-[14px]')}>{pr.words}</span>
                  <span
                    className={cn(
                      'absolute right-0',
                      pr.changedRanks > 0 && 'text-[#317cff',
                      pr.changedRanks < 0 && 'text-[#ff0000]',
                    )}
                  >
                    {pr.changedRanks === 0 ? '-' : Math.abs(pr.changedRanks)}
                  </span>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    );
  },
);

export default SearchRankingBar;

import { cn } from '@/shared';
import { Search } from 'lucide-react';

export default function CommunitySearcher() {
  return (
    <div
      className={cn(
        'community__searcher',
        'border border-solid border-[#ccc] ',
        'rounded-[7px]',
        'flex items-center gap-[8px]',
        'flex-row-reverse',
      )}
    >
      <input
        type="text"
        placeholder="원하는 제목을 검색하세요."
        className={cn(
          'community__searcher__input',
          'text-[14px]',
          'outline-none',
          'w-[250px]',
          'py-[4px] px-[10px]',
        )}
      />
      <button
        aria-label="search-button"
        className={cn('community__searcher__button', 'ml-[10px]')}
      >
        <Search className="w-[15px] h-[15px]" />
      </button>
    </div>
  );
}

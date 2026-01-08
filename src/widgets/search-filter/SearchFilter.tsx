import { cn } from '@/shared';
import FilterSelect from './FilterSelect';
import { useSelectedFilterStore } from '@/entities/stores/useSelectedFilter';

const SearchFilter = () => {
  const { resetDateSelection } = useSelectedFilterStore();

  const handleReset = () => {
    resetDateSelection();
  };

  return (
    <div
      className={cn(
        'search__filter border border-solid border-[#ddd] rounded-lg p-[16px] min-w-[320px] w-[320px]',
      )}
    >
      <h1 className={cn('pb-[20px] border-b border-solid border-[#ddd]')}>
        필터
      </h1>
      <FilterSelect className="date" title="날짜/date" />
      <div className={cn('button__wrapper mt-[20px] flex gap-2 flex-nowrap')}>
        <button
          onClick={handleReset}
          className={cn(
            'px-[18px] py-[8px] border border-solid border-[#ccc] rounded-[6px] text-[14px] cursor-pointer whitespace-nowrap',
            'hover:bg-black hover:text-white transition-all duration-600',
          )}
        >
          초기화
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;

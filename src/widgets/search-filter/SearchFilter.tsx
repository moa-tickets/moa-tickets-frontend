import { cn } from '@/shared';
import FilterSelect from './FilterSelect';
import { useSelectedFilterStore } from '@/entities/stores/useSelectedFilter';

const SearchFilter = () => {
  const {
    genre,
    removeGenre,
    saleStatus,
    removeSaleStatus,
    setDateFrom,
    setDateTo,
  } = useSelectedFilterStore();

  const genreList = ['콘서트', '뮤지컬'];
  const stateList = ['판매중', '판매예정', '판매종료'];

  const handleReset = () => {
    // 장르 초기화
    genre.forEach((g) => removeGenre(g));

    // 판매상태 초기화
    saleStatus.forEach((s) => removeSaleStatus(s));

    // 날짜 초기화
    setDateFrom(new Date());
    setDateTo(undefined);
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
      <FilterSelect
        className="genre"
        title="장르/genre"
        isNestable
        selectList={genreList}
      />
      <FilterSelect
        className="state"
        title="판매상태/saleStatus"
        isNestable
        selectList={stateList}
      />
      <FilterSelect className="date" title="날짜/date" />
      <div className={cn('button__wrapper mt-[20px] flex gap-2 flex-nowrap')}>
        <button
          onClick={handleReset}
          className={cn(
            'px-[18px] py-[8px] border border-solid border-[#ccc] rounded-[6px] text-[14px] cursor-pointer whitespace-nowrap',
          )}
        >
          초기화
        </button>
        <button
          className={cn(
            'px-[18px] py-[8px] bg-[#4154ff] text-white rounded-[6px] text-[14px] cursor-pointer whitespace-nowrap',
          )}
        >
          1개 검색
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;

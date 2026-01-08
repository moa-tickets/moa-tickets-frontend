import { cn } from '@/shared';
import type { RangeType, BasisType } from '@/features/booking/useBookings';

type SelectPeriodProps = {
  // 기간별 필터
  selectedRange: RangeType | null;
  onRangeChange: (range: RangeType | null) => void;
  // 월별 필터
  selectedBasis: BasisType;
  onBasisChange: (basis: BasisType) => void;
  selectedYear: number;
  onYearChange: (year: number) => void;
  selectedMonth: number | null;
  onMonthChange: (month: number | null) => void;
  // 조회 버튼
  onSearch: () => void;
};

const rangeOptions: { label: string; value: RangeType }[] = [
  { label: '15일', value: 'D15' },
  { label: '1개월', value: 'M1' },
  { label: '2개월', value: 'M2' },
  { label: '3개월', value: 'M3' },
];

const basisOptions: { label: string; value: BasisType }[] = [
  { label: '예매일', value: 'BOOKED_AT' },
  { label: '관람일', value: 'VIEWED_AT' },
];

const SelectPeriod = ({
  selectedRange,
  onRangeChange,
  selectedBasis,
  onBasisChange,
  selectedYear,
  onYearChange,
  selectedMonth,
  onMonthChange,
  onSearch,
}: SelectPeriodProps) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // 기간별 필터 선택 시 월별 필터 초기화
  const handleRangeClick = (range: RangeType) => {
    if (selectedRange === range) {
      onRangeChange(null);
    } else {
      onRangeChange(range);
      // 월별 필터 초기화
      onMonthChange(null);
    }
  };

  // 월별 필터 선택 시 기간별 필터 초기화
  const handleMonthFilterChange = () => {
    if (selectedRange) {
      onRangeChange(null);
    }
  };

  return (
    <div className={cn('select__period flex flex-col mt-[30px] gap-[30px]')}>
      {/* 기간별 조회 */}
      <div className={cn('flex items-center gap-[20px]')}>
        <span className={cn('text-[14px] w-[80px]')}>기간별 조회</span>
        <ul className={cn('flex')}>
          {rangeOptions.map((option, i) => (
            <li key={option.value}>
              <button
                className={cn(
                  'px-[12px] py-[4px] text-[14px] border border-solid border-gray-300 box-border cursor-pointer',
                  selectedRange === option.value && 'bg-black text-white m-0',
                  selectedRange !== option.value && i > 0 && 'ml-[-1px]',
                )}
                onClick={() => handleRangeClick(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 월별 조회 */}
      <div className={cn('flex items-center gap-[20px]')}>
        <span className={cn('text-[14px] w-[80px]')}>월 별 조회</span>
        <div className={cn('flex gap-[5px]')}>
          {/* 기준 선택 (예매일/관람일) */}
          <select
            value={selectedBasis}
            onChange={(e) => {
              onBasisChange(e.target.value as BasisType);
              handleMonthFilterChange();
            }}
            className={cn(
              'px-[12px] py-[6px] border border-[#ECEDF2] rounded-[2px] text-[12px] cursor-pointer w-[100px]',
            )}
          >
            {basisOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* 연도 선택 */}
          <select
            value={selectedYear}
            onChange={(e) => {
              onYearChange(Number(e.target.value));
              handleMonthFilterChange();
            }}
            className={cn(
              'px-[12px] py-[6px] border border-[#ECEDF2] rounded-[2px] text-[12px] cursor-pointer w-[80px]',
            )}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* 월 선택 */}
          <select
            value={selectedMonth ?? ''}
            onChange={(e) => {
              const value = e.target.value;
              onMonthChange(value ? Number(value) : null);
              handleMonthFilterChange();
            }}
            className={cn(
              'px-[12px] py-[6px] border border-[#ECEDF2] rounded-[2px] text-[12px] cursor-pointer w-[70px]',
            )}
          >
            <option value="">전체</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}월
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={onSearch}
        className={cn(
          'w-[100px] py-[4px] text-center rounded-[5px] border border-solid border-black hover:bg-black hover:text-white cursor-pointer transition-all duration-600',
        )}
      >
        조회
      </button>
    </div>
  );
};

export default SelectPeriod;

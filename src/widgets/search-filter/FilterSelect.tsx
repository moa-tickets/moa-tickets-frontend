import { useState } from 'react';
import { cn } from '@/shared';
import FilterSelectButton from './FilterSelectButton';
import { Calendar } from '@/shared/components/ui/calendar';
import { useSelectedFilterStore } from '@/entities/stores/useSelectedFilter';

const FilterSelect = ({
  className,
  title,
  isNestable,
  selectList,
}: {
  className: string;
  title: string;
  isNestable?: boolean;
  selectList?: string[];
}) => {
  const titleEnglish = title.split('/')[1];
  const { dateRange, handleDateSelect } = useSelectedFilterStore();

  // Calendar 컴포넌트 강제 리렌더링을 위한 key
  const calendarKey = `${dateRange.from?.getTime() ?? 'none'}-${dateRange.to?.getTime() ?? 'none'}`;
  const [showModal, setShowModal] = useState(false);

  const isDisabledDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const getSelectedDateRange = () => {
    if (dateRange.from && dateRange.to) {
      return { from: dateRange.from, to: dateRange.to };
    }
    if (dateRange.from) {
      return { from: dateRange.from };
    }
    return undefined;
  };

  const handleDayClick = (day: Date) => {
    // disabled된 날짜는 무시
    if (isDisabledDate(day)) return;

    const result = handleDateSelect(day);
    if (result === 'already_selected') {
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
    }
  };

  return (
    <div
      className={cn(
        'filter__select py-[20px] border-b border-solid border-[#eee]',
        className,
      )}
    >
      <h3 className="font-bold mb-[10px]">
        {title.split('/')[0]}
        {isNestable && (
          <b className={cn('text-[12px] text-[#999] ml-[3px] font-normal')}>
            (중복선택가능)
          </b>
        )}
      </h3>
      {titleEnglish === 'date' ? (
        <div className="relative">
          <Calendar
            key={calendarKey}
            mode="range"
            selected={getSelectedDateRange()}
            disabled={isDisabledDate}
            onDayClick={handleDayClick}
          />
          {showModal && (
            <div
              className={cn(
                'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                'bg-black/80 text-white px-4 py-2 rounded-lg text-sm',
                'animate-fade-in z-10',
              )}
            >
              이미 선택했습니다
            </div>
          )}
        </div>
      ) : (
        <ul className="flex gap-3">
          {selectList?.map((selectItem: string) => (
            <FilterSelectButton
              key={selectItem}
              contents={selectItem}
              title={title}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterSelect;

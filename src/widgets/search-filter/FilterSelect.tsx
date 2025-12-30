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
  const { dateRange } = useSelectedFilterStore();

  const handleDisabledDate = (date: Date) => {
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
        <Calendar
          mode="range"
          selected={getSelectedDateRange()}
          disabled={handleDisabledDate}
          onSelect={() => {}}
        />
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

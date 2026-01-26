import { cn } from '@/shared';
import DateCustomCalendar from '@/shared/components/date-calendar/DateCustomCalendar';

const FilterSelect = ({
  className,
  title,
}: {
  className: string;
  title: string;
}) => {
  return (
    <div
      className={cn(
        'py-[20px] mb-[16px] border-b border-solid border-[rgb(237,237,237)]',
        className,
      )}
    >
      <h2 className={cn('font-bold mb-[20px]')}>{title.split('/')[0]}</h2>
      {title.split('/')[1] === 'date' && <DateCustomCalendar />}
    </div>
  );
};

export default FilterSelect;

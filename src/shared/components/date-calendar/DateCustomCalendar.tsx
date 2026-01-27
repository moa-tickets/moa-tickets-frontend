import { useDispatch, useSelector } from 'react-redux';
import type { DateRange } from 'react-day-picker';
import { ko } from 'react-day-picker/locale';
import { Calendar } from '@/shared/components/ui/calendar';
import { cn } from '@/shared';
import {
  DATE_FILTER_CHANGE,
  type DateFilterState,
} from '@/entities/reducers/DateFilterReducer';

const DateCustomCalendar = () => {
  const dispatch = useDispatch();
  const { from, to } = useSelector(
    (state: { dateFilterReducer: DateFilterState }) => state.dateFilterReducer,
  );

  const dateRange: DateRange | undefined =
    from || to
      ? {
          from: from ? new Date(from) : undefined,
          to: to ? new Date(to) : undefined,
        }
      : undefined;

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  const handleSelect = (range: DateRange | undefined) => {
    dispatch({
      type: DATE_FILTER_CHANGE,
      payload: {
        from: range?.from?.toISOString() ?? null,
        to: range?.to?.toISOString() ?? null,
      },
    });
  };

  return (
    <div className={cn('date-custom-calendar')}>
      <div className={cn('date-display flex gap-2 items-center mb-4')}>
        <div
          className={cn(
            'date-box flex-1 px-3 py-2 border border-solid border-[#ddd] rounded text-sm text-center',
            dateRange?.from ? 'text-black' : 'text-gray-400',
          )}
        >
          {dateRange?.from ? formatDate(dateRange.from) : '시작 날짜'}
        </div>
        <span className={cn('text-gray-400')}>~</span>
        <div
          className={cn(
            'date-box flex-1 px-3 py-2 border border-solid border-[#ddd] rounded text-sm text-center',
            dateRange?.to ? 'text-black' : 'text-gray-400',
          )}
        >
          {dateRange?.to ? formatDate(dateRange.to) : '종료 날짜'}
        </div>
      </div>
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={handleSelect}
        locale={ko}
        className={cn('w-full')}
      />
    </div>
  );
};

export default DateCustomCalendar;

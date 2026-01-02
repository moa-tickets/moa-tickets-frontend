import { useState } from 'react';
import { cn } from '@/shared';
import Selector from './Selector';

const Select = ({ type }: { type: 'PERIOD' | 'MONTH' }) => {
  const periodFilter = ['15일', '1개월', '2개월', '3개월'];
  const monthFilter = ['예매일', '연도', '월'];
  const [periodSelected, setPeriodSelected] = useState<number>(0);

  return (
    <div className={cn('flex items-center gap-[20px]')}>
      <span className={cn('text-[14px]')}>
        {type === 'PERIOD' ? '기간별 조회' : '월 별 조회'}
      </span>
      {type === 'PERIOD' && (
        <ul className={cn('flex')}>
          {periodFilter.map((filter: string, i: number) => (
            <li key={filter}>
              <button
                className={cn(
                  'px-[12px] py-[4px]  text-[14px] border border-solid border-gray-300 box-border cursor-pointer',
                  periodSelected === i
                    ? 'bg-black text-white m-0'
                    : 'ml-[-1px]',
                )}
                onClick={() => {
                  setPeriodSelected(i);
                }}
              >
                {filter}
              </button>
            </li>
          ))}
        </ul>
      )}
      {type === 'MONTH' && (
        <div className={cn('flex gap-[5px]')}>
          {monthFilter.map((filter: string) => (
            <Selector key={filter} content={filter} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;

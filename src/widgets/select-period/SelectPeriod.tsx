import { cn } from '@/shared';
import Select from './Select';

const SelectPeriod = () => {
  return (
    <div className={cn('select__period flex flex-col mt-[30px] gap-[30px]')}>
      <Select type="PERIOD" />
      <Select type="MONTH" />
      <button
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

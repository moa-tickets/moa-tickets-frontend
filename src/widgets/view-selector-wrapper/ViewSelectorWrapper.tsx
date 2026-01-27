import ViewSelector from '@/shared/components/view-selector/ViewSelector';
import DropdownSelector from '@/shared/components/dropdown-selector/DropdownSelector';
import { cn } from '@/shared';
import { useState } from 'react';

export interface ViewSelectorParams {
  view: 'PERIOD' | 'MONTH';
  range?: 'D15' | 'M1' | 'M2' | 'M3';
  basis?: 'BOOKED_AT' | 'VIEWED_AT';
  year?: number;
  month?: number;
}

interface ViewSelectorWrapperProps {
  onChange: (params: ViewSelectorParams) => void;
}

const viewOptions = [
  { label: '기간', value: 'PERIOD' },
  { label: '월별', value: 'MONTH' },
];

const periodOptions = [
  { label: '15일', value: 'D15' },
  { label: '1개월', value: 'M1' },
  { label: '2개월', value: 'M2' },
  { label: '3개월', value: 'M3' },
];

const dateTypeOptions = [
  { label: '예매일', value: 'BOOKED_AT' },
  { label: '관람일', value: 'VIEWED_AT' },
];

const currentYear = new Date().getFullYear();
const yearOptions = [
  { label: `${currentYear - 1}년`, value: String(currentYear - 1) },
  { label: `${currentYear}년`, value: String(currentYear) },
  { label: `${currentYear + 1}년`, value: String(currentYear + 1) },
];

const monthOptions = [
  { label: '1월', value: '1' },
  { label: '2월', value: '2' },
  { label: '3월', value: '3' },
  { label: '4월', value: '4' },
  { label: '5월', value: '5' },
  { label: '6월', value: '6' },
  { label: '7월', value: '7' },
  { label: '8월', value: '8' },
  { label: '9월', value: '9' },
  { label: '10월', value: '10' },
  { label: '11월', value: '11' },
  { label: '12월', value: '12' },
];

const ViewSelectorWrapper = ({ onChange }: ViewSelectorWrapperProps) => {
  const [viewType, setViewType] = useState<'PERIOD' | 'MONTH'>('PERIOD');
  const [range, setRange] = useState<'D15' | 'M1' | 'M2' | 'M3'>('D15');
  const [basis, setBasis] = useState<'BOOKED_AT' | 'VIEWED_AT'>('BOOKED_AT');
  const [year, setYear] = useState(String(currentYear));
  const [month, setMonth] = useState(String(new Date().getMonth() + 1));

  const handleSearch = () => {
    if (viewType === 'PERIOD') {
      onChange({ view: 'PERIOD', range });
    } else {
      onChange({
        view: 'MONTH',
        basis,
        year: Number(year),
        month: Number(month),
      });
    }
  };

  return (
    <div className="view__selector__wrapper mt-[20px] mb-[30px] flex gap-[20px] items-center">
      <ViewSelector
        title={'조회 기준'}
        element={
          <DropdownSelector
            options={viewOptions}
            value={viewType}
            onChange={(v) => setViewType(v as 'PERIOD' | 'MONTH')}
          />
        }
      />

      {viewType === 'PERIOD' ? (
        <ViewSelector
          title={'기간별 조회'}
          element={
            <DropdownSelector
              options={periodOptions}
              value={range}
              onChange={(v) => setRange(v as 'D15' | 'M1' | 'M2' | 'M3')}
            />
          }
        />
      ) : (
        <>
          <ViewSelector
            title={'예매일'}
            element={
              <DropdownSelector
                options={dateTypeOptions}
                value={basis}
                onChange={(v) => setBasis(v as 'BOOKED_AT' | 'VIEWED_AT')}
              />
            }
          />
          <ViewSelector
            title={'연도'}
            element={
              <DropdownSelector
                options={yearOptions}
                value={year}
                onChange={setYear}
              />
            }
          />
          <ViewSelector
            title={'월'}
            element={
              <DropdownSelector
                options={monthOptions}
                value={month}
                onChange={setMonth}
              />
            }
          />
        </>
      )}

      <button
        type="button"
        onClick={handleSearch}
        className={cn(
          'px-[20px] py-[10px]',
          'bg-[#333] text-white text-[14px]',
          'rounded-[4px]',
          'hover:bg-[#555]',
          'cursor-pointer',
        )}
      >
        조회
      </button>
    </div>
  );
};

export default ViewSelectorWrapper;

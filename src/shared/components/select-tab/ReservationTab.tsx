import { cn } from '@/shared';

const ReservationTab = ({
  contents,
  selectedTab,
  onTabChange,
}: {
  contents: string[];
  selectedTab: number;
  onTabChange: (index: number) => void;
}) => {
  return (
    <div className={cn('reservation__tab w-full h-[60px]')}>
      <ul className={cn('flex h-full')}>
        {contents.map((c: string, i: number) => (
          <li key={c} className={cn('flex-1 h-full')}>
            <button
              className={cn(
                'w-full h-full border border-solid border-[#ecedf2] text-[14px] cursor-pointer',
                i === 1 && 'ml-[-1px]',
                selectedTab === i && 'bg-black text-white border-none',
              )}
              onClick={() => onTabChange(i)}
            >
              {c.split('/')[0]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationTab;

import { cn } from '@/shared';

const SelectTab = ({
  contentKey,
  selectedTab,
  onTabChange,
  icons,
}: {
  contentKey: string[];
  selectedTab: number;
  onTabChange: (index: number) => void;
  icons?: string[];
}) => {
  return (
    <ul className={cn('flex gap-4 justify-center mb-[20px]')}>
      {contentKey.map((key, index) => (
        <li key={key}>
          <button
            className={cn(
              'flex items-center gap-1 px-[18px] py-[6px] rounded-[20px] cursor-pointer',
              selectedTab === index
                ? 'bg-black text-white'
                : 'border border-solid border-gray-300 text-[#29292d]',
            )}
            onClick={() => {
              onTabChange(index);
            }}
          >
            {icons?.[index] && (
              <img src={icons[index]} alt={`${key.split('/')[1]} 아이콘`} className="w-4 h-4" />
            )}
            {key.split('/')[1]}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SelectTab;

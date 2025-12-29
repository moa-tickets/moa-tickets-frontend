import { cn } from '@/shared';

const SelectTab = ({
  contentKey,
  selectedTab,
  onTabChange,
}: {
  contentKey: string[];
  selectedTab: number;
  onTabChange: (index: number) => void;
}) => {
  return (
    <ul className={cn('flex gap-4 justify-center mb-[20px]')}>
      {contentKey.map((key, index) => (
        <li key={key}>
          <button
            className={cn(
              'px-[18px] py-[6px] rounded-[20px] cursor-pointer',
              selectedTab === index
                ? 'bg-black text-white'
                : 'border border-solid border-gray-300 text-[#29292d]',
            )}
            onClick={() => {
              onTabChange(index);
            }}
          >
            {key.split('/')[1]}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SelectTab;

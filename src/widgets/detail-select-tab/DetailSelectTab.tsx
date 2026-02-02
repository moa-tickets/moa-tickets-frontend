import { cn } from '@/shared';

export default function DetailSelectTab({
  lists,
  selectedTab,
  onChange,
}: {
  lists: { label: string; value: string }[];
  selectedTab: string;
  onChange: (element: string) => void;
}) {
  return (
    <ul
      className={cn('detail__select__tab', 'flex mt-[30px] mb-[40px] bg-black')}
    >
      {lists.map((list: { label: string; value: string }) => (
        <li key={list.label}>
          <button
            onClick={() => onChange(list.value)}
            className={cn(
              'w-[200px] py-[16px] cursor-pointer border border-solid border-[rgb(237,237,237)] box-border',
              selectedTab === list.value
                ? 'border-r border-black bg-black text-white'
                : 'border-b border-b-black border-r-0 bg-white',
            )}
          >
            {list.value}
          </button>
        </li>
      ))}
    </ul>
  );
}

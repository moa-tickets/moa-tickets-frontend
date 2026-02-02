import { cn } from '@/shared';

const DetailSelectTab = ({
  lists,
  selectedState,
  onChange,
}: {
  lists: string[];
  selectedState: string;
  onChange: (element: string) => void;
}) => {
  return (
    <div className="detail__select__tab">
      {lists.map((list) => (
        <button
          key={list}
          className={cn(
            'w-[200px] py-[10px] border border-solid mb-[20px] cursor-pointer',
            selectedState === list
              ? 'border-black border-b-0'
              : 'border-[rgb(237,237,237)] mr-[-1px] border-b border-b-black',
          )}
          onClick={() => onChange(list)}
        >
          {list}
        </button>
      ))}
    </div>
  );
};

export default DetailSelectTab;

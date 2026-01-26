import { cn, formatToKoreanDateTime } from '@/shared/lib/utils';

const SelectorList = ({
  list,
  onChanger,
}: {
  list: {
    value: string;
    id: number;
  }[];
  onChanger: (element: string, sessionId: number) => void;
}) => {
  return (
    <div
      className={cn(
        'selector__lists',
        'absolute top-[calc(100%_+_10px)] flex flex-col z-[300]',
        'left-0 w-[240px]',
        'bg-black p-[10px]',
        'rounded-[4px]',
      )}
    >
      {list.map((list: { value: string; id: number }) => (
        <button
          key={list.id}
          className={cn(
            'text-white text-[14px] text-left py-[10px]',
            'rounded-[6px]',
            'cursor-pointer',
            'hover:bg-white hover:text-black',
          )}
          onClick={() => onChanger(list.value, list.id)}
        >
          {formatToKoreanDateTime(list.value)}
        </button>
      ))}
    </div>
  );
};

export default SelectorList;

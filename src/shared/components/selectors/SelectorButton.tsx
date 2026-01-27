import Icon from '@/shared/lib/Icon';
import { cn } from '@/shared/lib/utils';

const SelectorButton = ({
  title,
  onOpen,
}: {
  title: string;
  onOpen: () => void;
}) => {
  return (
    <button
      className={cn(
        'w-[240px] py-[10px] px-[20px]',
        'border border-solid border-black text-[14px]',
        'rounded-[4px]',
        'flex justify-between items-center',
        'cursor-pointer',
        'transition-all duration-600',
        'hover:bg-[#333] hover:text-white',
        'group',
      )}
      onClick={onOpen}
    >
      <span>{title}</span>
      <Icon
        ICON={'DOWN'}
        className={cn('w-[14px] h-[14px] group-hover:fill-[#fff]')}
      />
    </button>
  );
};

export default SelectorButton;

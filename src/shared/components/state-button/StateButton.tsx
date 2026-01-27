import { cn } from '@/shared';
import Icon from '@/shared/lib/Icon';

const StateButton = ({
  title,
  isActive,
}: {
  title: string;
  isActive?: boolean;
}) => {
  return (
    <button
      className={cn(
        'w-[76px] py-[4px] rounded-[6px] flex gap-[3px] justify-center items-center',
        isActive ? 'bg-[rgb(240,241,255)]' : 'bg-[rgb(244,244,245)]',
      )}
    >
      <span
        className={cn(
          'text-[14px] font-bold',
          isActive ? 'text-[rgb(65,84,255)]' : 'text-[rgb(126,126,129)]',
        )}
      >
        {title}
      </span>
      <Icon
        ICON={'QUESTION'}
        className={cn(
          'w-[14px] h-[14px',
          isActive ? 'fill-[rgb(65,84,255)]' : 'fill-[rgb(126,126,129)]',
        )}
      />
    </button>
  );
};

export default StateButton;

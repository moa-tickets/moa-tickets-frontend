import { cn } from '@/shared';
import Icon from '@/shared/lib/Icon';

const MobileSearchButton = () => {
  return (
    <button className={cn('sm:hidden block absolute right-0 cursor-pointer')}>
      <Icon ICON={'SEARCH_ICON'} className="w-[26px] h-[26px] fill-none" />
    </button>
  );
};

export default MobileSearchButton;

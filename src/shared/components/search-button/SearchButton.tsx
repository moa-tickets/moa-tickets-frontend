import { cn } from '@/shared';
import Icon from '@/shared/lib/Icon';

const SearchButton = ({ content }: { content: string }) => {
  return (
    <li>
      <button
        className={cn(
          'bg-[#e9f0fe] py-[6px] px-[13px] text-[#4154ff] rounded-[32px] flex gap-[20px] justify-between items-center cursor-pointer',
        )}
      >
        <span>{content}</span>
        <Icon ICON="CLOSE" className="w-[12px] h-[12px]" />
      </button>
    </li>
  );
};

export default SearchButton;

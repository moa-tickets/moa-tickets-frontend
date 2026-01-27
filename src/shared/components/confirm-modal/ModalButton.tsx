import { cn } from '@/shared';

const ModalButton = ({
  onClick,
  title,
}: {
  onClick: () => void;
  title: string;
}) => {
  return (
    <button
      className={cn(
        'w-[150px] py-[10px] bg-[#4159F0] text-white rounded-md cursor-pointer',
      )}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default ModalButton;

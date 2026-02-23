import { cn } from '@/shared';

const ModalButton = ({
  onClick,
  title,
  variant = 'primary',
}: {
  onClick: () => void;
  title: string;
  variant?: 'primary' | 'cancel';
}) => {
  return (
    <button
      className={cn(
        'w-[150px] py-[10px] rounded-md cursor-pointer',
        variant === 'primary'
          ? 'bg-[#4159F0] text-white'
          : 'bg-[#f2f2f2] text-[#333] border border-solid border-[#ccc]',
      )}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default ModalButton;

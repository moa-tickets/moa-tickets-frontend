import { cn } from '@/shared';

const SubmitButton = ({
  title,
  className,
  onClick,
}: {
  title: string;
  className: string;
  onClick: () => void;
}) => {
  return (
    <button
      className={cn(
        'submit__button py-[10px] bg-black text-white rounded-[10px]',
        className,
      )}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default SubmitButton;

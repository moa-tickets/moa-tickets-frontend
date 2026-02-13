import { cn } from '@/shared';

export default function WriteInput({
  className,
  isTextArea,
  placeholder,
  title,
}: {
  className: string;
  isTextArea?: boolean;
  placeholder: string;
  title: string;
}) {
  return (
    <div className={cn('write__input mt-[16px]', className)}>
      <h2 className={cn('text-[14px] mb-[6px]')}>{title}</h2>
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          className={cn(
            'w-full h-[200px] resize-none outline-none',
            'border border-solid border-gray-300',
            'p-[8px]',
            'text-[14px]',
          )}
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          className={cn(
            'border-b border-solid border-gray-300',
            'w-full',
            'text-[14px] py-[6px] px-[4px]',
            'outline-none',
          )}
        />
      )}
    </div>
  );
}

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/shared/lib/utils';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownSelectorProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const DropdownSelector = ({
  options,
  value,
  onChange,
  placeholder = '선택하세요',
  className,
}: DropdownSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={cn('relative inline-block', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center justify-between gap-[20px]',
          'px-[16px] py-[10px]',
          'border border-solid border-[#ddd] rounded-[4px]',
          'bg-white text-[14px]',
          'cursor-pointer',
          'min-w-[120px]',
        )}
      >
        <span>{selectedOption?.label ?? placeholder}</span>
        <span
          className={cn(
            'transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
          style={{ transform: 'scaleX(0.9) scaleY(0.8)' }}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <ul
          className={cn(
            'absolute top-full left-0 mt-[4px]',
            'w-full',
            'bg-white border border-solid border-[#ddd] rounded-[4px]',
            'shadow-md',
            'z-10',
            'max-h-[200px] overflow-y-auto',
          )}
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                'px-[16px] py-[10px]',
                'text-[14px]',
                'cursor-pointer',
                'hover:bg-[#f5f5f5]',
                value === option.value && 'bg-[#f0f0f0] font-medium',
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownSelector;

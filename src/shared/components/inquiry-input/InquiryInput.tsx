import { cn } from '@/shared';
import Icon from '@/shared/lib/Icon';
import { useState } from 'react';

const InquiryInput = ({
  label,
  className,
  htmlsFor,
  type,
  placeholder,
  value,
  onChangeInput,
  onChangeTextArea,
  touch,
  touched,
  isError,
  errorMessage,
}: {
  label: string;
  className: string;
  htmlsFor?: string;
  type: 'input' | 'selector' | 'textarea';
  placeholder: string;
  value?: string;
  onChangeInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTextArea?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  touch?: () => void;
  touched?: boolean;
  isError?: boolean;
  errorMessage?: string;
}) => {
  const faqTypes = ['예약문의', '결제문의', '취소/환불문의', '기타문의'];
  const [isNotPlaceholder, setIsNotPlaceholder] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(placeholder);

  return (
    <div className={cn('inquiry__input flex flex-col mb-[20px]', className)}>
      <label htmlFor={htmlsFor} className="text-[13px] mb-[9px] font-bold">
        {label}
      </label>
      {type === 'input' && (
        <>
          <input
            placeholder={placeholder}
            id={htmlsFor}
            className={cn(
              'px-[12px] py-[8px] outline-none border border-solid rounded-[8px] text-[14px]',
              isError && touched ? 'border-red-500' : 'border-[#ccc]',
            )}
            value={value}
            onChange={(e) => {
              onChangeInput?.(e);
            }}
            onBlur={touch}
          />
          {touched && isError && (
            <p className="text-[12px] text-red-500 mt-[4px]">{errorMessage}</p>
          )}
        </>
      )}
      {type === 'textarea' && (
        <>
          <textarea
            placeholder={placeholder}
            id={htmlsFor}
            className={cn(
              'px-[12px] resize-none h-[120px] py-[8px] outline-none border border-solid border-[#ccc] rounded-[8px] text-[14px]',
              isError && touched ? 'border-red-500' : 'border-[#ccc]',
            )}
            value={value}
            onChange={onChangeTextArea}
            onBlur={touch}
          />
          {touched && isError && (
            <p className="text-[12px] text-red-500 mt-[4px]">{errorMessage}</p>
          )}
        </>
      )}
      {type === 'selector' && (
        <div className={cn('selector__wrapper relative')}>
          <button
            className={cn(
              'w-full px-[12px] py-[8px] text-left border border-solid border-[#ccc] rounded-[8px] text-[14px]',
              'flex justify-between items-center',
              'cursor-pointer',
              !isNotPlaceholder && 'text-[#ccc]',
            )}
            type="button"
            onClick={() => {
              setIsSelectorOpen(true);
              setIsNotPlaceholder(true);
            }}
          >
            <span>{selectedType}</span>
            <Icon
              ICON="DOWN"
              className={'w-4 h-4 fill-none stroke-black stroke-1'}
            />
          </button>
          {isSelectorOpen && (
            <ul className="selector__list absolute bottom-[calc(100%+10px)] left-0 w-full bg-white border border-solid border-[#ccc] rounded-[8px] shadow-md z-10 overflow-hidden">
              {faqTypes.map((type: string) => (
                <li key={type}>
                  <button
                    type="button"
                    className="p-3 text-[14px] hover:bg-black hover:text-white w-full cursor-pointer"
                    onClick={() => {
                      setIsSelectorOpen(false);
                      setSelectedType(type);
                    }}
                  >
                    {type}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default InquiryInput;

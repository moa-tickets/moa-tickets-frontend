import { cn } from '@/shared';
import Icon from '@/shared/lib/Icon';
import { useState, useRef, useEffect } from 'react';

const InquiryInput = ({
  label,
  className,
  htmlsFor,
  type,
  placeholder,
  value,
  onChangeInput,
  onChangeTextArea,
  onChangeSelector,
  touch,
  touched,
  isError,
  errorMessage,
}: {
  label: string;
  className: string;
  htmlsFor?: string;
  type: 'input' | 'selector' | 'textarea' | 'file';
  placeholder?: string;
  value?: string;
  onChangeInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTextArea?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeSelector?: (changedValue: string) => void;
  touch?: () => void;
  touched?: boolean;
  isError?: boolean;
  errorMessage?: string;
}) => {
  const faqTypes = ['예약문의', '결제문의', '취소/환불문의', '기타문의'];
  const [isNotPlaceholder, setIsNotPlaceholder] = useState(!!value);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(value || placeholder);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const prevValueRef = useRef<string | undefined>(value);

  // value가 변경되면 selectedType 업데이트 (실제로 값이 변경되었을 때만)
  useEffect(() => {
    if (type === 'selector' && prevValueRef.current !== value) {
      if (value) {
        setSelectedType(value);
        setIsNotPlaceholder(true);
      } else {
        setSelectedType(placeholder || '');
        setIsNotPlaceholder(false);
      }
      prevValueRef.current = value;
    }
  }, [value, placeholder, type]);

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
                      onChangeSelector?.(type);
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
      {type === 'file' && (
        <div className={cn('s3__connect mb-[50px]')}>
          <input
            type="file"
            className="file__input hidden"
            ref={fileInputRef}
          />
          <div
            className={cn(
              'se__connect__button__wrapper w-full h-[200px] border border-solid border-[#ccc] rounded-[8px] p-[20px]',
            )}
          >
            <button
              type="button"
              className="text-[14px] bg-[#4154ff] rounded-[8px] px-[10px] py-[5px] text-white cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              첨부하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryInput;

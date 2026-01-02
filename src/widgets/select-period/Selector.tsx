import { useState, useRef, useEffect } from 'react';
import { cn } from '@/shared';
import Icon from '@/shared/lib/Icon';
import { Calendar } from '@/shared/components/ui/calendar';

const Selector = ({ content }: { content: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(content);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 옵션 리스트 생성
  const getOptions = () => {
    if (content === '연도') {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 5 }, (_, i) => String(currentYear - i));
    } else if (content === '월') {
      return [
        '전체',
        '1월',
        '2월',
        '3월',
        '4월',
        '5월',
        '6월',
        '7월',
        '8월',
        '9월',
        '10월',
        '11월',
        '12월',
      ];
    }
    return [];
  };

  const options = getOptions();

  // 날짜 포맷팅 함수
  const formatDate = (date: Date | undefined): string => {
    if (!date) return content;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  // Calendar에서 날짜 선택 시
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setSelectedValue(formatDate(date));
      setIsOpen(false);
    }
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  // Figma 디자인에 따른 너비 설정
  const getWidth = () => {
    if (content === '예매일') return 'w-[135px]';
    if (content === '연도') return 'w-[74px]';
    if (content === '월') return 'w-[64px]';
    return 'w-[130px]';
  };

  return (
    <div className="selector relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex px-[12px] py-[6px] justify-between items-center border border-[#ECEDF2] rounded-[2px] text-[12px] cursor-pointer',
          getWidth(),
          isOpen && 'border-[#242428]',
        )}
      >
        <span className="truncate text-[#242428]">{selectedValue}</span>
        <Icon
          ICON="DOWN"
          className={cn(
            'w-[16px] h-[16px] flex-shrink-0 ml-[4px]',
            isOpen && 'rotate-180 transition-transform',
          )}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-[2px] bg-white border border-[#ECEDF2] rounded-[2px] shadow-lg z-50">
          {content === '예매일' ? (
            <div className="p-[8px]">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md"
              />
            </div>
          ) : (
            <div className="max-h-[200px] overflow-y-auto">
              <ul className="py-[4px]">
                {options.map((option) => (
                  <li key={option}>
                    <button
                      onClick={() => handleSelect(option)}
                      className={cn(
                        'w-full px-[12px] py-[6px] text-left text-[12px] text-[#242428] hover:bg-[#F8F9FA] cursor-pointer transition-colors',
                        selectedValue === option && 'bg-[#F8F9FA] font-medium',
                      )}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Selector;

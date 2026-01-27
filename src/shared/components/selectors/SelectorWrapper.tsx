import { cn, formatToKoreanDateTime } from '@/shared/lib/utils';
import SelectorButton from './SelectorButton';
import { useState } from 'react';
import SelectorList from './SelectorList';

const SelectorWrapper = ({
  list,
  selectedState,
  onChanger,
}: {
  list: {
    value: string;
    id: number;
  }[];
  selectedState: string;
  onChanger: (element: string, sessionId: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={cn('selector__wrapper', 'relative mt-[16px]')}>
      <SelectorButton
        title={
          selectedState === ''
            ? '선택하세요'
            : formatToKoreanDateTime(selectedState)
        }
        onOpen={() => setIsOpen(true)}
      />
      {isOpen && (
        <SelectorList
          list={list}
          onChanger={(element: string, sessionId: number) => {
            onChanger(element, sessionId);
            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default SelectorWrapper;

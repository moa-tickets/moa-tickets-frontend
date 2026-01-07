import { useAnswer } from '@/features/answer/useAnswer';
import { cn } from '@/shared';
import { useEffect } from 'react';

const SelectInquiry = () => {
  const { readAnswer } = useAnswer();

  useEffect(() => {
    readAnswer.mutate();
  }, []);

  return (
    <div className="select__inquiry p-[38px]">
      <h1 className={cn('text-[22px] font-bold mb-[33px]')}>
        문의 답변하기 (판매자 전용)
      </h1>
    </div>
  );
};

export default SelectInquiry;

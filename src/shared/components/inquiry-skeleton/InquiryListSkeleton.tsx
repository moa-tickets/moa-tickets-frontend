import { cn } from '@/shared';

const InquiryItemSkeleton = () => {
  return (
    <li className="w-full p-[20px] border border-solid border-[#eee] rounded-[8px] mb-[10px]">
      <div className="inline-flex flex-col gap-[5px] relative w-full">
        {/* 제목과 답변 상태 영역 */}
        <div className="flex items-center gap-[16px] w-1/2">
          <div className="h-[14px] bg-gray-200 rounded animate-pulse w-[200px]" />
          <div className="h-[24px] bg-gray-200 rounded-[8px] animate-pulse w-[60px]" />
        </div>
        {/* 내용 영역 */}
        <div className="h-[12px] bg-gray-200 rounded animate-pulse w-3/4" />
        {/* 날짜 영역 */}
        <div className="h-[12px] bg-gray-200 rounded animate-pulse w-[100px]" />
        {/* 오른쪽 버튼 영역 */}
        <div className="flex items-center absolute right-0 gap-[16px]">
          <div className="h-[14px] bg-gray-200 rounded animate-pulse w-[60px]" />
          <div className="h-[24px] bg-gray-200 rounded-[6px] animate-pulse w-[60px]" />
          <div className="h-[24px] bg-gray-200 rounded-[6px] animate-pulse w-[60px]" />
        </div>
      </div>
    </li>
  );
};

const InquiryListSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <ul className="inquiry__list w-full border border-solid border-[#ccc] rounded-[8px] p-[10px]">
      {Array.from({ length: count }).map((_, index) => (
        <InquiryItemSkeleton key={index} />
      ))}
    </ul>
  );
};

export default InquiryListSkeleton;

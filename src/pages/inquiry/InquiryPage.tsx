import { useInquiryStore } from '@/entities/stores/useInquiryStore';
import type { InquiryDetail } from '@/entities/types/types';
import { useInquiry } from '@/features/inquiry/useInquiry';
import { cn } from '@/shared';
import Pagination from '@/shared/components/pagination/Pagination';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const InquiryPage = () => {
  const { readInquiry } = useInquiry();
  const { data } = useInquiryStore();

  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    readInquiry.mutate(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const navigate = useNavigate();

  const goToInquiryWrite = () => {
    navigate('/inquiry-write');
  };

  return (
    <div className={cn('inquiry__page max-w-[1080px] mx-auto')}>
      <h1
        className={cn(
          'text-[30px] pt-[30px] pb-[20px] font-bold border-b border-solid border-[#ccc]',
        )}
      >
        문의내역
      </h1>
      <div
        className={cn(
          'inquiry__list box-border p-[30px]',
          data.contents.length === 0 && 'flex justify-center items-center',
        )}
      >
        {data.contents.length === 0 ? (
          <div
            className={cn(
              'no__inquiries flex flex-col items-center gap-[12px]',
            )}
          >
            <h5 className={cn('font-bold text-[18px]')}>문의내역이 없어요.</h5>
            <span className={cn('text-[14px] text-gray-800 font-light')}>
              궁금하신 사항은 1:1 문의하기를 이용해주세요.
            </span>
          </div>
        ) : (
          <ul className="inquiry__list w-full border border-solid border-[#ccc] rounded-[8px] p-[10px]">
            {data.contents.map((inquiry: InquiryDetail) => (
              <li
                key={inquiry.id}
                className="w-full p-[20px] border border-solid border-[#eee] rounded-[8px] mb-[10px]"
              >
                <Link
                  to="/"
                  className="inline-flex flex-col gap-[5px] relative w-full"
                >
                  <div className="flex items-center gap-[16px] w-1/2">
                    <span className="text-[14px] font-bold block mb-[2px] inline-block overflow-hidden whitespace-nowrap text-ellipsis">
                      {inquiry.title}
                    </span>
                    <span className="text-[12px] text-[#888] px-3 py-1 bg-black rounded-[8px] inline-block text-white">
                      답변 없음
                    </span>
                  </div>
                  <div className="text-[12px] text-[#aaa] w-full block overflow-hidden whitespace-nowrap text-ellipsis">
                    {inquiry.content}
                  </div>
                  <div className="text-[12px] text-[#aaa] w-full block overflow-hidden whitespace-nowrap text-ellipsis">
                    {inquiry.createdAt.split('T')[0]}
                  </div>
                  <div className="flex absolute right-0 gap-[16px]">
                    <button className="text-[12px] px-2 py-1 bg-black text-white rounded-[6px] cursor-pointer">
                      수정하기
                    </button>
                    <button className="text-[12px] px-2 py-1 bg-black text-white rounded-[6px] cursor-pointer">
                      삭제하기
                    </button>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      {data.totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={data.totalPages}
          onPageChange={handlePageChange}
        />
      )}
      <div className={cn('inquiry__button text-center mt-[20px] mb-[50px]')}>
        <button
          className={cn(
            'text-center w-[260px] py-[9px] bg-[#4154FF] text-white text-[14px] rounded-[8px] cursor-pointer hover:bg-[#2d3bbf] transition duration-300',
          )}
          onClick={goToInquiryWrite}
        >
          1:1 문의하기
        </button>
      </div>
    </div>
  );
};

export default InquiryPage;

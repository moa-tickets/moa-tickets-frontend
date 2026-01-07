import { useInquiryStore } from '@/entities/stores/useInquiryStore';
import type { InquiryDetail } from '@/entities/types/types';
import { useInquiry } from '@/features/inquiry/useInquiry';
import { cn } from '@/shared';
import Pagination from '@/shared/components/pagination/Pagination';
import InquiryListSkeleton from '@/shared/components/inquiry-skeleton/InquiryListSkeleton';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const InquiryPage = () => {
  const { readInquiry, deleteInquiry } = useInquiry();
  const { data } = useInquiryStore();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

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

  const renderInquiryContent = () => {
    if (readInquiry.isPending) {
      return <InquiryListSkeleton count={5} />;
    }

    if (data.contents.length === 0) {
      return (
        <div
          className={cn('no__inquiries flex flex-col items-center gap-[12px]')}
        >
          <h5 className={cn('font-bold text-[18px]')}>문의내역이 없어요.</h5>
          <span className={cn('text-[14px] text-gray-800 font-light')}>
            궁금하신 사항은 1:1 문의하기를 이용해주세요.
          </span>
        </div>
      );
    }

    return (
      <ul className="inquiry__list w-full border border-solid border-[#ccc] rounded-[8px] p-[10px]">
        {data.contents.map((inquiry: InquiryDetail) => (
          <li
            key={inquiry.id}
            className="w-full p-[20px] border border-solid border-[#eee] rounded-[8px] mb-[10px] group hover:bg-black transition duration-600"
          >
            <Link
              to={`/mypage/inquiry/${inquiry.id}`}
              className="inline-flex flex-col gap-[5px] relative w-full "
            >
              <div className="flex items-center gap-[16px] w-1/2">
                <span className="text-[14px] font-bold block mb-[2px] inline-block overflow-hidden whitespace-nowrap text-ellipsis group-hover:text-white">
                  {inquiry.title}
                </span>
                <span className="text-[12px] text-[#888] px-3 py-1 bg-black rounded-[8px] inline-block text-white group-hover:bg-white group-hover:text-black">
                  답변 없음
                </span>
              </div>
              <div className="text-[12px] text-[#aaa] w-full block overflow-hidden whitespace-nowrap text-ellipsis">
                {inquiry.content}
              </div>
              <div className="text-[12px] text-[#aaa] w-full block overflow-hidden whitespace-nowrap text-ellipsis">
                {inquiry.createdAt.split('T')[0]}
              </div>
              <div className="flex items-center absolute right-0 gap-[16px]">
                <span className="text-[14px] underline group-hover:text-white">
                  {inquiry.faqType}
                </span>
                <button
                  className="text-[12px] px-2 py-1 bg-black text-white rounded-[6px] cursor-pointer group-hover:bg-white group-hover:text-black transition duration-600"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate(`/mypage/inquiry/${inquiry.id}/edit`);
                  }}
                >
                  수정하기
                </button>
                <button
                  className="text-[12px] px-2 py-1 bg-black text-white rounded-[6px] cursor-pointer group-hover:bg-white group-hover:text-black transition duration-600 "
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDeleteTargetId(inquiry.id);
                  }}
                >
                  삭제하기
                </button>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    );
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
          !readInquiry.isPending &&
            data.contents.length === 0 &&
            'flex justify-center items-center',
        )}
      >
        {renderInquiryContent()}
      </div>
      {data.totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={data.last ? data.page + 1 : data.totalPages}
          isLast={data.last}
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

      {deleteTargetId !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[12px] p-[24px] w-[320px]">
            <h3 className="text-[18px] font-bold mb-[12px]">문의 삭제</h3>
            <p className="text-[14px] text-gray-600 mb-[24px]">
              정말 삭제하시겠습니까?
            </p>
            <div className="flex gap-[12px]">
              <button
                className="flex-1 py-[10px] border border-solid border-[#ccc] rounded-[8px] text-[14px] cursor-pointer hover:bg-gray-100 transition"
                onClick={() => setDeleteTargetId(null)}
              >
                취소
              </button>
              <button
                className="flex-1 py-[10px] bg-red-500 text-white rounded-[8px] text-[14px] cursor-pointer hover:bg-red-600 transition"
                onClick={() => {
                  deleteInquiry.mutate(deleteTargetId);
                  setDeleteTargetId(null);
                }}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryPage;

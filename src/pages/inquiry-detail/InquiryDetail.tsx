import { useInquiry } from '@/features/inquiry/useInquiry';
import { cn } from '@/shared';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const InquiryDetail = () => {
  const { inquiryId } = useParams<{ inquiryId: string }>();
  const navigate = useNavigate();

  const { getInquiryDetail, inquiryDetail } = useInquiry();

  useEffect(() => {
    getInquiryDetail.mutate(Number(inquiryId));
  }, [inquiryId]);

  return (
    <div className={cn('inquiry__detail p-[30px] relative')}>
      <h1 className={cn('text-2xl font-bold mb-[30px]')}>문의 상세</h1>
      <button
        className="absolute top-[30px] right-[30px] text-[14px] px-[20px] py-[10px] border border-solid border-[#a3a3a3] cursor-pointer hover:bg-black hover:text-white transition duration-600"
        onClick={() => navigate(-1)}
      >
        목록
      </button>
      <div
        className={cn(
          'inquiry__title w-full py-[30px] border-t border-solid border-black bg-[#F9F9F9] text-center text-[22px]',
        )}
      >
        {inquiryDetail?.data.title}
      </div>
      <div
        className={cn(
          'inquiry__title w-full py-[10px] border-t border-solid border-[#ccc] bg-white text-[14px] text-center',
        )}
      >
        {inquiryDetail?.data.createdAt.split('T')[0]}
      </div>
      <div
        className={cn(
          'inquiry__content w-full p-[20px] h-[200px] border-t border-b border-solid border-[#eee]',
        )}
      >
        {inquiryDetail?.data.content}
      </div>
    </div>
  );
};

export default InquiryDetail;

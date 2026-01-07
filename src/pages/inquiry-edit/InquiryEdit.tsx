import { useInquiry } from '@/features/inquiry/useInquiry';
import InquiryWrite from '@/pages/inquiry-write/InquiryWrite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const InquiryEdit = () => {
  const { inquiryId } = useParams<{ inquiryId: string }>();
  const { getInquiryDetail, inquiryDetail } = useInquiry();

  useEffect(() => {
    if (inquiryId) {
      getInquiryDetail.mutate(Number(inquiryId));
    }
  }, [inquiryId]);

  return (
    <InquiryWrite
      mode="edit"
      inquiryId={inquiryId ? Number(inquiryId) : undefined}
      initialData={inquiryDetail?.data || null}
    />
  );
};

export default InquiryEdit;

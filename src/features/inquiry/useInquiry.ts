import { useInquiryStore } from '@/entities/stores/useInquiryStore';
import { type InquiryData } from '@/entities/types/types';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useInquiry = () => {
  const { setInquiryData } = useInquiryStore();
  const navigate = useNavigate();

  const readInquiry = useMutation<InquiryData, Error, number>({
    mutationFn: async (currentPage: number) => {
      const response = await axios.get(
        `http://localhost:8080/api/inquiry?page=${currentPage}`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
    onSuccess: (data: InquiryData) => {
      console.log(data);
      setInquiryData(data);
    },
  });

  const goInquiry = useMutation<void, Error, FormData>({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(
        'http://localhost:8080/api/inquiry',
        formData,
        { withCredentials: true },
      );
      return response.data;
    },
    onSuccess: () => {
      navigate('/mypage/inquiry');
    },
  });

  return { goInquiry, goInquiryLoading: goInquiry.isPending, readInquiry };
};

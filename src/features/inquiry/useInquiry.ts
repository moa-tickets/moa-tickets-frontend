import { useInquiryStore } from '@/entities/stores/useInquiryStore';
import {
  type InquiryData,
  type InquiryDetailResponse,
} from '@/entities/types/types';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useInquiry = () => {
  const { setInquiryData } = useInquiryStore();
  const navigate = useNavigate();
  const [inquiryDetail, setInquiryDetail] =
    useState<InquiryDetailResponse | null>(null);

  const readInquiry = useMutation<InquiryData, Error, number>({
    mutationFn: async (currentPage: number) => {
      // UI는 1-based, API는 0-based이므로 변환 필요
      const apiPage = currentPage - 1;
      const response = await axios.get(
        `https://app.moaticket.dev/api/inquiry?page=${apiPage}`,
        {
          withCredentials: true,
        },
      );
      // 의도적인 3초 지연 (스켈레톤 효과 테스트용)
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return response.data;
    },
    onSuccess: (data: InquiryData) => {
      console.log(data);
      setInquiryData(data);
    },
  });

  const goInquiry = useMutation<void, Error, FormData, { onSuccess?: () => void }>({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(
        'https://app.moaticket.dev/api/inquiry',
        formData,
        { withCredentials: true },
      );
      return response.data;
    },
  });

  const getInquiryDetail = useMutation<InquiryDetailResponse, Error, number>({
    mutationFn: async (inquiryId: number) => {
      const response = await axios.get(
        `https://app.moaticket.dev/api/inquiry/${inquiryId}`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
    onSuccess: (data: InquiryDetailResponse) => {
      setInquiryDetail(data);
    },
  });

  const updateInquiry = useMutation<
    void,
    Error,
    { inquiryId: number; formData: FormData }
  >({
    mutationFn: async ({ inquiryId, formData }) => {
      const response = await axios.put(
        `https://app.moaticket.dev/api/inquiry/${inquiryId}`,
        formData,
        { withCredentials: true },
      );
      return response.data;
    },
  });

  const deleteInquiry = useMutation<InquiryDetailResponse, Error, number>({
    mutationFn: async (inquiryId: number) => {
      const response = await axios.delete(
        `https://app.moaticket.dev/api/inquiry/${inquiryId}`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
    onSuccess: () => {
      navigate('/mypage/inquiry');
      readInquiry.mutate(1);
    },
  });

  return {
    goInquiry,
    goInquiryLoading: goInquiry.isPending,
    readInquiry,
    getInquiryDetail,
    inquiryDetail,
    updateInquiry,
    updateInquiryLoading: updateInquiry.isPending,
    deleteInquiry,
    deleteInquiryLoading: deleteInquiry.isPending,
  };
};

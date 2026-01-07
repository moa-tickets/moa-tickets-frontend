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
        `http://localhost:8080/api/inquiry?page=${apiPage}`,
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

  const getInquiryDetail = useMutation<InquiryDetailResponse, Error, number>({
    mutationFn: async (inquiryId: number) => {
      const response = await axios.get(
        `http://localhost:8080/api/inquiry/${inquiryId}`,
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

  return {
    goInquiry,
    goInquiryLoading: goInquiry.isPending,
    readInquiry,
    getInquiryDetail,
    inquiryDetail,
  };
};

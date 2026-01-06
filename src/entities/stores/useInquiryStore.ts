import { create } from 'zustand';
import { type InquiryData, type InquiryFunction } from '../types/types';

export const useInquiryStore = create<InquiryFunction>((set) => ({
  status: '',
  message: '',
  data: {
    contents: [],
    first: false,
    last: false,
    page: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
  },
  timestamp: '',

  setInquiryData: (inquiryData: InquiryData) => set(() => ({ ...inquiryData })),
}));

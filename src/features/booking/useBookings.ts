import { api } from '@/shared/lib/api';
import { useQuery } from '@tanstack/react-query';

// API 응답 타입
export type BookingItem = {
  bookingId: number;
  concertName: string;
  sessionDate: string;
  ticketCount: number;
  paidAt: string;
  status: string;
};

export type BookingsResponse = {
  status: string;
  message: string;
  data: {
    contents: BookingItem[];
    first: boolean;
    last: boolean;
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
  timestamp: string;
};

// 필터 타입
export type RangeType = 'D15' | 'M1' | 'M2' | 'M3';
export type BasisType = 'BOOKED_AT' | 'VIEWED_AT';

export type BookingFilterParams = {
  page: number;
  range?: RangeType;
  basis?: BasisType;
  year?: number;
  month?: number;
};

// API 호출 함수
const fetchBookings = async (params: BookingFilterParams): Promise<BookingsResponse> => {
  const queryParams: Record<string, string | number> = {
    page: params.page,
  };

  // range 필터 (기간별)
  if (params.range) {
    queryParams.range = params.range;
  }

  // 월별 필터 (basis, year, month가 모두 있어야 함)
  if (params.basis && params.year && params.month) {
    queryParams.basis = params.basis;
    queryParams.year = params.year;
    queryParams.month = params.month;
  }

  const response = await api.get('/bookings/me', { params: queryParams });
  return response.data;
};

// React Query 훅
export const useBookings = (params: BookingFilterParams) => {
  return useQuery({
    queryKey: ['bookings', params],
    queryFn: () => fetchBookings(params),
    staleTime: 1000 * 60 * 5, // 5분
  });
};

import { api } from '@/shared/lib/api';
import { useQuery } from '@tanstack/react-query';

// API 응답 타입
export type BookingItem = {
  orderId: string;
  concertName: string;
  sessionDate: string;
  ticketCount: number;
  paidAt: string;
  paymentState: string;
};

export type BookingsResponse = {
  items: BookingItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
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

// 예약 상세 타입
export type BookingDetailData = {
  orderId: string;
  concertName: string;
  concertThumbnail: string;
  concertDuration: string;
  concertStart: string;
  concertEnd: string;
  concertAge: number;
  hallName: string;
  sessionDate: string;
  ticketCount: number;
  seats: {
    seatNum: number;
    ticketId: number;
  }[];
  amount: number;
  paidAt: string;
  canceledAt: string | null;
  paymentState: string;
};

export type BookingDetailResponse = {
  status: string;
  message: string;
  data: BookingDetailData;
  timestamp: string;
};

// 예약 상세 API 호출 함수
const fetchBookingDetail = async (orderId: string): Promise<BookingDetailResponse> => {
  const response = await api.get(`/bookings/me/${orderId}`);
  return response.data;
};

// 예약 상세 훅
export const useBookingDetail = (orderId: string) => {
  return useQuery({
    queryKey: ['booking', orderId],
    queryFn: () => fetchBookingDetail(orderId),
    enabled: !!orderId,
    staleTime: 1000 * 60 * 5,
  });
};

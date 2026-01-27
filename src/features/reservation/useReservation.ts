import {
  GET_RESERVATION,
  type Reservation,
} from '@/entities/reducers/ReservationReducer';
import {
  GET_RESERVATION_DETAIL,
  type ReservationDetail,
} from '@/entities/reducers/ReservationDetailReducer';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';

interface ReservationParam {
  page: number;
  view?: 'PERIOD' | 'MONTH';
  range?: 'D15' | 'M1' | 'M2' | 'M3';
  basis?: 'BOOKED_AT' | 'VIEWED_AT';
  year?: number;
  month?: number;
}

export const useReservation = () => {
  const dispatch = useDispatch();

  const getReser = useMutation<Reservation, Error, ReservationParam>({
    mutationFn: async ({
      view,
      page,
      range,
      basis,
      year,
      month,
    }: ReservationParam) => {
      if (view === 'PERIOD') {
        const response = await axios.get(
          `/api/bookings/me?page=${page}&range=${range}`,
        );
        return response.data;
      } else if (view === 'MONTH') {
        const response = await axios.get(
          `/api/bookings/me?page=${page}&basis=${basis}&year=${year}&month=${month}`,
        );
        return response.data;
      }
    },
    onSuccess: (data: Reservation) => {
      dispatch({ type: GET_RESERVATION, payload: { data } });
    },
  });

  const getReserDetail = useMutation<ReservationDetail, Error, { orderId: string }>({
    mutationFn: async ({ orderId }: { orderId: string }) => {
      const response = await axios.get(`/api/bookings/me/${orderId}`);
      return response.data;
    },
    onSuccess: (data: ReservationDetail) => {
      dispatch({ type: GET_RESERVATION_DETAIL, payload: { data } });
    },
  });

  return {
    getReser,
    getReserPending: getReser.isPending,
    getReserDetail,
    getReserDetailPending: getReserDetail.isPending,
  };
};

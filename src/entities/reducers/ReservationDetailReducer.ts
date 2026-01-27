import type { Action } from '../types/types';

export const GET_RESERVATION_DETAIL = 'reservation/get_detail';

export const getReservationDetail = () => ({ type: GET_RESERVATION_DETAIL });

export interface ReservationDetailSeat {
  ticketId: number;
  seatNum: number;
}

export interface ReservationDetail {
  orderId: string;
  concertName: string;
  hallName: string;
  concertStart: string;
  concertEnd: string;
  concertAge: number;
  concertDuration: string;
  sessionDate: string;
  concertThumbnail: string;
  ticketCount: number;
  amount: number;
  paymentState: 'READY' | 'PAID' | 'CANCELED' | 'PENDING';
  paidAt: string;
  canceledAt: string | null;
  seats: ReservationDetailSeat[];
}

export interface MainReservationDetail {
  data: ReservationDetail;
}

const initialState: MainReservationDetail = {
  data: {
    orderId: '',
    concertName: '',
    hallName: '',
    concertStart: '',
    concertEnd: '',
    concertAge: 0,
    concertDuration: '',
    sessionDate: '',
    concertThumbnail: '',
    ticketCount: 0,
    amount: 0,
    paymentState: 'READY',
    paidAt: '',
    canceledAt: null,
    seats: [],
  },
};

export default function reservationDetailReducer(
  state: MainReservationDetail = initialState,
  action: Action,
) {
  switch (action.type) {
    case GET_RESERVATION_DETAIL:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
}

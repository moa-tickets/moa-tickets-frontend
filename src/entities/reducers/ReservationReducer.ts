import type { Action } from '../types/types';

export const GET_RESERVATION = 'get/reservation';

export const getReservation = () => ({ type: GET_RESERVATION });

export interface MainReservation {
  data: Reservation;
}

export interface Reservation {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  items: ReservationList[];
}

export interface ReservationList {
  orderId: number;
  concertName: number;
  sessionDate: string;
  ticketCount: number;
}

const mainReservationInitial = {
  data: {
    page: 0,
    size: 5,
    totalElements: 0,
    totalPages: 0,
    items: [],
  },
};

export default function reservationReducer(
  state: MainReservation = mainReservationInitial,
  action: Action,
) {
  switch (action.type) {
    case GET_RESERVATION:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
}

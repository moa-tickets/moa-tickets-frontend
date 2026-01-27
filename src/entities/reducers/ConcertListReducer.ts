import type { Action } from '../types/types';

export const GET_CONCERT_LIST = 'get/concert_list';

export const getConcertList = () => ({ type: GET_CONCERT_LIST });

export interface RealConcertList {
  data: ConcertList[];
}

export interface ConcertList {
  bookingOpen: string;
  concertDuration: string;
  concertEnd: string;
  concertId: number;
  concertName: string;
  concertStart: string;
  concertThumbnail: string;
  hallName: string;
}

const initialConcert = {
  data: [],
};

export default function concertListReducer(
  state: RealConcertList = initialConcert,
  action: Action,
) {
  switch (action.type) {
    case GET_CONCERT_LIST:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
}

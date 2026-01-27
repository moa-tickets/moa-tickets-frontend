import type { Action } from '../types/types';

export const GET_DETAIL_PRODUCT = 'get/detail_product';

export const getDetailProduct = () => ({ type: GET_DETAIL_PRODUCT });

export interface RealProductDetail {
  data: ProductDetail;
}

export interface ProductDetail {
  age: number;
  bookingOpen: string;
  concertDuration: string;
  concertEnd: string;
  concertId: number;
  concertName: string;
  detail: string | null;
  hallName: string;
  sessions: ProductSession[];
  thumbnail: string | null;
}

export interface ProductSession {
  date: string;
  price: number;
  sessionId: number;
}

const ProductInitialDetail = {
  data: {
    age: 0,
    bookingOpen: new Date().toDateString(),
    concertDuration: '0분',
    concertEnd: new Date().toDateString(),
    concertId: 1,
    concertName: '',
    detail: null,
    hallName: '',
    thumbnail: '',
    sessions: [],
  },
};

export default function concertDetailReducer(
  state: RealProductDetail = ProductInitialDetail,
  action: Action,
) {
  switch (action.type) {
    case GET_DETAIL_PRODUCT:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
}

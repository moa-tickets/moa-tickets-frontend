import type { Action } from '../types/types';

export const GET__SEAT__INFO = 'get/seat-info';
export const HOLD = 'post/hold';
export const RELEASE = 'post/release';

export const getSeatInfo = () => ({ type: GET__SEAT__INFO });
export const hold = () => ({ type: HOLD });
export const release = () => ({
  type: RELEASE,
});

export interface MainSeatInfo {
  data: SeatInfo[];
  holdedInfo: {
    holdedIndex: number[];
    holdToken: string;
    expiresAt: string;
  };
}

export interface SeatInfo {
  seatNum: number;
  state: 'AVAILABLE' | 'HOLD';
  ticketId: number;
}

const seatInfoInitial = {
  data: [],
  holdedInfo: {
    holdedIndex: [],
    holdToken: '',
    expiresAt: '',
  },
};

export default function bookSeatReducer(
  state: MainSeatInfo = seatInfoInitial,
  action: Action,
) {
  switch (action.type) {
    case GET__SEAT__INFO:
      return {
        ...state,
        data: action.payload.data,
      };
    case HOLD:
      return {
        ...state,
        holdedInfo: {
          holdedIndex: action.payload.holdIndex,
          holdToken: action.payload.holdToken,
          expiresAt: action.payload.expires,
        },
      };
    case RELEASE:
      return {
        ...state,
        holdedInfo: {
          ...state.holdedInfo,
          holdedIndex: state.holdedInfo.holdedIndex.filter(
            (h) => h !== action.payload.target,
          ),
        },
      };
    default:
      return state;
  }
}

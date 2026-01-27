import type { Action } from '../types/types';

export const GET__SEAT__INFO = 'get/seat-info';
export const HOLD = 'post/hold';
export const RELEASE = 'post/release';
export const SELECT_SEAT = 'seat/select';
export const DESELECT_SEAT = 'seat/deselect';
export const CLEAR_SELECTED_SEATS = 'seat/clear';

export const getSeatInfo = () => ({ type: GET__SEAT__INFO });
export const hold = () => ({ type: HOLD });
export const release = () => ({
  type: RELEASE,
});
export const selectSeat = (ticketId: number) => ({
  type: SELECT_SEAT,
  payload: { ticketId },
});
export const deselectSeat = (ticketId: number) => ({
  type: DESELECT_SEAT,
  payload: { ticketId },
});
export const clearSelectedSeats = () => ({ type: CLEAR_SELECTED_SEATS });

export interface MainSeatInfo {
  data: SeatInfo[];
  selectedTicketIds: number[];
  holdedInfo: {
    holdedIndex: number[];
    holdToken: string;
    expiresAt: string;
  };
}

export interface SeatInfo {
  seatNum: number;
  state: 'AVAILABLE' | 'HOLD' | 'SOLD';
  ticketId: number;
}

const seatInfoInitial: MainSeatInfo = {
  data: [],
  selectedTicketIds: [],
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
    case SELECT_SEAT:
      return {
        ...state,
        selectedTicketIds: [...state.selectedTicketIds, action.payload.ticketId],
      };
    case DESELECT_SEAT:
      return {
        ...state,
        selectedTicketIds: state.selectedTicketIds.filter(
          (id) => id !== action.payload.ticketId,
        ),
      };
    case CLEAR_SELECTED_SEATS:
      return {
        ...state,
        selectedTicketIds: [],
      };
    default:
      return state;
  }
}

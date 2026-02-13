import type { Action } from '../types/types';

export const GET_BOARD = 'get/board';
export const OPEN_WRITE_MODAL = 'open/write/modal';

export const get_board = () => ({ type: GET_BOARD });
export const open_write_modal = () => ({ type: OPEN_WRITE_MODAL });

export interface MainBoardData {
  write: WriteBoardData;
  data: BoardData[];
}

export interface WriteBoardData {
  isModalOpen: boolean;
  title: string;
  content: string;
}

export interface BoardData {
  boardId: number;
  title: string;
  content: string;
  nickname: string;
}

const initialBoardData = {
  write: {
    isModalOpen: false,
    title: '',
    content: '',
  },
  data: [],
};

export default function boardReducer(
  state: MainBoardData = initialBoardData,
  action: Action,
) {
  switch (action.type) {
    case GET_BOARD:
      return {
        ...state,
        data: action.payload.data,
      };
    case OPEN_WRITE_MODAL:
      return {
        ...state,
        write: {
          ...state.write,
          isModalOpen: !state.write.isModalOpen,
        },
      };
    default:
      return state;
  }
}

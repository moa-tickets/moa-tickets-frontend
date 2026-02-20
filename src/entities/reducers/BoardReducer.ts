import { is } from 'date-fns/locale';
import type { Action } from '../types/types';

export const GET_BOARD = 'get/board';
export const OPEN_WRITE_MODAL = 'open/write/modal';
export const CLOSE_WRITE_MODAL = 'close/write/modal';
export const WRITE_TITLE = 'write/title';
export const WRITE_CONTENT = 'write/content';

export const get_board = () => ({ type: GET_BOARD });
export const open_write_modal = () => ({ type: OPEN_WRITE_MODAL });
export const close_write_modal = () => ({ type: CLOSE_WRITE_MODAL });
export const write_title = () => ({ type: WRITE_TITLE });
export const write_content = () => ({ type: WRITE_CONTENT });

export interface MainBoardData {
  write: WriteBoardData;
  data: BoardData[];
}

export interface WriteBoardData {
  isModalOpen: boolean;
  title: string;
  content: string;
  isModify: boolean;
  modifyBoardId: number | null;
}

export interface BoardData {
  boardId: number;
  title: string;
  content: string;
  nickName: string;
  createdAt: string;
}

const initialBoardData = {
  write: {
    isModalOpen: false,
    title: '',
    content: '',
    isModify: false,
    modifyBoardId: null,
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
          isModalOpen: true,
          title: action.payload?.title || '',
          content: action.payload?.content || '',
          isModify: action.payload?.isModify || false,
          modifyBoardId: action.payload?.modifyBoardId || null,
        },
      };
    case CLOSE_WRITE_MODAL:
      return {
        ...state,
        write: {
          ...state.write,
          isModalOpen: false,
        },
      };
    case WRITE_TITLE:
      return {
        ...state,
        write: {
          ...state.write,
          title: action.payload.title,
        },
      };
    case WRITE_CONTENT:
      return {
        ...state,
        write: {
          ...state.write,
          content: action.payload.content,
        },
      };
    default:
      return state;
  }
}

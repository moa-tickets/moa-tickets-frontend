import type { Action } from '../types/types';

export const GET_BOARD = 'get/board';

export const get_board = () => ({ type: GET_BOARD });

export interface MainBoardData {
  data: BoardData[];
}

export interface BoardData {
  boardId: number;
  title: string;
  content: string;
  nickname: string;
}

const initialBoardData = {
  data: [
    {
      boardId: 0,
      title: '안녕하세요',
      content: '첫 번째 게시글입니다.',
      nickname: '관리자',
    },
    {
      boardId: 0,
      title: '안녕하세요',
      content: '첫 번째 게시글입니다.',
      nickname: '관리자',
    },
    {
      boardId: 0,
      title: '안녕하세요',
      content: '첫 번째 게시글입니다.',
      nickname: '관리자',
    },
    {
      boardId: 0,
      title: '안녕하세요',
      content: '첫 번째 게시글입니다.',
      nickname: '관리자',
    },
    {
      boardId: 0,
      title: '안녕하세요',
      content: '첫 번째 게시글입니다.',
      nickname: '관리자',
    },
  ],
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
    default:
      return state;
  }
}

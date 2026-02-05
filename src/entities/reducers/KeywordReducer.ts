import type { Action } from '../types/types';

export const GET_KEYWORD = 'get/keyword';

export const get_keyword = () => ({ type: GET_KEYWORD });

export interface MainKeywordData {
  data: KeywordData[];
}

export interface KeywordData {
  concertId: number;
  score: number;
  keyword: string;
}

const initialKeywordData = {
  data: [],
};

export default function audienceReviewReducer(
  state: MainKeywordData = initialKeywordData,
  action: Action,
) {
  switch (action.type) {
    case GET_KEYWORD:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
}

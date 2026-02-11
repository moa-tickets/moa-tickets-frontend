import type { Action } from '../types/types';

export const GET_KEYWORD = 'get/keyword';
export const get_keyword = () => ({ type: GET_KEYWORD });

export interface KeywordItem {
  keyword: string;
  count: number;
}

export type AspectKeywordGroup = {
  aspect: string;              // "연출" | "음향" | "시야" | ...
  keywords: KeywordItem[];
};

export type KeywordResponse = {
  positive: AspectKeywordGroup[];
  negative: AspectKeywordGroup[];
};

export interface MainKeywordData {
  data: KeywordResponse;
}

const initialKeywordData: MainKeywordData = {
  data: { positive: [], negative: [] },
};

export default function keywordReducer(
  state: MainKeywordData = initialKeywordData,
  action: Action,
) {
  switch (action.type) {
    case GET_KEYWORD:
      return {
        ...state,
        data: action.payload.data as KeywordResponse,
      };
    default:
      return state;
  }
}

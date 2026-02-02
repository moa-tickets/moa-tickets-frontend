import type { Action } from '../types/types';

export const GET_REVIEW = 'get/audience_review';

export const get_review = () => ({ type: GET_REVIEW });

export interface MainReviewData {
  data: ReviewData[];
}

export interface ReviewData {
  reviewId: number;
  memberNickname: string;
  concertName: string;
  score: number;
  content: string;
}

const initialReviewData = {
  data: [],
};

export default function audienceReviewReducer(
  state: MainReviewData = initialReviewData,
  action: Action,
) {
  switch (action.type) {
    case GET_REVIEW:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
}

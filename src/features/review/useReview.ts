import {
  GET_REVIEW,
  type ReviewData,
} from '@/entities/reducers/AudienceReviewReducer';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export const useReview = () => {
  const dispatch = useDispatch();

  const reviewGetter = useMutation<ReviewData, Error, { concertId: number }>({
    mutationFn: async ({ concertId }: { concertId: number }) => {
      const response = await axios.get(`/api/reviews?concertId=${concertId}`);
      return response.data;
    },
    onSuccess: (data: ReviewData) => {
      dispatch({ type: GET_REVIEW, payload: { data } });
    },
  });

  const reviewWrite = useMutation<
    ReviewData,
    Error,
    { concertId: number; score: number; content: string }
  >({
    mutationFn: async ({
      concertId,
      score,
      content,
    }: {
      concertId: number;
      score: number;
      content: string;
    }) => {
      const response = await axios.post(`/api/reviews`, {
        concertId,
        score,
        content,
      });
      return response.data;
    },
    onSuccess: (data: ReviewData, variable) => {
      reviewGetter.mutate({ concertId: variable.concertId });
    },
  });

  return {
    reviewGetter,
    reviewWrite,
    reviewGetterPending: reviewGetter.isPending,
    reviewWritePending: reviewWrite.isPending,
  };
};

import {
  GET_KEYWORD,
  type KeywordData,
} from '@/entities/reducers/KeywordReducer';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export const useKeyword = () => {
  const dispatch = useDispatch();

  const keywordGetter = useMutation<KeywordData, Error, { concertId: number }>({
    mutationFn: async ({ concertId }: { concertId: number }) => {
      const response = await axios.get(`/api/reviews?concertId=${concertId}`);
      return response.data;
    },
    onSuccess: (data: KeywordData) => {
      dispatch({ type: GET_KEYWORD, payload: { data } });
    },
  });

  const keywordWrite = useMutation<
    KeywordData,
    Error,
    { concertId: number; score: number; keyword: string }
  >({
    mutationFn: async ({
      concertId,
      score,
      keyword,
    }: {
      concertId: number;
      score: number;
      keyword: string;
    }) => {
      const response = await axios.post(`/api/reviews`, {
        concertId,
        score,
        keyword,
      });
      return response.data;
    },
    onSuccess: (_, variable) => {
      keywordGetter.mutate({ concertId: variable.concertId });
    },
  });

  return {
    keywordGetter,
    keywordWrite,
    keywordGetterPending: keywordGetter.isPending,
    keywordWritePending: keywordWrite.isPending,
  };
};

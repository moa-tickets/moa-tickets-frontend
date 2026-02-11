import { GET_KEYWORD, type KeywordResponse } from '@/entities/reducers/KeywordReducer';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';

type KeywordGetterVars = { concertId: number };

export const useKeyword = () => {
  const dispatch = useDispatch();

  // ✅ concertId를 받아서 콘서트별 키워드 API 호출
  const keywordGetter = useMutation<KeywordResponse, Error, KeywordGetterVars>({
    mutationFn: async ({ concertId }) => {
      const response = await axios.get(`/api/concerts/${concertId}/sentiments/keywords`);
      return response.data as KeywordResponse;
    },
    onSuccess: (data) => {
      dispatch({ type: GET_KEYWORD, payload: { data } });
    },
  });

  return {
    keywordGetter,
    keywordGetterPending: keywordGetter.isPending,
  };
};

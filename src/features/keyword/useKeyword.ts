import { GET_KEYWORD, type KeywordResponse } from '@/entities/reducers/KeywordReducer';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export const useKeyword = () => {
  const dispatch = useDispatch();

  // ✅ 이제 concertId를 안 받는 전역 API라면 concertId 제거
  const keywordGetter = useMutation<KeywordResponse, Error, void>({
    mutationFn: async () => {
      const response = await axios.get('/api/sentiments/keywords');
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

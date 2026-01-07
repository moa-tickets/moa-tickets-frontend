import type { AnswerData } from '@/entities/types/types';
import { api } from '@/shared/lib/api';
import { useMutation } from '@tanstack/react-query';

export const useAnswer = () => {
  const readAnswer = useMutation<AnswerData>({
    mutationFn: async () => {
      const response = await api.get('/answer');
      console.log(response.data);
      return response.data;
    },
  });

  return { readAnswer };
};

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useAnswer = () => {
  const readAnswer = useMutation({
    mutationFn: async () => {
      const response = await axios.get('https://app.moaticket.dev/api/answer', {
        withCredentials: true,
      });
      console.log(response.data);
      return response.data;
    },
  });

  return { readAnswer };
};

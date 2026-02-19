import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useHomeProduct = (size: number) => {
  const { data: potatoProducts, isLoading: isPotatoProductsLoading } = useQuery({
    queryKey: ['home-potato-products', size],
    queryFn: async () => {
      const response = await axios.get('/newApi/products/search', {
        params: {
          keyword: '감자',
          page: 0,
          size,
        },
      });
      return response.data;
    },
  });

  return {
    potatoProducts,
    isPotatoProductsLoading,
  };
};

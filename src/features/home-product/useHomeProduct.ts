import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useHomeProduct = (size: number, keyword: string, page: number = 0) => {
  const { data: products, isLoading: isProductsLoading } = useQuery({
    queryKey: ['home-products', keyword, size, page],
    queryFn: async () => {
      const response = await axios.get('/newApi/products/search', {
        params: {
          keyword,
          page,
          size,
        },
      });
      return response.data;
    },
  });

  return {
    products,
    isProductsLoading,
  };
};

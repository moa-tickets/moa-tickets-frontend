import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useHomeProduct = () => {
  const { data: potatoProducts, isLoading: isPotatoProductsLoading } = useQuery(
    {
      queryKey: ['home-potato-products'],
      queryFn: async () => {
        const response = await axios.get(`/newApi/products/search`, {
          params: {
            keyword: '감자',
            page: 0,
            size: 10,
          },
        });
        console.log('감자 상품 데이터:', response.data);
        return response.data;
      },
    },
  );

  return {
    potatoProducts,
    isPotatoProductsLoading,
  };
};

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useHomeProduct = () => {
  const { data: potatoProducts, isLoading: isPotatoProductsLoading } = useQuery(
    {
      queryKey: ['home-potato-products'],
      queryFn: async () => {
        const response = await axios.get(`/newApi/products/search`, {
          params: {
            condition: {
              keyword: '감자',
              categoryIds: [1, 2, 3],
              brandIds: [1, 2, 3],
              excludeSoldOut: true,
              deliveryTypes: 'DAWN',
              packagingTypes: 'COLD',
            },
            pageable: {
              page: 0,
              size: 10,
            },
          },
        });
        return response.data;
      },
    },
  );

  return {
    potatoProducts,
    isPotatoProductsLoading,
  };
};

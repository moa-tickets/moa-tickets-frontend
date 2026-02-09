import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useHome = () => {
  const potatoBrands = useMutation<void>({
    mutationFn: async () => {
      const response = await axios.get(
        `http://172.16.24.179:8080/api/products/search`,
        {
          params: {
            condition: {
              keyword: '감자',
              categoryIds: [1, 2, 3, 4],
              brandIds: [1, 2, 3, 4],
              excludeSoldOut: true,
              deliveryTypes: 'DAWN',
              packagingTypes: 'COLD',
            },
            pageable: {
              page: 0,
              size: 4,
            },
          },
        },
      );
      console.log('Potato Brands Response:', response.data);
    },
  });

  return { potatoBrands };
};

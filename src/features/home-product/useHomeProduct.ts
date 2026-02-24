import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/lib/api';
import type { ConcertItem } from '@/entities/types/types';

export const useHomeProduct = (size: number, searchValue: string = '서울', page: number = 0) => {
  const { data: products, isLoading: isProductsLoading } = useQuery<ConcertItem[]>({
    queryKey: ['home-products', searchValue, size, page],
    queryFn: async () => {
      const response = await api.get('/product/concertList', {
        params: {
          searchValue,
          sortBy: 'date',
          sortOrder: 'desc',
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

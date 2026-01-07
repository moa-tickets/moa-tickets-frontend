import { type ConcertListType } from '@/entities/types/types';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

export const useProductSearch = () => {
  const [concertList, setConcertList] = useState<ConcertListType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getSearchResults = useMutation<
    ConcertListType[],
    Error,
    { query: string }
  >({
    mutationFn: async ({ query }: { query: string }) => {
      const response = await axios.get(
        `http://localhost:8080/api/product/concertList`,
        {
          params: {
            searchValue: query,
            sortBy: 'date',
            sortOrder: 'desc',
            pageable: {
              page: 0,
              size: 1,
              sort: ['string'],
            },
          },
          withCredentials: true,
        },
      );
      return response.data;
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data: ConcertListType[]) => {
      setTimeout(() => {
        setConcertList(data);
        setIsLoading(false);
      }, 3000);
    },
    onError: () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    },
  });

  const productPostTest = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `http://localhost:8080/api/product/concert`,
        {
          hallId: 0,
          concertName: '10cm 콘서트',
          concertDuration: '2026-01-07T08:44:48.454Z',
          age: 8,
          bookingOpen: '2026-01-07T08:44:48.454Z',
          concertStart: '2026-01-07T08:44:48.454Z',
          concertEnd: '2026-01-07T08:44:48.454Z',
          thumbnail: '/small_banner/hosinogen.gif',
          sessions: [
            {
              date: '2026-01-07T08:44:48.454Z',
              price: 0,
            },
          ],
        },
        {
          withCredentials: true,
        },
      );
      console.log(response.data);
    },
  });

  return {
    getSearchResults,
    concertList,
    productPostTest,
    isLoading,
  };
};

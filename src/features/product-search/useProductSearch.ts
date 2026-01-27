import {
  type ConcertList,
  GET_CONCERT_LIST,
} from '@/entities/reducers/ConcertListReducer';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';

interface SearchRequest {
  searchParam: string;
  sortBy: 'date';
  sortOrder: 'asc' | 'desc';
  page: number;
}

export const useProductSearch = () => {
  const dispatch = useDispatch();

  const getProductList = useMutation<ConcertList[], Error, SearchRequest>({
    mutationFn: async ({
      searchParam,
      sortBy,
      sortOrder,
      page,
    }: SearchRequest) => {
      const response = await axios.get(
        `/api/product/concertList?searchValue=${searchParam}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&size=10`,
      );
      console.log(response.data);
      return response.data;
    },
    onSuccess: (data: ConcertList[]) => {
      dispatch({
        type: GET_CONCERT_LIST,
        payload: {
          data,
        },
      });
    },
  });

  return { getProductList, getProductListPending: getProductList.isPending };
};

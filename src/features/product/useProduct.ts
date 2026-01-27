import {
  GET_DETAIL_PRODUCT,
  type ProductDetail,
} from '@/entities/reducers/ConcertDetailReducer';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export const useProduct = () => {
  const dispatch = useDispatch();

  const getDetailProduct = useMutation<ProductDetail, Error, { id: number }>({
    mutationFn: async ({ id }: { id: number }) => {
      const res = await axios.get(`/api/product/detail/${id}`);
      return res.data;
    },
    onSuccess: (data: ProductDetail) => {
      dispatch({ type: GET_DETAIL_PRODUCT, payload: { data } });
    },
  });

  return {
    getDetailProduct,
    getDetailProductPending: getDetailProduct.isPending,
  };
};

import {
  PAYMENT_READY,
  type PaymentResponse,
} from '@/entities/reducers/PaymentReducer';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export const usePayment = () => {
  const dispatch = useDispatch();

  // 결제 레디 상태
  const paymentReady = useMutation<
    PaymentResponse,
    Error,
    { holdToken: string }
  >({
    mutationFn: async ({ holdToken }: { holdToken: string }) => {
      const res = await axios.post(`/api/payments/prepare`, {
        holdToken,
      });
      return res.data;
    },
    onSuccess: (data: PaymentResponse) => {
      dispatch({
        type: PAYMENT_READY,
        payload: {
          orderId: data.orderId,
          orderName: data.orderName,
          amount: data.amount,
        },
      });
    },
  });

  return { paymentReady, paymentReadyPending: paymentReady.isPending };
};

import type { Action } from '../types/types';

export const PAYMENT_READY = 'payment/ready';

export const paymentReady = () => ({ type: PAYMENT_READY });

export interface Payment {
  ready: PaymentResponse;
}

export interface PaymentResponse {
  orderId: number | null;
  orderName: string;
  amount: number | null;
}

const PaymentInitial = {
  ready: {
    orderId: null,
    orderName: '',
    amount: null,
  },
};

export default function paymentReducer(
  state: Payment = PaymentInitial,
  action: Action,
) {
  switch (action.type) {
    case PAYMENT_READY:
      return {
        ...state,
        ready: {
          orderId: action.payload.orderId,
          orderName: action.payload.orderName,
          amount: action.payload.amount,
        },
      };
    default:
      return state;
  }
}

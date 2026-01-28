import {
  CLEAR_SELECTED_SEATS,
  type MainSeatInfo,
} from '@/entities/reducers/BookSeatReducer';
import { PAYMENT_OPEN } from '@/entities/reducers/ModalReducer';
import { usePayment } from '@/features/payment/usePayment';
import { cn } from '@/shared';
import SubmitButton from '@/shared/components/submit-button/SubmitButton';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PaymentButtonWrapper = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { holdedInfo } = useSelector(
    (state: { bookSeatReducer: MainSeatInfo }) => state.bookSeatReducer,
  );

  const { paymentReady, paymentReadyPending } = usePayment();

  const payReady = async () => {
    if (!holdedInfo.holdToken) {
      return;
    }
    paymentReady.mutate(
      { holdToken: holdedInfo.holdToken },
      {
        onSuccess: () => {
          dispatch({ type: PAYMENT_OPEN });
        },
      },
    );
  };

  return (
    <div className={cn('payment__button__wrapper', 'flex flex-col gap-[20px]')}>
      <SubmitButton
        title={'이전으로'}
        className={
          'text-black bg-white border border-solid border-[rgb(237,237,237)] w-[340px] cursor-pointer'
        }
        onClick={() => {
          dispatch({ type: CLEAR_SELECTED_SEATS });
          navigate(-1);
        }}
      />
      <SubmitButton
        title={paymentReadyPending ? '처리 중...' : '결제하기'}
        className={'text-white bg-[rgb(87,100,255)] w-[340px] cursor-pointer'}
        onClick={payReady}
      />
    </div>
  );
};

export default PaymentButtonWrapper;

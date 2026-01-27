import type { MainSeatInfo } from '@/entities/reducers/BookSeatReducer';
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

  const { paymentReady } = usePayment();

  const payReady = () => {
    paymentReady.mutate({ holdToken: holdedInfo.holdToken });
    dispatch({ type: PAYMENT_OPEN });
  };

  return (
    <div className={cn('payment__button__wrapper', 'flex flex-col gap-[20px]')}>
      <SubmitButton
        title={'이전으로'}
        className={
          'text-black bg-white border border-solid border-[rgb(237,237,237)] w-[340px] cursor-pointer'
        }
        onClick={() => {
          navigate(-1);
        }}
      />
      <SubmitButton
        title={'결제하기'}
        className={'text-white bg-[rgb(87,100,255)] w-[340px] cursor-pointer'}
        onClick={payReady}
      />
    </div>
  );
};

export default PaymentButtonWrapper;

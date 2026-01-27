import { useEffect, useRef, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import {
  loadTossPayments,
  type TossPaymentsWidgets,
} from '@tosspayments/tosspayments-sdk';
import { useDispatch, useSelector } from 'react-redux';
import type { Payment } from '@/entities/reducers/PaymentReducer';
import { CLOSE_MODAL } from '@/entities/reducers/ModalReducer';

const PaymentModal = ({ isOpen }: { isOpen: boolean }) => {
  const dispatch = useDispatch();
  const isTossOpenRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-dimmed');

      // 모달 열릴 때 히스토리 추가
      window.history.pushState({ modal: true }, '', window.location.href);

      const handlePopState = () => {
        // 토스 iframe이 열려있으면 히스토리 유지하면서 모달 닫기
        if (isTossOpenRef.current) {
          window.history.pushState({ modal: true }, '', window.location.href);
        }
        // 뒤로가기 시 모달 닫기
        dispatch({ type: CLOSE_MODAL });
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        document.body.style.overflow = 'auto';
        document.body.classList.remove('modal-dimmed');
        window.removeEventListener('popstate', handlePopState);
      };
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('modal-dimmed');
    };
  }, [isOpen, dispatch]);

  const checkoutKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
  const customerKey = 'I3WzO5n80ykg2zY6fjSqQ';

  const { ready } = useSelector(
    (state: { paymentReducer: Payment }) => state.paymentReducer,
  );

  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPaymentWidget = async () => {
      const tossPayments = await loadTossPayments(checkoutKey);

      const widgets = tossPayments.widgets({
        customerKey,
      });

      setWidgets(widgets);
    };

    fetchPaymentWidget();
  }, [checkoutKey, customerKey]);

  useEffect(() => {
    const renderPaymentWidget = async () => {
      if (widgets === null) return;
      await widgets.setAmount({
        currency: 'KRW',
        value: ready.amount!,
      });
      await Promise.all([
        // 위젯 UI 랜더링
        widgets.renderPaymentMethods({
          selector: '#payment_widget',
          variantKey: 'DEFAULT',
        }),
        // 이용약관 랜더링
        widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        }),
      ]);

      setIsReady(true);
    };

    renderPaymentWidget();
  }, [widgets]);

  const handlePayment = async () => {
    if (!widgets || !isReady) return;

    setIsLoading(true);
    isTossOpenRef.current = true;

    // 토스 위젯 열기 전 히스토리 추가 (뒤로가기 시 토스 위젯 닫힘)
    window.history.pushState({ tossPayment: true }, '', window.location.href);

    try {
      await widgets.requestPayment({
        orderId: `${ready.orderId}`,
        orderName: `${ready.orderName}`,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (error) {
      console.error('결제 요청 실패:', error);
    } finally {
      setIsLoading(false);
      isTossOpenRef.current = false;
    }
  };

  return (
    <div
      className={cn(
        'w-[500px] h-[600px] bg-white rounded-[10px] overflow-hidden fixed inset-0 m-auto z-[300]',
      )}
    >
      <button
        className="absolute top-[20px] right-[20px] z-[400] text-[14px] cursor-pointer"
        onClick={() => dispatch({ type: CLOSE_MODAL })}
      >
        닫기
      </button>
      <div id="payment_widget"></div>
      <div id="agreement"></div>
      <div className={cn('px-[24px] pb-[24px]')}>
        <button
          onClick={handlePayment}
          disabled={!isReady || isLoading}
          className={cn(
            'w-full h-[50px] rounded-[8px] text-[16px] font-semibold cursor-pointer',
            isReady && !isLoading
              ? 'bg-[#3182f6] text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed',
          )}
        >
          {isLoading
            ? '결제 진행 중...'
            : `${ready.amount?.toLocaleString()}원 결제하기`}
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;

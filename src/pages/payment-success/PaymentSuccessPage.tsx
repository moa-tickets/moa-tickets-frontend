import { cn } from '@/shared/lib/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

interface PaymentConfirmResponse {
  orderId: string;
  amount: number;
  status: string;
}

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [isConfirming, setIsConfirming] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState<PaymentConfirmResponse | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const paymentKey = searchParams.get('paymentKey');
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');

  useEffect(() => {
    const confirmPayment = async () => {
      if (!paymentKey || !orderId || !amount) {
        setError('결제 정보가 올바르지 않습니다.');
        setIsConfirming(false);
        return;
      }

      try {
        const response = await axios.post(`/api/payments/confirm`, {
          orderId,
          paymentKey,
          amount,
        });

        setIsConfirming(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : '결제 승인에 실패했습니다.',
        );
        setIsConfirming(false);
      }
    };

    confirmPayment();
  }, [paymentKey, orderId, amount]);

  if (isConfirming) {
    return (
      <div
        className={cn(
          'w-full min-h-[calc(100vh-200px)] flex flex-col items-center justify-center',
        )}
      >
        <div
          className={cn(
            'animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4',
          )}
        />
        <p className={cn('text-[16px] text-gray-600')}>
          결제를 확인하고 있습니다...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={cn(
          'w-full min-h-[calc(100vh-200px)] flex flex-col items-center justify-center',
        )}
      >
        <div className={cn('max-w-[520px] w-full text-center')}>
          <div
            className={cn(
              'w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center',
            )}
          >
            <svg
              className={cn('w-8 h-8 text-red-500')}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className={cn('text-[24px] font-bold mb-4')}>결제 승인 실패</h1>
          <p className={cn('text-[14px] text-gray-600 mb-8')}>{error}</p>
          <button
            onClick={() => navigate('/')}
            className={cn(
              'px-6 py-3 bg-gray-900 text-white rounded-[8px] text-[14px] font-medium cursor-pointer',
            )}
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'w-full min-h-[calc(100vh-200px)] flex flex-col items-center justify-center',
      )}
    >
      <div className={cn('max-w-[520px] w-full text-center')}>
        <div
          className={cn(
            'w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center',
          )}
        >
          <svg
            className={cn('w-8 h-8 text-green-500')}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className={cn('text-[24px] font-bold mb-2')}>
          결제가 완료되었습니다
        </h1>
        <p className={cn('text-[14px] text-gray-600 mb-8')}>
          예매가 성공적으로 완료되었습니다.
        </p>

        {paymentInfo && (
          <div className={cn('bg-gray-50 rounded-[10px] p-6 mb-8 text-left')}>
            <h2 className={cn('text-[16px] font-semibold mb-4')}>결제 정보</h2>
            <div className={cn('space-y-3')}>
              <div className={cn('flex justify-between text-[14px]')}>
                <span className={cn('text-gray-500')}>주문번호</span>
                <span className={cn('font-medium')}>{paymentInfo.orderId}</span>
              </div>
              <div className={cn('flex justify-between text-[14px]')}>
                <span className={cn('text-gray-500')}>결제금액</span>
                <span className={cn('font-medium')}>
                  {paymentInfo.amount.toLocaleString()}원
                </span>
              </div>
              <div className={cn('flex justify-between text-[14px]')}>
                <span className={cn('text-gray-500')}>결제상태</span>
                <span className={cn('font-medium text-green-600')}>완료</span>
              </div>
            </div>
          </div>
        )}

        <div className={cn('flex gap-3')}>
          <button
            onClick={() => navigate('/mypage/reservation')}
            className={cn(
              'flex-1 px-6 py-3 bg-gray-900 text-white rounded-[8px] text-[14px] font-medium cursor-pointer',
            )}
          >
            예매 내역 확인
          </button>
          <button
            onClick={() => navigate('/')}
            className={cn(
              'flex-1 px-6 py-3 bg-white text-gray-900 border border-gray-300 rounded-[8px] text-[14px] font-medium cursor-pointer',
            )}
          >
            홈으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;

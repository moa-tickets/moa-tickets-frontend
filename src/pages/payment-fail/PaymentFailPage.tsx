import { cn } from '@/shared/lib/utils';
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const PaymentFailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // 뒤로가기 시 홈으로 이동
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);

    const handlePopState = () => {
      navigate('/', { replace: true });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const code = searchParams.get('code');
  const message = searchParams.get('message');
  const orderId = searchParams.get('orderId');

  const getErrorMessage = (errorCode: string | null): string => {
    switch (errorCode) {
      case 'PAY_PROCESS_CANCELED':
        return '결제가 취소되었습니다.';
      case 'PAY_PROCESS_ABORTED':
        return '결제가 중단되었습니다.';
      case 'REJECT_CARD_COMPANY':
        return '카드사에서 결제를 거절했습니다.';
      case 'INVALID_CARD_EXPIRATION':
        return '카드 유효기간이 만료되었습니다.';
      case 'INVALID_STOPPED_CARD':
        return '정지된 카드입니다.';
      case 'EXCEED_MAX_DAILY_PAYMENT_COUNT':
        return '일일 결제 한도를 초과했습니다.';
      case 'EXCEED_MAX_PAYMENT_AMOUNT':
        return '결제 금액 한도를 초과했습니다.';
      case 'INVALID_CARD_LOST_OR_STOLEN':
        return '분실 또는 도난 신고된 카드입니다.';
      case 'INVALID_CARD_NUMBER':
        return '카드 번호가 올바르지 않습니다.';
      case 'NOT_SUPPORTED_INSTALLMENT_PLAN_CARD_OR_MERCHANT':
        return '할부가 지원되지 않는 카드입니다.';
      default:
        return message || '결제 처리 중 오류가 발생했습니다.';
    }
  };

  return (
    <div
      className={cn(
        'w-full min-h-[calc(100vh-200px)] flex flex-col items-center justify-center',
      )}
    >
      <div className={cn('max-w-[400px] text-center')}>
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className={cn('text-[24px] font-bold mb-2')}>결제에 실패했습니다</h1>
        <p className={cn('text-[14px] text-gray-600 mb-8')}>
          {getErrorMessage(code)}
        </p>

        <div
          className={cn(
            'bg-gray-50 rounded-[10px] p-6 mb-8 text-left',
          )}
        >
          <h2 className={cn('text-[16px] font-semibold mb-4')}>오류 정보</h2>
          <div className={cn('space-y-3')}>
            {orderId && (
              <div className={cn('flex justify-between text-[14px]')}>
                <span className={cn('text-gray-500')}>주문번호</span>
                <span className={cn('font-medium')}>{orderId}</span>
              </div>
            )}
            {code && (
              <div className={cn('flex justify-between text-[14px]')}>
                <span className={cn('text-gray-500')}>에러코드</span>
                <span className={cn('font-medium text-red-600')}>{code}</span>
              </div>
            )}
            {message && (
              <div className={cn('text-[14px]')}>
                <span className={cn('text-gray-500 block mb-1')}>상세 메시지</span>
                <span className={cn('font-medium text-gray-700 block')}>
                  {decodeURIComponent(message)}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className={cn('flex gap-3')}>
          <button
            onClick={() => navigate(-1)}
            className={cn(
              'flex-1 px-6 py-3 bg-gray-900 text-white rounded-[8px] text-[14px] font-medium cursor-pointer',
            )}
          >
            다시 시도하기
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

        <p className={cn('text-[12px] text-gray-400 mt-6')}>
          문제가 계속되면 고객센터로 문의해 주세요.
        </p>
      </div>
    </div>
  );
};

export default PaymentFailPage;

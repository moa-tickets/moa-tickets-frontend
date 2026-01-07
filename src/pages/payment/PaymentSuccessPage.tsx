// src/pages/payment/PaymentSuccessPage.tsx
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '@/shared/lib/api';
import { cn } from '@/shared';

type ConfirmResponse = {
  paymentId: number;
  orderId: string;
  amount: number;
  orderName: string;
};

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const paymentKey = searchParams.get('paymentKey') ?? '';
  const orderId = searchParams.get('orderId') ?? '';
  const amountStr = searchParams.get('amount') ?? '';

  const amount = useMemo(() => Number(amountStr), [amountStr]);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setErrorMsg(null);

        if (!paymentKey || !orderId || !Number.isFinite(amount) || amount <= 0) {
          setErrorMsg('결제 성공 정보가 올바르지 않습니다.');
          return;
        }

        const res = await api.post('/payments/confirm', {
          paymentKey,
          orderId,
          amount,
        });

        const data = res.data as ConfirmResponse;
        if (!data?.paymentId) {
          setErrorMsg('결제 확인 응답이 올바르지 않습니다.');
          return;
        }

        navigate(`/mypage/reservation/${data.paymentId}`, { replace: true });
      } catch (e: any) {
        const msg =
          e?.response?.data?.message ||
          e?.message ||
          '결제 승인 처리 중 오류가 발생했습니다.';
        setErrorMsg(msg);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [paymentKey, orderId, amount, navigate]);

  return (
    <div className={cn('max-w-[1280px] mx-auto px-[40px] py-[40px]')}>
      <h1 className={cn('text-[24px] font-bold mb-[12px]')}>결제 처리</h1>

      {loading && (
        <p className={cn('text-[14px] text-[#666]')}>
          결제 승인 확인 중입니다...
        </p>
      )}

      {!loading && errorMsg && (
        <div className={cn('mt-[16px]')}>
          <p className={cn('text-[14px] text-[#FA2828]')}>{errorMsg}</p>
          <button
            onClick={() => navigate('/')}
            className={cn(
              'mt-[16px] px-[16px] py-[10px] bg-[#4154FF] text-white rounded-[6px] text-[14px]',
            )}
          >
            홈으로 이동
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccessPage;

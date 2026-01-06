// src/pages/payment/PaymentFailPage.tsx
import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { cn } from '@/shared';

const PaymentFailPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const code = useMemo(() => searchParams.get('code') ?? '', [searchParams]);
  const message = useMemo(
    () => searchParams.get('message') ?? '결제가 실패했습니다.',
    [searchParams],
  );

  return (
    <div className={cn('max-w-[1280px] mx-auto px-[40px] py-[40px]')}>
      <h1 className={cn('text-[24px] font-bold mb-[12px]')}>결제 실패</h1>

      <div className={cn('mt-[12px]')}>
        <p className={cn('text-[14px] text-[#666]')}>{message}</p>
        {code && (
          <p className={cn('text-[12px] text-[#999] mt-[6px]')}>
            오류 코드: {code}
          </p>
        )}
      </div>

      <div className={cn('mt-[20px] flex gap-[10px]')}>
        <button
          onClick={() => navigate(-1)}
          className={cn(
            'px-[16px] py-[10px] border border-[#CFD0D7] rounded-[6px] text-[14px] hover:bg-[#F8F9FA]',
          )}
        >
          뒤로가기
        </button>

        <button
          onClick={() => navigate('/')}
          className={cn(
            'px-[16px] py-[10px] bg-[#4154FF] text-white rounded-[6px] text-[14px] hover:bg-[#4154FF]/90',
          )}
        >
          홈으로
        </button>
      </div>
    </div>
  );
};

export default PaymentFailPage;

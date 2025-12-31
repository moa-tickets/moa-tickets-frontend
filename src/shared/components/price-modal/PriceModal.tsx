import { useEffect } from 'react';
import { cn } from '@/shared';
import Icon from '@/shared/lib/Icon';

interface PriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  prices: {
    [key: string]: number | undefined;
    all?: number;
  };
}

const PriceModal = ({ isOpen, onClose, prices }: PriceModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const formatPrice = (price: number | undefined) => {
    if (!price) return '-';
    return price.toLocaleString('ko-KR') + '원';
  };

  const priceEntries = Object.entries(prices).filter(
    ([key, value]) => key !== 'all' && value !== undefined,
  );

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="price-modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Modal */}
      <div
        className={cn(
          'relative bg-white rounded-[15px] shadow-xl',
          'w-[90%] max-w-[500px] py-[40px] px-[30px]',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={cn('flex items-center justify-between mb-[30px]')}>
          <h2
            id="price-modal-title"
            className={cn('text-[24px] font-bold text-black')}
          >
            전체 가격
          </h2>
          <button
            onClick={onClose}
            className={cn('w-[24px] h-[24px] flex items-center justify-center')}
          >
            <Icon ICON="CLOSE" className="w-[24px] h-[24px]" />
          </button>
        </div>

        {/* Price List */}
        <div className={cn('flex flex-col gap-[16px] mb-[30px]')}>
          {priceEntries.map(([seatType, price]) => (
            <div
              key={seatType}
              className={cn(
                'flex items-center justify-between py-[12px] border-b border-[#DFDFE0]',
              )}
            >
              <span className={cn('text-[16px] text-black')}>{seatType}</span>
              <span className={cn('text-[16px] font-bold text-black')}>
                {formatPrice(price)}
              </span>
            </div>
          ))}
          {prices.all && (
            <div
              className={cn(
                'flex items-center justify-between py-[12px] border-t-2 border-[#DFDFE0] pt-[16px]',
              )}
            >
              <span className={cn('text-[16px] font-bold text-black')}>
                전석
              </span>
              <span className={cn('text-[16px] font-bold text-black')}>
                {formatPrice(prices.all)}
              </span>
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className={cn(
            'w-full py-[14px] px-[24px]',
            'bg-[#4154FF] text-white text-[16px] font-bold',
            'rounded-[10px] hover:bg-[#4154FF]/90 transition-colors',
          )}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default PriceModal;

import { useEffect } from 'react';
import { cn } from '@/shared';
import Icon from '@/shared/lib/Icon';

interface NaverMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: string;
}

const NaverMapModal = ({ isOpen, onClose, address }: NaverMapModalProps) => {
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

  // 네이버 지도 URL 생성 (주소 검색)
  const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(address)}`;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="map-modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Modal */}
      <div
        className={cn(
          'relative bg-white rounded-[15px] shadow-xl',
          'w-[90%] max-w-[800px] h-[90%] max-h-[600px]',
          'flex flex-col',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={cn(
            'flex items-center justify-between p-[20px] border-b border-[#DFDFE0]',
          )}
        >
          <h2
            id="map-modal-title"
            className={cn('text-[20px] font-bold text-black')}
          >
            배송주소 확인
          </h2>
          <button
            onClick={onClose}
            className={cn('w-[24px] h-[24px] flex items-center justify-center')}
          >
            <Icon ICON="CLOSE" className="w-[24px] h-[24px]" />
          </button>
        </div>

        {/* Map Container */}
        <div className={cn('flex-1 relative')}>
          <iframe
            src={naverMapUrl}
            className={cn('w-full h-full rounded-b-[15px]')}
            title="네이버 지도"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default NaverMapModal;

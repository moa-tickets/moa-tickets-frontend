import { useEffect } from 'react';
import { cn } from '@/shared';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmText?: string;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  title,
  message,
  confirmText = '확인',
}: ConfirmModalProps) => {
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

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Modal */}
      <div
        className={cn(
          'relative bg-white rounded-lg shadow-xl',
          'w-[90%] max-w-[444px] py-[60px] px-[40px]',
          'flex flex-col items-center text-center',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[28px] font-bold text-black mb-[20px]">{title}</h2>
        <p className="text-[16px] text-black whitespace-pre-line mb-[30px]">
          {message}
        </p>
        <button
          onClick={onClose}
          className={cn(
            'w-full max-w-[250px] py-[16px] px-[60px]',
            'bg-[#5B4FCF] text-white text-[18px] font-medium',
            'rounded-[12px] hover:bg-[#4A3FB8] transition-colors',
          )}
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;

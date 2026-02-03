import { useEffect } from 'react';
import { cn } from '@/shared';
import ModalButton from './ModalButton';

export default function ConfirmModal({
  title,
  message,
  isOpen,
  onClose,
  isInfo,
}: Readonly<{
  title: string;
  message: string | React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  isInfo?: boolean;
}>) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-dimmed');
    }
    return () => {
      document.body.classList.remove('modal-dimmed');
    };
  }, [isOpen]);

  return (
    <div
      className={cn(
        'fixed inset-0 m-auto w-[600px] h-[260px] flex flex-col justify-center bg-white rounded-lg shadow-lg p-6 z-100',
      )}
    >
      <h2 className={cn('text-center text-[22px] font-bold')}>{title}</h2>
      {isInfo ? (
        message
      ) : (
        <span className="block text-center mt-[20px]">{message}</span>
      )}
      <div className="modal__buttons mt-[30px] flex justify-center">
        <ModalButton onClick={onClose} title={'닫기'} />
      </div>
    </div>
  );
}

import { cn } from '@/shared';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import WriteInput from './WriteInput';

export default function WriteModal({ isModalOpen }: { isModalOpen: boolean }) {
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-dimmed');
    } else {
      document.body.classList.remove('modal-dimmed');
    }
  }, [isModalOpen]);

  return (
    <div
      className={cn(
        'write__modal',
        'fixed w-[500px] h-[600px] bg-white inset-0 m-auto',
        'rounded-lg',
        'z-[100]',
        'p-[16px]',
      )}
    >
      <form>
        <h2 className={cn('text-center text-[18px] font-bold mb-[20px]')}>
          글 작성하기
        </h2>
        <WriteInput
          className={'input__title'}
          placeholder={'글 제목을 입력하세요.'}
          title={'제목'}
        />
        <WriteInput
          className={'input__content'}
          isTextArea
          placeholder={'글 내용을 입력하세요.'}
          title={'내용'}
        />
        <button
          className={cn('absolute top-[16px] right-[16px]')}
          type="button"
        >
          <X />
        </button>
      </form>
    </div>
  );
}

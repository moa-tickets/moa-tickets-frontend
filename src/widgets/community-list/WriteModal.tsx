import { cn } from '@/shared';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import WriteInput from './WriteInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  CLOSE_WRITE_MODAL,
  WRITE_CONTENT,
  WRITE_TITLE,
  type MainBoardData,
} from '@/entities/reducers/BoardReducer';
import { useCommunity } from '@/features/community/useCommunity';

export default function WriteModal({
  isModalOpen,
  title,
  content,
}: {
  isModalOpen: boolean;
  title: string;
  content: string;
}) {
  const { writeCommunity, writeLoading, modifyCommunity, modifyLoading } =
    useCommunity();

  const { write } = useSelector(
    (state: { boardReducer: MainBoardData }) => state.boardReducer,
  );

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-dimmed');
    } else {
      document.body.classList.remove('modal-dimmed');
    }
  }, [isModalOpen]);

  const dispatch = useDispatch();

  console.log(write.modifyBoardId);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!write.isModify) {
      writeCommunity.mutate({ title, content });
      if (!writeLoading) {
        dispatch({ type: CLOSE_WRITE_MODAL });
        document.body.classList.remove('modal-dimmed');
      }
    } else {
      modifyCommunity.mutate({ boardId: write.modifyBoardId!, title, content });
      if (!modifyLoading) {
        dispatch({ type: CLOSE_WRITE_MODAL });
        document.body.classList.remove('modal-dimmed');
      }
    }
  };

  return (
    <div
      className={cn(
        'write__modal',
        'fixed w-[500px] h-[455px] bg-white inset-0 m-auto',
        'rounded-lg',
        'z-[100]',
        'p-[16px]',
      )}
    >
      <form onSubmit={onSubmit}>
        <h2 className={cn('text-center text-[18px] font-bold mb-[20px]')}>
          글 작성하기
        </h2>
        <WriteInput
          className={'input__title'}
          placeholder={'글 제목을 입력하세요.'}
          title={'제목'}
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: WRITE_TITLE, payload: { title: e.target.value } });
          }}
        />
        <WriteInput
          className={'input__content'}
          isTextArea
          placeholder={'글 내용을 입력하세요.'}
          title={'내용'}
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            dispatch({
              type: WRITE_CONTENT,
              payload: { content: e.target.value },
            });
            console.log(content);
          }}
        />
        <button
          type="submit"
          className={cn(
            'btn__submit',
            'mt-[20px] w-full bg-black text-white py-[10px]',
            'rounded-lg',
            'cursor-pointer',
          )}
          disabled={writeLoading}
        >
          {writeLoading ? '작성 중...' : '작성 완료'}
        </button>
        <button
          className={cn('absolute top-[16px] right-[16px] cursor-pointer')}
          type="button"
          onClick={() => {
            dispatch({ type: CLOSE_WRITE_MODAL });
            document.body.classList.remove('modal-dimmed');
          }}
        >
          <X />
        </button>
      </form>
    </div>
  );
}

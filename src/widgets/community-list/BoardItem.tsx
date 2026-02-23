import {
  OPEN_WRITE_MODAL,
  type BoardData,
} from '@/entities/reducers/BoardReducer';
import { useCommunity } from '@/features/community/useCommunity';
import { cn } from '@/shared';
import ConfirmModal from '@/shared/components/confirm-modal/ConfirmModal';
import {
  Calendar,
  MessageCircleMore,
  MonitorCog,
  UserRoundX,
} from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

type ConfirmType = 'modify' | 'delete' | null;

export default function BoardItem({ board }: { board: BoardData }) {
  const { id } = useParams<{ id: string }>();
  const { deleteCommunity } = useCommunity();
  const dispatch = useDispatch();

  const [confirmType, setConfirmType] = useState<ConfirmType>(null);

  const handleModifyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setConfirmType('modify');
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setConfirmType('delete');
  };

  const handleConfirm = () => {
    if (confirmType === 'modify') {
      setConfirmType(null);
      dispatch({
        type: OPEN_WRITE_MODAL,
        payload: {
          title: board.title,
          content: board.content,
          isModify: true,
          modifyBoardId: board.boardId,
        },
      });
    }

    if (confirmType === 'delete') {
      setConfirmType(null);
      deleteCommunity.mutate({ boardId: board.boardId });
    }
  };

  return (
    <>
      {confirmType && (
        <ConfirmModal
          isOpen={!!confirmType}
          title={confirmType === 'modify' ? '수정하시겠습니까?' : '삭제하시겠습니까?'}
          message={
            confirmType === 'modify'
              ? '게시글을 수정합니다.'
              : '삭제된 게시글은 복구할 수 없습니다.'
          }
          onClose={() => setConfirmType(null)}
          onConfirm={handleConfirm}
        />
      )}
      <Link
        to={`/detail/${Number(id)}/community/${board.boardId}`}
        className={cn(
          'board__item',
          'h-[220px]',
          'border border-solid border-[#ccc]',
          'rounded-[15px]',
          'bg-[#f2f2f2]',
          'p-[16px]',
          'hover:translate-y-[-20px] transition-all duration-300',
          'relative',
        )}
      >
        <h2 className={cn('text-[14px]')}>{board.title}</h2>
        <p className={cn('text-[14px] text-[#bbb] mt-[10px] mb-[26px]')}>
          {board.content}
        </p>
        <div
          className={cn(
            'board__status',
            'flex justify-between items-center pb-[20px] border-b border-solid border-[#ddd]',
          )}
        >
          <div
            className={cn(
              'board__status__cal',
              'flex items-center gap-[6px] text-[12px]',
            )}
          >
            <Calendar size={16} />
            <span>{board.createdAt.split('T')[0]}</span>
          </div>
          <div
            className={cn(
              'board__comment__status',
              'border border-solid border-[#ccc]',
              'rounded-[8px]',
              'bg-white',
              'p-[6px]',
              'flex items-center gap-[4px]',
              'text-[12px]',
            )}
          >
            <MessageCircleMore size={12} />
            <span>2</span>
          </div>
        </div>
        <div className={cn('board__extra mt-[16px] text-[14px]')}>
          <span className={cn('block')}>Designed By Cota</span>
          <span className={cn('block text-[#ccc] mt-[4px] text-[12px]')}>
            {board.nickName}
          </span>
        </div>
        <div
          className={cn(
            'board__buttons absolute top-[16px] right-[16px] flex gap-[8px] items-center',
          )}
        >
          <button
            className={cn(
              'board__button',
              'bg-white w-[30px] h-[30px] flex justify-center items-center',
              'rounded-full',
              'border border-solid border-[#000]',
              'cursor-pointer',
            )}
            onClick={handleModifyClick}
          >
            <MonitorCog size={16} />
          </button>
          <button
            className={cn(
              'board__button',
              'bg-white w-[30px] h-[30px] flex justify-center items-center',
              'rounded-full',
              'border border-solid border-[#000]',
              'cursor-pointer',
            )}
            onClick={handleDeleteClick}
          >
            <UserRoundX size={16} />
          </button>
        </div>
      </Link>
    </>
  );
}

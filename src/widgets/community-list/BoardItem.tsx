import {
  OPEN_WRITE_MODAL,
  type BoardData,
} from '@/entities/reducers/BoardReducer';
import { cn } from '@/shared';
import {
  Calendar,
  MessageCircleMore,
  MonitorCog,
  UserRoundX,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

export default function BoardItem({ board }: { board: BoardData }) {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();

  const handleModify = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // 수정 로직
    console.log('수정 버튼 클릭:', board.boardId);
    dispatch({
      type: OPEN_WRITE_MODAL,
      payload: {
        title: board.title,
        content: board.content,
        isModify: true,
        modifyBoardId: board.boardId,
      },
    });
  };

  return (
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
            '',
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
          onClick={handleModify}
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
        >
          <UserRoundX size={16} />
        </button>
      </div>
    </Link>
  );
}

import type { BoardData } from '@/entities/reducers/BoardReducer';
import { cn } from '@/shared';
import { Calendar, MessageCircleMore } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export default function BoardItem({ board }: { board: BoardData }) {
  const { id } = useParams<{ id: string }>();

  return (
    <Link
      to={`/detail/${Number(id)}/community/${board.boardId}`}
      className={cn(
        'board__item',
        'h-[200px]',
        'border border-solid border-[#ccc]',
        'rounded-[15px]',
        'bg-[#f2f2f2]',
        'p-[16px]',
        'hover:translate-y-[-20px] transition-all duration-300',
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
          <span>12 Nov</span>
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
        Designed By Cota
      </div>
    </Link>
  );
}

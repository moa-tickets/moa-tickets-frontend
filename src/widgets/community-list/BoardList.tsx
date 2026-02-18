import type { BoardData } from '@/entities/reducers/BoardReducer';
import { cn } from '@/shared';
import BoardItem from './BoardItem';

export default function BoardList({
  data,
  isLoading,
}: {
  data: BoardData[];
  isLoading: boolean;
}) {
  return (
    <div
      className={cn(
        'board__list',
        data.length > 0 && 'grid grid-cols-3 gap-[8px] mb-[20px]',
      )}
    >
      {!isLoading && data.length === 0 ? (
        <div
          className={cn(
            'board__list__empty',
            'text-center text-[#777] text-[14px] py-[40px]',
          )}
        >
          등록된 게시글이 없습니다.
        </div>
      ) : (
        data.map((board: BoardData) => (
          <BoardItem key={board.boardId} board={board} />
        ))
      )}
    </div>
  );
}

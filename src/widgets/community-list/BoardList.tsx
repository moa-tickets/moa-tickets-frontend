import type { BoardData } from '@/entities/reducers/BoardReducer';
import { cn } from '@/shared';
import BoardItem from './BoardItem';
import BoardSkeleton from './BoardSkeleton';
import Pagination from '@/shared/components/pagination/Pagination';
import { useState } from 'react';

export default function BoardList({
  data,
  isLoading,
}: {
  data: BoardData[];
  isLoading: boolean;
}) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const PAGE_SIZE = 6;
  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  return (
    <>
      <div
        className={cn(
          'board__list',
          'relative grid grid-cols-3 gap-[8px] mb-[20px]',
        )}
      >
        {!isLoading &&
          data.length > 0 &&
          data
            .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
            .map((board: BoardData) => (
              <BoardItem key={board.boardId} board={board} />
            ))}
        <BoardSkeleton />
      </div>
      {data.length > 6 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          isLast={currentPage === totalPages}
          className={cn(
            currentPage === totalPages && data.length % PAGE_SIZE <= 3
              ? 'mt-[280px]'
              : 'mt-[50px]',
            'mb-[20px]',
          )}
        />
      )}
    </>
  );
}

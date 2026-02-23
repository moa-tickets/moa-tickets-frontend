import { cn } from '@/shared';
import Icon from '@/shared/lib/Icon';

const WINDOW = 2; // 현재 페이지 기준 좌우로 보여줄 페이지 수

type PageItem = number | 'ellipsis-left' | 'ellipsis-right';

const getVisiblePages = (current: number, total: number): PageItem[] => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const left = Math.max(2, current - WINDOW);
  const right = Math.min(total - 1, current + WINDOW);
  const pages: PageItem[] = [1];

  if (left > 2) pages.push('ellipsis-left');
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push('ellipsis-right');
  pages.push(total);

  return pages;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLast,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLast?: boolean;
}) => {
  const isNextDisabled =
    typeof isLast === 'boolean' ? isLast : currentPage === totalPages;
  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div
      className={cn('flex justify-center items-center gap-[10px] mt-[10px]')}
    >
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'w-[34px] h-[34px] flex items-center justify-center',
          currentPage === 1 && 'opacity-50 cursor-not-allowed',
        )}
      >
        <Icon
          ICON="ARROW_LEFT_PAGINATION"
          className={cn('w-[25px] h-[25px] block')}
        />
      </button>
      {visiblePages.map((page) => {
        if (typeof page === 'string') {
          return (
            <span
              key={page}
              className={cn(
                'w-[34px] h-[34px] flex items-center justify-center text-[14px] text-[rgba(0,0,0,0.4)]',
              )}
            >
              ...
            </span>
          );
        }
        const isPageDisabled = isLast && page > currentPage;
        return (
          <button
            key={page}
            onClick={() => !isPageDisabled && onPageChange(page)}
            disabled={isPageDisabled}
            className={cn(
              'w-[34px] h-[34px] rounded-[17px] flex items-center justify-center text-[14px] font-medium',
              currentPage === page
                ? 'bg-[#242428] text-white'
                : 'border border-[rgba(0,0,0,0.4)] text-[rgba(0,0,0,0.4)]',
              isPageDisabled && 'opacity-50 cursor-not-allowed',
            )}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={() => !isNextDisabled && onPageChange(currentPage + 1)}
        disabled={isNextDisabled}
        className={cn(
          'w-[34px] h-[34px] flex items-center justify-center',
          isNextDisabled && 'opacity-50 cursor-not-allowed',
        )}
      >
        <Icon
          ICON="ARROW_RIGHT_PAGINATION"
          className={cn('w-[25px] h-[25px] block')}
        />
      </button>
    </div>
  );
};

export default Pagination;

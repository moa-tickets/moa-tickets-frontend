import { cn } from '@/shared';
import Icon from '@/shared/lib/Icon';

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
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const isNextDisabled =
    typeof isLast === 'boolean' ? isLast : currentPage === totalPages;

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
      {pages.map((page) => {
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

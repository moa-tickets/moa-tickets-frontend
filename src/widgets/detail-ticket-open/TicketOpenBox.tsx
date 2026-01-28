import { cn } from '@/shared';

const TicketOpenBox = ({
  currentDate,
  reserDate,
  startDate,
  endDate,
}: {
  currentDate: Date;
  reserDate: Date;
  startDate: Date;
  endDate: Date;
}) => {
  // 날짜만 비교 (시간 제외)
  const normalizeDate = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const normalizedCurrent = normalizeDate(currentDate);
  const normalizedReser = normalizeDate(reserDate);
  const normalizedEnd = normalizeDate(endDate);

  const isBeforeOpen = normalizedCurrent < normalizedReser;
  const isEnded = normalizedCurrent > normalizedEnd;

  const renderContent = () => {
    if (isEnded) {
      return (
        <div className="no__reservation flex flex-col justify-center items-center">
          <span className="text-[rgb(102,102,102)] text-[20px] font-semibold mb-[10px]">
            공연이 종료되었습니다
          </span>
          <span className="text-[14px] text-[rgb(102,102,102)]">
            공연 기간: {startDate.toISOString().split('T')[0]} ~{' '}
            {endDate.toISOString().split('T')[0]}
          </span>
        </div>
      );
    }

    if (isBeforeOpen) {
      return (
        <>
          <h2 className={cn('text-[16px] font-semibold mb-[20px]')}>
            티켓오픈안내
          </h2>
          <div
            className={cn(
              'open__diff',
              'flex items-center gap-[10px] mb-[20px]',
            )}
          >
            <span className={cn('text-[26px] text-[rgb(239,62,67)]')}>
              D-
              {Math.floor(
                (reserDate.getTime() - currentDate.getTime()) /
                  (1000 * 60 * 60 * 24),
              )}
            </span>
            <div className={cn('ticket__opens flex flex-col ')}>
              <span className={cn('text-[14px]')}>티켓오픈</span>
              <span className={cn('text-[12px]')}>
                {reserDate.toISOString().split('T')[0]}
              </span>
            </div>
          </div>
          <span className={cn('text-[12px] text-[rgb(102,102,102)]')}>
            티켓 오픈 시간은 예고없이 변경될 수 있습니다.
          </span>
        </>
      );
    }

    return (
      <div className="no__reservation flex flex-col justify-center items-center">
        <span className="text-[rgb(239,62,67)] text-[20px] font-semibold mb-[10px]">
          예매가 가능합니다
        </span>
        <span className="text-[14px] text-[rgb(102,102,102)]">
          예매 시작일: {reserDate.toISOString().split('T')[0]}
        </span>
      </div>
    );
  };

  return (
    <div
      className={cn(
        'ticket__open__box',
        'w-[300px] h-[250px] border border-solid border-[rgb(182,189,199)] rounded-[15px] bg-white',
        'flex flex-col justify-center items-center',
        'mb-[30px]',
      )}
    >
      {renderContent()}
    </div>
  );
};

export default TicketOpenBox;

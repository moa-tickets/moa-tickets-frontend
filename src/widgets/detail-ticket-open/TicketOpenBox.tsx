import type { ProductDetail } from '@/entities/reducers/ConcertDetailReducer';
import { cn } from '@/shared';

const TicketOpenBox = ({
  data,
  currentDate,
  reserDate,
}: {
  data: ProductDetail;
  currentDate: Date;
  reserDate: Date;
}) => {
  return (
    <div
      className={cn(
        'ticket__open__box',
        'w-[300px] h-[250px] border border-solid border-[rgb(182,189,199)] rounded-[15px] bg-white',
        'flex flex-col justify-center items-center',
        'mb-[30px]',
      )}
    >
      {currentDate < reserDate ? (
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
      ) : (
        <div className="no__reservation flex justify-center items-center">
          <span className="text-[rgb(239,62,67)] opacity-45">
            예약 기간이 지났습니다
          </span>
        </div>
      )}
    </div>
  );
};

export default TicketOpenBox;

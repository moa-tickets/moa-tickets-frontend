import { Link } from 'react-router-dom';
import { cn } from '@/shared';
import type { BookingItem } from '@/features/booking/useBookings';

type ReservationTableProps = {
  data: BookingItem[];
  isLoading?: boolean;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

const SkeletonRow = () => (
  <tr className={cn('border-b border-[#CFD0D7]')}>
    <td className={cn('px-[20px] py-[14px]')}>
      <div className={cn('h-[20px] bg-[#E5E7EB] rounded animate-pulse mx-auto w-[60px]')} />
    </td>
    <td className={cn('px-[20px] py-[14px]')}>
      <div className={cn('h-[20px] bg-[#E5E7EB] rounded animate-pulse w-[80%]')} />
    </td>
    <td className={cn('px-[20px] py-[14px]')}>
      <div className={cn('h-[20px] bg-[#E5E7EB] rounded animate-pulse mx-auto w-[120px]')} />
    </td>
    <td className={cn('px-[20px] py-[14px]')}>
      <div className={cn('h-[20px] bg-[#E5E7EB] rounded animate-pulse mx-auto w-[30px]')} />
    </td>
  </tr>
);

const ReservationTable = ({ data, isLoading }: ReservationTableProps) => {
  if (isLoading) {
    return (
      <div className={cn('border-t border-[#ECEDF2] mt-[10px] overflow-x-auto')}>
        <table className={cn('w-full table-fixed min-w-[600px]')}>
          <thead>
            <tr className={cn('bg-[#F8F9FA]')}>
              <th
                className={cn(
                  'px-[20px] py-[12px] text-[14px] font-bold text-[#62676C] border-b border-[#CFD0D7]',
                  'w-[120px]',
                )}
              >
                예매번호
              </th>
              <th
                className={cn(
                  'px-[20px] py-[12px] text-[14px] font-bold text-[#62676C] border-b border-[#CFD0D7]',
                )}
              >
                티켓명
              </th>
              <th
                className={cn(
                  'px-[20px] py-[12px] text-[14px] font-bold text-[#62676C] border-b border-[#CFD0D7]',
                  'w-[180px]',
                )}
              >
                관람일시
              </th>
              <th
                className={cn(
                  'px-[20px] py-[12px] text-[14px] font-bold text-[#62676C] border-b border-[#CFD0D7]',
                  'w-[100px]',
                )}
              >
                매수
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonRow key={index} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={cn('border-t border-[#ECEDF2] mt-[10px] py-[40px] text-center text-[14px] text-[#62676C]')}>
        예매 내역이 없습니다.
      </div>
    );
  }

  return (
    <div className={cn('border-t border-[#ECEDF2] mt-[10px] overflow-x-auto')}>
      <table className={cn('w-full table-fixed min-w-[600px]')}>
        <thead>
          <tr className={cn('bg-[#F8F9FA]')}>
            <th
              className={cn(
                'px-[20px] py-[12px] text-[14px] font-bold text-[#62676C] border-b border-[#CFD0D7]',
                'w-[120px]',
              )}
            >
              예매번호
            </th>
            <th
              className={cn(
                'px-[20px] py-[12px] text-[14px] font-bold text-[#62676C] border-b border-[#CFD0D7]',
              )}
            >
              티켓명
            </th>
            <th
              className={cn(
                'px-[20px] py-[12px] text-[14px] font-bold text-[#62676C] border-b border-[#CFD0D7]',
                'w-[180px]',
              )}
            >
              관람일시
            </th>
            <th
              className={cn(
                'px-[20px] py-[12px] text-[14px] font-bold text-[#62676C] border-b border-[#CFD0D7]',
                'w-[100px]',
              )}
            >
              매수
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.orderId} className={cn('border-b border-[#CFD0D7]')}>
              <td
                className={cn(
                  'px-[20px] py-[14px] text-[14px] text-[#62676C] text-center',
                )}
              >
                <Link
                  to={`/mypage/reservation/${item.orderId}`}
                  className={cn(
                    'hover:underline cursor-pointer text-[#FA2828]',
                  )}
                >
                  {item.orderId.slice(-8)}
                </Link>
              </td>
              <td
                className={cn(
                  'px-[20px] py-[14px] text-[14px] text-[#62676C] truncate',
                )}
                title={item.concertName}
              >
                {item.concertName}
              </td>
              <td
                className={cn(
                  'px-[20px] py-[14px] text-[14px] text-[#62676C] text-center',
                )}
              >
                {formatDate(item.sessionDate)}
              </td>
              <td
                className={cn(
                  'px-[20px] py-[14px] text-[14px] text-[#62676C] text-center',
                )}
              >
                {item.ticketCount}매
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationTable;

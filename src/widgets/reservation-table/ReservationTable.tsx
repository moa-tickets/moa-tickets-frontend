import { Link } from 'react-router-dom';
import { cn } from '@/shared';
import type { ReservationItem } from '@/entities/constant/reservationData';

const ReservationTable = ({ data }: { data: ReservationItem[] }) => {
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
            <tr key={item.id} className={cn('border-b border-[#CFD0D7]')}>
              <td
                className={cn(
                  'px-[20px] py-[14px] text-[14px] text-[#62676C] text-center',
                )}
              >
                <Link
                  to={`/mypage/reservation/${item.id}`}
                  className={cn(
                    'hover:underline cursor-pointer text-[#FA2828]',
                  )}
                >
                  {item.id}
                </Link>
              </td>
              <td
                className={cn(
                  'px-[20px] py-[14px] text-[14px] text-[#62676C] truncate',
                )}
                title={item.ticketName}
              >
                {item.ticketName}
              </td>
              <td
                className={cn(
                  'px-[20px] py-[14px] text-[14px] text-[#62676C] text-center',
                )}
              >
                {item.viewingDateTime}
              </td>
              <td
                className={cn(
                  'px-[20px] py-[14px] text-[14px] text-[#62676C] text-center',
                )}
              >
                {item.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationTable;

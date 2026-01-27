import type {
  Reservation,
  ReservationList,
} from '@/entities/reducers/ReservationReducer';
import { useNavigate } from 'react-router-dom';

const SkeletonRow = () => (
  <tr className="border-t border-b border-solid border-[rgb(207,208,215)]">
    {[1, 2, 3, 4].map((i) => (
      <td key={i} className="py-[10px]">
        <div className="h-[20px] bg-[#e0e0e0] rounded animate-pulse mx-auto w-[60%]" />
      </td>
    ))}
  </tr>
);

const ReservationTable = ({
  data,
  isLoading = false,
}: {
  data: Reservation;
  isLoading?: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <table className="w-full">
      <thead className="w-full bg-[rgb(248,249,250)] border-t border-solid border-[rgb(207,208,215)]">
        <tr>
          <td className="text-center py-[10px]">예매번호</td>
          <td className="text-center py-[10px]">티켓명</td>
          <td className="text-center py-[10px]">관람일시</td>
          <td className="text-center py-[10px]">매수</td>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </>
        ) : !data.items || data.items.length === 0 ? (
          <tr>
            <td
              colSpan={4}
              className="text-center py-[40px] text-[14px] text-[#999]"
            >
              데이터가 없습니다.
            </td>
          </tr>
        ) : (
          data.items.map((item: ReservationList) => (
            <tr
              key={item.orderId}
              onClick={() => navigate(`/mypage/reservation/${item.orderId}`)}
              className={
                'border-t border-b border-solid border-[rgb(207,208,215)] text-[14px] cursor-pointer hover:bg-[#f5f5f5]'
              }
            >
              <td className="text-center py-[10px]">{item.orderId}</td>
              <td className="text-center py-[10px]">{item.concertName}</td>
              <td className="text-center py-[10px]">{item.sessionDate}</td>
              <td className="text-center py-[10px]">{item.ticketCount}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ReservationTable;

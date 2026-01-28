import type { ProductDetail } from '@/entities/reducers/ConcertDetailReducer';
import { cn } from '@/shared';
import TicketOpenBox from './TicketOpenBox';
import { useNavigate, useParams } from 'react-router-dom';
import type { LoginState } from '@/entities/reducers/LoginReducer';
import { useSelector } from 'react-redux';

const DetailTicketOpen = ({ data }: { data: ProductDetail }) => {
  const { id } = useParams<{ id: string }>();
  const currentDate = new Date();
  const reservationDate = new Date(data.bookingOpen);
  const concertEndDate = new Date(data.concertEnd);

  // sessions에서 가장 이른 날짜를 concertStart로 사용
  const concertStartDate = data.sessions.length > 0
    ? new Date(Math.min(...data.sessions.map(s => new Date(s.date).getTime())))
    : concertEndDate;

  const { isLoggedIn } = useSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer,
  );

  const navigate = useNavigate();

  const reservationMove = () => {
    if (isLoggedIn) {
      navigate(`/detail/${id}/booking`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className={cn('detail__ticket__open')}>
      <div
        className={cn(
          'detail__ticket__open__inner',
          'max-w-[1080px] mx-auto flex flex-col items-end',
        )}
      >
        <TicketOpenBox currentDate={currentDate} reserDate={reservationDate} startDate={concertStartDate} endDate={concertEndDate} />
        <button
          className={cn(
            'w-[300px] py-[16px] bg-[rgb(65,84,255)] text-white rounded-[10px]',
            'cursor-pointer disabled:opacity-45',
            'hover:bg-[rgb(141, 152, 244)]',
          )}
          disabled={currentDate < reservationDate || currentDate > concertEndDate}
          onClick={reservationMove}
        >
          예매하기
        </button>
      </div>
    </div>
  );
};

export default DetailTicketOpen;

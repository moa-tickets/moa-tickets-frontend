import type { MainReservation } from '@/entities/reducers/ReservationReducer';
import { useReservation } from '@/features/reservation/useReservation';
import { cn } from '@/shared';
import ReservationTab from '@/shared/components/select-tab/ReservationTab';
import ReservationTable from '@/widgets/reservation-table/ReservationTable';
import TicketCancelNotice from '@/widgets/ticket-cancel-notice/TicketCancelNotice';
import ViewSelectorWrapper, {
  type ViewSelectorParams,
} from '@/widgets/view-selector-wrapper/ViewSelectorWrapper';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

const ReservationPage = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const { getReser, getReserPending } = useReservation();
  const { data: reservationData } = useSelector(
    (state: { reservationReducer: MainReservation }) =>
      state.reservationReducer,
  );

  const handleViewChange = useCallback(
    (params: ViewSelectorParams) => {
      getReser.mutate({ ...params, page });
    },
    [page],
  );

  return (
    <div className={cn('reservation__page max-w-[1080px] mx-auto')}>
      <h1
        className={cn(
          'text-[30px] pt-[30px] pb-[20px] font-bold border-b border-solid border-[#ccc]',
        )}
      >
        마이 티켓
      </h1>
      <div className={cn('text-[14px] text-[#fa2828] pt-[20px] pb-[30px]')}>
        <span className={cn('font-bold')}>예매번호</span>를 클릭하면 예매 상세
        내용을 확인할 수 있습니다.
      </div>
      <ReservationTab
        contents={['예매 내역/reservation', '예매 취소/cancel']}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
      />
      <div
        className={cn(
          'text-[12px] text-[#878D95] text-right mt-[20px] mb-[10px]',
        )}
      >
        예매한 내역이 확인이 안되실 경우{' '}
        <button className={cn('text-[#FA2828] hover:underline')}>챗봇</button>을
        이용해주세요.
      </div>
      <ViewSelectorWrapper onChange={handleViewChange} />
      <ReservationTable data={reservationData} isLoading={getReserPending} />
      <TicketCancelNotice />
    </div>
  );
};

export default ReservationPage;

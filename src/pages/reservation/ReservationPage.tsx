import { cn } from '@/shared';
import ReservationTab from '@/shared/components/select-tab/ReservationTab';
import SelectPeriod from '@/widgets/select-period/SelectPeriod';
import ReservationTable from '@/widgets/reservation-table/ReservationTable';
import Pagination from '@/shared/components/pagination/Pagination';
import TicketCancelNotice from '@/widgets/ticket-cancel-notice/TicketCancelNotice';
import { reservationData } from '@/entities/constant/reservationData';
import { useState } from 'react';

const ReservationPage = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 2;

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
      <SelectPeriod />
      <div
        className={cn(
          'text-[12px] text-[#878D95] text-right mt-[20px] mb-[10px]',
        )}
      >
        예매한 내역이 확인이 안되실 경우{' '}
        <button className={cn('text-[#FA2828] hover:underline')}>챗봇</button>을
        이용해주세요.
      </div>
      <ReservationTable data={reservationData} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <TicketCancelNotice />
    </div>
  );
};

export default ReservationPage;

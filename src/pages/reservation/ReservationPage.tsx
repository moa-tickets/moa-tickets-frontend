import { cn } from '@/shared';
import ReservationTab from '@/shared/components/select-tab/ReservationTab';
import SelectPeriod from '@/widgets/select-period/SelectPeriod';
import ReservationTable from '@/widgets/reservation-table/ReservationTable';
import Pagination from '@/shared/components/pagination/Pagination';
import TicketCancelNotice from '@/widgets/ticket-cancel-notice/TicketCancelNotice';
import { useState, useEffect } from 'react';
import {
  useBookings,
  type RangeType,
  type BasisType,
  type BookingFilterParams,
} from '@/features/booking/useBookings';

const ReservationPage = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  // 필터 상태
  const [selectedRange, setSelectedRange] = useState<RangeType | null>('D15');
  const [selectedBasis, setSelectedBasis] = useState<BasisType>('BOOKED_AT');
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  // 페이지 상태 (API는 0부터 시작, UI는 1부터 표시)
  const [currentPage, setCurrentPage] = useState<number>(0);

  // API 파라미터 생성
  const buildFilterParams = (): BookingFilterParams => {
    const params: BookingFilterParams = {
      page: currentPage,
    };

    // range와 월별 필터는 동시 사용 불가
    if (selectedRange) {
      params.range = selectedRange;
    } else if (selectedMonth) {
      params.basis = selectedBasis;
      params.year = selectedYear;
      params.month = selectedMonth;
    }

    return params;
  };

  // API 호출
  const { data, isLoading } = useBookings(buildFilterParams());

  // 필터 변경 시 페이지 초기화
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedRange, selectedBasis, selectedYear, selectedMonth]);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1); // UI는 1부터, API는 0부터
  };

  const bookings = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;

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
      <SelectPeriod
        selectedRange={selectedRange}
        onRangeChange={setSelectedRange}
        selectedBasis={selectedBasis}
        onBasisChange={setSelectedBasis}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
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
      <ReservationTable data={bookings} isLoading={isLoading} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage + 1}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      <TicketCancelNotice />
    </div>
  );
};

export default ReservationPage;

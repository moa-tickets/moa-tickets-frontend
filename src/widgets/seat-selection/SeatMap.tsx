import { cn } from '@/shared';
import { type TicketType } from '@/entities/types/types';

type SeatStatus = 'available' | 'selected' | 'occupied';

type Seat = {
  id: string;
  row: string;
  number: string;
  status: SeatStatus;
  section: string;
  ticketId?: number;
};

const SeatMap = ({
  onSeatSelect,
  selectedSeats,
  tickets = [],
  isLoading = false,
}: {
  onSeatSelect: (seat: Seat) => void;
  selectedSeats: Seat[];
  tickets?: TicketType[];
  isLoading?: boolean;
}) => {
  // 직사각형 그리드 설정 (열 수를 기준으로 행 계산)
  const COLS = 10; // 한 행당 좌석 수

  // API 데이터를 Seat 형태로 변환
  const convertTicketsToSeats = (tickets: TicketType[]): Seat[] => {
    return tickets.map((ticket, index) => {
      const rowIndex = Math.floor(index / COLS);
      const colIndex = index % COLS;

      return {
        id: `${rowIndex}-${colIndex}`,
        row: String(rowIndex + 1),
        number: String(colIndex + 1),
        status: ticket.state === 'AVAILABLE' ? 'available' : 'occupied',
        section: '일반',
        ticketId: ticket.ticketId,
      };
    });
  };

  const seats = convertTicketsToSeats(tickets);

  // 좌석을 행별로 그룹화
  const totalRows = Math.ceil(tickets.length / COLS);
  const groupedSeats: Seat[][] = [];

  for (let i = 0; i < totalRows; i++) {
    groupedSeats.push(seats.slice(i * COLS, (i + 1) * COLS));
  }

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'occupied') return;
    onSeatSelect(seat);
  };

  const isSeatSelected = (seatId: string) => {
    return selectedSeats.some((s) => s.id === seatId);
  };

  if (isLoading) {
    return (
      <div className={cn('seat-map w-full')}>
        <div
          className={cn('flex justify-center items-center py-20 text-[#62676C]')}
        >
          좌석 정보를 불러오는 중...
        </div>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className={cn('seat-map w-full')}>
        <div
          className={cn('flex justify-center items-center py-20 text-[#62676C]')}
        >
          좌석 정보가 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className={cn('seat-map w-full')}>
      {/* Stage */}
      <div
        className={cn(
          'w-full h-[80px] bg-[#F8F9FA] border-2 border-[#CFD0D7] rounded-[8px] mb-[40px] flex items-center justify-center',
        )}
      >
        <span className={cn('text-[18px] font-bold text-[#62676C]')}>무대</span>
      </div>

      {/* Seat Map - 직사각형 그리드 */}
      <div className={cn('seat-map-container flex flex-col items-center')}>
        {groupedSeats.map((rowSeats) => (
          <div
            key={rowSeats[0]?.id ?? rowSeats[0]?.ticketId}
            className={cn('flex items-center gap-[6px] mb-[6px]')}
          >
            <span
              className={cn(
                'w-[24px] text-[12px] font-medium text-[#62676C] text-center',
              )}
            >
              {rowSeats[0]?.row}
            </span>
            <div className={cn('flex gap-[3px]')}>
              {rowSeats.map((seat) => {
                const isSelected = isSeatSelected(seat.id);
                return (
                  <button
                    key={seat.id}
                    onClick={() => handleSeatClick(seat)}
                    disabled={seat.status === 'occupied'}
                    className={cn(
                      'w-[28px] h-[28px] rounded-[4px] border border-[#CFD0D7] flex items-center justify-center text-[11px] font-medium transition-colors',
                      seat.status === 'occupied' &&
                        'bg-[#ECEDF2] cursor-not-allowed opacity-50',
                      seat.status === 'available' &&
                        !isSelected &&
                        'bg-white hover:bg-[#F8F9FA] cursor-pointer',
                      isSelected && 'bg-[#4154FF] text-white border-[#4154FF]',
                    )}
                  >
                    {seat.number}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div
        className={cn(
          'mt-[30px] pt-[20px] border-t border-[#ECEDF2] flex gap-[24px]',
        )}
      >
        <div className={cn('flex items-center gap-[8px]')}>
          <div
            className={cn(
              'w-[24px] h-[24px] rounded-[4px] border border-[#CFD0D7] bg-white',
            )}
          />
          <span className={cn('text-[14px] text-[#62676C]')}>선택가능</span>
        </div>
        <div className={cn('flex items-center gap-[8px]')}>
          <div
            className={cn(
              'w-[24px] h-[24px] rounded-[4px] bg-[#4154FF] border border-[#4154FF]',
            )}
          />
          <span className={cn('text-[14px] text-[#62676C]')}>선택됨</span>
        </div>
        <div className={cn('flex items-center gap-[8px]')}>
          <div
            className={cn(
              'w-[24px] h-[24px] rounded-[4px] bg-[#ECEDF2] border border-[#CFD0D7] opacity-50',
            )}
          />
          <span className={cn('text-[14px] text-[#62676C]')}>예약됨</span>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;

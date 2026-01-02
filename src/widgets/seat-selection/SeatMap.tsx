import { useState } from 'react';
import { cn } from '@/shared';

type SeatStatus = 'available' | 'selected' | 'occupied';

type Seat = {
  id: string;
  row: string;
  number: string;
  status: SeatStatus;
  section: string;
};

const SeatMap = ({
  onSeatSelect,
  selectedSeats,
}: {
  onSeatSelect: (seat: Seat) => void;
  selectedSeats: Seat[];
}) => {
  // Mock 좌석 데이터 - 실제 좌석 배치도처럼
  const rows = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
  ];
  const seatsPerRow = 12;

  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    rows.forEach((row) => {
      for (let i = 1; i <= seatsPerRow; i++) {
        const seatId = `${row}-${i}`;
        const isOccupied = Math.random() < 0.2; // 20% 확률로 예약됨
        
        // 좌석 번호에 따라 섹션 결정 (중앙이 VIP, 양쪽이 일반석)
        let section = '일반석';
        if (i >= 8 && i <= 13) {
          section = 'VIP';
        } else if (i >= 5 && i <= 16) {
          section = 'R석';
        }
        
        seats.push({
          id: seatId,
          row,
          number: String(i),
          status: isOccupied ? 'occupied' : 'available',
          section,
        });
      }
    });
    return seats;
  };

  const [seats] = useState<Seat[]>(generateSeats());

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'occupied') return;
    onSeatSelect(seat);
  };

  const isSeatSelected = (seatId: string) => {
    return selectedSeats.some((s) => s.id === seatId);
  };

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

      {/* Seat Map */}
      <div className={cn('seat-map-container flex flex-col items-center')}>
        {rows.map((row) => {
          const rowSeats = seats.filter((s) => s.row === row);
          return (
            <div
              key={row}
              className={cn('flex items-center gap-[6px] mb-[6px]')}
            >
              <span
                className={cn(
                  'w-[24px] text-[12px] font-medium text-[#62676C] text-center',
                )}
              >
                {row}
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
                        isSelected &&
                          'bg-[#4154FF] text-white border-[#4154FF]',
                      )}
                    >
                      {seat.number}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
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

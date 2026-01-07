import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/shared';
import { detailData } from '@/entities/constant/detailData';
import SeatMap from '@/widgets/seat-selection/SeatMap';
import { useProductSearch } from '@/features/product-search/useProductSearch';

type Seat = {
  id: string;
  row: string;
  number: string;
  status: 'available' | 'selected' | 'occupied';
  section: string;
  ticketId?: number;
};

const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const detailPageData = detailData[Number(id)];
  const {
    getConcertDetail,
    concertDetail,
    getSessionTickets,
    sessionTickets,
    isTicketsLoading,
    holdTickets,
    isHolding,
  } = useProductSearch();

  // API에서 콘서트 상세 정보 가져오기
  useEffect(() => {
    if (id) {
      getConcertDetail.mutate(Number(id));
    }
  }, [id]);

  // 세션 날짜 포맷팅
  const formatSessionDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  // 공연기간 포맷팅
  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const formatDate = (d: Date) =>
      `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
    return `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
  };

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
    null,
  );
  const [selectedSessionPrice, setSelectedSessionPrice] = useState<number>(0);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10분(600초) 타이머
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 세션 선택 시 좌석 정보 가져오기
  useEffect(() => {
    if (selectedSessionId !== null) {
      getSessionTickets.mutate(selectedSessionId);
    }
  }, [selectedSessionId]);

  // 타이머 효과
  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimerActive(false);
            // 시간 만료 시 좌석 선택 취소
            setSelectedSeats([]);
            alert('좌석 선택 시간이 만료되었습니다. 다시 선택해주세요.');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    if (!isTimerActive || timeLeft <= 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerActive, timeLeft]);

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

  const MAX_SEATS = 4; // 최대 선택 가능 좌석 수

  const handleSeatSelect = (seat: Seat) => {
    setSelectedSeats((prev) => {
      const isAlreadySelected = prev.some((s) => s.id === seat.id);
      if (isAlreadySelected) {
        const newSeats = prev.filter((s) => s.id !== seat.id);
        // 모든 좌석이 해제되면 타이머 중지
        if (newSeats.length === 0) {
          setIsTimerActive(false);
          setTimeLeft(600);
        }
        return newSeats;
      }
      // 최대 좌석 수 제한
      if (prev.length >= MAX_SEATS) {
        alert(`최대 ${MAX_SEATS}개의 좌석만 선택할 수 있습니다.`);
        return prev;
      }
      const newSeats = [
        ...prev,
        {
          ...seat,
          status: 'selected' as const,
        },
      ];
      // 첫 좌석 선택 시 타이머 시작
      if (prev.length === 0) {
        setIsTimerActive(true);
        setTimeLeft(600);
      }
      return newSeats;
    });
  };

  const handleBooking = () => {
    if (selectedSessionId === null) return;

    // 선택된 좌석의 ticketId 목록 추출 (최대 4개)
    const ticketIds = selectedSeats
      .map((seat) => seat.ticketId)
      .filter((ticketId): ticketId is number => ticketId !== undefined)
      .slice(0, 4);

    if (ticketIds.length === 0) {
      alert('좌석을 선택해주세요.');
      return;
    }

    console.log('Hold request:', { sessionId: selectedSessionId, ticketIds });

    // 좌석 임시 점유 API 호출
    holdTickets.mutate(
      { sessionId: selectedSessionId, ticketIds },
      {
        onSuccess: (token) => {
          // 성공 시 결제 페이지로 이동
          navigate(`/detail/${id}/payment`, {
            state: {
              date: selectedDate,
              seats: selectedSeats,
              totalPrice: totalPrice,
              ticketPrice: selectedSessionPrice,
              ticketIds: ticketIds,
              sessionId: selectedSessionId,
              holdToken: token,
              concertName: concertDetail?.concertName,
            },
          });
        },
        onError: () => {
          alert('좌석 점유에 실패했습니다. 다시 시도해주세요.');
        },
      },
    );
  };

  // 선택된 좌석의 총 가격 계산 (세션 가격 기준)
  const calculateTotalPrice = () => {
    if (selectedSeats.length === 0) return 0;
    return selectedSeats.length * selectedSessionPrice;
  };

  const totalPrice = calculateTotalPrice();

  // 시간 포맷팅 (MM:SS)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div
      className={cn('booking__page max-w-[1280px] mx-auto px-[40px] py-[40px]')}
    >
      {/* Header */}
      <div className={cn('mb-[30px]')}>
        <h1 className={cn('text-[30px] font-bold mb-[10px]')}>예약하기</h1>
        <p className={cn('text-[14px] text-[#666]')}>
          공연 정보를 확인하고 좌석을 선택해주세요.
        </p>
      </div>

      <div className={cn('flex gap-[40px]')}>
        {/* Left: Concert Info and Seat Map */}
        <div className={cn('flex-1')}>
          {/* Concert Info */}
          <div
            className={cn(
              'border border-[#ECEDF2] rounded-[15px] p-[30px] mb-[30px]',
            )}
          >
            <h2 className={cn('text-[24px] font-bold mb-[20px]')}>
              {detailPageData.concertTitle}
            </h2>
            <div className={cn('text-[14px] text-[#666] mb-[20px]')}>
              {detailPageData.genre}
            </div>

            {/* Concert Details */}
            <div className={cn('space-y-[12px] mb-[20px]')}>
              <div className={cn('flex items-start gap-[10px] text-[14px]')}>
                <span className={cn('w-[80px] text-[#62676C] flex-shrink-0')}>
                  장소
                </span>
                <span className={cn('flex-1 text-[#242428]')}>
                  {detailPageData.loc}
                </span>
              </div>
              <div className={cn('flex items-start gap-[10px] text-[14px]')}>
                <span className={cn('w-[80px] text-[#62676C] flex-shrink-0')}>
                  공연기간
                </span>
                <span className={cn('flex-1 text-[#242428]')}>
                  {concertDetail
                    ? formatDateRange(
                        concertDetail.concertStart,
                        concertDetail.concertEnd,
                      )
                    : detailPageData.date}
                </span>
              </div>
              <div className={cn('flex items-start gap-[10px] text-[14px]')}>
                <span className={cn('w-[80px] text-[#62676C] flex-shrink-0')}>
                  관람연령
                </span>
                <span className={cn('flex-1 text-[#242428]')}>
                  {concertDetail
                    ? `${concertDetail.age}세 이상 관람가능`
                    : detailPageData.age}
                </span>
              </div>
            </div>

            {/* Date Selection */}
            <div className={cn('mb-[20px]')}>
              <label
                htmlFor="booking-date"
                className={cn('block text-[14px] font-bold mb-[8px]')}
              >
                관람일시
              </label>
              <select
                id="booking-date"
                value={selectedDate}
                onChange={(e) => {
                  const selected = concertDetail?.sessions.find(
                    (s) => formatSessionDate(s.date) === e.target.value,
                  );
                  setSelectedDate(e.target.value);
                  setSelectedSessionId(selected?.sessionId ?? null);
                  setSelectedSessionPrice(selected?.price ?? 0);
                }}
                className={cn(
                  'w-full px-[12px] py-[10px] border border-[#ECEDF2] rounded-[6px] text-[14px]',
                )}
              >
                <option value="">날짜를 선택하세요</option>
                {concertDetail?.sessions.map((session) => (
                  <option
                    key={session.sessionId}
                    value={formatSessionDate(session.date)}
                  >
                    {formatSessionDate(session.date)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Seat Map */}
          {selectedDate && (
            <div
              className={cn('border border-[#ECEDF2] rounded-[15px] p-[30px]')}
            >
              <h3 className={cn('text-[20px] font-bold mb-[20px]')}>
                좌석 선택
              </h3>
              <SeatMap
                onSeatSelect={handleSeatSelect}
                selectedSeats={selectedSeats}
                tickets={sessionTickets}
                isLoading={isTicketsLoading}
              />
            </div>
          )}
        </div>

        {/* Right: Booking Summary */}
        <div className={cn('w-[400px] flex-shrink-0')}>
          <div
            className={cn('border border-[#ECEDF2] rounded-[15px] p-[30px]')}
          >
            <h3 className={cn('text-[20px] font-bold mb-[30px]')}>예약 정보</h3>

            {/* Timer */}
            {isTimerActive && selectedSeats.length > 0 && (
              <div
                className={cn(
                  'mb-[20px] p-[12px] rounded-[8px] border-2',
                  timeLeft <= 60
                    ? 'bg-[#FFF5F5] border-[#FA2828]'
                    : 'bg-[#F8F9FA] border-[#ECEDF2]',
                )}
              >
                <div className={cn('flex items-center justify-between')}>
                  <span
                    className={cn(
                      'text-[14px] font-medium',
                      timeLeft <= 60 ? 'text-[#FA2828]' : 'text-[#62676C]',
                    )}
                  >
                    남은 시간
                  </span>
                  <span
                    className={cn(
                      'text-[18px] font-bold',
                      timeLeft <= 60 ? 'text-[#FA2828]' : 'text-[#242428]',
                    )}
                  >
                    {formatTime(timeLeft)}
                  </span>
                </div>
                {timeLeft <= 60 && (
                  <p className={cn('text-[12px] text-[#FA2828] mt-[4px]')}>
                    시간 내에 결제를 완료해주세요.
                  </p>
                )}
              </div>
            )}

            {/* Selected Seats */}
            {selectedSeats.length > 0 && (
              <div className={cn('mb-[30px]')}>
                <h4 className={cn('text-[14px] font-bold mb-[12px]')}>
                  선택한 좌석
                </h4>
                <div className={cn('space-y-[12px]')}>
                  {selectedSeats.map((seat) => (
                  <div
                    key={seat.id}
                    className={cn(
                      'p-[12px] bg-[#F8F9FA] rounded-[6px]',
                    )}
                  >
                    <div
                      className={cn(
                        'flex justify-between items-center text-[14px]',
                      )}
                    >
                      <span className={cn('text-[#242428] font-medium')}>
                        {seat.row}열 {seat.number}번
                      </span>
                      <span className={cn('text-[#242428] font-medium')}>
                        {formatPrice(selectedSessionPrice)}원
                      </span>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            )}

            {/* Price Summary */}
            {selectedSeats.length > 0 && (
              <div
                className={cn('mb-[30px] pt-[20px] border-t border-[#ECEDF2]')}
              >
                <div
                  className={cn('flex justify-between items-center mb-[12px]')}
                >
                  <span className={cn('text-[14px] text-[#62676C]')}>
                    티켓 금액
                  </span>
                  <span className={cn('text-[16px] font-bold text-[#242428]')}>
                    {formatPrice(totalPrice)}원
                  </span>
                </div>
                <div className={cn('flex justify-between items-center')}>
                  <span className={cn('text-[16px] font-bold text-[#242428]')}>
                    총 결제금액
                  </span>
                  <span className={cn('text-[20px] font-bold text-[#FA2828]')}>
                    {formatPrice(totalPrice)}원
                  </span>
                </div>
              </div>
            )}

            {/* Booking Button */}
            <button
              onClick={handleBooking}
              disabled={!selectedDate || selectedSeats.length === 0 || isHolding}
              className={cn(
                'w-full h-[54px] bg-[#4154FF] text-white text-[18px] font-bold rounded-[10px] border border-[#4154FF] hover:bg-[#4154FF]/90 cursor-pointer disabled:bg-[#CCCCCC] disabled:cursor-not-allowed',
              )}
            >
              {isHolding ? '좌석 점유 중...' : '예약하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;

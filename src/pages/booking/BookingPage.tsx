import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/shared';
import { detailData } from '@/entities/constant/detailData';
import SeatMap from '@/widgets/seat-selection/SeatMap';

type Seat = {
  id: string;
  row: string;
  number: string;
  status: 'available' | 'selected' | 'occupied';
  section: string;
  selectedPrice?: string; // 선택한 가격 등급
};

const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const detailPageData = detailData[Number(id)];

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10분(600초) 타이머
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  if (!detailPageData || detailPageData.isLandingPage) {
    return null;
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

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
      const newSeats = [
        ...prev,
        {
          ...seat,
          status: 'selected' as const,
          selectedPrice: seat.section, // 기본값으로 섹션 설정
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

  const handlePriceChange = (seatId: string, priceType: string) => {
    setSelectedSeats((prev) =>
      prev.map((s) =>
        s.id === seatId ? { ...s, selectedPrice: priceType } : s,
      ),
    );
  };

  const handleBooking = () => {
    // 결제 확인 페이지로 이동
    navigate(`/detail/${id}/payment`, {
      state: {
        date: selectedDate,
        seats: selectedSeats,
        totalPrice: totalPrice,
        holdToken: "hold_WNDUg4kY90KQdmjYZZqdLA"
      },
    });
  };

  // 선택된 좌석의 총 가격 계산
  const calculateTotalPrice = () => {
    if (!detailPageData.price || selectedSeats.length === 0) return 0;
    return selectedSeats.reduce((total, seat) => {
      const priceType = seat.selectedPrice || seat.section;
      const price = detailPageData.price?.[priceType];
      return total + (price ?? 0);
    }, 0);
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
                  {detailPageData.date}
                </span>
              </div>
              <div className={cn('flex items-start gap-[10px] text-[14px]')}>
                <span className={cn('w-[80px] text-[#62676C] flex-shrink-0')}>
                  관람연령
                </span>
                <span className={cn('flex-1 text-[#242428]')}>
                  {detailPageData.age}
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
                onChange={(e) => setSelectedDate(e.target.value)}
                className={cn(
                  'w-full px-[12px] py-[10px] border border-[#ECEDF2] rounded-[6px] text-[14px]',
                )}
              >
                <option value="">날짜를 선택하세요</option>
                <option value="2026.01.30 18:00">2026.01.30 18:00</option>
                <option value="2026.01.31 18:00">2026.01.31 18:00</option>
                <option value="2026.02.01 18:00">2026.02.01 18:00</option>
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
                  {selectedSeats.map((seat) => {
                    const priceType = seat.selectedPrice || seat.section;
                    const selectedPriceValue =
                      detailPageData.price?.[priceType] ?? 0;

                    return (
                      <div
                        key={seat.id}
                        className={cn(
                          'p-[12px] bg-[#F8F9FA] rounded-[6px] space-y-[8px]',
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
                            {formatPrice(selectedPriceValue)}원
                          </span>
                        </div>
                        <div>
                          <label
                            htmlFor={`price-${seat.id}`}
                            className={cn(
                              'block text-[12px] text-[#62676C] mb-[4px]',
                            )}
                          >
                            가격 등급 선택
                          </label>
                          <select
                            id={`price-${seat.id}`}
                            value={priceType}
                            onChange={(e) =>
                              handlePriceChange(seat.id, e.target.value)
                            }
                            className={cn(
                              'w-full px-[8px] py-[6px] border border-[#ECEDF2] rounded-[4px] text-[12px]',
                            )}
                          >
                            {detailPageData.price &&
                              Object.keys(detailPageData.price)
                                .filter((key) => key !== 'all')
                                .map((pType) => {
                                  const price =
                                    detailPageData.price?.[pType] ?? 0;
                                  return (
                                    <option key={pType} value={pType}>
                                      {pType}석 - {formatPrice(price)}원
                                    </option>
                                  );
                                })}
                          </select>
                        </div>
                      </div>
                    );
                  })}
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
              disabled={!selectedDate || selectedSeats.length === 0}
              className={cn(
                'w-full h-[54px] bg-[#4154FF] text-white text-[18px] font-bold rounded-[10px] border border-[#4154FF] hover:bg-[#4154FF]/90 cursor-pointer disabled:bg-[#CCCCCC] disabled:cursor-not-allowed',
              )}
            >
              예약하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;

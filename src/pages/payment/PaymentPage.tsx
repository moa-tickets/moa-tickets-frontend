import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/shared';
import { detailData } from '@/entities/constant/detailData';
import OptimizedImage from '@/shared/components/optimized-image/OptimizedImage';
import {
  addReservation,
  type ReservationItem,
  type ReservationDetailData,
} from '@/entities/constant/reservationData';

type Seat = {
  id: string;
  row: string;
  number: string;
  status: 'available' | 'selected' | 'occupied';
  section: string;
  selectedPrice?: string;
};

type BookingData = {
  date: string;
  seats: Seat[];
  totalPrice: number;
};

const PaymentPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state as BookingData | null;
  const detailPageData = detailData[Number(id)];

  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10분(600초) 타이머
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 타이머 효과
  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // 시간 만료 시 이전 페이지로 이동
            alert('결제 시간이 만료되었습니다. 다시 예약해주세요.');
            navigate(`/detail/${id}/booking`);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timeLeft, navigate, id]);

  // 시간 포맷팅 (MM:SS)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  if (!detailPageData || detailPageData.isLandingPage || !bookingData) {
    return (
      <div
        className={cn('max-w-[1280px] mx-auto px-[40px] py-[40px] text-center')}
      >
        <p className={cn('text-[16px] text-[#62676C]')}>
          예약 정보를 찾을 수 없습니다.
        </p>
        <button
          onClick={() => navigate(`/detail/${id}/booking`)}
          className={cn(
            'mt-[20px] px-[24px] py-[12px] bg-[#4154FF] text-white rounded-[6px] text-[14px] hover:bg-[#4154FF]/90',
          )}
        >
          예약 페이지로 돌아가기
        </button>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // 결제 처리 로직
    setTimeout(() => {
      // 예매 ID 생성 (현재 시간 기반)
      const reservationId = Date.now().toString();
      const now = new Date();
      const paymentDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      // 취소 가능일 계산 (관람일 3일 전)
      const viewingDate = new Date(bookingData.date);
      viewingDate.setDate(viewingDate.getDate() - 3);
      const cancelableDate = `${viewingDate.getFullYear()}.${String(viewingDate.getMonth() + 1).padStart(2, '0')}.${String(viewingDate.getDate()).padStart(2, '0')}`;

      // 좌석 정보 그룹화
      const seatInfoMap: {
        [key: string]: { section: string; row: string; seatNumbers: string[] };
      } = {};

      bookingData.seats.forEach((seat) => {
        const section = seat.selectedPrice || seat.section;
        const key = `${section}-${seat.row}`;
        if (!seatInfoMap[key]) {
          seatInfoMap[key] = {
            section,
            row: seat.row,
            seatNumbers: [],
          };
        }
        seatInfoMap[key].seatNumbers.push(seat.number);
      });

      const seatInfo = Object.values(seatInfoMap);

      // 예매 항목 생성
      const concertTitle = detailPageData.concertTitle || '';
      const paymentMethodText =
        paymentMethod === 'card'
          ? '신용카드'
          : paymentMethod === 'bank'
            ? '무통장입금'
            : '휴대폰 결제';

      const reservationItem: ReservationItem = {
        id: reservationId,
        ticketName: concertTitle,
        viewingDateTime: bookingData.date,
        quantity: `${bookingData.seats.length}매`,
        cancelableDate,
        status: '예매완료',
        detailId: Number(id),
      };

      // 예매 상세 정보 생성
      const reservationDetail: ReservationDetailData = {
        reservationId,
        detailId: Number(id),
        concertTitle,
        genre: detailPageData.genre || '',
        location: detailPageData.loc || '',
        date: detailPageData.date || '',
        age: detailPageData.age || '',
        viewingDateTime: bookingData.date,
        quantity: `${bookingData.seats.length}매`,
        seatInfo,
        price: {
          total: bookingData.totalPrice,
          breakdown: {
            ticket: bookingData.totalPrice,
            fee: 0,
          },
        },
        paymentMethod: paymentMethodText,
        paymentDate,
        cancelableDate,
        status: '예매완료',
        delivery: detailPageData.delivery
          ? {
              date: detailPageData.delivery.date,
              address: detailPageData.delivery.details || '',
            }
          : undefined,
      };

      // 예매 내역에 추가
      addReservation(reservationItem, reservationDetail);

      // 결제 완료 후 예매 조회 페이지로 이동
      navigate('/mypage/reservation');
    }, 2000);
  };

  return (
    <div
      className={cn('payment__page max-w-[1280px] mx-auto px-[40px] py-[40px]')}
    >
      {/* Header */}
      <div className={cn('mb-[30px]')}>
        <h1 className={cn('text-[30px] font-bold mb-[10px]')}>결제 확인</h1>
        <p className={cn('text-[14px] text-[#666]')}>
          예약 정보를 확인하고 결제를 진행해주세요.
        </p>
      </div>

      <div className={cn('flex gap-[40px]')}>
        {/* Left: Concert Info and Booking Details */}
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
                  관람일시
                </span>
                <span className={cn('flex-1 text-[#242428]')}>
                  {bookingData.date}
                </span>
              </div>
            </div>

            {/* Thumbnail */}
            {detailPageData.thumbnail && (
              <div
                className={cn(
                  'w-full h-[300px] border border-[#DADEE3] rounded-[15px] overflow-hidden',
                )}
              >
                <OptimizedImage
                  src={detailPageData.thumbnail}
                  alt={detailPageData.concertTitle || 'Concert thumbnail'}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Selected Seats */}
          <div
            className={cn('border border-[#ECEDF2] rounded-[15px] p-[30px]')}
          >
            <h3 className={cn('text-[20px] font-bold mb-[20px]')}>
              선택한 좌석
            </h3>
            <div className={cn('space-y-[12px]')}>
              {bookingData.seats.map((seat) => (
                <div
                  key={seat.id}
                  className={cn(
                    'flex justify-between items-center text-[14px] p-[12px] bg-[#F8F9FA] rounded-[6px]',
                  )}
                >
                  <span className={cn('text-[#242428]')}>
                    {seat.section}석 {seat.row}열 {seat.number}번
                  </span>
                  <span className={cn('text-[#242428] font-medium')}>
                    {detailPageData.price?.[seat.section]
                      ? formatPrice(detailPageData.price[seat.section] ?? 0)
                      : 0}
                    원
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Payment Summary */}
        <div className={cn('w-[400px] flex-shrink-0')}>
          <div
            className={cn('border border-[#ECEDF2] rounded-[15px] p-[30px]')}
          >
            <h3 className={cn('text-[20px] font-bold mb-[30px]')}>결제 정보</h3>

            {/* Timer */}
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

            {/* Price Summary */}
            <div className={cn('mb-[30px]')}>
              <div
                className={cn('flex justify-between items-center mb-[12px]')}
              >
                <span className={cn('text-[14px] text-[#62676C]')}>
                  티켓 금액
                </span>
                <span className={cn('text-[16px] font-bold text-[#242428]')}>
                  {formatPrice(bookingData.totalPrice)}원
                </span>
              </div>
              <div
                className={cn('flex justify-between items-center mb-[12px]')}
              >
                <span className={cn('text-[14px] text-[#62676C]')}>수수료</span>
                <span className={cn('text-[16px] font-bold text-[#242428]')}>
                  0원
                </span>
              </div>
              <div
                className={cn(
                  'flex justify-between items-center pt-[12px] border-t border-[#ECEDF2]',
                )}
              >
                <span className={cn('text-[16px] font-bold text-[#242428]')}>
                  총 결제금액
                </span>
                <span className={cn('text-[20px] font-bold text-[#FA2828]')}>
                  {formatPrice(bookingData.totalPrice)}원
                </span>
              </div>
            </div>

            {/* Payment Method */}
            <div className={cn('mb-[30px]')}>
              <label
                htmlFor="payment-method"
                className={cn('block text-[14px] font-bold mb-[12px]')}
              >
                결제수단
              </label>
              <select
                id="payment-method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className={cn(
                  'w-full px-[12px] py-[10px] border border-[#ECEDF2] rounded-[6px] text-[14px]',
                )}
              >
                <option value="card">신용카드</option>
                <option value="bank">무통장입금</option>
                <option value="phone">휴대폰 결제</option>
              </select>
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={cn(
                'w-full h-[54px] bg-[#4154FF] text-white text-[18px] font-bold rounded-[10px] border border-[#4154FF] hover:bg-[#4154FF]/90 cursor-pointer disabled:bg-[#CCCCCC] disabled:cursor-not-allowed',
              )}
            >
              {isProcessing ? '결제 처리 중...' : '결제하기'}
            </button>

            {/* Back Button */}
            <button
              onClick={() => navigate(`/detail/${id}/booking`)}
              className={cn(
                'w-full h-[54px] mt-[12px] border border-[#CFD0D7] text-[#242428] text-[18px] font-bold rounded-[10px] hover:bg-[#F8F9FA] cursor-pointer',
              )}
            >
              이전으로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

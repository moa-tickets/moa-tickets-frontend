import { useParams, Link } from 'react-router-dom';
import { cn } from '@/shared';
import { useBookingDetail } from '@/features/booking/useBookings';
import OptimizedImage from '@/shared/components/optimized-image/OptimizedImage';

const ReservationDetailPage = () => {
  const { reservationId } = useParams<{ reservationId: string }>();
  const { data, isLoading, isError, error } = useBookingDetail(reservationId || '');

  // 디버깅
  console.log('=== ReservationDetailPage Debug ===');
  console.log('reservationId:', reservationId);
  console.log('data (전체):', data);
  console.log('data?.data:', data?.data);
  console.log('isLoading:', isLoading);
  console.log('isError:', isError);
  console.log('error:', error);

  // API 응답이 { data: {...} } 형태가 아닐 수 있음
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const detail = (data?.data ?? data) as any;

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  const getPaymentStateLabel = (state: string) => {
    switch (state) {
      case 'PAID':
        return '결제완료';
      case 'CANCELED':
        return '취소완료';
      case 'PENDING':
        return '결제대기';
      default:
        return state;
    }
  };

  if (isLoading) {
    return (
      <div className={cn('max-w-[1080px] mx-auto py-[40px] text-center')}>
        <p className={cn('text-[16px] text-[#62676C]')}>로딩 중...</p>
      </div>
    );
  }

  if (isError || !detail) {
    return (
      <div className={cn('max-w-[1080px] mx-auto py-[40px] text-center')}>
        <p className={cn('text-[16px] text-[#62676C]')}>
          예약 정보를 찾을 수 없습니다.
        </p>
        <Link
          to="/mypage/reservation"
          className={cn(
            'mt-[20px] inline-block text-[#FA2828] hover:underline',
          )}
        >
          예매 조회로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className={cn('reservation__detail__page max-w-[1080px] mx-auto')}>
      {/* Header */}
      <div
        className={cn(
          'pt-[30px] pb-[20px] border-b border-solid border-[#ccc]',
        )}
      >
        <h1 className={cn('text-[30px] font-bold mb-[10px]')}>예매 상세</h1>
        <div className={cn('text-[14px] text-[#888]')}>
          예매번호:{' '}
          <span className={cn('font-bold')}>{detail.orderId}</span>
        </div>
      </div>

      {/* Concert Info Section */}
      <div className={cn('mt-[30px] flex gap-[30px]')}>
        {/* Left: Thumbnail */}
        <div className={cn('flex-shrink-0')}>
          <div
            className={cn(
              'w-[300px] h-[400px] border border-solid border-[#DADEE3] rounded-[15px] overflow-hidden',
            )}
          >
            {detail.concertThumbnail && (
              <OptimizedImage
                src={detail.concertThumbnail}
                alt={detail.concertName}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Right: Concert Details */}
        <div className={cn('flex-1')}>
          <h2 className={cn('text-[26px] font-bold text-[#222222] mb-[12px]')}>
            {detail.concertName}
          </h2>

          {/* Concert Info List */}
          <div className={cn('space-y-[16px]')}>
            <div className={cn('flex items-start gap-[10px] text-[16px]')}>
              <span className={cn('w-[100px] text-[#62676C] flex-shrink-0')}>
                장소
              </span>
              <span className={cn('flex-1 text-[#242428]')}>
                {detail.hallName}
              </span>
            </div>
            <div className={cn('flex items-start gap-[10px] text-[16px]')}>
              <span className={cn('w-[100px] text-[#62676C] flex-shrink-0')}>
                공연기간
              </span>
              <span className={cn('flex-1 text-[#242428]')}>
                {formatDate(detail.concertStart)} ~ {formatDate(detail.concertEnd)}
              </span>
            </div>
            <div className={cn('flex items-start gap-[10px] text-[16px]')}>
              <span className={cn('w-[100px] text-[#62676C] flex-shrink-0')}>
                공연시간
              </span>
              <span className={cn('flex-1 text-[#242428]')}>
                {detail.concertDuration}
              </span>
            </div>
            <div className={cn('flex items-start gap-[10px] text-[16px]')}>
              <span className={cn('w-[100px] text-[#62676C] flex-shrink-0')}>
                관람연령
              </span>
              <span className={cn('flex-1 text-[#242428]')}>
                {detail.concertAge}세 이상 관람가능
              </span>
            </div>
            <div className={cn('flex items-start gap-[10px] text-[16px]')}>
              <span className={cn('w-[100px] text-[#62676C] flex-shrink-0')}>
                관람일시
              </span>
              <span className={cn('flex-1 text-[#242428]')}>
                {formatDate(detail.sessionDate)}
              </span>
            </div>
            <div className={cn('flex items-start gap-[10px] text-[16px]')}>
              <span className={cn('w-[100px] text-[#62676C] flex-shrink-0')}>
                매수
              </span>
              <span className={cn('flex-1 text-[#242428]')}>
                {detail.ticketCount}매
              </span>
            </div>
          </div>

          {/* Seat Info */}
          {detail.seats && detail.seats.length > 0 && (
            <div
              className={cn('mt-[30px] pt-[20px] border-t border-[#ECEDF2]')}
            >
              <h3 className={cn('text-[18px] font-bold mb-[16px]')}>
                좌석 정보
              </h3>
              <div className={cn('flex flex-wrap gap-[8px]')}>
                {detail.seats.map((seat) => (
                  <span
                    key={seat.ticketId}
                    className={cn(
                      'px-[12px] py-[6px] bg-[#F8F9FA] rounded-[4px] text-[14px] text-[#242428]',
                    )}
                  >
                    {seat.seatNum}번
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Info Section */}
      <div className={cn('mt-[40px] pt-[30px] border-t border-[#ECEDF2]')}>
        <h3 className={cn('text-[20px] font-bold mb-[20px]')}>결제 정보</h3>
        <div className={cn('bg-[#F8F9FA] p-[20px] rounded-[8px]')}>
          <div className={cn('space-y-[12px]')}>
            <div
              className={cn(
                'flex justify-between text-[16px] font-bold',
              )}
            >
              <span className={cn('text-[#242428]')}>총 결제금액</span>
              <span className={cn('text-[#242428]')}>
                {formatPrice(detail.amount)}원
              </span>
            </div>
            <div className={cn('flex justify-between text-[14px] mt-[16px]')}>
              <span className={cn('text-[#62676C]')}>결제일시</span>
              <span className={cn('text-[#242428]')}>
                {formatDate(detail.paidAt)}
              </span>
            </div>
            <div className={cn('flex justify-between text-[14px]')}>
              <span className={cn('text-[#62676C]')}>상태</span>
              <span
                className={cn(
                  'font-medium',
                  detail.paymentState === 'PAID' && 'text-[#00B050]',
                  detail.paymentState === 'CANCELED' && 'text-[#FA2828]',
                )}
              >
                {getPaymentStateLabel(detail.paymentState)}
              </span>
            </div>
            {detail.canceledAt && (
              <div className={cn('flex justify-between text-[14px]')}>
                <span className={cn('text-[#62676C]')}>취소일시</span>
                <span className={cn('text-[#242428]')}>
                  {formatDate(detail.canceledAt)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        className={cn(
          'mt-[40px] pt-[30px] border-t border-[#ECEDF2] flex gap-[12px]',
        )}
      >
        <Link
          to="/mypage/reservation"
          className={cn(
            'px-[24px] py-[12px] border border-[#CFD0D7] rounded-[6px] text-[14px] text-[#242428] hover:bg-[#F8F9FA] transition-colors',
          )}
        >
          목록으로
        </Link>
        {detail.paymentState === 'PAID' && (
          <button
            className={cn(
              'px-[24px] py-[12px] bg-[#FA2828] text-white rounded-[6px] text-[14px] hover:bg-[#E02020] transition-colors',
            )}
          >
            예매 취소
          </button>
        )}
      </div>
    </div>
  );
};

export default ReservationDetailPage;

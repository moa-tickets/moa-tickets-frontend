import { useParams, Link } from 'react-router-dom';
import { cn } from '@/shared';
import { reservationDetailData } from '@/entities/constant/reservationData';
import { detailData } from '@/entities/constant/detailData';
import Icon from '@/shared/lib/Icon';
import OptimizedImage from '@/shared/components/optimized-image/OptimizedImage';

const ReservationDetailPage = () => {
  const { reservationId } = useParams<{ reservationId: string }>();
  const detail = reservationDetailData[reservationId || ''];
  const concertDetail = detail ? detailData[detail.detailId] : null;

  if (!detail || !concertDetail) {
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

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

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
          <span className={cn('font-bold')}>{detail.reservationId}</span>
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
            {concertDetail.thumbnail && (
              <OptimizedImage
                src={concertDetail.thumbnail}
                alt={detail.concertTitle}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Right: Concert Details */}
        <div className={cn('flex-1')}>
          <h2 className={cn('text-[26px] font-bold text-[#222222] mb-[12px]')}>
            {detail.concertTitle}
          </h2>
          <div className={cn('text-[14px] text-[#666] mb-[20px]')}>
            {detail.genre}
          </div>

          {/* Concert Info List */}
          <div className={cn('space-y-[16px]')}>
            <div className={cn('flex items-start gap-[10px] text-[16px]')}>
              <span className={cn('w-[100px] text-[#62676C] flex-shrink-0')}>
                장소
              </span>
              <span className={cn('flex-1 text-[#242428]')}>
                {detail.location}
              </span>
            </div>
            <div className={cn('flex items-start gap-[10px] text-[16px]')}>
              <span className={cn('w-[100px] text-[#62676C] flex-shrink-0')}>
                공연기간
              </span>
              <span className={cn('flex-1 text-[#242428]')}>{detail.date}</span>
            </div>
            <div className={cn('flex items-start gap-[10px] text-[16px]')}>
              <span className={cn('w-[100px] text-[#62676C] flex-shrink-0')}>
                관람연령
              </span>
              <span className={cn('flex-1 text-[#242428]')}>{detail.age}</span>
            </div>
            <div className={cn('flex items-start gap-[10px] text-[16px]')}>
              <span className={cn('w-[100px] text-[#62676C] flex-shrink-0')}>
                관람일시
              </span>
              <span className={cn('flex-1 text-[#242428]')}>
                {detail.viewingDateTime}
              </span>
            </div>
            <div className={cn('flex items-start gap-[10px] text-[16px]')}>
              <span className={cn('w-[100px] text-[#62676C] flex-shrink-0')}>
                매수
              </span>
              <span className={cn('flex-1 text-[#242428]')}>
                {detail.quantity}
              </span>
            </div>
          </div>

          {/* Seat Info */}
          {detail.seatInfo && detail.seatInfo.length > 0 && (
            <div
              className={cn('mt-[30px] pt-[20px] border-t border-[#ECEDF2]')}
            >
              <h3 className={cn('text-[18px] font-bold mb-[16px]')}>
                좌석 정보
              </h3>
              <div className={cn('space-y-[12px]')}>
                {detail.seatInfo.map((seat, index) => (
                  <div
                    key={index}
                    className={cn('flex items-center gap-[12px] text-[14px]')}
                  >
                    <span className={cn('text-[#62676C]')}>
                      {seat.section}석 {seat.row}열
                    </span>
                    <span className={cn('text-[#242428]')}>
                      {seat.seatNumbers.join(', ')}번
                    </span>
                  </div>
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
            <div className={cn('flex justify-between text-[14px]')}>
              <span className={cn('text-[#62676C]')}>티켓 금액</span>
              <span className={cn('text-[#242428] font-medium')}>
                {formatPrice(detail.price.breakdown.ticket)}원
              </span>
            </div>
            <div className={cn('flex justify-between text-[14px]')}>
              <span className={cn('text-[#62676C]')}>수수료</span>
              <span className={cn('text-[#242428] font-medium')}>
                {formatPrice(detail.price.breakdown.fee)}원
              </span>
            </div>
            <div
              className={cn(
                'flex justify-between text-[16px] font-bold pt-[12px] border-t border-[#CFD0D7]',
              )}
            >
              <span className={cn('text-[#242428]')}>총 결제금액</span>
              <span className={cn('text-[#242428]')}>
                {formatPrice(detail.price.total)}원
              </span>
            </div>
            <div className={cn('flex justify-between text-[14px] mt-[16px]')}>
              <span className={cn('text-[#62676C]')}>결제수단</span>
              <span className={cn('text-[#242428]')}>
                {detail.paymentMethod}
              </span>
            </div>
            <div className={cn('flex justify-between text-[14px]')}>
              <span className={cn('text-[#62676C]')}>결제일시</span>
              <span className={cn('text-[#242428]')}>{detail.paymentDate}</span>
            </div>
            <div className={cn('flex justify-between text-[14px]')}>
              <span className={cn('text-[#62676C]')}>취소가능일</span>
              <span className={cn('text-[#242428]')}>
                {detail.cancelableDate}
              </span>
            </div>
            <div className={cn('flex justify-between text-[14px]')}>
              <span className={cn('text-[#62676C]')}>상태</span>
              <span className={cn('text-[#242428]')}>{detail.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Info */}
      {detail.delivery && (
        <div className={cn('mt-[30px] pt-[30px] border-t border-[#ECEDF2]')}>
          <h3 className={cn('text-[20px] font-bold mb-[20px]')}>배송 정보</h3>
          <div className={cn('space-y-[12px] text-[14px]')}>
            <div className={cn('flex items-start gap-[10px]')}>
              <span className={cn('w-[100px] text-[#62676C] flex-shrink-0')}>
                배송일
              </span>
              <span className={cn('flex-1 text-[#242428]')}>
                {detail.delivery.date}
              </span>
            </div>
            <div className={cn('flex items-start gap-[10px]')}>
              <span className={cn('w-[100px] text-[#62676C] flex-shrink-0')}>
                배송주소
              </span>
              <span className={cn('flex-1 text-[#242428]')}>
                {detail.delivery.address}
              </span>
            </div>
          </div>
        </div>
      )}

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
        {detail.status !== '취소완료' && (
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
